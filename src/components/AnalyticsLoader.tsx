'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CookiePreferences } from './CookieBanner';

export default function AnalyticsLoader() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check initial stored consent
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem('ritkara_cookie_consent_v1');
        if (stored) {
          const parsed: CookiePreferences = JSON.parse(stored);
          setConsentGranted(Boolean(parsed.analytics));
        }
      } catch {
        setConsentGranted(false);
      }
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      setConsentGranted(Boolean(customEvent.detail?.analytics));
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
  }, []);

  // Do not load scripts if GA ID is missing or consent is not granted
  if (!gaId || !consentGranted) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
