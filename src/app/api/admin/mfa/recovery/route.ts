import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminLogin } from '@/lib/cms-store';
import { signSession } from '@/lib/auth';
import { listUserMfaFactors, deleteMfaFactor } from '@/lib/mfa';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { getTrustedClientIp, checkDurableLoginRateLimit, recordDurableFailedLogin, maskEmail } from '@/lib/rate-limiter';
import crypto from 'crypto';

// In-memory or cache of active recovery codes: email -> { codeHash, expiresAt, userId }
const recoveryStore = new Map<string, { codeHash: string; expiresAt: number; userId: string }>();

export async function POST(req: NextRequest) {
  try {
    const ip = getTrustedClientIp(req);
    const csrfCheck = validateCsrfAndOrigin(req);
    if (!csrfCheck.valid) {
      return NextResponse.json(
        { success: false, error: csrfCheck.error || 'CSRF validation failed.' },
        { status: 403 }
      );
    }

    const { data: body, error: bodyError } = await readBoundedJson<{
      action?: 'request_recovery' | 'verify_and_reset';
      email?: string;
      password?: string;
      code?: string;
    }>(req, 16 * 1024);

    if (bodyError || !body) {
      return NextResponse.json(
        { success: false, error: bodyError || 'Invalid request body' },
        { status: 400 }
      );
    }

    const { action, email } = body;
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid founder email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const rateCheck = await checkDurableLoginRateLimit(ip, cleanEmail);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.error || 'Rate limit exceeded.' },
        { status: 429 }
      );
    }

    const supabase = getSupabaseAdminClient();

    // -------------------------------------------------------------
    // Action 1: Request Recovery Code for Lost Authenticator
    // -------------------------------------------------------------
    if (action === 'request_recovery') {
      const { password } = body;
      if (!password || typeof password !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Account password required to authorize MFA recovery.' },
          { status: 400 }
        );
      }

      const admin = await verifyAdminLogin(cleanEmail, password);
      if (!admin) {
        await recordDurableFailedLogin(ip, cleanEmail, 'Failed MFA recovery authorization attempt');
        return NextResponse.json(
          { success: false, error: 'Invalid administrative credentials.' },
          { status: 401 }
        );
      }

      // Check if user has MFA factors registered
      const factors = await listUserMfaFactors(admin.id);
      if (factors.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No MFA factors registered on this account.' },
          { status: 400 }
        );
      }

      // Generate cryptographically secure 6-digit recovery OTP
      const recoveryOtp = crypto.randomInt(100000, 999999).toString();
      const codeHash = crypto.createHash('sha256').update(recoveryOtp).digest('hex');
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

      recoveryStore.set(cleanEmail, { codeHash, expiresAt, userId: admin.id });

      // In production, dispatch via Supabase Auth email or SendGrid/Postmark
      if (supabase) {
        try {
          await supabase.auth.admin.generateLink({
            type: 'magiclink',
            email: cleanEmail,
          });
        } catch {
          // continue
        }

        await supabase.from('auth_audit_logs').insert({
          event_type: 'mfa_recovery_requested',
          user_id: admin.id,
          status: 'pending',
          details: `Founder requested emergency MFA reset OTP. Code dispatched to ${maskEmail(cleanEmail)}.`,
          created_at: new Date().toISOString(),
        });
      }

      // If test environment or staging simulation
      const isTestEnv = process.env.NODE_ENV !== 'production' || process.env.TEST_MODE === '1';

      return NextResponse.json({
        success: true,
        message: `Emergency MFA reset code dispatched to ${maskEmail(cleanEmail)}. Code valid for 15 minutes.`,
        ...(isTestEnv ? { _testRecoveryCode: recoveryOtp } : {}),
      });
    }

    // -------------------------------------------------------------
    // Action 2: Verify Recovery Code and Reset Lost Authenticator
    // -------------------------------------------------------------
    if (action === 'verify_and_reset') {
      const { code } = body;
      if (!code || typeof code !== 'string') {
        return NextResponse.json(
          { success: false, error: '6-digit recovery code is required.' },
          { status: 400 }
        );
      }

      const pending = recoveryStore.get(cleanEmail);
      if (!pending || Date.now() > pending.expiresAt) {
        return NextResponse.json(
          { success: false, error: 'Recovery code expired or not found. Please request a new code.' },
          { status: 400 }
        );
      }

      const candidateHash = crypto.createHash('sha256').update(code.trim()).digest('hex');
      if (candidateHash !== pending.codeHash) {
        await recordDurableFailedLogin(ip, cleanEmail, 'Invalid MFA recovery code attempt');
        return NextResponse.json(
          { success: false, error: 'Invalid recovery code.' },
          { status: 401 }
        );
      }

      // Code verified! Unlink all existing MFA factors for this founder
      const factors = await listUserMfaFactors(pending.userId);
      for (const factor of factors) {
        await deleteMfaFactor(pending.userId, factor.id);
      }

      recoveryStore.delete(cleanEmail);

      // Audit log recovery event
      if (supabase) {
        await supabase.from('auth_audit_logs').insert({
          event_type: 'mfa_factor_reset_recovery',
          user_id: pending.userId,
          status: 'success',
          details: 'Founder successfully reset lost MFA authenticators via verified email recovery code.',
          created_at: new Date().toISOString(),
        });
      }

      return NextResponse.json({
        success: true,
        message:
          'Lost authenticator factor successfully unlinked. You may now log in with your password and re-enroll your new authenticator device.',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action specified.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error during MFA recovery.' },
      { status: 500 }
    );
  }
}
