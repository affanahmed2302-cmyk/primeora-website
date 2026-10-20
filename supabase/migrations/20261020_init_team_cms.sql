-- ====================================================================
-- RITKARA VEYRA — SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- Migration: 20261020_init_team_cms.sql
-- ====================================================================

-- 1. Create Custom Roles Enum
CREATE TYPE app_role AS ENUM ('super_admin', 'content_editor');
CREATE TYPE publish_status AS ENUM ('draft', 'published', 'inactive');

-- 2. Admin Users Table (Profiles linked to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'content_editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Team Members Table (Public Directory + CMS Draft System)
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  public_title TEXT NOT NULL,
  department TEXT NOT NULL,
  bio TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  photo_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status publish_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES public.admin_profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Inbound Enquiries Table (Private lead management)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT NOT NULL,
  problem_summary TEXT NOT NULL,
  target_timeline TEXT,
  website_url TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'in_review', 'responded', 'archived'
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check if caller is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if caller is a super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for public.admin_profiles:
-- - Admins can read all admin profiles
CREATE POLICY "Admins can view admin profiles"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- - Only super_admins can insert or update admin profiles
CREATE POLICY "Super admins can manage admin profiles"
  ON public.admin_profiles
  FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- Policies for public.team_members:
-- - Public / anonymous visitors can only SELECT published team members
CREATE POLICY "Public can view published team members"
  ON public.team_members
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- - Authenticated admins can view ALL team members (including draft and inactive)
CREATE POLICY "Admins can view all team members"
  ON public.team_members
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- - Authenticated admins can INSERT/UPDATE team members
CREATE POLICY "Admins can insert or update team members"
  ON public.team_members
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- - Only super_admins can DELETE team members
CREATE POLICY "Super admins can delete team members"
  ON public.team_members
  FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Policies for public.enquiries:
-- - Public / anon can INSERT (submit an enquiry)
CREATE POLICY "Public can submit enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- - Only authenticated admins can SELECT, UPDATE, or DELETE enquiries
CREATE POLICY "Only admins can view and manage enquiries"
  ON public.enquiries
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ====================================================================
-- STORAGE BUCKET POLICIES FOR TEAM PHOTOS
-- ====================================================================

-- 1. Create a storage bucket for approved team photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-photos', 'team-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public to view team photos
CREATE POLICY "Public can view team photos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'team-photos');

-- 3. Only admins can upload/replace team photos
CREATE POLICY "Admins can upload team photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'team-photos' AND public.is_admin());

CREATE POLICY "Admins can update team photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'team-photos' AND public.is_admin());

CREATE POLICY "Admins can delete team photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'team-photos' AND public.is_admin());
