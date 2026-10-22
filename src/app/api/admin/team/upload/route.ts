import { NextRequest, NextResponse } from 'next/server';
import { verifySession, requiresPasswordChange, requiresMfaVerification } from '@/lib/auth';
import { validateCsrfAndOrigin } from '@/lib/request-guard';
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

/**
 * Validates the file buffer against official magic byte signatures
 */
function isValidImageSignature(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (mimeType === 'image/jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mimeType === 'image/png') {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }

  // WebP: RIFF (bytes 0-3) + WEBP (bytes 8-11)
  if (mimeType === 'image/webp') {
    const isRiff =
      buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;
    const isWebp =
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;
    return isRiff && isWebp;
  }

  return false;
}

export async function POST(req: NextRequest) {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Valid administrative session required.' },
      { status: 401 }
    );
  }

  if (requiresMfaVerification(session)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Multi-Factor Authentication (AAL2) required.' },
      { status: 403 }
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

  const csrfCheck = validateCsrfAndOrigin(req);
  if (!csrfCheck.valid) {
    return NextResponse.json(
      { success: false, error: csrfCheck.error || 'CSRF validation failed.' },
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

    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Inspect magic bytes (defense-in-depth against polyglot and MIME spoofing)
    if (!isValidImageSignature(buffer, file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Security verification failed: File content does not match genuine image signature.',
        },
        { status: 400 }
      );
    }

    // 4. Generate sanitized unique filename (strictly alphanumeric + timestamp, no path traversal)
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const timestamp = Date.now();
    const randomHex = Math.random().toString(36).substring(2, 8);
    const filename = `portrait_${timestamp}_${randomHex}.${ext}`;

    // 5. Upload to Supabase Storage if configured
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const { error } = await supabase.storage
          .from('team-photos')
          .upload(filename, buffer, {
            contentType: file.type,
            cacheControl: '31536000, immutable',
            upsert: false,
          });

        if (error) {
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

    // 6. Fallback for offline/local development if permitted
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
