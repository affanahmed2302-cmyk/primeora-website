'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Check, Save } from 'lucide-react';
import { CookiePreferences } from '@/components/CookieBanner';
import Link from 'next/link';

const STORAGE_KEY = 'ritkara_cookie_consent_v1';

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
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-teal" />
          <span>Privacy Management</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-4">
          Cookie & Data Preferences
        </h1>
        <p className="text-sm text-charcoal-muted leading-relaxed mb-8">
          Manage how cookies and tracking technologies are used on your browser when visiting Ritkara Veyra. Strictly essential cookies are required for basic site stability, while optional cookies require your affirmative consent.
        </p>

        {savedMessage && (
          <div className="p-4 mb-6 bg-teal/10 border border-teal/30 text-teal-dark rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-teal" />
            <span>Your preferences have been saved successfully.</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-border-medium p-6 sm:p-8 shadow-card space-y-6">
          {/* Strictly Necessary */}
          <div className="p-4 bg-ivory-light border border-border-subtle rounded-lg flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-charcoal">Strictly Necessary Cookies</span>
                <span className="text-[10px] font-mono uppercase bg-forest/10 text-forest px-1.5 py-0.5 rounded font-bold">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                These cookies are necessary for core security, session state, rate limiting, and honeypot bot defense. They do not store personally identifiable data.
              </p>
            </div>
            <input type="checkbox" checked disabled className="w-4 h-4 text-forest rounded cursor-not-allowed opacity-50 mt-1" />
          </div>

          {/* Analytics */}
          <div className="p-4 bg-white border border-border-medium rounded-lg flex items-start justify-between gap-4">
            <div>
              <span className="font-semibold text-sm text-charcoal">Analytics & Page Performance</span>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                Helps us measure traffic patterns and page load times via Google Analytics 4. IP addresses are anonymized and data is never used for third-party advertising.
              </p>
            </div>
            <input
              type="checkbox"
              id="pref-analytics"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
              className="w-4 h-4 text-teal focus:ring-teal rounded cursor-pointer mt-1"
            />
          </div>

          {/* Marketing */}
          <div className="p-4 bg-white border border-border-medium rounded-lg flex items-start justify-between gap-4">
            <div>
              <span className="font-semibold text-sm text-charcoal">Attribution & Campaign Tracking</span>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                Allows us to determine which marketing sources yield genuine customer enquiries and measure advertising effectiveness without cross-site tracking.
              </p>
            </div>
            <input
              type="checkbox"
              id="pref-marketing"
              checked={preferences.marketing}
              onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              className="w-4 h-4 text-teal focus:ring-teal rounded cursor-pointer mt-1"
            />
          </div>

          <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/privacy" className="text-xs text-teal hover:underline font-medium">
              Review Full Privacy Policy
            </Link>
            <div className="flex items-center gap-3">
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
                className="px-4 py-2 text-xs font-semibold text-charcoal bg-ivory border border-border-medium rounded hover:bg-ivory-dark transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => handleSave(preferences)}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-forest rounded hover:bg-forest-light transition-colors shadow-subtle"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
