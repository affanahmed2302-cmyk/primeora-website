/**
 * PRIMEORA SOLUTIONS — MULTI-FACTOR AUTHENTICATION (TOTP) ENGINE
 * Official Supabase Auth GoTrue TOTP MFA integration.
 * Handles enrollment, challenge generation, verification, and assurance-level auditing.
 */

import { getSupabaseAdminClient } from '@/lib/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Exchange an administrative magiclink grant for a scoped user access token.
 * Enables server-side orchestration of GoTrue MFA factor management without exposing user passwords.
 */
async function getUserAccessToken(email: string): Promise<string | null> {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;

  try {
    // 1. Generate magiclink token via Admin Auth API
    const genRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/generate_link`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'magiclink', email }),
    });

    if (!genRes.ok) return null;
    const genData = await genRes.json();
    const hashedToken = genData.hashed_token;
    if (!hashedToken) return null;

    // 2. Exchange token_hash for an active user session access_token
    const verifyRes = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'magiclink', token_hash: hashedToken }),
    });

    if (!verifyRes.ok) return null;
    const verifyData = await verifyRes.json();
    return verifyData.access_token || null;
  } catch (err) {
    console.error('[MFA Engine] Failed to obtain user access token:', err);
    return null;
  }
}

export interface MfaEnrollResult {
  success: boolean;
  factorId?: string;
  qrCode?: string;
  secret?: string;
  uri?: string;
  error?: string;
}

/**
 * Enroll a new TOTP MFA factor for an administrative account.
 */
export async function enrollMfaFactor(
  email: string,
  friendlyName: string = 'Primeora Authenticator'
): Promise<MfaEnrollResult> {
  const userToken = await getUserAccessToken(email);
  if (!userToken) {
    return { success: false, error: 'Failed to initialize authenticated enrollment session.' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/factors`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        factor_type: 'totp',
        friendly_name: friendlyName,
        issuer: 'Primeora Solutions',
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.msg || errData.message || 'MFA enrollment failed.' };
    }

    const data = await res.json();
    return {
      success: true,
      factorId: data.id,
      qrCode: data.totp?.qr_code,
      secret: data.totp?.secret,
      uri: data.totp?.uri,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unexpected enrollment error.' };
  }
}

export interface MfaChallengeResult {
  success: boolean;
  challengeId?: string;
  expiresAt?: string;
  error?: string;
}

/**
 * Issue a verification challenge for a registered factor.
 */
export async function createMfaChallenge(
  email: string,
  factorId: string
): Promise<MfaChallengeResult> {
  const userToken = await getUserAccessToken(email);
  if (!userToken) {
    return { success: false, error: 'Failed to initialize challenge session.' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/factors/${factorId}/challenge`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.msg || 'Challenge generation failed.' };
    }

    const data = await res.json();
    return {
      success: true,
      challengeId: data.id,
      expiresAt: data.expires_at,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unexpected challenge error.' };
  }
}

/**
 * Verify a 6-digit TOTP code against a registered factor and challenge.
 */
export async function verifyMfaCode(
  email: string,
  factorId: string,
  challengeId: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  const userToken = await getUserAccessToken(email);
  if (!userToken) {
    return { success: false, error: 'Failed to initialize verification session.' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/factors/${factorId}/verify`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challenge_id: challengeId,
        code: code.trim(),
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.msg || 'Invalid authenticator code.' };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unexpected verification error.' };
  }
}

/**
 * Delete a factor (safe recovery or reset).
 */
export async function deleteMfaFactor(
  userId: string,
  factorId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { success: false, error: 'Database service unavailable' };

  try {
    const { error } = await supabase.auth.admin.mfa.deleteFactor({
      id: factorId,
      userId,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * List all registered factors for an administrative user.
 */
export async function listUserMfaFactors(userId: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return [];

  try {
    const { data } = await supabase.auth.admin.mfa.listFactors({ userId });
    return data?.factors || [];
  } catch {
    return [];
  }
}
