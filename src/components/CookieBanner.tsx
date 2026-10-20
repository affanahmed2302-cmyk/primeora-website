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
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl shadow-xl p-5 animate-in slide-in-from-bottom-4 transition-all text-editorial-ink dark:text-[#FBF9F5]"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-[#FBF9F5] dark:bg-[#24221F] text-[#C25E38] dark:text-[#E07A5F] rounded-lg flex-shrink-0 border border-[#DDD5C7] dark:border-[#383430]">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-sans font-bold text-editorial-ink dark:text-[#FBF9F5]">
                Privacy &amp; Data Preferences
              </h2>
              <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mt-1 leading-relaxed">
                We use strictly essential cookies for site functionality and security. Optional analytics help us understand aggregate traffic only if you explicitly consent.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-md transition-colors shadow-xs"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5] bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-md hover:bg-[#EAE4DC] dark:hover:bg-[#2C2926] transition-colors shadow-xs"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-2.5 py-1.5 text-xs font-medium text-[#C25E38] dark:text-[#E07A5F] hover:underline flex items-center gap-1"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl shadow-2xl max-w-lg w-full p-6 relative text-editorial-ink dark:text-[#FBF9F5]">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-[#7C7469] dark:text-[#8E867C] hover:text-editorial-ink dark:hover:text-white rounded-md hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Close preferences modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <Shield className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F]" />
              <h2 id="cookie-modal-title" className="text-lg font-sans font-bold text-editorial-ink dark:text-[#FBF9F5]">
                Cookie &amp; Privacy Settings
              </h2>
            </div>
            <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mb-5 leading-relaxed font-serif">
              Customize which categories of cookies and tracking technologies you permit. You can update these settings at any time via the footer link.
            </p>

            <div className="space-y-3 mb-6">
              {/* Essential */}
              <div className="p-3.5 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-editorial-ink dark:text-[#FBF9F5]">Strictly Necessary</span>
                    <span className="text-[10px] font-mono uppercase bg-[#C25E38]/15 text-[#C25E38] dark:text-[#E07A5F] px-1.5 py-0.5 rounded font-semibold">Required</span>
                  </div>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mt-0.5">
                    Essential for navigation, session security, and honeypot protection. Cannot be deactivated.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  aria-label="Strictly Necessary Cookies (Required)"
                  className="w-4 h-4 text-[#C25E38] rounded cursor-not-allowed opacity-60"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-editorial-ink dark:text-[#FBF9F5]">Performance &amp; Analytics</span>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mt-0.5">
                    Aggregated metrics (Google Analytics 4) to monitor page speed and popular content. No personal tracking.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 text-[#C25E38] focus:ring-[#C25E38] rounded cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3.5 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-editorial-ink dark:text-[#FBF9F5]">Marketing &amp; Attributed Leads</span>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mt-0.5">
                    Used to measure conversion effectiveness from campaigns and prevent duplicate lead attributions.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 text-[#C25E38] focus:ring-[#C25E38] rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926]">
              <Link
                href="/privacy"
                className="text-xs text-[#C25E38] dark:text-[#E07A5F] hover:underline font-medium"
                onClick={() => setShowModal(false)}
              >
                Read Privacy Policy
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#5A544E] dark:text-[#A8A196] bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-md hover:text-editorial-ink dark:hover:text-white"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(preferences)}
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-md transition-colors shadow-xs"
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
