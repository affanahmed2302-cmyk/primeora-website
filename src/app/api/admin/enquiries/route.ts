import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiryStatus } from '@/lib/cms-store';
import { verifySession, isSuperAdmin } from '@/lib/auth';

function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

// GET all customer enquiries (STRICT SUPER_ADMIN ONLY)
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

  const enquiries = await getEnquiries();
  const res = NextResponse.json({ success: true, enquiries });
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res;
}

// PATCH update enquiry status (STRICT SUPER_ADMIN ONLY)
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
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Enquiry ID and target status are required.' }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry record not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Enquiry status updated successfully.' });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update enquiry status.' }, { status: 500 });
  }
}
