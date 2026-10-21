import { NextRequest, NextResponse } from 'next/server';
import { verifySession, requiresPasswordChange } from '@/lib/auth';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import path from 'path';
import fs from 'fs';

// Maximum upload size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// Permitted MIME types
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function getAuthenticatedAdmin(req: NextRequest) {
  const cookie = req.cookies.get('admin_session')?.value;
  return verifySession(cookie);
}

export async function POST(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Valid administrative session required.' },
      { status: 401 }
    );
  }

  if (requiresPasswordChange(session)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Password change required before performing administrative media uploads.',
        mustChangePassword: true,
      },
      { status: 403 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided in request.' },
        { status: 400 }
      );
    }

    // 1. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file format: ${file.type}. Allowed formats are JPEG, PNG, and WebP.`,
        },
        { status: 400 }
      );
    }

    // 2. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB).`,
        },
        { status: 400 }
      );
    }

    // 3. Generate sanitized unique filename
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const timestamp = Date.now();
    const randomHex = Math.random().toString(36).substring(2, 8);
    const filename = `portrait_${timestamp}_${randomHex}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    // 4. Upload to Supabase Storage if configured
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const { data, error } = await supabase.storage
          .from('team-photos')
          .upload(filename, buffer, {
            contentType: file.type,
            cacheControl: '31536000, immutable',
            upsert: false,
          });

        if (error) {
          // If error is bucket not found, try to create it or report
          return NextResponse.json(
            { success: false, error: `Supabase Storage error: ${error.message}` },
            { status: 502 }
          );
        }

        const { data: urlData } = supabase.storage
          .from('team-photos')
          .getPublicUrl(filename);

        return NextResponse.json({
          success: true,
          url: urlData.publicUrl,
          filename,
          size: file.size,
          contentType: file.type,
        });
      }
    }

    // 5. Fallback for offline/local development if permitted
    const uploadDir = path.join(process.cwd(), 'public', 'team', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const localFilePath = path.join(uploadDir, filename);
    fs.writeFileSync(localFilePath, buffer);

    const localUrl = `/team/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: localUrl,
      filename,
      size: file.size,
      contentType: file.type,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to process file upload.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
