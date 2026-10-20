import fs from 'fs';
import path from 'path';
import { TeamMember, EnquirySubmission, AdminUser } from '@/types';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { hashPassword, verifyPassword } from './auth';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

// Ensure directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// -----------------------------------------------------------------------
// Team Members Storage
// -----------------------------------------------------------------------
export function getTeamMembers(includeAll = false): TeamMember[] {
  ensureDataDir();
  if (!fs.existsSync(TEAM_FILE)) {
    // Seed initial founders
    fs.writeFileSync(TEAM_FILE, JSON.stringify(INITIAL_FOUNDERS, null, 2), 'utf8');
    return includeAll
      ? INITIAL_FOUNDERS
      : INITIAL_FOUNDERS.filter((m) => m.status === 'published');
  }

  try {
    const raw = fs.readFileSync(TEAM_FILE, 'utf8');
    const list: TeamMember[] = JSON.parse(raw);
    const sorted = list.sort((a, b) => a.displayOrder - b.displayOrder);
    return includeAll ? sorted : sorted.filter((m) => m.status === 'published');
  } catch {
    return includeAll
      ? INITIAL_FOUNDERS
      : INITIAL_FOUNDERS.filter((m) => m.status === 'published');
  }
}

export function saveTeamMembers(members: TeamMember[]): void {
  ensureDataDir();
  fs.writeFileSync(TEAM_FILE, JSON.stringify(members, null, 2), 'utf8');
}

export function saveTeamMember(member: TeamMember): TeamMember {
  const members = getTeamMembers(true);
  const index = members.findIndex((m) => m.id === member.id);

  if (index >= 0) {
    members[index] = { ...member };
  } else {
    members.push({ ...member });
  }

  saveTeamMembers(members);
  return member;
}

export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers(true);
  const filtered = members.filter((m) => m.id !== id);
  if (filtered.length !== members.length) {
    saveTeamMembers(filtered);
    return true;
  }
  return false;
}

// -----------------------------------------------------------------------
// Inbound Project Enquiries Storage
// -----------------------------------------------------------------------
export function getEnquiries(): EnquirySubmission[] {
  ensureDataDir();
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveEnquiry(enquiry: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'> & { ipHash?: string }): EnquirySubmission {
  const list = getEnquiries();
  const newEntry: EnquirySubmission = {
    ...enquiry,
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  list.unshift(newEntry);
  ensureDataDir();
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf8');
  return newEntry;
}

export function updateEnquiryStatus(id: string, status: EnquirySubmission['status']): boolean {
  const list = getEnquiries();
  const entry = list.find((e) => e.id === id);
  if (entry) {
    entry.status = status;
    ensureDataDir();
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf8');
    return true;
  }
  return false;
}

// -----------------------------------------------------------------------
// Admin Accounts Storage
// -----------------------------------------------------------------------
interface StoredAdmin {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'content_editor';
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

export function getAdmins(): StoredAdmin[] {
  ensureDataDir();
  if (!fs.existsSync(ADMINS_FILE)) {
    // Seed default initial super_admin for testing if file does not exist
    // Password: 'ChangeMeInProd2026!'
    const { hash, salt } = hashPassword('ChangeMeInProd2026!');
    const defaultSuperAdmin: StoredAdmin = {
      id: 'admin_initial_super_01',
      email: 'admin@primeorasolutions.com',
      fullName: 'Master Administrator',
      role: 'super_admin',
      passwordHash: hash,
      passwordSalt: salt,
      createdAt: new Date().toISOString(),
    };
    fs.writeFileSync(ADMINS_FILE, JSON.stringify([defaultSuperAdmin], null, 2), 'utf8');
    return [defaultSuperAdmin];
  }
  try {
    const raw = fs.readFileSync(ADMINS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function verifyAdminLogin(email: string, passwordAttempt: string): AdminUser | null {
  const admins = getAdmins();
  const found = admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!found) return null;

  const valid = verifyPassword(passwordAttempt, found.passwordHash, found.passwordSalt);
  if (!valid) return null;

  return {
    id: found.id,
    email: found.email,
    fullName: found.fullName,
    role: found.role,
  };
}

export function createAdminUser(
  email: string,
  fullName: string,
  role: 'super_admin' | 'content_editor',
  passwordPlain: string
): AdminUser {
  const admins = getAdmins();
  if (admins.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An administrator with this email already exists.');
  }

  const { hash, salt } = hashPassword(passwordPlain);
  const newAdmin: StoredAdmin = {
    id: `adm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    email,
    fullName,
    role,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString(),
  };

  admins.push(newAdmin);
  ensureDataDir();
  fs.writeFileSync(ADMINS_FILE, JSON.stringify(admins, null, 2), 'utf8');

  return {
    id: newAdmin.id,
    email: newAdmin.email,
    fullName: newAdmin.fullName,
    role: newAdmin.role,
  };
}
