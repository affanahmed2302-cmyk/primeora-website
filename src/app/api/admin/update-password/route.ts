import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { readBoundedJson, validateCsrfAndOrigin } from '@/lib/request-guard';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import { signSession, verifySession } from '@/lib/auth';
import { getTrustedClientIp } from '@/lib/rate-limiter';
import { AdminUser } from '@/types';

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Database service is not configured.' },
        { status: 503 }
      );
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Database admin service unavailable.' },
        { status: 503 }
      );
    }

    const { data: body, error: bErr } = await readBoundedJson<any>(req, 16 * 1024);
    if (bErr || !body) return NextResponse.json({ success: false, error: bErr || 'Invalid request body' }, { status: 400 });
    const { accessToken, newPassword } = body;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 10 characters long and contain varied characters.',
        },
        { status: 400 }
      );
    }

    let targetUserId: string | null = null;
    let targetUserEmail: string = '';
    let targetFullName: string = '';
    let targetRole: 'super_admin' | 'content_editor' = 'super_admin';

    // 1. Identify user via accessToken OR active session cookie
    if (accessToken && typeof accessToken === 'string') {
      const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
      if (userError || !userData?.user) {
        return NextResponse.json(
          {
            success: false,
            error: 'Your password reset session has expired or is invalid. Please request a new setup link or code.',
          },
          { status: 401 }
        );
      }
      targetUserId = userData.user.id;
      targetUserEmail = userData.user.email || '';
      targetFullName = userData.user.user_metadata?.full_name || '';
    } else {
      // Check active admin_session cookie
      const sessionCookie = req.cookies.get('admin_session')?.value;
      const session = verifySession(sessionCookie);
      if (!session) {
        return NextResponse.json(
          {
            success: false,
            error: 'Valid recovery token or active administrative session is required.',
          },
          { status: 400 }
        );
      }
      targetUserId = session.userId;
      targetUserEmail = session.email;
      targetFullName = session.fullName;
      targetRole = session.role;
    }

    if (!targetUserId) {
      return NextResponse.json(
        { success: false, error: 'Failed to verify administrative identity.' },
        { status: 400 }
      );
    }

    // 2. Update user password in Supabase Auth securely
    const { error: updateError } = await supabase.auth.admin.updateUserById(targetUserId, {
      password: newPassword,
    });

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to update password: ${updateError.message}`,
        },
        { status: 500 }
      );
    }

    // 3. Clear temporary credential flags and unlock admin profile
    await supabase.from('admin_profiles').update({
      must_change_password: false,
      temp_password_active: false,
      temp_password_expires_at: null,
      updated_at: new Date().toISOString(),
    }).eq('id', targetUserId);

    // Fetch confirmed profile details
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role')
      .eq('id', targetUserId)
      .single();

    if (profile) {
      targetRole = profile.role === 'content_editor' ? 'content_editor' : 'super_admin';
      targetFullName = profile.full_name || targetFullName;
      targetUserEmail = profile.email || targetUserEmail;
    }

    // 4. Record privacy-conscious audit event (Zero passwords or tokens stored)
    const ip = getTrustedClientIp(req);
    const csrfCheck = validateCsrfAndOrigin(req);
    if (!csrfCheck.valid) return NextResponse.json({ success: false, error: csrfCheck.error }, { status: 403 });
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const emailHash = crypto.createHash('sha256').update(targetUserEmail).digest('hex').substring(0, 16);

    await supabase.from('auth_audit_logs').insert({
      event_type: 'password_change',
      user_id: targetUserId,
      email_hash: emailHash,
      ip_hash: ipHash,
      status: 'success',
      details: 'Administrator established permanent credentials; temporary lock cleared',
    });

    // 5. Issue authenticated session token with mustChangePassword: false
    const adminUser: AdminUser = {
      id: targetUserId,
      email: targetUserEmail,
      fullName: targetFullName || 'Primeora Administrator',
      role: targetRole,
      mustChangePassword: false,
    };

    const sessionToken = signSession(adminUser, 28800);

    const response = NextResponse.json({
      success: true,
      message: 'Permanent password established successfully. Administrative session active.',
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
