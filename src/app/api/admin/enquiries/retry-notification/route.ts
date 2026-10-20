import { NextRequest, NextResponse } from 'next/server';
import { retryEnquiryNotification } from '@/lib/notifications';
import { verifySession, isSuperAdmin } from '@/lib/auth';

function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

export async function POST(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  if (!isSuperAdmin(session)) {
    return NextResponse.json({ success: false, error: 'Forbidden.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Enquiry ID is required.' }, { status: 400 });
    }

    const result = await retryEnquiryNotification(id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to trigger notification retry.' }, { status: 500 });
  }
}
