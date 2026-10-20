'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Settings, Check, X } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'primeora_cookie_consent_v1';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setShowBanner(true);
    } else {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        setShowBanner(true);
      }
    }

    // Listen for custom trigger from footer or other links
    const handleOpen = () => {
      setShowModal(true);
    };
    window.addEventListener('open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('open-cookie-preferences', handleOpen);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const updated = { ...prefs, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPreferences(updated);
    setShowBanner(false);
    setShowModal(false);

    // Dispatch global event for analytics loader
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: updated }));
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Bottom Consent Banner */}
      {showBanner && !showModal && (
        <div
          role="region"
          aria-label="Privacy and Cookie Consent"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 bg-[#0B0F1A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_16px_40px_rgb(0,0,0,0.8)] p-5 animate-in slide-in-from-bottom-4 transition-all"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-azure/15 text-azure-bright rounded-xl flex-shrink-0 border border-azure/30">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-['Space_Grotesk'] font-bold text-white">
                Privacy &amp; Data Preferences
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                We use strictly essential cookies for site functionality and security. Optional analytics help us understand aggregate traffic only if you explicitly consent.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-azure to-violet rounded-lg shadow-md hover:scale-[1.02] transition-transform"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-2.5 py-1.5 text-xs font-medium text-azure-bright hover:underline flex items-center gap-1"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Granular Preferences */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.9)] max-w-lg w-full p-6 relative">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              aria-label="Close preferences modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <Shield className="w-5 h-5 text-azure-bright" />
              <h2 id="cookie-modal-title" className="text-lg font-['Space_Grotesk'] font-bold text-white">
                Cookie &amp; Privacy Settings
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Customize which categories of cookies and tracking technologies you permit. You can update these settings at any time via the footer link.
            </p>

            <div className="space-y-4 mb-6">
              {/* Essential */}
              <div className="p-3.5 bg-[#101524] border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Strictly Necessary</span>
                    <span className="text-[10px] font-mono uppercase bg-azure/15 text-azure-bright px-1.5 py-0.5 rounded">Required</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Essential for navigation, session security, and honeypot protection. Cannot be deactivated.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 text-azure rounded cursor-not-allowed opacity-60"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 bg-[#101524] border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-white">Performance &amp; Analytics</span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Aggregated metrics (Google Analytics 4) to monitor page speed and popular content. No personal tracking.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 text-azure focus:ring-azure rounded cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3.5 bg-[#101524] border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-white">Marketing &amp; Attributed Leads</span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Used to measure conversion effectiveness from campaigns and prevent duplicate lead attributions.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 text-azure focus:ring-azure rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <Link
                href="/privacy"
                className="text-xs text-azure-bright hover:underline font-medium"
                onClick={() => setShowModal(false)}
              >
                Read Privacy Policy
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(preferences)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-azure to-violet rounded-lg hover:shadow-md"
                >
                  Save Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
