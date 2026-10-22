import { NextRequest, NextResponse } from 'next/server';

// Configuration: Public admin routes that do not require an active session
const PUBLIC_ADMIN_PAGES = new Set([
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
  '/admin/update-password',
]);

const PUBLIC_ADMIN_APIS = new Set([
  '/api/admin/login',
  '/api/admin/logout',
  '/api/admin/forgot-password',
  '/api/admin/verify-otp',
  '/api/admin/reset-password',
  '/api/admin/update-password',
]);

// Maximum permitted payload sizes
const MAX_GENERAL_PAYLOAD_BYTES = 64 * 1024; // 64KB
const MAX_UPLOAD_PAYLOAD_BYTES = 5 * 1024 * 1024; // 5MB for team portrait uploads

const CSP_DIRECTIVES =
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://images.unsplash.com https://dvhxcukgxgoptzprolfe.supabase.co https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://dvhxcukgxgoptzprolfe.supabase.co https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'; ";

/**
 * Standard Web Crypto base64url decoding to Uint8Array
 */
function base64UrlToUint8Array(base64Url: string): Uint8Array {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  const binary = atob(base64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Edge-compatible HMAC-SHA256 session verification using Web Crypto API
 */
async function verifySessionTokenEdge(
  token: string | null | undefined,
  secretKey: string
): Promise<{ valid: boolean; role?: string; userId?: string }> {
  if (!token || typeof token !== 'string') return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payloadStr, sigStr] = parts;

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secretKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = base64UrlToUint8Array(sigStr);
    const isSigValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as BufferSource,
      enc.encode(payloadStr) as unknown as BufferSource
    );

    if (!isSigValid) return { valid: false };

    // Decode and validate payload JSON
    const payloadJson = atob(payloadStr.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    // Check expiration
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }

    if (!payload.userId || !['super_admin', 'content_editor'].includes(payload.role)) {
      return { valid: false };
    }

    return {
      valid: true,
      role: payload.role,
      userId: payload.userId,
    };
  } catch {
    return { valid: false };
  }
}

/**
 * Validate request origin for CSRF mitigation on state-changing requests
 */
function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const secFetchSite = req.headers.get('sec-fetch-site');

  // If Sec-Fetch-Site indicates explicit cross-site request, block
  if (secFetchSite === 'cross-site') {
    return false;
  }

  const targetHost = req.nextUrl.host.toLowerCase();

  const verifyHost = (urlStr: string | null): boolean => {
    if (!urlStr) return true; // Direct/same-site fallback if header stripped by client
    try {
      const parsed = new URL(urlStr);
      const host = parsed.host.toLowerCase();
      // Allow current request host
      if (host === targetHost) return true;
      // Allow official production and development hosts
      if (host === 'primeora-solutions.netlify.app') return true;
      if (host.startsWith('localhost:') || host.startsWith('127.0.0.1:')) return true;
      return false;
    } catch {
      return false;
    }
  };

  if (origin && !verifyHost(origin)) return false;
  if (referer && !verifyHost(referer)) return false;

  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith('/api/');
  const isAdminApiRoute = pathname.startsWith('/api/admin/');
  const isAdminPageRoute = pathname.startsWith('/admin');

  // 1. Request Body Size Guard (Defense against memory exhaustion and payload flooding)
  const contentLength = req.headers.get('content-length');
  if (contentLength && isApiRoute) {
    const bytes = parseInt(contentLength, 10);
    const maxBytes = pathname === '/api/admin/team/upload' ? MAX_UPLOAD_PAYLOAD_BYTES : MAX_GENERAL_PAYLOAD_BYTES;
    if (bytes > maxBytes) {
      return NextResponse.json(
        {
          success: false,
          error: `Payload too large. Request body exceeds maximum allowed size of ${Math.round(
            maxBytes / 1024
          )}KB.`,
        },
        { status: 413 }
      );
    }
  }

  // 2. CSRF / Origin Guard on State-Changing API Requests
  if (isAdminApiRoute && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Untrusted cross-origin request rejected.' },
        { status: 403 }
      );
    }
  }

  // 3. Administrative Authentication Guard
  if (isAdminPageRoute || isAdminApiRoute) {
    const isPublicPage = PUBLIC_ADMIN_PAGES.has(pathname);
    const isPublicApi = PUBLIC_ADMIN_APIS.has(pathname);

    if (!isPublicPage && !isPublicApi) {
      const sessionCookie = req.cookies.get('admin_session')?.value;
      const secretKey = process.env.ADMIN_JWT_SECRET || '';

      const session = await verifySessionTokenEdge(sessionCookie, secretKey);

      if (!session.valid) {
        if (isAdminApiRoute) {
          const apiRes = NextResponse.json(
            { success: false, error: 'Unauthorized: Valid administrative session required.' },
            { status: 401 }
          );
          apiRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          apiRes.headers.set('X-Robots-Tag', 'noindex, nofollow');
          apiRes.headers.set('X-Frame-Options', 'DENY');
          apiRes.headers.set('X-Content-Type-Options', 'nosniff');
          return apiRes;
        }

        // For privileged admin pages, perform server-side redirect before sending page bundle
        const loginUrl = new URL('/admin/login', req.url);
        loginUrl.searchParams.set('redirect', pathname);
        const redirectRes = NextResponse.redirect(loginUrl, 307);
        redirectRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        redirectRes.headers.set('X-Robots-Tag', 'noindex, nofollow');
        redirectRes.headers.set('X-Frame-Options', 'DENY');
        redirectRes.headers.set('X-Content-Type-Options', 'nosniff');
        return redirectRes;
      }
    }
  }

  // 4. Continue with security headers applied to all matched routes
  const response = NextResponse.next();

  // Core Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Content-Security-Policy', CSP_DIRECTIVES);

  // Admin and API caching and crawler guards
  if (isAdminPageRoute || isAdminApiRoute) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    );
    response.headers.set('Pragma', 'no-cache');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|icon-192.png|icon-512.png|sitemap.xml|robots.txt).*)',
  ],
};
