import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiry } from '@/lib/cms-store';
import { verifySession, isSuperAdmin } from '@/lib/auth';

function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

// GET customer enquiries with search, filtering, and pagination support (STRICT SUPER_ADMIN ONLY)
export async function GET(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Administrative authentication required.' }, { status: 401 });
  }

  // Content editors are forbidden from viewing private client enquiries
  if (!isSuperAdmin(session)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Super administrator privileges required to view client enquiries.' },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  const statusFilter = searchParams.get('status')?.trim() || '';

  let enquiries = await getEnquiries();

  // Search filter
  if (query) {
    enquiries = enquiries.filter(
      (e) =>
        e.fullName.toLowerCase().includes(query) ||
        e.businessName.toLowerCase().includes(query) ||
        e.contactEmail.toLowerCase().includes(query) ||
        e.problemSummary.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter && statusFilter !== 'all') {
    enquiries = enquiries.filter((e) => e.status === statusFilter);
  }

  const newCount = enquiries.filter((e) => e.status === 'new').length;

  const res = NextResponse.json({
    success: true,
    total: enquiries.length,
    newCount,
    enquiries,
  });
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res;
}

// PATCH update enquiry status and internal notes (STRICT SUPER_ADMIN ONLY)
export async function PATCH(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Administrative authentication required.' }, { status: 401 });
  }

  if (!isSuperAdmin(session)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Super administrator privileges required to triage client enquiries.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { id, status, internalNotes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Enquiry ID is required.' }, { status: 400 });
    }

    const updated = await updateEnquiry(id, {
      status,
      internalNotes,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry record not found or update failed.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry updated successfully.',
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update enquiry record.' }, { status: 500 });
  }
}
