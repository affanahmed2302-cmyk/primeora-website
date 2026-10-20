-- ====================================================================
-- PRIMEORA SOLUTIONS — ENQUIRY OPERATIONS SCHEMA UPGRADE
-- Migration: 20261021_enquiry_operations.sql
-- ====================================================================

ALTER TABLE public.enquiries 
ADD COLUMN IF NOT EXISTS internal_notes TEXT,
ADD COLUMN IF NOT EXISTS notification_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS notification_error TEXT,
ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- Add index on status and created_at for fast admin filtering & sorting
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
