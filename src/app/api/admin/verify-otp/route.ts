import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import { getTrustedClientIp, recordFailedAttempt, clearRateLimit, checkRateLimit } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = getTrustedClientIp(req);
    const csrfCheck = validateCsrfAndOrigin(req);
    if (!csrfCheck.valid) return NextResponse.json({ success: false, error: csrfCheck.error }, { status: 403 });
    const { data: body, error: bErr } = await readBoundedJson<any>(req, 16 * 1024);
    if (bErr || !body) return NextResponse.json({ success: false, error: bErr || 'Invalid request body' }, { status: 400 });
    const { email: rawEmail, token: rawToken } = body;

    if (!rawEmail || !rawToken) {
      return NextResponse.json(
        { success: false, error: 'Both administrative email and verification code are required.' },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();
    const token = rawToken.toString().trim();

    if (token.length < 6 || token.length > 12) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code format. Codes are 6 to 8 digits.' },
        { status: 400 }
      );
    }

    const lockKey = `otp_attempts:${email}`;
    const ipKey = `otp_ip:${ip}`;

    // Check IP rate limit
    const ipCheck = checkRateLimit(ipKey, 15, 900);
    if (!ipCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many verification attempts from this network. Please wait 15 minutes before retrying.',
        },
        { status: 429 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Authentication service is not configured.' },
        { status: 503 }
      );
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Administrative service unavailable.' },
        { status: 503 }
      );
    }

    // Verify OTP using Supabase Auth recovery type
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery',
    });

    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const emailHash = crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);

    if (error || !data.session) {
      const failStatus = recordFailedAttempt(lockKey, 5, 900);
      
      await supabase.from('auth_audit_logs').insert({
        event_type: 'recovery_code_failed',
        email_hash: emailHash,
        ip_hash: ipHash,
        status: 'failed',
        details: failStatus.locked
          ? 'Account locked out after 5 consecutive failed recovery code attempts'
          : `Invalid recovery code attempt (${5 - failStatus.remainingAttempts}/5)`,
      });

      if (failStatus.locked) {
        return NextResponse.json(
          {
            success: false,
            error: 'Maximum code attempts exceeded. For security, recovery is locked for 15 minutes. Please request a new code later.',
            locked: true,
          },
          { status: 423 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Invalid or expired recovery code. ${failStatus.remainingAttempts} attempts remaining.`,
          remainingAttempts: failStatus.remainingAttempts,
        },
        { status: 400 }
      );
    }

    // Verification successful: clear rate limits
    clearRateLimit(lockKey);

    await supabase.from('auth_audit_logs').insert({
      event_type: 'recovery_code_verified',
      user_id: data.user?.id,
      email_hash: emailHash,
      ip_hash: ipHash,
      status: 'success',
      details: 'One-time recovery code successfully validated',
    });

    return NextResponse.json({
      success: true,
      message: 'Recovery code verified successfully.',
      accessToken: data.session.access_token,
      expiresAt: data.session.expires_at,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
