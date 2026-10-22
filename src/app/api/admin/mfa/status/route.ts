import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';

function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

interface MfaFactorRecord {
  id?: string;
  factor_type?: string;
  status?: string;
  friendly_name?: string;
}

/**
 * Audit and report MFA (TOTP) factor status for the authenticated founder/administrator.
 * In accordance with security audit requirements, this endpoint verifies whether
 * TOTP factors are configured, available, or awaiting founder enrollment.
 */
export async function GET(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Valid administrative session required.' },
      { status: 401 }
    );
  }

  try {
    let totpFactors: MfaFactorRecord[] = [];
    let isEnrolled = false;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        // Query user's registered MFA factors via Supabase Admin API
        const { data: userFactors, error } = await supabase.auth.admin.mfa.listFactors({
          userId: session.userId,
        });

        if (!error && userFactors?.factors) {
          totpFactors = (userFactors.factors as MfaFactorRecord[]).filter((f) => f.factor_type === 'totp');
          isEnrolled = totpFactors.some((f) => f.status === 'verified');
        }
      }
    }

    const response = NextResponse.json({
      success: true,
      userId: session.userId,
      email: session.email,
      role: session.role,
      mfa: {
        supported: true,
        factorType: 'totp',
        enrolled: isEnrolled,
        enforced: false, // Per policy: not enforced until founders complete verification to prevent lockout
        status: isEnrolled ? 'enrolled_active' : 'awaiting_owner_enrollment',
        factorsCount: totpFactors.length,
      },
    });

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to query MFA status';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
