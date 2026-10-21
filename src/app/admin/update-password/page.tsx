'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { Lock, AlertCircle, CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'submitting' | 'success' | 'error' | 'no_token'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAuthAndToken = async () => {
      // 1. Check for access_token in URL hash (e.g. #access_token=...&type=recovery)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get('access_token');

      // 2. Also check query search params as fallback
      const searchParams = new URLSearchParams(window.location.search);
      const queryToken = searchParams.get('access_token') || searchParams.get('token');

      const resolvedToken = token || queryToken;

      if (resolvedToken) {
        setAccessToken(resolvedToken);
        // Attempt to decode email from JWT payload for friendly greeting
        try {
          const parts = resolvedToken.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload.email) setUserEmail(payload.email);
          }
        } catch {
          // Non-fatal
        }
        setStatus('ready');
        return;
      }

      // 3. Check if user is currently logged in via temporary session cookie
      try {
        const sessionRes = await fetch('/api/admin/session');
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          if (sessionData.user) {
            setUserEmail(sessionData.user.email);
            setStatus('ready');
            return;
          }
        }
      } catch {
        // Fallback to no_token
      }

      setStatus('no_token');
    };

    checkAuthAndToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 10) {
      setErrorMessage('Password must be at least 10 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const payload: { newPassword: string; accessToken?: string } = { newPassword: password };
      if (accessToken) {
        payload.accessToken = accessToken;
      }

      const res = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to update password. Your session may have expired.');
        return;
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/admin?reset_success=true');
        router.refresh();
      }, 1500);
    } catch {
      setStatus('error');
      setErrorMessage('Network error while connecting to administrative service.');
    }
  };

  // Password strength calculation
  const hasMinLength = password.length >= 10;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const strengthScore = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-editorial-canvas dark:bg-[#121110] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/admin/login" className="inline-flex items-center gap-2 mb-4 group">
          <ArrowLeft className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors" />
          <span className="text-xs font-semibold text-[#7C7469] dark:text-[#8E867C] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F]">
            Back to Administrator Login
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
          Set Administrator Password
        </h1>
        <p className="mt-1 text-xs text-[#7C7469] dark:text-[#8E867C] font-mono">
          Primeora Solutions &middot; Secure Founder Onboarding
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#1A1816] py-8 px-6 shadow-xs rounded-2xl border border-[#E5DDD0] dark:border-[#2C2926] sm:px-10">
          {status === 'loading' && (
            <div className="py-12 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#C25E38] dark:text-[#E07A5F] mx-auto mb-3" />
              <p className="text-xs text-[#7C7469] dark:text-[#8E867C] font-mono">
                Validating one-time security token...
              </p>
            </div>
          )}

          {status === 'no_token' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-900 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-1">No Active Password Setup Token</strong>
                  <span>
                    To set your administrator password, please click the personalized setup link dispatched to your verified founder email, or contact your system administrator.
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#C25E38] hover:bg-[#A84E2D] text-white transition-colors shadow-xs"
                >
                  Return to Admin Login
                </Link>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">
                Password Configured Successfully!
              </h2>
              <p className="text-xs text-[#5A544E] dark:text-[#A8A196]">
                Your administrative credentials have been saved. Launching your management console now...
              </p>
              <div className="pt-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#C25E38] dark:text-[#E07A5F] mx-auto" />
              </div>
            </div>
          )}

          {(status === 'ready' || status === 'submitting' || status === 'error') && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {userEmail && (
                <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg text-xs">
                  <span className="text-[#7C7469] dark:text-[#8E867C] block font-mono text-[10px] uppercase font-semibold">
                    Configuring Credentials For:
                  </span>
                  <span className="font-semibold text-editorial-ink dark:text-[#FBF9F5]">
                    {userEmail}
                  </span>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300 rounded-lg flex items-start gap-2 text-xs"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] mb-1 font-mono"
                >
                  New Administrator Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={10}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 10 characters"
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-[#DDD5C7] dark:border-[#383430] bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] focus:ring-2 focus:ring-[#C25E38] focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] absolute left-3 top-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#7C7469] dark:text-[#8E867C] hover:text-editorial-ink dark:hover:text-[#FBF9F5]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength bar */}
                {password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-full bg-[#E5DDD0] dark:bg-[#2C2926] rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-full rounded-full transition-colors ${
                            strengthScore >= level
                              ? strengthScore <= 2
                                ? 'bg-red-500'
                                : strengthScore <= 4
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                      <span>Strength: {strengthScore <= 2 ? 'Weak' : strengthScore <= 4 ? 'Good' : 'Strong'}</span>
                      <span>Min 10 chars, mixed case, numbers & symbols</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] mb-1 font-mono"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={10}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-[#DDD5C7] dark:border-[#383430] bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] focus:ring-2 focus:ring-[#C25E38] focus:outline-none"
                  />
                  <ShieldCheck className="w-4 h-4 text-[#7C7469] dark:text-[#8E867C] absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || password.length < 10 || password !== confirmPassword}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-[#C25E38] hover:bg-[#A84E2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C25E38] shadow-xs transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Saving Secure Credentials...</span>
                    </>
                  ) : (
                    <span>Set Password &amp; Enter CMS</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#E5DDD0] dark:border-[#2C2926] text-center">
            <span className="text-[11px] text-[#7C7469] dark:text-[#8E867C] font-mono block">
              Direct Authentication Integration
            </span>
            <span className="text-[10px] text-[#A0988C] dark:text-[#70685E] block mt-0.5">
              Zero shared credentials &middot; Supabase Auth &middot; Server-Side RLS Role Enforcement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
