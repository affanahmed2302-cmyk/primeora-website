'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Check, Save } from 'lucide-react';
import { CookiePreferences } from '@/components/CookieBanner';
import Link from 'next/link';

const STORAGE_KEY = 'primeora_cookie_consent_v1';

export default function CookiePreferencesPage() {
  const [mounted, setMounted] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleSave = (prefs: CookiePreferences) => {
    const updated = { ...prefs, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPreferences(updated);
    setSavedMessage(true);
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: updated }));
    setTimeout(() => setSavedMessage(false), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>PRIVACY GOVERNANCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-sans">
          Cookie &amp; Data Preferences
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Manage how cookies and anonymous telemetry operate while you browse Primeora Solutions. In accordance with DPDP and privacy standards, you can enable or disable non-essential analytics tracking at any time.
        </p>

        {savedMessage && (
          <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-200 text-sm animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Preferences saved successfully.</span>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {/* Essential Category */}
          <div className="p-6 bg-[#08152B] border border-white/[0.08] rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white font-sans">Strictly Necessary Cookies</span>
                <span className="text-[10px] font-mono uppercase bg-[#040D1A] text-slate-400 border border-white/10 px-2 py-0.5 rounded">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Required for core website security, session persistence, CSRF protection, and anti-spam verification. These cannot be disabled.
              </p>
            </div>
            <input
              type="checkbox"
              disabled
              checked={true}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-[#166CFF] opacity-60 cursor-not-allowed"
            />
          </div>

          {/* Performance Analytics Category */}
          <div className="p-6 bg-[#08152B] border border-white/[0.08] rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-base font-bold text-white font-sans">Performance &amp; Analytics Cookies</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Allows us to collect anonymized aggregate statistics (via Google Analytics 4) to monitor page load performance, route traffic, and browser compatibility.
              </p>
            </div>
            <input
              type="checkbox"
              id="analytics-toggle"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
              className="mt-1 h-5 w-5 rounded border-white/20 bg-[#040D1A] text-[#166CFF] focus:ring-1 focus:ring-[#166CFF] cursor-pointer"
            />
          </div>

          {/* Marketing Category */}
          <div className="p-6 bg-[#08152B] border border-white/[0.08] rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-base font-bold text-white font-sans">Marketing &amp; Targeting Cookies</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Used to deliver relevant campaign attribution across third-party networks. Primeora Solutions currently sets zero third-party cross-site advertising cookies.
              </p>
            </div>
            <input
              type="checkbox"
              id="marketing-toggle"
              checked={preferences.marketing}
              onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              className="mt-1 h-5 w-5 rounded border-white/20 bg-[#040D1A] text-[#166CFF] focus:ring-1 focus:ring-[#166CFF] cursor-pointer"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave(preferences)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleSave({
                essential: true,
                analytics: true,
                marketing: false,
                timestamp: '',
              })
            }
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#08152B] hover:bg-[#0E1F3D] hover:text-white border border-white/10 rounded-lg transition-colors"
          >
            <span>Accept Recommended</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleSave({
                essential: true,
                analytics: false,
                marketing: false,
                timestamp: '',
              })
            }
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <span>Reject All Non-Essential</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs text-slate-500">
          For full details on data retention, controller identity, and security architecture, read our{' '}
          <Link href="/privacy" className="text-[#3B82F6] hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
