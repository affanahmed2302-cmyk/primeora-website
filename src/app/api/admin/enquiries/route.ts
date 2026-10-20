import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiryStatus } from '@/lib/cms-store';
import { verifySession } from '@/lib/auth';

function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

export async function GET(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = getEnquiries();
  return NextResponse.json({ success: true, enquiries });
}

export async function PATCH(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and status are required' }, { status: 400 });
    }

    const updated = updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
  }
}
