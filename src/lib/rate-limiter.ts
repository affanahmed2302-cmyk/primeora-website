/**
 * PRIMEORA SOLUTIONS — DISTRIBUTED RATE LIMITER & SECURITY GUARD
 * Backed by Supabase durable storage (auth_audit_logs) for serverless atomic enforcement.
 * Enforces dual limits (per-IP and per-account email) across cold starts and multi-worker instances.
 */

import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';

export interface DurableRateLimitResult {
  allowed: boolean;
  remaining?: number;
  resetInSeconds?: number;
  limitType?: 'ip' | 'account';
  error?: string;
  status?: number;
}

/**
 * Extract trusted client IP strictly from platform-verified headers.
 * Netlify Edge strips caller-supplied 'x-nf-client-connection-ip' and sets it from the TCP socket.
 */
export function getTrustedClientIp(req: NextRequest): string {
  // 1. Netlify-verified client TCP connection IP (Tamper-proof on Netlify)
  const netlifyIp = req.headers.get('x-nf-client-connection-ip')?.trim();
  if (netlifyIp) return netlifyIp;

  // 2. Cloudflare-verified client IP
  const cfIp = req.headers.get('cf-connecting-ip')?.trim();
  if (cfIp) return cfIp;

  // 3. Fallback for local development and non-spoofed direct connections
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  // If X-Forwarded-For is present in dev, take the rightmost/proxy-closest IP (never the spoofable leftmost)
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      // In local dev without Netlify edge, rightmost is closest to server
      return parts[parts.length - 1];
    }
  }

  return '127.0.0.1';
}

/**
 * Hash identifier (IP or email) with secret salt to prevent plain-text exposure in audit logs.
 */
export function hashIdentifier(identifier: string): string {
  const salt = process.env.ADMIN_JWT_SECRET || 'primeora_salt_fallback_key';
  return crypto
    .createHash('sha256')
    .update(`${identifier.trim().toLowerCase()}:${salt}`)
    .digest('hex')
    .slice(0, 16);
}

/**
 * Check durable atomic rate limit for admin login attempts.
 * Max 5 failed attempts per rolling 15-minute window (900s) across all serverless instances.
 * Fails safely (503 Service Unavailable) if the shared persistence store is unreachable.
 */
export async function checkDurableLoginRateLimit(
  ip: string,
  email: string
): Promise<DurableRateLimitResult> {
  const windowSeconds = 900; // 15 minutes
  const maxFailedAttempts = 5;

  const supabase = getSupabaseAdminClient();
  if (!supabase || !isSupabaseConfigured()) {
    // Fail safely: never bypass security if backend is unconfigured in production
    if (process.env.NODE_ENV === 'production') {
      return {
        allowed: false,
        error: 'Authentication rate limiter service is currently unavailable. Please contact the administrator.',
        status: 503,
      };
    }
    // In local dev without Supabase credentials, allow graceful local testing
    return { allowed: true, remaining: maxFailedAttempts };
  }

  const ipHash = hashIdentifier(ip);
  const emailHash = hashIdentifier(email);
  const windowStartTime = new Date(Date.now() - windowSeconds * 1000).toISOString();

  try {
    // Query recent failed login attempts for this IP or this account email
    const { data, error } = await supabase
      .from('auth_audit_logs')
      .select('id, created_at, ip_hash, email_hash')
      .eq('event_type', 'login_failed')
      .gte('created_at', windowStartTime)
      .or(`ip_hash.eq.${ipHash},email_hash.eq.${emailHash}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[RateLimiter] Database query failure:', error.message);
      // Fail closed: return 503 instead of allowing unlimited brute force
      return {
        allowed: false,
        error: 'Authentication rate limiter service is currently unavailable. Please try again shortly.',
        status: 503,
      };
    }

    const records = data || [];
    const ipFailures = records.filter((r) => r.ip_hash === ipHash);
    const emailFailures = records.filter((r) => r.email_hash === emailHash);

    // 1. Check IP-based threshold
    if (ipFailures.length >= maxFailedAttempts) {
      const oldestTime = new Date(ipFailures[0].created_at).getTime();
      const resetInSeconds = Math.max(1, Math.ceil((oldestTime + windowSeconds * 1000 - Date.now()) / 1000));
      return {
        allowed: false,
        remaining: 0,
        resetInSeconds,
        limitType: 'ip',
        error: `Too many failed login attempts from this network. Please wait ${Math.ceil(
          resetInSeconds / 60
        )} minutes before trying again.`,
        status: 429,
      };
    }

    // 2. Check Targeted-Account threshold (prevents distributed password spraying against a single account)
    if (emailFailures.length >= maxFailedAttempts) {
      const oldestTime = new Date(emailFailures[0].created_at).getTime();
      const resetInSeconds = Math.max(1, Math.ceil((oldestTime + windowSeconds * 1000 - Date.now()) / 1000));
      return {
        allowed: false,
        remaining: 0,
        resetInSeconds,
        limitType: 'account',
        error: `Too many failed login attempts for this administrative account. Please wait ${Math.ceil(
          resetInSeconds / 60
        )} minutes before trying again.`,
        status: 429,
      };
    }

    const maxUsed = Math.max(ipFailures.length, emailFailures.length);
    return {
      allowed: true,
      remaining: Math.max(0, maxFailedAttempts - maxUsed),
      resetInSeconds: windowSeconds,
    };
  } catch (err: any) {
    console.error('[RateLimiter] Unexpected error during check:', err);
    return {
      allowed: false,
      error: 'Authentication rate limiter service encountered an unexpected error.',
      status: 503,
    };
  }
}

/**
 * Record a failed login attempt in shared durable storage.
 */
export async function recordDurableFailedLogin(
  ip: string,
  email: string,
  details: string = 'Invalid administrative credentials'
): Promise<void> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  const ipHash = hashIdentifier(ip);
  const emailHash = hashIdentifier(email);

  try {
    await supabase.from('auth_audit_logs').insert({
      event_type: 'login_failed',
      ip_hash: ipHash,
      email_hash: emailHash,
      status: 'failed',
      details,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[RateLimiter] Failed to record login_failed audit log:', err);
  }
}

/**
 * Record a successful login event in durable audit storage.
 */
export async function recordDurableSuccessfulLogin(
  ip: string,
  email: string,
  userId?: string
): Promise<void> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  const ipHash = hashIdentifier(ip);
  const emailHash = hashIdentifier(email);

  try {
    await supabase.from('auth_audit_logs').insert({
      event_type: 'login_success',
      user_id: userId || null,
      ip_hash: ipHash,
      email_hash: emailHash,
      status: 'success',
      details: 'Administrative authentication successful',
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[RateLimiter] Failed to record login_success audit log:', err);
  }
}

/**
 * Mask an email address for privacy-conscious display (e.g. `d***@gmail.com`)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***@***.***';
  const [local, domain] = email.split('@');
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  const first = local[0];
  const last = local[local.length - 1];
  return `${first}***${last}@${domain}`;
}

/**
 * In-memory sliding-window fallback helper for ephemeral single-process utilities (e.g. public contact forms)
 */
interface RateLimitRecord {
  timestamps: number[];
  lockedUntil?: number;
  failedAttempts: number;
}
const memoryStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
  isLocked?: boolean;
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [], failedAttempts: 0 };
    memoryStore.set(key, record);
  }

  if (record.lockedUntil && record.lockedUntil > now) {
    const resetInSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
      isLocked: true,
    };
  }

  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const resetInSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.max(1, resetInSeconds),
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetInSeconds: windowSeconds,
  };
}

export function recordFailedAttempt(
  key: string,
  maxFailedAttempts: number = 5,
  lockoutSeconds: number = 900
): { locked: boolean; remainingAttempts: number; resetInSeconds: number } {
  const now = Date.now();
  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [], failedAttempts: 0 };
    memoryStore.set(key, record);
  }

  record.failedAttempts += 1;

  if (record.failedAttempts >= maxFailedAttempts) {
    record.lockedUntil = now + lockoutSeconds * 1000;
    return {
      locked: true,
      remainingAttempts: 0,
      resetInSeconds: lockoutSeconds,
    };
  }

  return {
    locked: false,
    remainingAttempts: maxFailedAttempts - record.failedAttempts,
    resetInSeconds: lockoutSeconds,
  };
}

export function clearRateLimit(key: string): void {
  memoryStore.delete(key);
}
