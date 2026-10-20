import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured with required credentials
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey));
}

// Server-side privileged client using Service Role Key (bypasses RLS for trusted server actions)
let cachedAdminClient: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!supabaseUrl) return null;
  const key = supabaseServiceRoleKey || supabaseAnonKey;
  if (!key) return null;

  if (!cachedAdminClient) {
    cachedAdminClient = createClient(supabaseUrl, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return cachedAdminClient;
}

// Client or anon-restricted client using public Anon Key
let cachedAnonClient: SupabaseClient | null = null;

export function getSupabaseAnonClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  if (!cachedAnonClient) {
    cachedAnonClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return cachedAnonClient;
}
