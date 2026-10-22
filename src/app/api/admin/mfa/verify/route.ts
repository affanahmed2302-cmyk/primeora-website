import { NextRequest, NextResponse } from 'next/server';
import { verifySession, signSession } from '@/lib/auth';
import { createMfaChallenge, verifyMfaCode } from '@/lib/mfa';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { AdminUser } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('admin_session')?.value;
    const session = verifySession(sessionCookie);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid administrative session required.' },
        { status: 401 }
      );
    }

    const csrfCheck = validateCsrfAndOrigin(req);
    if (!csrfCheck.valid) {
      return NextResponse.json(
        { success: false, error: csrfCheck.error || 'CSRF validation failed.' },
        { status: 403 }
      );
    }

    const { data: body, error: bodyError } = await readBoundedJson<{
      factorId?: string;
      challengeId?: string;
      code?: string;
    }>(req, 16 * 1024);

    if (bodyError || !body) {
      return NextResponse.json(
        { success: false, error: bodyError || 'Invalid request body' },
        { status: 400 }
      );
    }

    const { factorId, code } = body;
    let challengeId = body.challengeId;

    if (!factorId || !code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Factor ID and 6-digit verification code are required.' },
        { status: 400 }
      );
    }

    // If challengeId is missing, create one on demand
    if (!challengeId) {
      const ch = await createMfaChallenge(session.email, factorId);
      if (!ch.success || !ch.challengeId) {
        return NextResponse.json(
          { success: false, error: 'Failed to initialize verification challenge.' },
          { status: 500 }
        );
      }
      challengeId = ch.challengeId;
    }

    // Verify TOTP code with Supabase Auth
    const verifyResult = await verifyMfaCode(session.email, factorId, challengeId, code);

    const supabase = getSupabaseAdminClient();

    if (!verifyResult.success) {
      if (supabase) {
        await supabase.from('auth_audit_logs').insert({
          event_type: 'mfa_failed',
          user_id: session.userId,
          status: 'failed',
          details: 'Failed TOTP verification attempt',
          created_at: new Date().toISOString(),
        });
      }
      return NextResponse.json(
        { success: false, error: verifyResult.error || 'Invalid 6-digit authenticator code.' },
        { status: 401 }
      );
    }

    // Elevated session: Issue AAL2 token
    const adminUser: AdminUser = {
      id: session.userId,
      email: session.email,
      fullName: session.fullName,
      role: session.role,
      mustChangePassword: session.mustChangePassword,
    };

    const elevatedToken = signSession(adminUser, 28800, 'aal2', false);

    if (supabase) {
      await supabase.from('auth_audit_logs').insert({
        event_type: 'mfa_verified',
        user_id: session.userId,
        status: 'success',
        details: 'TOTP challenge verified; session elevated to AAL2',
        created_at: new Date().toISOString(),
      });
    }

    const isSecure = process.env.NODE_ENV === 'production' || req.nextUrl.protocol === 'https:';
    const response = NextResponse.json({
      success: true,
      message: 'Multi-factor authentication verified successfully. High-assurance session granted.',
      assuranceLevel: 'aal2',
    });

    response.cookies.set('admin_session', elevatedToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error verifying MFA code.' },
      { status: 500 }
    );
  }
}
