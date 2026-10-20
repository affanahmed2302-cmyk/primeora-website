import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Data Protection & Information Handling',
  description:
    'Read Ritkara Veyra and Primeora Solutions’ transparent privacy policy explaining how we collect, protect, and process data from enquiries and website visitors.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-teal" />
          <span>Governance & Compliance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-charcoal-muted font-mono mb-8">
          Last updated: 20 October 2026 &middot; Operating Entity: {BRAND_CONFIG.legalEntity}
        </p>

        <div className="prose prose-slate max-w-none text-sm text-charcoal leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">1. Enterprise Identity & Data Controller</h2>
            <p>
              This website is operated by <strong>{BRAND_CONFIG.legalEntity}</strong> (Udyam Registered MSME: <code>{BRAND_CONFIG.udyamRegistrationNumber}</code>), operating under the trade and working brand <strong>{BRAND_CONFIG.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to transparent, lawful, and secure data handling in compliance with applicable Indian information technology and digital personal data protection laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">2. Information We Collect</h2>
            <p>We collect only the minimum information necessary to communicate regarding prospective consulting projects and monitor website performance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
              <li>
                <strong>Project Enquiry Data:</strong> Full name, business or venture name, work email address, phone number (optional), target project scope, and problem descriptions submitted via our enquiry form.
              </li>
              <li>
                <strong>Technical & Security Metadata:</strong> Truncated IP hashes, browser user agent strings, and request timestamps used strictly for rate limiting, bot rejection, and spam mitigation.
              </li>
              <li>
                <strong>Aggregated Analytics (Subject to Consent):</strong> If you consent to performance cookies, anonymized usage statistics are collected via Google Analytics 4 to understand page visits and loading performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">3. How We Use Your Information</h2>
            <p>Information submitted to Ritkara Veyra is used solely for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
              <li>Reviewing project fit and responding to your direct commercial enquiry.</li>
              <li>Preparing customized architecture proposals and engagement scopes.</li>
              <li>Maintaining operational security, preventing unauthorized access, and halting bot spam.</li>
            </ul>
            <p className="font-medium text-forest">
              We never sell, rent, monetize, or disclose your contact information or project specifications to external data brokers or advertisers. Zero spam.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">4. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses strictly necessary cookies to ensure navigation, form security, and rate limiting. Non-essential cookies (such as analytics scripts) are strictly gated and do not load unless you grant affirmative consent via our consent banner. You may review and update your preferences at any time via our{' '}
              <Link href="/cookie-preferences" className="text-teal underline font-medium">
                Cookie Preferences
              </Link>{' '}
              page or the link in the footer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">5. Data Retention and Security</h2>
            <p>
              Enquiries are retained in our secure, access-restricted database only for the duration required to evaluate the commercial engagement and fulfill ongoing contractual or audit requirements. All data in transit is encrypted using modern TLS (HTTPS) with strict HTTP Strict Transport Security (HSTS) headers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">6. Your Data Rights & Contact Information</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal contact data from our active enquiry registers. To exercise these rights or raise inquiries regarding our privacy governance, contact our data protection representative at:
            </p>
            <div className="p-4 bg-ivory-light border border-border-subtle rounded-md font-mono text-xs">
              <p>Email: <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="text-forest underline">{BRAND_CONFIG.contactEmail}</a></p>
              <p>Operating Entity: {BRAND_CONFIG.legalEntity}</p>
              <p>Location: {BRAND_CONFIG.location}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
