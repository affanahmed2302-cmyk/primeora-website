/**
 * PRIMEORA SOLUTIONS — REQUEST GUARD & PAYLOAD INTEGRITY
 * Enforces true stream-level byte bounds (independent of client-declared Content-Length)
 * and strict CSRF & Origin verification on administrative mutation endpoints.
 */

import { NextRequest } from 'next/server';

export interface BoundedReadResult<T = any> {
  data?: T;
  error?: string;
  status?: number;
}

/**
 * Reads and parses request body with strict byte-level stream accounting.
 * Protects against memory exhaustion DoS, chunked payload bombs, and lying Content-Length headers.
 */
export async function readBoundedJson<T = any>(
  req: NextRequest,
  maxBytes: number = 64 * 1024 // 64KB default
): Promise<BoundedReadResult<T>> {
  // 1. First-pass verification: declared Content-Length header
  const declaredHeader = req.headers.get('content-length');
  if (declaredHeader) {
    const declaredBytes = parseInt(declaredHeader, 10);
    if (!isNaN(declaredBytes) && declaredBytes > maxBytes) {
      return {
        error: `Payload too large. Request body exceeds maximum allowed size of ${Math.round(
          maxBytes / 1024
        )}KB.`,
        status: 413,
      };
    }
  }

  // 2. Stream consumption with real-time byte threshold enforcement
  if (!req.body) {
    return { data: {} as T };
  }

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value) {
        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
          // Immediately cancel the reader to prevent memory exhaustion and socket starvation
          try {
            await reader.cancel('Exceeded maximum allowed stream size');
          } catch {
            // Reader cancel might fail if stream already closing
          }
          return {
            error: `Payload too large. Streamed body exceeds maximum allowed size of ${Math.round(
              maxBytes / 1024
            )}KB.`,
            status: 413,
          };
        }
        chunks.push(value);
      }
    }
  } catch (err: any) {
    return {
      error: 'Failed to read request body stream.',
      status: 400,
    };
  }

  if (totalBytes === 0) {
    return { data: {} as T };
  }

  // 3. Assemble complete byte buffer and decode JSON
  try {
    const combined = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const decodedText = new TextDecoder('utf-8').decode(combined);
    const parsed = JSON.parse(decodedText) as T;
    return { data: parsed };
  } catch {
    return {
      error: 'Malformed or invalid JSON payload.',
      status: 400,
    };
  }
}

/**
 * Validates request origin, referer, and explicit anti-CSRF tokens for state-changing operations.
 */
export function validateCsrfAndOrigin(req: NextRequest): { valid: boolean; error?: string } {
  const method = req.method.toUpperCase();
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

  if (!isStateChanging) {
    return { valid: true };
  }

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const secFetchSite = req.headers.get('sec-fetch-site');
  const csrfHeader = req.headers.get('x-primeora-csrf');

  // Explicit browser-reported cross-site request is always forbidden
  if (secFetchSite === 'cross-site') {
    return { valid: false, error: 'Forbidden: Untrusted cross-site request rejected.' };
  }

  // If both Origin and Referer are absent on a state-changing mutation, reject
  if (!origin && !referer) {
    // Exception: If explicit anti-CSRF custom header is present, custom clients are verified
    if (csrfHeader !== '1') {
      return {
        valid: false,
        error: 'Forbidden: Missing Origin and Referer headers on state-changing request.',
      };
    }
  }

  const targetHost = req.nextUrl.host.toLowerCase();

  const isHostAllowed = (urlStr: string | null): boolean => {
    if (!urlStr) return false;
    try {
      const parsed = new URL(urlStr);
      const host = parsed.host.toLowerCase();
      if (host === targetHost) return true;
      if (host === 'primeora-solutions.netlify.app') return true;
      if (host.startsWith('localhost:') || host === 'localhost') return true;
      if (host.startsWith('127.0.0.1:') || host === '127.0.0.1') return true;
      return false;
    } catch {
      return false;
    }
  };

  if (origin && !isHostAllowed(origin)) {
    return { valid: false, error: 'Forbidden: Untrusted origin header.' };
  }

  if (referer && !isHostAllowed(referer)) {
    return { valid: false, error: 'Forbidden: Untrusted referer header.' };
  }

  return { valid: true };
}
