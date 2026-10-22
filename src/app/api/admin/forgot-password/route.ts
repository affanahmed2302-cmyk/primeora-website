import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import { getTrustedClientIp, checkRateLimit, maskEmail } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = getTrustedClientIp(req);
    const csrfCheck = validateCsrfAndOrigin(req);
    if (!csrfCheck.valid) return NextResponse.json({ success: false, error: csrfCheck.error }, { status: 403 });
    
    // Strict rate limit: 3 requests per 15 minutes per IP
    const rateCheck = checkRateLimit(`pwd_reset_req:${ip}`, 3, 900);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many password reset requests from this IP. Please wait ${Math.ceil(
            rateCheck.resetInSeconds / 60
          )} minutes before trying again.`,
        },
        { status: 429 }
      );
    }

    const { data: body, error: bErr } = await readBoundedJson<any>(req, 16 * 1024);
    if (bErr || !body) return NextResponse.json({ success: false, error: bErr || 'Invalid request body' }, { status: 400 });
    const rawEmail = body.email;

    if (!rawEmail || typeof rawEmail !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid administrative email address is required.' },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email format.' },
        { status: 400 }
      );
    }

    // Rate limit per email as well: max 3 per 15 minutes
    const emailRateCheck = checkRateLimit(`pwd_reset_email:${email}`, 3, 900);
    if (!emailRateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests for this account. Please wait ${Math.ceil(
            emailRateCheck.resetInSeconds / 60
          )} minutes before requesting another code.`,
        },
        { status: 429 }
      );
    }

    const masked = maskEmail(email);

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

    // Check if account exists in admin_profiles
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role')
      .eq('email', email)
      .single();

    // Protection against user enumeration: Return identical neutral confirmation
    // regardless of whether account was found in admin_profiles
    if (!profile) {
      // Record failed audit attempt
      const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
      const emailHash = crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);
      await supabase.from('auth_audit_logs').insert({
        event_type: 'recovery_request_unknown_user',
        email_hash: emailHash,
        ip_hash: ipHash,
        status: 'rejected',
        details: 'Password recovery requested for non-existent administrative profile',
      });

      return NextResponse.json({
        success: true,
        message: 'If an active administrative account is associated with this email, a recovery instruction has been dispatched.',
        maskedEmail: masked,
      });
    }

    // Origin for redirect URL
    const host = req.headers.get('host') || 'primeora-solutions.netlify.app';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const redirectTo = `${protocol}://${host}/admin/reset-password`;

    // Trigger Supabase Auth password recovery
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (resetError) {
      console.warn(`[Supabase Auth] resetPasswordForEmail warning for ${email}: ${resetError.message}`);
      if (
        resetError.message.toLowerCase().includes('rate limit') ||
        resetError.message.toLowerCase().includes('once every') ||
        resetError.status === 429
      ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Security rate limit: An email was recently dispatched for this account. Please wait at least 60 seconds before requesting another code.',
          },
          { status: 429 }
        );
      }
    }

    // Record audit event
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const emailHash = crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);
    await supabase.from('auth_audit_logs').insert({
      event_type: 'recovery_requested',
      user_id: profile.id,
      email_hash: emailHash,
      ip_hash: ipHash,
      status: 'success',
      details: 'Password recovery code or link dispatched via Supabase Auth',
    });

    return NextResponse.json({
      success: true,
      message: 'If an active administrative account is associated with this email, a recovery instruction has been dispatched.',
      maskedEmail: masked,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
