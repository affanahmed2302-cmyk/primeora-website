'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both administrative email and password.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Authentication failed. Please verify credentials.');
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch {
      setStatus('error');
      setErrorMessage('Network error while connecting to authentication service.');
    }
  };

  return (
    <div className="min-h-screen bg-architectural-grid flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <ArrowLeft className="w-4 h-4 text-charcoal-muted group-hover:text-forest transition-colors" />
          <span className="text-xs font-semibold text-charcoal-muted group-hover:text-forest">
            Back to Public Website
          </span>
        </Link>

        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-forest rounded-lg p-2 flex items-center justify-center shadow-card">
            <Image
              src={BRAND_CONFIG.assets.emblem}
              alt=""
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Administrative Portal
        </h1>
        <p className="mt-1 text-xs text-charcoal-muted font-mono">
          {BRAND_CONFIG.name} &middot; Content Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-dropdown rounded-xl border border-border-medium sm:px-10">
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-2 text-xs animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
              >
                Administrator Email
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@primeorasolutions.com"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-md border border-border-medium focus:ring-2 focus:ring-teal focus:outline-none"
                />
                <Mail className="w-4 h-4 text-charcoal-muted absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-md border border-border-medium focus:ring-2 focus:ring-teal focus:outline-none"
                />
                <Lock className="w-4 h-4 text-charcoal-muted absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-md text-ivory bg-forest hover:bg-forest-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal shadow-subtle transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <span>Sign In to Admin Console</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-border-subtle text-center">
            <span className="text-[11px] text-charcoal-muted font-mono block">
              Access Restricted to Authorized Personnel
            </span>
            <span className="text-[10px] text-charcoal-muted block mt-1">
              Protected by cryptographic HMAC sessions &middot; Supabase Auth &amp; RLS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
