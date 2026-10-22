import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers, saveTeamMember, deleteTeamMember } from '@/lib/cms-store';
import { verifySession, isSuperAdmin, requiresPasswordChange } from '@/lib/auth';
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
    return NextResponse.json({ success: false, error: 'Unauthorized: Valid administrative session required.' }, { status: 401 });
  }

  if (requiresPasswordChange(session)) {
    return NextResponse.json(
      { success: false, error: 'Password change required before accessing administrative operations.', mustChangePassword: true },
      { status: 403 }
    );
  }

  try {
    const members = await getTeamMembers(true);
    const res = NextResponse.json({ success: true, members });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res;
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to retrieve team members.' }, { status: 500 });
  }
}

// POST: Create a new team member
export async function POST(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Valid administrative session required.' }, { status: 401 });
  }

  if (requiresPasswordChange(session)) {
    return NextResponse.json(
      { success: false, error: 'Password change required before accessing administrative operations.', mustChangePassword: true },
      { status: 403 }
    );
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
        { success: false, error: 'Full name, public title, and biography are required.' },
        { status: 400 }
      );
    }

    const newId = `team_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newMember: TeamMember = {
      id: newId,
      fullName: String(fullName).trim(),
      publicTitle: String(publicTitle).trim(),
      department: String(department || 'Consulting Practice').trim(),
      bio: String(bio).trim(),
      responsibilities: Array.isArray(responsibilities) ? responsibilities.map(String) : [],
      photoUrl: photoUrl ? String(photoUrl).trim() : undefined,
      linkedinUrl: linkedinUrl ? String(linkedinUrl).trim() : undefined,
      portfolioUrl: portfolioUrl ? String(portfolioUrl).trim() : undefined,
      displayOrder: Number(displayOrder) || 10,
      status: ['published', 'draft', 'inactive'].includes(status) ? status : 'draft',
      isFounder: Boolean(isFounder),
    };

    const saved = await saveTeamMember(newMember);
    return NextResponse.json({ success: true, member: saved });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create team member.';
    const status = message.includes('DURABLE_STORAGE_UNCONFIGURED') ? 503 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}

// PUT: Update an existing team member
export async function PUT(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Valid administrative session required.' }, { status: 401 });
  }

  if (requiresPasswordChange(session)) {
    return NextResponse.json(
      { success: false, error: 'Password change required before accessing administrative operations.', mustChangePassword: true },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid member ID is required.' }, { status: 400 });
    }

    const members = await getTeamMembers(true);
    const existing = members.find((m) => m.id === id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Team member not found.' }, { status: 404 });
    }

    // Mass assignment prevention: strictly pick allowed editable fields
    const updated: TeamMember = {
      ...existing,
      id, // Preserve immutable ID
      fullName: typeof body.fullName === 'string' ? body.fullName.trim() : existing.fullName,
      publicTitle: typeof body.publicTitle === 'string' ? body.publicTitle.trim() : existing.publicTitle,
      department: typeof body.department === 'string' ? body.department.trim() : existing.department,
      bio: typeof body.bio === 'string' ? body.bio.trim() : existing.bio,
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities.map(String) : existing.responsibilities,
      photoUrl: typeof body.photoUrl === 'string' ? body.photoUrl.trim() : existing.photoUrl,
      linkedinUrl: typeof body.linkedinUrl === 'string' ? body.linkedinUrl.trim() : existing.linkedinUrl,
      portfolioUrl: typeof body.portfolioUrl === 'string' ? body.portfolioUrl.trim() : existing.portfolioUrl,
      displayOrder: typeof body.displayOrder === 'number' ? body.displayOrder : existing.displayOrder,
      status: ['published', 'draft', 'inactive'].includes(body.status) ? body.status : existing.status,
      isFounder: typeof body.isFounder === 'boolean' ? body.isFounder : existing.isFounder,
    };

    const saved = await saveTeamMember(updated);
    return NextResponse.json({ success: true, member: saved });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update team member.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE: Delete a team member (STRICT SUPER_ADMIN ONLY)
export async function DELETE(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Valid administrative session required.' }, { status: 401 });
  }

  if (requiresPasswordChange(session)) {
    return NextResponse.json(
      { success: false, error: 'Password change required before accessing administrative operations.', mustChangePassword: true },
      { status: 403 }
    );
  }

  // Strict role check: Only super_admin can permanently delete records
  if (!isSuperAdmin(session)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Only super administrators can permanently delete records.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required.' }, { status: 400 });
    }

    const deleted = await deleteTeamMember(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Member not found or already deleted.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Member deleted successfully.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete member.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
