import crypto from 'crypto';
import { AdminUser } from '@/types';

const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'ritkara_veyra_secure_dev_secret_key_2026_change_in_prod';

export interface AdminSession {
  userId: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'content_editor';
  exp: number;
}

// Generate HMAC-SHA256 Signed Session Token
export function signSession(user: AdminUser, expiresInSeconds = 86400): string {
  const payload: AdminSession = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
}

// Verify Session Token
export function verifySession(token: string | null | undefined): AdminSession | null {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadStr)
    .digest('base64url');

  if (signature !== expectedSig) {
    return null; // Tampered token
  }

  try {
    const payload: AdminSession = JSON.parse(
      Buffer.from(payloadStr, 'base64url').toString('utf8')
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

// Hash password with salt
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

// Verify password against salt
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}
