import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import { signSession } from '@/lib/auth';
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

    const body = await req.json().catch(() => ({}));
    const { accessToken, newPassword } = body;

    if (!accessToken || typeof accessToken !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid authentication session token is required.' },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 10 characters long and contain varied characters.',
        },
        { status: 400 }
      );
    }

    // 1. Verify user identity using the recovery/access token
    const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
    if (userError || !userData?.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Your password reset session has expired or is invalid. Please request a new setup link.',
        },
        { status: 401 }
      );
    }

    const user = userData.user;

    // 2. Update user password in Supabase Auth securely
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
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

    // 3. Verify admin profile & assign role session
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role')
      .eq('id', user.id)
      .single();

    const role = profile?.role === 'content_editor' ? 'content_editor' : 'super_admin';
    const fullName = profile?.full_name || user.user_metadata?.full_name || 'Primeora Administrator';

    const adminUser: AdminUser = {
      id: user.id,
      email: user.email || profile?.email || '',
      fullName,
      role,
    };

    // 4. Issue authenticated session token
    const sessionToken = signSession(adminUser, 28800);

    const response = NextResponse.json({
      success: true,
      message: 'Password successfully updated. Starting your administrative session...',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        fullName: adminUser.fullName,
        role: adminUser.role,
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
