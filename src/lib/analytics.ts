'use client';

/**
 * Primeora Solutions — Privacy-First Analytics Module
 * Strictly gates telemetry behind user cookie consent.
 * Strictly excludes administrative routes (/admin/*).
 * Enforces zero Personally Identifiable Information (PII).
 */

export interface GAEventParams {
  [key: string]: string | number | boolean | undefined;
}

export interface LeadEventParams extends GAEventParams {
  service_category?: string;
  timeline?: string;
}

export interface ReadinessEventParams extends GAEventParams {
  score?: number;
  tier?: string;
}

export interface CtaClickEventParams extends GAEventParams {
  cta_label: string;
  cta_location: string;
  destination: string;
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-9JN6EWLSXV';

/**
 * Checks if the visitor has explicitly granted analytics consent
 * via the Primeora Cookie Preferences dialog.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem('primeora_cookie_consent_v1');
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return Boolean(parsed.analytics);
  } catch {
    return false;
  }
}

/**
 * Checks if the given path is an administrative or internal route.
 */
export function isAdminRoute(path?: string): boolean {
  if (typeof window === 'undefined') return false;
  const currentPath = path || window.location.pathname;
  return currentPath.startsWith('/admin');
}

/**
 * Strips any potential PII keys from event payload before dispatching.
 */
function sanitizeEventParams(params?: GAEventParams): Record<string, unknown> {
  if (!params) return {};
  const prohibitedKeys = [
    'email',
    'phone',
    'name',
    'fullname',
    'full_name',
    'businessname',
    'business_name',
    'message',
    'summary',
    'notes',
    'password',
    'token',
  ];

  const sanitized: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(params)) {
    if (val === undefined || val === null) continue;
    if (prohibitedKeys.includes(key.toLowerCase())) continue;
    sanitized[key] = val;
  }
  return sanitized;
}

/**
 * Tracks a custom event in Google Analytics 4 if consent is active
 * and the user is on a public route.
 */
export function trackEvent(eventName: string, params?: GAEventParams): void {
  if (typeof window === 'undefined') return;
  if (isAdminRoute()) return;
  if (!hasAnalyticsConsent()) return;

  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    const sanitized = sanitizeEventParams(params);
    w.gtag('event', eventName, sanitized);
  }
}

/**
 * Tracks route change page views for Next.js App Router client-side navigation.
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined') return;
  if (isAdminRoute(url)) return;
  if (!hasAnalyticsConsent()) return;

  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function' && GA_MEASUREMENT_ID) {
    w.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || (typeof document !== 'undefined' ? document.title : undefined),
      anonymize_ip: true,
    });
  }
}
