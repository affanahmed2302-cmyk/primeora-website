export type ServicePillarId =
  | 'digital-presence'
  | 'customer-acquisition'
  | 'lead-sales-systems'
  | 'operations-automation'
  | 'analytics-insights'
  | 'ongoing-management';

export interface ServiceItem {
  title: string;
  description: string;
  deliverables: string[];
  clientInputs: string[];
  dependencies: string[];
  exclusions: string[];
}

export interface ServicePillar {
  id: ServicePillarId;
  title: string;
  badge: string;
  shortDescription: string;
  targetProblem: string;
  services: ServiceItem[];
  deliverablesSummary: string[];
  faqs: { question: string; answer: string }[];
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  idealFor: string;
  inclusions: string[];
  exclusions: string[];
  deliverables: string[];
  commitment: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
  clientActions: string;
  deliverable: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  publicTitle: string;
  department: string;
  bio: string;
  responsibilities: string[];
  photoUrl?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  email?: string;
  displayOrder: number;
  status: 'draft' | 'published' | 'inactive';
  isFounder?: boolean;
}

export type EnquiryStatus =
  | 'new'
  | 'in_progress'
  | 'contacted'
  | 'qualified'
  | 'won'
  | 'closed'
  | 'archived';

export interface EnquirySubmission {
  id: string;
  fullName: string;
  businessName: string;
  contactEmail: string;
  phone?: string;
  serviceInterest: string;
  problemSummary: string;
  targetTimeline?: string;
  websiteUrl?: string;
  status: EnquiryStatus;
  createdAt: string;
  ipHash?: string;
  internalNotes?: string;
  notificationStatus?: 'pending' | 'sent' | 'failed' | 'pending_config';
  notificationError?: string;
  statusUpdatedAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'content_editor';
  mustChangePassword?: boolean;
}
