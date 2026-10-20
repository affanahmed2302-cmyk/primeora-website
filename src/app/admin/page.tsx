'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminUser, EnquirySubmission } from '@/types';
import { BRAND_CONFIG } from '@/config/brand';
import {
  Users,
  Inbox,
  LogOut,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Archive,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSessionAndData = async () => {
    try {
      // 1. Check session
      const sessionRes = await fetch('/api/admin/session');
      if (!sessionRes.ok) {
        router.push('/admin/login');
        return;
      }
      const sessionData = await sessionRes.json();
      setUser(sessionData.user);

      // 2. Fetch enquiries
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
    fetchSessionAndData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleStatusChange = async (id: string, newStatus: EnquirySubmission['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center space-y-3 font-mono text-xs text-charcoal-muted">
          <RefreshCw className="w-6 h-6 text-forest animate-spin mx-auto" />
          <p>Verifying admin permissions...</p>
        </div>
      </div>
    );
  }

  const newCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16">
      {/* Top Admin Bar */}
      <div className="bg-forest text-ivory py-4 px-4 sm:px-6 lg:px-8 border-b border-forest-dark mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-ivory font-serif font-bold">
              RV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base">{BRAND_CONFIG.name}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-teal/20 text-teal-light border border-teal/30">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-ivory/70">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-ivory/80 hover:text-white px-2.5 py-1.5 rounded hover:bg-white/5 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ivory bg-red-800/60 hover:bg-red-800 px-3 py-1.5 rounded transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Nav: Team CMS */}
          <Link
            href="/admin/team"
            className="bg-white p-6 rounded-xl border border-border-medium shadow-card hover:border-forest/40 transition-all hover:-translate-y-0.5 group flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-forest" />
                <span className="font-serif text-lg font-bold text-forest group-hover:text-teal transition-colors">
                  Team Directory CMS
                </span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Add, edit, reorder, preview, and publish leadership profiles without writing code.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-forest bg-forest/5 px-2.5 py-1 rounded">
              Manage &rarr;
            </span>
          </Link>

          {/* Metric: Inbound Enquiries */}
          <div className="bg-white p-6 rounded-xl border border-border-medium shadow-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-teal" />
                <span className="font-serif text-lg font-bold text-forest">
                  Inbound Enquiries
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                {enquiries.length} Total
              </span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {newCount > 0 ? (
                <span className="text-copper font-semibold">{newCount} new enquiries awaiting review.</span>
              ) : (
                'All logged enquiries have been triaged.'
              )}
            </p>
          </div>

          {/* Metric: Security & Compliance */}
          <div className="bg-white p-6 rounded-xl border border-border-medium shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-copper" />
              <span className="font-serif text-lg font-bold text-forest">
                Security & RLS Guard
              </span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Session tokens HMAC-signed. Zero plain text secrets in client bundles.
            </p>
          </div>
        </div>

        {/* Inbound Enquiries Table */}
        <div className="bg-white rounded-xl border border-border-medium shadow-card overflow-hidden">
          <div className="p-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-forest">
                Recent Inbound Project Enquiries
              </h2>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Structured enquiry records submitted via the public contact workflow.
              </p>
            </div>
            <button
              type="button"
              onClick={fetchSessionAndData}
              className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-teal font-medium self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Queue</span>
            </button>
          </div>

          {enquiries.length === 0 ? (
            <div className="p-12 text-center space-y-2 text-charcoal-muted">
              <Inbox className="w-8 h-8 mx-auto text-charcoal-muted/40" />
              <p className="text-sm font-medium">No enquiries recorded yet.</p>
              <p className="text-xs">Submissions through the public form will appear here in real time.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory-light border-b border-border-subtle font-mono text-[11px] text-charcoal-muted uppercase">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Timeline</th>
                    <th className="py-3 px-4">Problem Summary</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-ivory/30 transition-colors">
                      <td className="py-3 px-4 text-charcoal-muted whitespace-nowrap font-mono text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-charcoal">{enq.fullName}</div>
                        <div className="text-charcoal-muted">{enq.businessName}</div>
                        <a
                          href={`mailto:${enq.contactEmail}`}
                          className="text-teal hover:underline block text-[11px]"
                        >
                          {enq.contactEmail}
                        </a>
                        {enq.phone && <div className="text-charcoal-muted text-[11px]">{enq.phone}</div>}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono text-[11px] bg-ivory text-forest px-2 py-0.5 rounded border border-border-subtle">
                          {enq.serviceInterest}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-charcoal-muted whitespace-nowrap">
                        {enq.targetTimeline || 'Not specified'}
                      </td>
                      <td className="py-3 px-4 max-w-xs text-charcoal leading-relaxed">
                        <p className="line-clamp-3">{enq.problemSummary}</p>
                        {enq.websiteUrl && (
                          <a
                            href={enq.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-copper hover:underline text-[11px] block mt-1"
                          >
                            {enq.websiteUrl}
                          </a>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          disabled={updatingId === enq.id}
                          value={enq.status}
                          onChange={(e) =>
                            handleStatusChange(enq.id, e.target.value as EnquirySubmission['status'])
                          }
                          className="px-2 py-1 text-xs rounded border border-border-medium bg-white font-mono text-charcoal focus:ring-1 focus:ring-teal focus:outline-none"
                        >
                          <option value="new">🔴 New</option>
                          <option value="in_review">🟡 In Review</option>
                          <option value="responded">🟢 Responded</option>
                          <option value="archived">⚪ Archived</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
