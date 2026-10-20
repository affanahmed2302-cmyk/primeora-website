-- ====================================================================
-- PRIMEORA SOLUTIONS — FOUNDER TEMPORARY ACCESS & AUDIT MIGRATION
-- Migration: 20261021_founder_temp_passwords_and_recovery.sql
-- ====================================================================

-- 1. Extend admin_profiles with forced password change & temporary credentials tracking
ALTER TABLE public.admin_profiles
  ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS temp_password_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS temp_password_active BOOLEAN NOT NULL DEFAULT false;

-- 2. Audit table for privacy-conscious security events (Zero credentials logged)
CREATE TABLE IF NOT EXISTS public.auth_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'login', 'temp_login', 'password_change', 'recovery_requested', 'recovery_verified'
  user_id UUID,
  email_hash TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'failure', 'rejected'
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Enable RLS on audit logs
ALTER TABLE public.auth_audit_logs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Super Admins can view audit logs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'auth_audit_logs' AND policyname = 'Admins can view audit logs'
  ) THEN
    CREATE POLICY "Admins can view audit logs"
      ON public.auth_audit_logs
      FOR SELECT
      TO authenticated
      USING (public.is_admin());
  END IF;
END $$;
