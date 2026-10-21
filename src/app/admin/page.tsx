'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AdminUser, EnquirySubmission } from '@/types';
import { BRAND_CONFIG } from '@/config/brand';
import PrimeoraLogo from '@/components/brand/PrimeoraLogo';
import {
  Users,
  Inbox,
  LogOut,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Mail,
  ChevronRight,
  Database,
  ArrowRight,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset_success') === 'true') {
        setResetSuccess(true);
      }
    }
  }, []);

  const fetchSessionAndData = async () => {
    try {
      const sessionRes = await fetch('/api/admin/session');
      if (!sessionRes.ok) {
        router.push('/admin/login');
        return;
      }
      const sessionData = await sessionRes.json();
      setUser(sessionData.user);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] flex items-center justify-center">
        <div className="text-center space-y-3 font-mono text-xs text-[#6E6862] dark:text-[#A8A29A]">
          <RefreshCw className="w-6 h-6 text-[#C25E38] animate-spin mx-auto" />
          <p>Verifying admin permissions...</p>
        </div>
      </div>
    );
  }

  const newCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-[#F5F2EB] pt-20 pb-16 transition-colors">
      {/* Top Admin Bar */}
      <header className="bg-white dark:bg-[#1A1917] border-b border-[#E6DFD5] dark:border-[#2C2926] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center">
              <PrimeoraLogo variant="horizontal" width={140} height={42} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-[#C25E38]/10 text-[#C25E38] border border-[#C25E38]/20">
                {user?.role === 'super_admin' ? 'Super Administrator' : 'Content Editor'}
              </span>
              <span className="text-xs text-[#6E6862] dark:text-[#A8A29A] hidden sm:inline">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#191817] dark:text-white font-sans">
            Administrative Operations &amp; CMS
          </h1>
          <p className="text-sm text-[#6E6862] dark:text-[#A8A29A] mt-1">
            Durable governance portal for customer enquiries, team publishing, and infrastructure telemetry.
          </p>
        </div>

        {resetSuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3 shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span className="text-xs font-medium">
                Welcome back! Your administrator password has been updated and your session is active.
              </span>
            </div>
            <button
              onClick={() => setResetSuccess(false)}
              className="text-xs text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 font-mono px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {user?.mustChangePassword && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-600 rounded-xl text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold">Temporary Password In Use &mdash; Action Required</h3>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5 leading-relaxed">
                  You have signed in using temporary credentials. To ensure administrative security and unlock enquiry management, you must configure your permanent password now.
                </p>
              </div>
            </div>
            <Link
              href="/admin/update-password"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#C25E38] hover:bg-[#A84E2D] rounded-lg shadow-xs transition-colors flex-shrink-0"
            >
              <KeyRound className="w-4 h-4" />
              <span>Set Permanent Password</span>
            </Link>
          </div>
        )}

        {/* Primary Operational Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Enquiry Operations Inbox */}
          <Link
            href="/admin/enquiries"
            className="group bg-white dark:bg-[#1A1917] p-6 rounded-xl border border-[#E6DFD5] dark:border-[#2C2926] hover:border-[#C25E38] shadow-sm transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#C25E38]/10 text-[#C25E38] flex items-center justify-center">
                  <Inbox className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C25E38]/10 text-[#C25E38] border border-[#C25E38]/20">
                    {newCount} New
                  </span>
                  <span className="text-xs text-[#8C867E]">
                    {enquiries.length} Total
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-[#191817] dark:text-white group-hover:text-[#C25E38] transition-colors">
                Enquiry Operations Inbox &rarr;
              </h2>
              <p className="text-xs text-[#6E6862] dark:text-[#A8A29A] mt-1.5 leading-relaxed">
                Triage inbound customer submissions, search leads, filter by pipeline status, record private internal notes, and manage notifications.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center justify-between text-xs text-[#C25E38] font-semibold">
              <span>Open Dedicated Inbox</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Team Directory CMS */}
          <Link
            href="/admin/team"
            className="group bg-white dark:bg-[#1A1917] p-6 rounded-xl border border-[#E6DFD5] dark:border-[#2C2926] hover:border-[#C25E38] shadow-sm transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  Published Directory
                </span>
              </div>

              <h2 className="text-lg font-bold text-[#191817] dark:text-white group-hover:text-[#C25E38] transition-colors">
                Team Directory CMS &rarr;
              </h2>
              <p className="text-xs text-[#6E6862] dark:text-[#A8A29A] mt-1.5 leading-relaxed">
                Add, edit, reorder, preview, and publish leadership profiles with draft/published state control and Supabase sync.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center justify-between text-xs text-[#C25E38] font-semibold">
              <span>Manage Team Profiles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* System & Compliance Status */}
        <div className="bg-white dark:bg-[#1A1917] p-6 rounded-xl border border-[#E6DFD5] dark:border-[#2C2926] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6DFD5] dark:border-[#2C2926] pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#C25E38]" />
              <h3 className="text-sm font-semibold text-[#191817] dark:text-white">
                Durable Persistence &amp; Security State
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected (Supabase PostgreSQL)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-[#F7F4EE] dark:bg-[#201E1C] p-3 rounded-lg border border-[#E6DFD5] dark:border-[#2C2926]">
              <span className="text-[#8C867E]">Primary Entity:</span>
              <p className="font-semibold text-[#191817] dark:text-white mt-0.5">{BRAND_CONFIG.legalEntity}</p>
            </div>
            <div className="bg-[#F7F4EE] dark:bg-[#201E1C] p-3 rounded-lg border border-[#E6DFD5] dark:border-[#2C2926]">
              <span className="text-[#8C867E]">MSME Registration:</span>
              <p className="font-semibold text-[#191817] dark:text-white mt-0.5">{BRAND_CONFIG.udyamRegistrationNumber}</p>
            </div>
            <div className="bg-[#F7F4EE] dark:bg-[#201E1C] p-3 rounded-lg border border-[#E6DFD5] dark:border-[#2C2926]">
              <span className="text-[#8C867E]">Inbound Notification:</span>
              <p className="font-semibold text-[#191817] dark:text-white mt-0.5">primeorasolutions.in@gmail.com</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
