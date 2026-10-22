import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { enrollMfaFactor, listUserMfaFactors, deleteMfaFactor } from '@/lib/mfa';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';
import { getSupabaseAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify administrative session
    const sessionCookie = req.cookies.get('admin_session')?.value;
    const session = verifySession(sessionCookie);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid administrative session required.' },
        { status: 401 }
      );
    }

    // 2. Validate Origin and CSRF
    const csrfCheck = validateCsrfAndOrigin(req);
    if (!csrfCheck.valid) {
      return NextResponse.json(
        { success: false, error: csrfCheck.error || 'CSRF validation failed.' },
        { status: 403 }
      );
    }

    // 3. Read bounded payload
    const { data: body } = await readBoundedJson<{ friendlyName?: string }>(req, 16 * 1024);
    const friendlyName = body?.friendlyName || `Primeora (${session.email.split('@')[0]})`;

    // 4. Clean up any stale unverified factors before enrolling a fresh one
    const existingFactors = await listUserMfaFactors(session.userId);
    for (const factor of existingFactors) {
      if (factor.status === 'unverified') {
        await deleteMfaFactor(session.userId, factor.id);
      }
    }

    // 5. Enroll new TOTP factor
    const enrollResult = await enrollMfaFactor(session.email, friendlyName);
    if (!enrollResult.success || !enrollResult.factorId) {
      return NextResponse.json(
        { success: false, error: enrollResult.error || 'Failed to enroll MFA factor.' },
        { status: 500 }
      );
    }

    // 6. Audit log
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      await supabase.from('auth_audit_logs').insert({
        event_type: 'mfa_enrollment_started',
        user_id: session.userId,
        status: 'pending_verification',
        details: `Founder initiated TOTP factor enrollment (${friendlyName})`,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      factorId: enrollResult.factorId,
      qrCode: enrollResult.qrCode,
      secret: enrollResult.secret,
      uri: enrollResult.uri,
      message: 'TOTP factor provisioned. Scan the QR code with your authenticator app and verify.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error during MFA enrollment.' },
      { status: 500 }
    );
  }
}
