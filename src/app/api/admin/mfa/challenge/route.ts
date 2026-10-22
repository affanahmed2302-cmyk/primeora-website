import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { createMfaChallenge, listUserMfaFactors } from '@/lib/mfa';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';

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

    const { data: body } = await readBoundedJson<{ factorId?: string }>(req, 16 * 1024);
    let targetFactorId = body?.factorId;

    if (!targetFactorId) {
      const factors = await listUserMfaFactors(session.userId);
      const verified = factors.filter((f: any) => f.status === 'verified');
      if (verified.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No verified MFA factors found for this account.' },
          { status: 404 }
        );
      }
      targetFactorId = verified[0].id;
    }

    const challenge = await createMfaChallenge(session.email, targetFactorId!);
    if (!challenge.success) {
      return NextResponse.json(
        { success: false, error: challenge.error || 'Failed to issue MFA challenge.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      factorId: targetFactorId,
      challengeId: challenge.challengeId,
      expiresAt: challenge.expiresAt,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error creating MFA challenge.' },
      { status: 500 }
    );
  }
}
