/**
 * In-Memory Sliding-Window Rate Limiter & Security Guard
 * Provides IP and identifier rate-limiting for sensitive authentication and recovery endpoints.
 */

interface RateLimitRecord {
  timestamps: number[];
  lockedUntil?: number;
  failedAttempts: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

// Periodic cleanup every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      // Retain if locked or if timestamps are within the last hour
      const isLocked = record.lockedUntil && record.lockedUntil > now;
      const recentTimestamps = record.timestamps.filter((t) => now - t < 3600_000);
      if (!isLocked && recentTimestamps.length === 0 && record.failedAttempts === 0) {
        memoryStore.delete(key);
      } else {
        record.timestamps = recentTimestamps;
      }
    }
  }, 600_000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
  isLocked?: boolean;
}

/**
 * Check if an action is allowed under the rate limit.
 * @param key Unique identifier (e.g. `recovery:${ip}` or `verify:${email}`)
 * @param maxRequests Maximum allowed requests in the time window
 * @param windowSeconds Duration of the rolling window in seconds
 */
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

  // Check if currently hard-locked
  if (record.lockedUntil && record.lockedUntil > now) {
    const resetInSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
      isLocked: true,
    };
  }

  // Filter timestamps within current window
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

  // Record this attempt
  record.timestamps.push(now);
  const remaining = maxRequests - record.timestamps.length;
  const resetInSeconds = windowSeconds;

  return {
    allowed: true,
    remaining,
    resetInSeconds,
  };
}

/**
 * Record a failed verification attempt and enforce lockout if threshold is exceeded.
 * @param key Verification identifier
 * @param maxFailedAttempts Threshold before lockout (e.g. 5)
 * @param lockoutSeconds Duration of lockout in seconds (e.g. 900 for 15 minutes)
 */
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

/**
 * Reset failed attempts after successful verification
 */
export function clearRateLimit(key: string): void {
  memoryStore.delete(key);
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
