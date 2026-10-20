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
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-azure-bright" />
          <span>Privacy Management</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white mb-4">
          Cookie &amp; Data Preferences
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          Manage how cookies and tracking technologies are used on your browser when visiting Primeora Solutions. Strictly essential cookies are required for basic site stability, while optional cookies require your affirmative consent.
        </p>

        {savedMessage && (
          <div className="p-4 mb-6 bg-azure/20 border border-azure/40 text-azure-bright rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-azure-bright" />
            <span>Your preferences have been saved successfully.</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Strictly Necessary */}
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-base">
                Strictly Necessary Cookies
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-azure/15 text-azure-bright border border-azure/30 rounded font-semibold">
                Always Active
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Essential for security, rate limiting, and preserving your cookie preferences across sessions. These cannot be switched off.
            </p>
            <span className="text-[11px] font-mono text-slate-500">
              Provider: First-party (Primeora Solutions) &middot; Duration: Session / 1 Year
            </span>
          </div>

          {/* Performance & Analytics */}
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-base">
                Performance &amp; Analytics
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure"></div>
              </label>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Help us understand how visitors interact with our website by measuring page views, load speed, and visitor flows via Google Analytics 4. IP addresses are anonymized.
            </p>
            <span className="text-[11px] font-mono text-slate-500">
              Provider: Google LLC &middot; Duration: 2 Years
            </span>
          </div>

          {/* Marketing & Attribution */}
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-base">
                Marketing &amp; Attribution
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure"></div>
              </label>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Used to measure referral source channels from search ads and third-party partner directories. We do not run third-party programmatic retargeting networks.
            </p>
            <span className="text-[11px] font-mono text-slate-500">
              Provider: Marketing Partners &middot; Duration: 90 Days
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            href="/privacy"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Read Full Privacy Policy
          </Link>

          <button
            type="button"
            onClick={() => handleSave(preferences)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-azure to-violet text-white text-xs font-semibold rounded-xl hover:shadow-[0_4px_20px_rgba(61,110,245,0.4)] transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
