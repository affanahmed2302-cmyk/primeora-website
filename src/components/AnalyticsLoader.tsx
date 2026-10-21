'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { CookiePreferences } from './CookieBanner';
import { trackPageView } from '@/lib/analytics';

function NavigationTracker({
  gaId,
  consentGranted,
}: {
  gaId: string;
  consentGranted: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid double counting on the very first page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!consentGranted || !pathname || pathname.startsWith('/admin')) {
      return;
    }

    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams, consentGranted, gaId]);

  return null;
}

export default function AnalyticsLoader() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-9JN6EWLSXV';
  const pathname = usePathname();
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check initial stored consent
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem('primeora_cookie_consent_v1');
        if (stored) {
          const parsed: CookiePreferences = JSON.parse(stored);
          setConsentGranted(Boolean(parsed.analytics));
        }
      } catch {
        setConsentGranted(false);
      }
    };

    checkConsent();

    // Listen for consent updates from CookieBanner
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      setConsentGranted(Boolean(customEvent.detail?.analytics));
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
  }, []);

  // Exclude admin routes entirely from GA tracking
  const isAdmin = pathname?.startsWith('/admin');

  if (!gaId || !consentGranted || isAdmin) {
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
      <Suspense fallback={null}>
        <NavigationTracker gaId={gaId} consentGranted={consentGranted} />
      </Suspense>
    </>
  );
}
