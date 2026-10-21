import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminLogin, isAuthConfigured } from '@/lib/cms-store';
import { signSession } from '@/lib/auth';

// Rate limiting storage: IP -> { attempts: number, resetTime: number }
const loginAttempts = new Map<string, { attempts: number; resetTime: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const now = Date.now();

    // 1. Check rate limit: max 5 failed attempts per 15 minutes
    const record = loginAttempts.get(ip);
    if (record) {
      if (now < record.resetTime && record.attempts >= 5) {
        return NextResponse.json(
          {
            success: false,
            error: 'Too many failed login attempts. Please wait 15 minutes before trying again.',
          },
          { status: 429 }
        );
      }
      if (now >= record.resetTime) {
        loginAttempts.set(ip, { attempts: 0, resetTime: now + 15 * 60 * 1000 });
      }
    } else {
      loginAttempts.set(ip, { attempts: 0, resetTime: now + 15 * 60 * 1000 });
    }

    // 2. Check if authentication backend is configured
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

    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid email and password are required.' },
        { status: 400 }
      );
    }

    // 3. Verify administrative credentials
    const admin = await verifyAdminLogin(email.trim(), password);

    if (!admin) {
      const current = loginAttempts.get(ip)!;
      current.attempts += 1;
      return NextResponse.json(
        { success: false, error: 'Invalid administrative credentials.' },
        { status: 401 }
      );
    }

    // Reset attempt counter on success
    loginAttempts.delete(ip);

    // 4. Issue signed session token (valid 8h)
    const token = signSession(admin, 28800);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    });

    const isSecure = process.env.NODE_ENV === 'production' || req.nextUrl.protocol === 'https:';

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
