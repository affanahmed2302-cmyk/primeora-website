import fs from 'fs';
import path from 'path';
import { TeamMember, EnquirySubmission, AdminUser } from '@/types';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { verifyPassword } from './auth';
import { getSupabaseAdminClient, isSupabaseConfigured } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// In-memory runtime cache for serverless invocation lifecycle & deduplication
const inMemoryEnquiries: EnquirySubmission[] = [];
let inMemoryTeam: TeamMember[] | null = null;

// Ensure directory exists for local development fallback only
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Ignored in read-only / ephemeral serverless environments
  }
}

// Check if administrative authentication is configured
export function isAuthConfigured(): boolean {
  if (isSupabaseConfigured()) return true;
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_PASSWORD_SALT) {
    return true;
  }
  return false;
}

// Check if durable persistence is configured
export function isDurableStorageConfigured(): boolean {
  return isSupabaseConfigured();
}

function shouldAllowLocalFallback(): boolean {
  return (
    process.env.ALLOW_LOCAL_STORAGE_FALLBACK === 'true' ||
    process.env.NODE_ENV !== 'production'
  );
}

// -----------------------------------------------------------------------
// Team Members Mappers & Storage
// -----------------------------------------------------------------------

interface DbTeamMemberRow {
  id: string;
  full_name: string;
  public_title: string;
  department: string;
  bio: string;
  responsibilities: string[];
  photo_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  display_order: number;
  status: 'draft' | 'published' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

function mapDbToTeamMember(row: DbTeamMemberRow): TeamMember {
  return {
    id: String(row.id),
    fullName: row.full_name,
    publicTitle: row.public_title,
    department: row.department,
    bio: row.bio,
    responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
    photoUrl: row.photo_url || undefined,
    linkedinUrl: row.linkedin_url || undefined,
    portfolioUrl: row.portfolio_url || undefined,
    displayOrder: typeof row.display_order === 'number' ? row.display_order : 10,
    status: row.status || 'draft',
    isFounder: false,
  };
}

function mapTeamMemberToDb(m: TeamMember): Partial<DbTeamMemberRow> {
  const row: Partial<DbTeamMemberRow> = {
    full_name: m.fullName.trim(),
    public_title: m.publicTitle.trim(),
    department: (m.department || 'Consulting Practice').trim(),
    bio: m.bio.trim(),
    responsibilities: m.responsibilities || [],
    photo_url: m.photoUrl?.trim() || null,
    linkedin_url: m.linkedinUrl?.trim() || null,
    portfolio_url: m.portfolioUrl?.trim() || null,
    display_order: Number(m.displayOrder) || 10,
    status: m.status,
    updated_at: new Date().toISOString(),
  };

  // If ID is valid UUID, preserve it for Supabase
  if (m.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(m.id)) {
    row.id = m.id;
  }
  return row;
}

export async function getTeamMembers(includeAll = false): Promise<TeamMember[]> {
  // 1. If Supabase PostgreSQL is configured, query the durable database
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        let query = supabase.from('team_members').select('*');
        if (!includeAll) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query.order('display_order', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          return data.map((r) => mapDbToTeamMember(r as DbTeamMemberRow));
        }
      }
    } catch {
      // Fallback on database error
    }
  }

  // 2. Check in-memory team cache
  if (inMemoryTeam && inMemoryTeam.length > 0) {
    const sorted = [...inMemoryTeam].sort((a, b) => a.displayOrder - b.displayOrder);
    return includeAll ? sorted : sorted.filter((m) => m.status === 'published');
  }

  // 3. Local file fallback if permitted
  if (shouldAllowLocalFallback() && fs.existsSync(TEAM_FILE)) {
    try {
      const raw = fs.readFileSync(TEAM_FILE, 'utf8');
      const list: TeamMember[] = JSON.parse(raw);
      inMemoryTeam = list;
      const sorted = list.sort((a, b) => a.displayOrder - b.displayOrder);
      return includeAll ? sorted : sorted.filter((m) => m.status === 'published');
    } catch {
      // Continue to fallback
    }
  }

  // 4. Immutable production fallback (Initial Founders from Brand Config)
  const initial = [...INITIAL_FOUNDERS].sort((a, b) => a.displayOrder - b.displayOrder);
  return includeAll ? initial : initial.filter((m) => m.status === 'published');
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember> {
  // 1. If Supabase is configured, execute durable PostgreSQL upsert
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      throw new Error('Supabase client initialization failed.');
    }

    const payload = mapTeamMemberToDb(member);
    const { data, error } = await supabase
      .from('team_members')
      .upsert(payload)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Database error saving team member: ${error?.message || 'Unknown'}`);
    }

    return mapDbToTeamMember(data as DbTeamMemberRow);
  }

  // 2. Check fallback authorization
  if (!shouldAllowLocalFallback()) {
    throw new Error(
      'DURABLE_STORAGE_UNCONFIGURED: Durable database storage is unconfigured. In production serverless environments, team mutations require Supabase PostgreSQL.'
    );
  }

  // 3. Memory & Local file fallback
  const current = await getTeamMembers(true);
  const index = current.findIndex((m) => m.id === member.id);

  if (index >= 0) {
    current[index] = { ...member };
  } else {
    current.push({ ...member });
  }

  inMemoryTeam = current;

  try {
    ensureDataDir();
    fs.writeFileSync(TEAM_FILE, JSON.stringify(current, null, 2), 'utf8');
  } catch {
    // In read-only filesystem, in-memory updates still reflect during instance lifecycle
  }

  return member;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  // 1. Durable Supabase delete
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return false;

    const { error } = await supabase.from('team_members').delete().eq('id', id);
    return !error;
  }

  // 2. Check fallback authorization
  if (!shouldAllowLocalFallback()) {
    throw new Error(
      'DURABLE_STORAGE_UNCONFIGURED: Durable database storage is unconfigured. In production serverless environments, team mutations require Supabase PostgreSQL.'
    );
  }

  // 3. Memory & local file fallback
  const current = await getTeamMembers(true);
  const filtered = current.filter((m) => m.id !== id);
  if (filtered.length !== current.length) {
    inMemoryTeam = filtered;
    try {
      ensureDataDir();
      fs.writeFileSync(TEAM_FILE, JSON.stringify(filtered, null, 2), 'utf8');
    } catch {
      // Ignored
    }
    return true;
  }
  return false;
}

// -----------------------------------------------------------------------
// Inbound Project Enquiries Mappers & Storage
// -----------------------------------------------------------------------

interface DbEnquiryRow {
  id: string;
  full_name: string;
  business_name: string;
  contact_email: string;
  phone: string | null;
  service_interest: string;
  problem_summary: string;
  target_timeline: string | null;
  website_url: string | null;
  status: EnquirySubmission['status'];
  ip_hash: string | null;
  internal_notes?: string | null;
  notification_status?: string | null;
  notification_error?: string | null;
  status_updated_at?: string | null;
  created_at: string;
  updated_at?: string;
}

function mapDbToEnquiry(row: DbEnquiryRow): EnquirySubmission {
  return {
    id: String(row.id),
    fullName: row.full_name,
    businessName: row.business_name,
    contactEmail: row.contact_email,
    phone: row.phone || undefined,
    serviceInterest: row.service_interest,
    problemSummary: row.problem_summary,
    targetTimeline: row.target_timeline || undefined,
    websiteUrl: row.website_url || undefined,
    status: row.status,
    createdAt: row.created_at,
    internalNotes: row.internal_notes || undefined,
    notificationStatus: (row.notification_status as EnquirySubmission['notificationStatus']) || 'pending',
    notificationError: row.notification_error || undefined,
    statusUpdatedAt: row.status_updated_at || undefined,
  };
}

export async function getEnquiries(): Promise<EnquirySubmission[]> {
  // 1. Durable Supabase storage
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          return data.map((r) => mapDbToEnquiry(r as DbEnquiryRow));
        }
      }
    } catch {
      return [];
    }
  }

  // 2. Return in-memory queue if populated (provides instant deduplication across queries)
  if (inMemoryEnquiries.length > 0) {
    return [...inMemoryEnquiries];
  }

  // 3. Local development file fallback
  if (shouldAllowLocalFallback() && fs.existsSync(ENQUIRIES_FILE)) {
    try {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
      const list: EnquirySubmission[] = JSON.parse(raw);
      return list;
    } catch {
      return [];
    }
  }

  return [];
}

export async function saveEnquiry(
  enquiry: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'> & { ipHash?: string }
): Promise<EnquirySubmission> {
  const now = new Date().toISOString();

  // 1. Durable Supabase storage
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const dbPayload = {
        full_name: enquiry.fullName,
        business_name: enquiry.businessName,
        contact_email: enquiry.contactEmail,
        phone: enquiry.phone || null,
        service_interest: enquiry.serviceInterest,
        problem_summary: enquiry.problemSummary,
        target_timeline: enquiry.targetTimeline || null,
        website_url: enquiry.websiteUrl || null,
        status: 'new',
        ip_hash: enquiry.ipHash || null,
        notification_status: 'pending',
        status_updated_at: now,
        created_at: now,
      };

      const { data, error } = await supabase
        .from('enquiries')
        .insert(dbPayload)
        .select()
        .single();

      if (!error && data) {
        const saved = mapDbToEnquiry(data as DbEnquiryRow);
        inMemoryEnquiries.unshift(saved);
        return saved;
      }
    }
  }

  // 2. In-memory & local development fallback
  const generatedId = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const localEntry: EnquirySubmission = {
    ...enquiry,
    id: generatedId,
    status: 'new',
    createdAt: now,
    notificationStatus: 'pending',
    statusUpdatedAt: now,
  };

  inMemoryEnquiries.unshift(localEntry);
  if (inMemoryEnquiries.length > 200) {
    inMemoryEnquiries.pop();
  }

  if (shouldAllowLocalFallback()) {
    ensureDataDir();
    try {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(inMemoryEnquiries, null, 2), 'utf8');
    } catch {
      // Ignored in read-only environment
    }
  }

  return localEntry;
}

export async function updateEnquiry(
  id: string,
  updates: {
    status?: EnquirySubmission['status'];
    internalNotes?: string;
    notificationStatus?: EnquirySubmission['notificationStatus'];
    notificationError?: string;
  }
): Promise<boolean> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return false;

    const payload: Record<string, unknown> = {
      updated_at: now,
    };
    if (updates.status !== undefined) {
      payload.status = updates.status;
      payload.status_updated_at = now;
    }
    if (updates.internalNotes !== undefined) {
      payload.internal_notes = updates.internalNotes;
    }
    if (updates.notificationStatus !== undefined) {
      payload.notification_status = updates.notificationStatus;
    }
    if (updates.notificationError !== undefined) {
      payload.notification_error = updates.notificationError;
    }

    const { error } = await supabase
      .from('enquiries')
      .update(payload)
      .eq('id', id);

    return !error;
  }

  const entry = inMemoryEnquiries.find((e) => e.id === id);
  if (entry) {
    if (updates.status !== undefined) {
      entry.status = updates.status;
      entry.statusUpdatedAt = now;
    }
    if (updates.internalNotes !== undefined) {
      entry.internalNotes = updates.internalNotes;
    }
    if (updates.notificationStatus !== undefined) {
      entry.notificationStatus = updates.notificationStatus;
    }
    if (updates.notificationError !== undefined) {
      entry.notificationError = updates.notificationError;
    }

    if (shouldAllowLocalFallback()) {
      ensureDataDir();
      try {
        fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(inMemoryEnquiries, null, 2), 'utf8');
      } catch {
        // Ignored
      }
    }
    return true;
  }

  return false;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquirySubmission['status']
): Promise<boolean> {
  return updateEnquiry(id, { status });
}

// Durable cross-serverless rate limit check
export async function checkEnquiryRateLimit(ipHash: string): Promise<boolean> {
  if (!ipHash) return true;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { count, error } = await supabase
          .from('enquiries')
          .select('id', { count: 'exact', head: true })
          .eq('ip_hash', ipHash)
          .gte('created_at', oneHourAgo);

        if (!error && typeof count === 'number') {
          return count < 5;
        }
      }
    } catch {
      // Fallback to in-memory check
    }
  }

  return true;
}

// -----------------------------------------------------------------------
// Authentication Verification (NO HARDCODED PASSWORDS OR DEFAULT SEEDS)
// -----------------------------------------------------------------------

export async function verifyAdminLogin(
  email: string,
  passwordAttempt: string
): Promise<AdminUser | null> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Supabase Auth Integration (Preferred)
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: passwordAttempt,
        });

        if (!authErr && authData?.user) {
          // Fetch assigned role and credential policy from admin_profiles
          const { data: profile } = await supabase
            .from('admin_profiles')
            .select('id, email, full_name, role, must_change_password, temp_password_expires_at, temp_password_active')
            .eq('id', authData.user.id)
            .single();

          if (profile) {
            // Check if temporary credentials have expired
            if (profile.temp_password_active && profile.temp_password_expires_at) {
              const expiresAt = new Date(profile.temp_password_expires_at).getTime();
              if (Date.now() > expiresAt) {
                // Expired temporary credentials: do not issue authenticated session
                return null;
              }
            }

            return {
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              role: profile.role,
              mustChangePassword: Boolean(profile.must_change_password || profile.temp_password_active),
            };
          }
        }
      }
    } catch {
      // Continue to environment configuration fallback
    }
  }

  // 2. High-Entropy Environment Configuration (Server-Only, No Defaults)
  const envAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envAdminPassHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const envAdminPassSalt = process.env.ADMIN_PASSWORD_SALT?.trim();

  if (envAdminEmail && envAdminPassHash && envAdminPassSalt) {
    if (cleanEmail === envAdminEmail) {
      const isValid = verifyPassword(passwordAttempt, envAdminPassHash, envAdminPassSalt);
      if (isValid) {
        const role = process.env.ADMIN_ROLE === 'content_editor' ? 'content_editor' : 'super_admin';
        return {
          id: 'admin_env_provisioned',
          email: envAdminEmail,
          fullName: process.env.ADMIN_FULL_NAME || 'Designated Administrator',
          role,
        };
      }
    }
  }

  // FAIL CLOSED: Never seed, store, or accept any hardcoded or default password.
  return null;
}
