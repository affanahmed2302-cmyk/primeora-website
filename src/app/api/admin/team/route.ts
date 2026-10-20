import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers, saveTeamMember, deleteTeamMember } from '@/lib/cms-store';
import { verifySession } from '@/lib/auth';
import { TeamMember } from '@/types';

// Helper: Require authenticated admin session
function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

// GET all team members for admin (includes draft and inactive)
export async function GET(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const members = getTeamMembers(true);
  return NextResponse.json({ success: true, members });
}

// POST: Create a new team member
export async function POST(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      fullName,
      publicTitle,
      department,
      bio,
      responsibilities,
      photoUrl,
      linkedinUrl,
      portfolioUrl,
      displayOrder,
      status,
      isFounder,
    } = body;

    if (!fullName || !publicTitle || !bio) {
      return NextResponse.json(
        { success: false, error: 'Full name, public title, and bio are required.' },
        { status: 400 }
      );
    }

    const newId = `team_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newMember: TeamMember = {
      id: newId,
      fullName: String(fullName).trim(),
      publicTitle: String(publicTitle).trim(),
      department: String(department || 'General').trim(),
      bio: String(bio).trim(),
      responsibilities: Array.isArray(responsibilities) ? responsibilities.map(String) : [],
      photoUrl: photoUrl ? String(photoUrl).trim() : undefined,
      linkedinUrl: linkedinUrl ? String(linkedinUrl).trim() : undefined,
      portfolioUrl: portfolioUrl ? String(portfolioUrl).trim() : undefined,
      displayOrder: Number(displayOrder) || 10,
      status: ['published', 'draft', 'inactive'].includes(status) ? status : 'draft',
      isFounder: Boolean(isFounder),
    };

    const saved = saveTeamMember(newMember);
    return NextResponse.json({ success: true, member: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 });
  }
}

// PUT: Update an existing team member
export async function PUT(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required.' }, { status: 400 });
    }

    const members = getTeamMembers(true);
    const existing = members.find((m) => m.id === id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Team member not found.' }, { status: 404 });
    }

    const updated: TeamMember = {
      ...existing,
      ...updates,
      id, // Preserve immutable ID
    };

    const saved = saveTeamMember(updated);
    return NextResponse.json({ success: true, member: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE: Delete a team member (SUPER_ADMIN ONLY)
export async function DELETE(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  // Strict role check: Only super_admin can delete
  if (session.role !== 'super_admin') {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Only super administrators can permanently delete records.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400 });
    }

    const deleted = deleteTeamMember(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Member not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to delete member' }, { status: 500 });
  }
}
