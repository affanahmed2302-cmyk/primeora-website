import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import { signSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limiter';
import { AdminUser } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Rate limit: 5 attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`pwd_reset_sub:${ip}`, 5, 900);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many password reset attempts. Please wait ${Math.ceil(
            rateCheck.resetInSeconds / 60
          )} minutes before retrying.`,
        },
        { status: 429 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Database service is not configured.' },
        { status: 503 }
      );
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Administrative database client unavailable.' },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { accessToken, newPassword } = body;

    if (!accessToken || typeof accessToken !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'A valid, unexpired recovery token is required. Please request a new recovery code.',
        },
        { status: 401 }
      );
    }

    // Strict password requirements: min 10 chars, uppercase, lowercase, number, symbol
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 10 characters long.',
        },
        { status: 400 }
      );
    }

    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must include uppercase, lowercase, numeric, and special characters.',
        },
        { status: 400 }
      );
    }

    // Validate the recovery access token against Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
    if (userError || !userData?.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Recovery session has expired or is invalid. Please request a new code.',
        },
        { status: 401 }
      );
    }

    const targetUserId = userData.user.id;
    const targetEmail = userData.user.email || '';

    // Update password in Supabase Auth
    const { error: updateError } = await supabase.auth.admin.updateUserById(targetUserId, {
      password: newPassword,
    });

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to update credentials: ${updateError.message}`,
        },
        { status: 500 }
      );
    }

    // Clear temporary credential flags and unlock admin profile
    await supabase
      .from('admin_profiles')
      .update({
        must_change_password: false,
        temp_password_active: false,
        temp_password_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', targetUserId);

    // Retrieve user's authoritative profile
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role')
      .eq('id', targetUserId)
      .single();

    const role = profile?.role === 'content_editor' ? 'content_editor' : 'super_admin';
    const fullName = profile?.full_name || userData.user.user_metadata?.full_name || 'Primeora Administrator';

    // Record privacy-conscious audit event
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const emailHash = crypto.createHash('sha256').update(targetEmail).digest('hex').substring(0, 16);

    await supabase.from('auth_audit_logs').insert({
      event_type: 'recovery_completed',
      user_id: targetUserId,
      email_hash: emailHash,
      ip_hash: ipHash,
      status: 'success',
      details: 'Password successfully reset via verified recovery token; fresh session issued',
    });

    // Create fresh authenticated administrative session
    const adminUser: AdminUser = {
      id: targetUserId,
      email: targetEmail,
      fullName,
      role,
      mustChangePassword: false,
    };

    const sessionToken = signSession(adminUser, 28800);

    const response = NextResponse.json({
      success: true,
      message: 'Password successfully reset. Administrative session initialized.',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        fullName: adminUser.fullName,
        role: adminUser.role,
        mustChangePassword: false,
      },
    });

    const isSecure = process.env.NODE_ENV === 'production' || req.nextUrl.protocol === 'https:';

    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
