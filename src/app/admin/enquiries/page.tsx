'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminUser, EnquirySubmission, EnquiryStatus } from '@/types';
import { BRAND_CONFIG } from '@/config/brand';
import PrimeoraLogo from '@/components/brand/PrimeoraLogo';
import {
  Inbox,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Archive,
  RefreshCw,
  LogOut,
  ExternalLink,
  Users,
  Send,
  Phone,
  Mail,
  Building,
  Calendar,
  Globe,
  FileText,
  X,
  MessageSquare,
  ShieldCheck,
  Check,
  ChevronRight,
} from 'lucide-react';

const STATUS_OPTIONS: { value: EnquiryStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New Lead', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
  { value: 'contacted', label: 'Contacted', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20' },
  { value: 'qualified', label: 'Qualified', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
  { value: 'won', label: 'Won / Retained', color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' },
  { value: 'closed', label: 'Closed / Disqualified', color: 'bg-stone-500/10 text-stone-700 dark:text-stone-400 border-stone-500/20' },
  { value: 'archived', label: 'Archived', color: 'bg-stone-500/10 text-stone-500 border-stone-500/20' },
];

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notesInput, setNotesInput] = useState('');
  const [statusSuccessMessage, setStatusSuccessMessage] = useState<string | null>(null);
  const [retryingNotification, setRetryingNotification] = useState(false);

  const fetchSessionAndEnquiries = async () => {
    try {
      const sessionRes = await fetch('/api/admin/session');
      if (!sessionRes.ok) {
        router.push('/admin/login');
        return;
      }
      const sessionData = await sessionRes.json();
      setUser(sessionData.user);

      if (sessionData.user.role !== 'super_admin') {
        router.push('/admin/team');
        return;
      }

      const enqRes = await fetch('/api/admin/enquiries');
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndEnquiries();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchesSearch =
        searchQuery === '' ||
        e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.serviceInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.problemSummary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || e.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchQuery, selectedStatus]);

  const newCount = useMemo(() => {
    return enquiries.filter((e) => e.status === 'new').length;
  }, [enquiries]);

  const handleOpenDetail = (item: EnquirySubmission) => {
    setSelectedEnquiry(item);
    setNotesInput(item.internalNotes || '');
    setStatusSuccessMessage(null);
  };

  const handleUpdateStatusAndNotes = async (newStatus?: EnquiryStatus) => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    setStatusSuccessMessage(null);

    const targetStatus = newStatus || selectedEnquiry.status;

    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Primeora-CSRF': '1' },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: targetStatus,
          internalNotes: notesInput,
        }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === selectedEnquiry.id
              ? {
                  ...e,
                  status: targetStatus,
                  internalNotes: notesInput,
                  statusUpdatedAt: new Date().toISOString(),
                }
              : e
          )
        );
        setSelectedEnquiry((prev) =>
          prev
            ? {
                ...prev,
                status: targetStatus,
                internalNotes: notesInput,
                statusUpdatedAt: new Date().toISOString(),
              }
            : null
        );
        setStatusSuccessMessage('Record updated successfully.');
        setTimeout(() => setStatusSuccessMessage(null), 3000);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRetryNotification = async (enquiryId: string) => {
    setRetryingNotification(true);
    try {
      const res = await fetch('/api/admin/enquiries/retry-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Primeora-CSRF': '1' },
        body: JSON.stringify({ id: enquiryId }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === enquiryId ? { ...e, notificationStatus: 'sent', notificationError: undefined } : e
          )
        );
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry((prev) =>
            prev ? { ...prev, notificationStatus: 'sent', notificationError: undefined } : null
          );
        }
        setStatusSuccessMessage('Notification sent successfully.');
      } else {
        setStatusSuccessMessage(`Notification: ${data.error || 'Pending provider configuration'}`);
      }
    } finally {
      setRetryingNotification(false);
      setTimeout(() => setStatusSuccessMessage(null), 4000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] flex items-center justify-center">
        <div className="text-center space-y-3 font-mono text-xs text-[#6E6862] dark:text-[#A8A29A]">
          <RefreshCw className="w-6 h-6 text-[#C25E38] animate-spin mx-auto" />
          <p>Authenticating super administrator privileges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-[#F5F2EB] pt-20 pb-16 transition-colors">
      {/* Top Admin Header Bar */}
      <header className="bg-white dark:bg-[#1A1917] border-b border-[#E6DFD5] dark:border-[#2C2926] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center">
              <PrimeoraLogo variant="horizontal" width={140} height={42} />
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6E6862] dark:text-[#A8A29A]">
              <span>/</span>
              <span className="font-semibold text-[#191817] dark:text-[#F5F2EB]">Enquiry Operations Inbox</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C25E38]/10 text-[#C25E38] border border-[#C25E38]/20">
                {newCount} New
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/team"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6E6862] dark:text-[#A8A29A] hover:text-[#191817] dark:hover:text-white bg-[#F7F4EE] dark:bg-[#242220] rounded-md transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Team CMS</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6E6862] dark:text-[#A8A29A] hover:text-[#191817] dark:hover:text-white bg-[#F7F4EE] dark:bg-[#242220] rounded-md transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Controls */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#191817] dark:text-white font-sans">
              Commercial Enquiries Pipeline
            </h1>
            <p className="text-sm text-[#6E6862] dark:text-[#A8A29A] mt-1">
              Protected triage portal. Supabase PostgreSQL persistence with strict role authorization.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#8C867E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, entity, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md text-[#191817] dark:text-white placeholder-[#8C867E] focus:outline-none focus:ring-1 focus:ring-[#C25E38]"
              />
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-3 pr-8 py-1.5 text-xs bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md text-[#191817] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C25E38]"
              >
                <option value="all">All Statuses ({enquiries.length})</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({enquiries.filter((e) => e.status === opt.value).length})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchSessionAndEnquiries}
              className="p-1.5 text-[#6E6862] dark:text-[#A8A29A] hover:text-[#191817] dark:hover:text-white bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md"
              title="Refresh Enquiries"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Layout: Table & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Enquiries List */}
          <div className={`${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all`}>
            {filteredEnquiries.length === 0 ? (
              <div className="bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-xl p-12 text-center space-y-3">
                <Inbox className="w-10 h-10 text-[#8C867E] mx-auto opacity-50" />
                <h3 className="text-base font-semibold text-[#191817] dark:text-white">
                  No enquiries match your filter
                </h3>
                <p className="text-xs text-[#6E6862] dark:text-[#A8A29A]">
                  {searchQuery || selectedStatus !== 'all'
                    ? 'Try clearing the search query or changing status filters.'
                    : 'Customer enquiries submitted via the contact form will appear here in real time.'}
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-xl overflow-hidden shadow-sm">
                <div className="divide-y divide-[#E6DFD5] dark:divide-[#2C2926]">
                  {filteredEnquiries.map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    const statusMeta = STATUS_OPTIONS.find((s) => s.value === enq.status) || STATUS_OPTIONS[0];

                    return (
                      <div
                        key={enq.id}
                        onClick={() => handleOpenDetail(enq)}
                        className={`p-4 sm:p-5 hover:bg-[#F7F4EE] dark:hover:bg-[#242220] cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F2EDE4] dark:bg-[#201E1C] border-l-4 border-l-[#C25E38]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-[#191817] dark:text-white truncate">
                                {enq.businessName}
                              </h3>
                              <span className="text-xs text-[#6E6862] dark:text-[#A8A29A]">
                                ({enq.fullName})
                              </span>
                            </div>

                            <p className="text-xs text-[#6E6862] dark:text-[#A8A29A] truncate max-w-lg">
                              {enq.problemSummary}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#8C867E]">
                              <span className="font-mono text-[#C25E38] font-medium">
                                {enq.serviceInterest}
                              </span>
                              <span>•</span>
                              <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                              {enq.targetTimeline && (
                                <>
                                  <span>•</span>
                                  <span>{enq.targetTimeline}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${statusMeta.color}`}
                            >
                              {statusMeta.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#8C867E]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Detail Drawer (When selected) */}
          {selectedEnquiry && (
            <div className="lg:col-span-5 bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-xl p-6 shadow-md space-y-6 sticky top-24 self-start">
              {/* Drawer Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD5] dark:border-[#2C2926] pb-4">
                <div>
                  <span className="text-[11px] font-mono text-[#C25E38] font-bold uppercase tracking-wider">
                    Enquiry Details
                  </span>
                  <h2 className="text-lg font-bold text-[#191817] dark:text-white mt-0.5">
                    {selectedEnquiry.businessName}
                  </h2>
                  <p className="text-xs text-[#6E6862] dark:text-[#A8A29A]">
                    Submitted by {selectedEnquiry.fullName} on{' '}
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1 text-[#8C867E] hover:text-[#191817] dark:hover:text-white rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Control */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase font-mono tracking-wider text-[#6E6862] dark:text-[#A8A29A]">
                  Triage Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((opt) => {
                    const isActive = selectedEnquiry.status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleUpdateStatusAndNotes(opt.value)}
                        disabled={isUpdating}
                        className={`text-left px-2.5 py-1.5 text-xs rounded border transition-all ${
                          isActive
                            ? 'bg-[#C25E38] text-white border-[#C25E38] font-semibold'
                            : 'bg-[#F7F4EE] dark:bg-[#242220] text-[#191817] dark:text-[#F5F2EB] border-[#E6DFD5] dark:border-[#2C2926] hover:border-[#C25E38]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Particulars */}
              <div className="space-y-3 bg-[#F7F4EE] dark:bg-[#201E1C] p-4 rounded-lg border border-[#E6DFD5] dark:border-[#2C2926] text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C25E38] flex-shrink-0" />
                  <a
                    href={`mailto:${selectedEnquiry.contactEmail}`}
                    className="text-[#C25E38] hover:underline font-medium"
                  >
                    {selectedEnquiry.contactEmail}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C25E38] flex-shrink-0" />
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-[#191817] dark:text-white hover:underline"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}
                {selectedEnquiry.websiteUrl && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C25E38] flex-shrink-0" />
                    <a
                      href={selectedEnquiry.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#191817] dark:text-white hover:underline truncate"
                    >
                      {selectedEnquiry.websiteUrl}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#C25E38] flex-shrink-0" />
                  <span className="text-[#191817] dark:text-white">
                    Pillar: <strong>{selectedEnquiry.serviceInterest}</strong>
                  </span>
                </div>
                {selectedEnquiry.targetTimeline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C25E38] flex-shrink-0" />
                    <span className="text-[#191817] dark:text-white">
                      Timeline: <strong>{selectedEnquiry.targetTimeline}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Problem Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase font-mono tracking-wider text-[#6E6862] dark:text-[#A8A29A]">
                  Client Problem Summary
                </label>
                <div className="p-3 bg-[#FBF9F5] dark:bg-[#141312] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md text-xs leading-relaxed whitespace-pre-wrap text-[#191817] dark:text-slate-200">
                  {selectedEnquiry.problemSummary}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase font-mono tracking-wider text-[#6E6862] dark:text-[#A8A29A]">
                    Private Internal Notes
                  </label>
                  <span className="text-[10px] text-[#8C867E]">Super admin only</span>
                </div>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record client qualification, call notes, or follow-up plans..."
                  className="w-full p-2.5 text-xs bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md text-[#191817] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#C25E38]"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateStatusAndNotes()}
                  disabled={isUpdating}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm"
                >
                  {isUpdating ? 'Saving...' : 'Save Internal Notes'}
                </button>
              </div>

              {/* Notification Status & Retry */}
              <div className="p-3 bg-[#F7F4EE] dark:bg-[#201E1C] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#6E6862] dark:text-[#A8A29A]">
                    Notification Status:
                  </span>
                  <span
                    className={`font-mono font-bold text-[11px] ${
                      selectedEnquiry.notificationStatus === 'sent'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : selectedEnquiry.notificationStatus === 'failed'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {selectedEnquiry.notificationStatus || 'pending'}
                  </span>
                </div>
                {selectedEnquiry.notificationError && (
                  <p className="text-[11px] text-red-600 dark:text-red-400">
                    {selectedEnquiry.notificationError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => handleRetryNotification(selectedEnquiry.id)}
                  disabled={retryingNotification}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C25E38] hover:underline"
                >
                  <Send className="w-3 h-3" />
                  <span>{retryingNotification ? 'Sending...' : 'Retry Email Notification'}</span>
                </button>
              </div>

              {/* Feedback toast */}
              {statusSuccessMessage && (
                <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>{statusSuccessMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
