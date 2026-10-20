import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('admin_session')?.value;
  const session = verifySession(sessionCookie);

  if (!session) {
    const res = NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res;
  }

  const res = NextResponse.json({
    authenticated: true,
    user: {
      id: session.userId,
      email: session.email,
      fullName: session.fullName,
      role: session.role,
    },
  });

  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return res;
}
