'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
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
        headers: {
          'Content-Type': 'application/json',
          'X-Primeora-CSRF': '1',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Authentication failed. Please verify credentials.');
        return;
      }

      // Check if Multi-Factor Authentication challenge is required
      if (data.mfaRequired && data.factorId) {
        setMfaFactorId(data.factorId);
        setStep('mfa');
        setStatus('idle');
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

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!totpCode || totpCode.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit code from your authenticator app.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/mfa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Primeora-CSRF': '1',
        },
        body: JSON.stringify({
          factorId: mfaFactorId,
          code: totpCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Invalid 6-digit verification code.');
        return;
      }

      // MFA successfully verified; session elevated to AAL2
      router.push('/admin');
      router.refresh();
    } catch {
      setStatus('error');
      setErrorMessage('Network error verifying multi-factor authentication.');
    }
  };

  return (
    <div className="min-h-screen bg-editorial-canvas dark:bg-[#121110] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <ArrowLeft className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors" />
          <span className="text-xs font-semibold text-[#7C7469] dark:text-[#8E867C] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F]">
            Back to Public Website
          </span>
        </Link>

        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-white dark:bg-[#201E1B] rounded-xl p-2.5 flex items-center justify-center border border-[#DDD5C7] dark:border-[#33302B] shadow-xs">
            <Image
              src={BRAND_CONFIG.assets.emblem}
              alt={BRAND_CONFIG.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-editorial-ink dark:text-[#FBF9F5]">
          {step === 'mfa' ? 'Two-Factor Verification' : 'Administrative Portal'}
        </h1>
        <p className="mt-1 text-xs text-[#7C7469] dark:text-[#8E867C] font-mono">
          {step === 'mfa'
            ? 'High-Assurance Security Verification (AAL2)'
            : `${BRAND_CONFIG.name} · Content Management System`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#1A1816] py-8 px-6 shadow-xs rounded-2xl border border-[#E5DDD0] dark:border-[#2C2926] sm:px-10">
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300 rounded-lg flex items-start gap-2 text-xs animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] mb-1 font-mono"
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
                    placeholder="founder@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-[#DDD5C7] dark:border-[#383430] bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] focus:ring-2 focus:ring-[#C25E38] focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] font-mono"
                  >
                    Password
                  </label>
                  <Link
                    href="/admin/forgot-password"
                    className="text-xs text-[#C25E38] dark:text-[#E07A5F] hover:underline font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-[#DDD5C7] dark:border-[#383430] bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] focus:ring-2 focus:ring-[#C25E38] focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-[#C25E38] hover:bg-[#A84E2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C25E38] shadow-xs transition-colors disabled:opacity-50"
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
          ) : (
            <form onSubmit={handleVerifyMfa} className="space-y-5">
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl mb-4">
                <ShieldCheck className="w-6 h-6 text-[#C25E38] dark:text-[#E07A5F] mx-auto mb-1" />
                <p className="text-xs text-[#5A544E] dark:text-[#D1C9BE]">
                  Open your authenticator app (Google Authenticator, 1Password) and enter the 6-digit code.
                </p>
              </div>

              <div>
                <label
                  htmlFor="totp-code"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] mb-1 font-mono text-center"
                >
                  6-Digit Authenticator Code
                </label>
                <div className="relative">
                  <input
                    id="totp-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    required
                    autoFocus
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full text-center tracking-[0.5em] text-xl font-mono py-3 rounded-lg border border-[#DDD5C7] dark:border-[#383430] bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] focus:ring-2 focus:ring-[#C25E38] focus:outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] absolute left-3 top-4 pointer-events-none" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || totpCode.length !== 6}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-[#C25E38] hover:bg-[#A84E2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C25E38] shadow-xs transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Verifying Token...</span>
                    </>
                  ) : (
                    <span>Confirm &amp; Access Dashboard</span>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setStatus('idle');
                    setErrorMessage('');
                  }}
                  className="text-xs text-[#7C7469] dark:text-[#8E867C] hover:text-[#C25E38] transition-colors"
                >
                  Cancel and return to sign in
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#E5DDD0] dark:border-[#2C2926] text-center">
            <span className="text-[11px] text-[#7C7469] dark:text-[#8E867C] font-mono block">
              Access Restricted to Authorized Personnel
            </span>
            <span className="text-[10px] text-[#A0988C] dark:text-[#70685E] block mt-0.5">
              Protected by cryptographic HMAC sessions &middot; Supabase Auth MFA &amp; RLS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
