import crypto from 'crypto';
import { AdminUser } from '@/types';

// Runtime secret management:
// In production, ADMIN_JWT_SECRET is mandatory and cannot fall back.
// In non-production, an ephemeral 256-bit cryptographically random key is generated per process startup.
// This guarantees that legacy sessions signed with old compromised secrets are permanently invalidated.
const devEphemeralSecret = crypto.randomBytes(32).toString('hex');

function getSecretKey(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (secret && secret.trim().length >= 32) {
    return secret.trim();
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'FATAL: ADMIN_JWT_SECRET must be configured with a 32+ character high-entropy key in production.'
    );
  }

  // Development ephemeral key (auto-generated, memory-only, unpredictable)
  return devEphemeralSecret;
}

export interface AdminSession {
  userId: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'content_editor';
  mustChangePassword?: boolean;
  aal?: 'aal1' | 'aal2';
  mfaPending?: boolean;
  exp: number;
}

// Generate HMAC-SHA256 Signed Session Token
export function signSession(
  user: AdminUser,
  expiresInSeconds = 28800,
  aal: 'aal1' | 'aal2' = 'aal2',
  mfaPending: boolean = false
): string {
  const secretKey = getSecretKey();
  const payload: AdminSession = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    mustChangePassword: Boolean(user.mustChangePassword),
    aal,
    mfaPending,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
}

// Verify Session Token with Timing-Safe Comparison
export function verifySession(token: string | null | undefined): AdminSession | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;

  let secretKey: string;
  try {
    secretKey = getSecretKey();
  } catch {
    // If secret key throws (e.g. production unconfigured), fail closed
    return null;
  }

  const expectedSig = crypto
    .createHmac('sha256', secretKey)
    .update(payloadStr)
    .digest('base64url');

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedSigBuffer = Buffer.from(expectedSig);

  if (
    sigBuffer.length !== expectedSigBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)
  ) {
    return null; // Tampered or invalid signature
  }

  try {
    const payload: AdminSession = JSON.parse(
      Buffer.from(payloadStr, 'base64url').toString('utf8')
    );

    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    if (!payload.userId || !payload.email || !['super_admin', 'content_editor'].includes(payload.role)) {
      return null; // Malformed payload
    }

    return payload;
  } catch {
    return null;
  }
}

// Check role permissions
export function isSuperAdmin(session: AdminSession | null | undefined): boolean {
  return session !== null && session !== undefined && session.role === 'super_admin';
}

export function isContentEditorOrSuperAdmin(session: AdminSession | null | undefined): boolean {
  return (
    session !== null &&
    session !== undefined &&
    (session.role === 'super_admin' || session.role === 'content_editor')
  );
}

// Check if session requires MFA verification (AAL2 assurance level)
export function requiresMfaVerification(session: AdminSession | null | undefined): boolean {
  if (!session) return false;
  return Boolean(session.mfaPending || session.aal === 'aal1');
}

// Check if user is locked to forced password change (temporary credential)
export function requiresPasswordChange(session: AdminSession | null | undefined): boolean {
  return Boolean(session && session.mustChangePassword);
}

// Hash password with salt using PBKDF2 (100,000 iterations)
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

// Verify password against salt using timingSafeEqual
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  if (!password || !hash || !salt) return false;
  try {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    const hashBuf = Buffer.from(hash, 'hex');
    const verifyBuf = Buffer.from(verifyHash, 'hex');
    if (hashBuf.length !== verifyBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, verifyBuf);
  } catch {
    return false;
  }
}
