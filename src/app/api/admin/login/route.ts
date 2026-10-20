import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminLogin } from '@/lib/cms-store';
import { signSession } from '@/lib/auth';

// Rate limiting storage: IP -> { attempts: number, resetTime: number }
const loginAttempts = new Map<string, { attempts: number; resetTime: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Check rate limit: max 5 attempts per 15 minutes
    const record = loginAttempts.get(ip);
    if (record) {
      if (now < record.resetTime && record.attempts >= 5) {
        return NextResponse.json(
          { success: false, error: 'Too many failed login attempts. Please wait 15 minutes before trying again.' },
          { status: 429 }
        );
      }
      if (now >= record.resetTime) {
        loginAttempts.set(ip, { attempts: 0, resetTime: now + 15 * 60 * 1000 });
      }
    } else {
      loginAttempts.set(ip, { attempts: 0, resetTime: now + 15 * 60 * 1000 });
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid email and password are required.' },
        { status: 400 }
      );
    }

    const admin = verifyAdminLogin(email.trim(), password);

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

    // Issue signed session token (valid 24h)
    const token = signSession(admin, 86400);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: admin,
    });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: req.nextUrl.protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
