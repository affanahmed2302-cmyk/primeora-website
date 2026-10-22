import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminLogin, isAuthConfigured } from '@/lib/cms-store';
import { signSession } from '@/lib/auth';
import {
  getTrustedClientIp,
  checkDurableLoginRateLimit,
  recordDurableFailedLogin,
  recordDurableSuccessfulLogin,
} from '@/lib/rate-limiter';
import { readBoundedJson } from '@/lib/request-guard';
import { getSupabaseAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // 1. Extract trusted client IP strictly from platform-verified connection headers
    const ip = getTrustedClientIp(req);

    // 2. Consume request body with strict byte-level stream accounting (max 64KB)
    const { data: body, error: bodyError, status: bodyStatus } = await readBoundedJson<{
      email?: string;
      password?: string;
    }>(req, 64 * 1024);

    if (bodyError || !body) {
      return NextResponse.json(
        { success: false, error: bodyError || 'Invalid request body' },
        { status: bodyStatus || 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 3. Distributed Atomic Rate Limiter (Dual enforcement: IP & Account Email across serverless instances)
    const rateCheck = await checkDurableLoginRateLimit(ip, cleanEmail);
    if (!rateCheck.allowed) {
      const headers: Record<string, string> = {};
      if (rateCheck.resetInSeconds) {
        headers['Retry-After'] = String(rateCheck.resetInSeconds);
      }
      return NextResponse.json(
        {
          success: false,
          error:
            rateCheck.error ||
            'Too many failed login attempts. Please wait 15 minutes before trying again.',
        },
        { status: rateCheck.status || 429, headers }
      );
    }

    // 4. Verify administrative credentials backend configuration
    if (!isAuthConfigured()) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error:
              'Administrative authentication is currently disabled. Server administrator must configure Supabase Auth or administrative credentials.',
          },
          { status: 503 }
        );
      }
    }

    // 5. Verify administrative credentials
    const admin = await verifyAdminLogin(cleanEmail, password);

    if (!admin) {
      // Record failed attempt in shared atomic store
      await recordDurableFailedLogin(ip, cleanEmail, 'Invalid administrative credentials');
      return NextResponse.json(
        { success: false, error: 'Invalid administrative credentials.' },
        { status: 401 }
      );
    }

    // 6. Inspect MFA factor status for founder account
    let verifiedMfaFactorId: string | null = null;
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const { data: factorData } = await supabase.auth.admin.mfa.listFactors({
          userId: admin.id,
        });
        const verified = (factorData?.factors || []).filter(
          (f: any) => f.status === 'verified' && f.factor_type === 'totp'
        );
        if (verified.length > 0) {
          verifiedMfaFactorId = verified[0].id;
        }
      } catch (err) {
        console.warn('[Login] Error querying MFA factors for user:', err);
      }
    }

    const isSecure = process.env.NODE_ENV === 'production' || req.nextUrl.protocol === 'https:';

    // 7. Branch by MFA enrollment status
    if (verifiedMfaFactorId) {
      // Multi-Factor Authentication Required: issue temporary AAL1 session (30 minutes expiry)
      const aal1Token = signSession(admin, 1800, 'aal1', true);

      const response = NextResponse.json({
        success: true,
        mfaRequired: true,
        factorId: verifiedMfaFactorId,
        message: 'Multi-factor authentication required. Please enter your 6-digit authenticator code.',
        user: {
          id: admin.id,
          email: admin.email,
          fullName: admin.fullName,
          role: admin.role,
        },
      });

      response.cookies.set('admin_session', aal1Token, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        path: '/',
        maxAge: 1800,
      });

      return response;
    }

    // Standard single-factor login (or pre-enrolled founder state): issue AAL2 session (8 hours expiry)
    await recordDurableSuccessfulLogin(ip, cleanEmail, admin.id);
    const token = signSession(admin, 28800, 'aal2', false);

    const response = NextResponse.json({
      success: true,
      mfaRequired: false,
      message: 'Authentication successful',
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    return response;
  } catch (err: any) {
    console.error('[Login] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
