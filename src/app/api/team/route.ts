import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/cms-store';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('admin_session')?.value;
    const session = verifySession(sessionCookie);

    // If verified admin, include draft and inactive items as well
    const includeAll = Boolean(session);
    const members = getTeamMembers(includeAll);

    return NextResponse.json({
      success: true,
      members,
      isAdminView: includeAll,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}
