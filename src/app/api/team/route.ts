import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/cms-store';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('admin_session')?.value;
    const session = verifySession(sessionCookie);

    // If verified admin, include draft and inactive items as well
    const includeAll = Boolean(session);
    const members = await getTeamMembers(includeAll);

    const response = NextResponse.json({
      success: true,
      members,
      isAdminView: includeAll,
    });

    // Public visitors can cache for 60 seconds; admin view must never be cached
    if (includeAll) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    } else {
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}
