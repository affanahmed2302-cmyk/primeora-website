'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import {
  Mail,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Loader2,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();

  // Multi-phase state
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');

  // 8-digit OTP code state (Supabase GoTrue recovery OTP length)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const digitInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Status & errors
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Resend cooldown timer
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Handle Requesting Code (Stage B)
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please provide your administrative email.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to dispatch recovery instructions.');
        return;
      }

      setMaskedEmail(data.maskedEmail || email);
      setSuccessNotice(
        data.message ||
          'If an active administrative account is associated with this email, a recovery instruction has been dispatched.'
      );
      setStatus('idle');
      setStep('verify');
      setCooldownSeconds(60); // 60-second cooldown before resend
    } catch {
      setStatus('error');
      setErrorMessage('Network error while requesting recovery instructions.');
    }
  };

  // Handle OTP digit changes with auto-advance, paste, and backspace handling
  const handleDigitChange = (index: number, value: string) => {
    // Check if user pasted a full URL or token hash
    if (value.includes('http://') || value.includes('https://') || value.includes('access_token')) {
      try {
        const url = new URL(value);
        const hashParams = new URLSearchParams(url.hash.substring(1));
        const token = hashParams.get('access_token') || url.searchParams.get('token');
        if (token) {
          router.push(`/admin/reset-password?token=${encodeURIComponent(token)}`);
          return;
        }
      } catch {
        // Fall through to numeric extraction
      }
    }

    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...otpDigits];

    if (cleaned.length > 1) {
      // Handle paste of full 6-to-8 digit code
      const pasted = cleaned.slice(0, 8).split('');
      for (let i = 0; i < 8; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pasted.length, 7);
      digitInputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = cleaned;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (cleaned && index < 7) {
      digitInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      digitInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      digitInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 7) {
      digitInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Resending Code
  const handleResendCode = async () => {
    if (cooldownSeconds > 0) return;
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to resend code.');
        return;
      }

      setStatus('idle');
      setCooldownSeconds(60);
      setSuccessNotice('A fresh recovery code has been dispatched.');
    } catch {
      setStatus('error');
      setErrorMessage('Network error while requesting code resend.');
    }
  };

  // Handle Verifying Code (Stage C)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpDigits.join('');

    if (token.length < 6) {
      setErrorMessage('Please enter the full verification code.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Verification failed. Please check the code.');
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
        if (data.locked) {
          setIsLocked(true);
        }
        return;
      }

      setStatus('success');
      // Pass accessToken securely via sessionStorage or query param
      if (typeof window !== 'undefined' && data.accessToken) {
        sessionStorage.setItem('primeora_recovery_token', data.accessToken);
        sessionStorage.setItem('primeora_recovery_email', email);
      }

      setTimeout(() => {
        router.push(`/admin/reset-password?token=${encodeURIComponent(data.accessToken)}`);
      }, 800);
    } catch {
      setStatus('error');
      setErrorMessage('Network error while validating recovery code.');
    }
  };

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
          {step === 'request' ? 'Password Recovery' : 'Verify Recovery Code'}
        </h1>
        <p className="mt-1 text-xs text-[#7C7469] dark:text-[#8E867C] font-mono">
          {BRAND_CONFIG.name} &middot; Secure Self-Service Account Recovery
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
              <div className="space-y-1">
                <span>{errorMessage}</span>
                {remainingAttempts !== null && remainingAttempts > 0 && !isLocked && (
                  <span className="block font-semibold text-red-900 dark:text-red-200">
                    {remainingAttempts} attempt{remainingAttempts > 1 ? 's' : ''} remaining before temporary lockout.
                  </span>
                )}
              </div>
            </div>
          )}

          {successNotice && step === 'verify' && (
            <div className="mb-5 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 rounded-lg flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {step === 'request' && (
            <form onSubmit={handleRequestCode} className="space-y-5">
              <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                Enter your verified administrative email address below. An 8-digit one-time recovery code will be dispatched to verify your identity.
              </p>

              <div>
                <label
                  htmlFor="recovery-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] mb-1 font-mono"
                >
                  Administrator Email
                </label>
                <div className="relative">
                  <input
                    id="recovery-email"
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-[#C25E38] hover:bg-[#A84E2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C25E38] shadow-xs transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Dispatching Code...</span>
                    </>
                  ) : (
                    <span>Send Recovery Code</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg text-xs">
                <span className="text-[#7C7469] dark:text-[#8E867C] block font-mono text-[10px] uppercase font-semibold">
                  Verification Code Sent To:
                </span>
                <span className="font-semibold text-editorial-ink dark:text-[#FBF9F5] font-mono">
                  {maskedEmail}
                </span>
              </div>

              <div>
                <label
                  htmlFor="otp-digit-0"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] mb-2 text-center font-mono"
                >
                  8-Digit Verification Code
                </label>
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <div className="flex gap-1 sm:gap-1.5">
                    {otpDigits.slice(0, 4).map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-digit-${idx}`}
                        ref={(el) => {
                          digitInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={idx === 0 ? 8 : 1}
                        disabled={isLocked || status === 'submitting'}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-8 h-10 sm:w-10 sm:h-12 text-center text-base sm:text-lg font-bold font-mono border border-[#DDD5C7] dark:border-[#383430] rounded-lg focus:ring-2 focus:ring-[#C25E38] focus:outline-none bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] disabled:opacity-50"
                        aria-label={`Digit ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-[#A0988C] font-mono font-bold text-sm select-none px-0.5">
                    &minus;
                  </span>
                  <div className="flex gap-1 sm:gap-1.5">
                    {otpDigits.slice(4, 8).map((digit, relIdx) => {
                      const idx = relIdx + 4;
                      return (
                        <input
                          key={idx}
                          id={`otp-digit-${idx}`}
                          ref={(el) => {
                            digitInputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          disabled={isLocked || status === 'submitting'}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className="w-8 h-10 sm:w-10 sm:h-12 text-center text-base sm:text-lg font-bold font-mono border border-[#DDD5C7] dark:border-[#383430] rounded-lg focus:ring-2 focus:ring-[#C25E38] focus:outline-none bg-[#FBF9F5] dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] disabled:opacity-50"
                          aria-label={`Digit ${idx + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || isLocked || otpDigits.join('').length < 6}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-[#C25E38] hover:bg-[#A84E2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C25E38] shadow-xs transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Verifying Code...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
                      <span>Code Verified! Loading...</span>
                    </>
                  ) : (
                    <span>Verify Code &amp; Continue</span>
                  )}
                </button>
              </div>

              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg text-center">
                <span className="text-[11px] text-[#7C7469] dark:text-[#8E867C] block mb-1">
                  Received an email with a direct reset link?
                </span>
                <Link
                  href="/admin/reset-password"
                  className="text-xs font-semibold text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                >
                  Click here to set your password directly &rarr;
                </Link>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('request');
                    setOtpDigits(['', '', '', '', '', '', '', '']);
                    setErrorMessage('');
                  }}
                  className="text-[#7C7469] dark:text-[#8E867C] hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors"
                >
                  Change email address
                </button>

                <button
                  type="button"
                  disabled={cooldownSeconds > 0 || status === 'submitting'}
                  onClick={handleResendCode}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C25E38] dark:text-[#E07A5F] hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {cooldownSeconds > 0 ? (
                    <span>Resend in {cooldownSeconds}s</span>
                  ) : (
                    <span>Resend code</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#E5DDD0] dark:border-[#2C2926] text-center">
            <span className="text-[11px] text-[#7C7469] dark:text-[#8E867C] font-mono block">
              Automated Anti-Abuse Protection
            </span>
            <span className="text-[10px] text-[#A0988C] dark:text-[#70685E] block mt-0.5">
              Rate-limited &middot; Code expires in 15 minutes &middot; Maximum 5 failed attempts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
