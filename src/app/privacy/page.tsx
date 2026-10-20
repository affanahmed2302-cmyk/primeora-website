import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Data Protection & Information Handling | Primeora Solutions',
  description:
    'Read Primeora Solutions’ transparent privacy policy explaining how we collect, protect, and process data from enquiries and website visitors.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>Governance &amp; Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 font-mono mb-10">
          Last updated: 20 October 2026 · Operating Entity: {BRAND_CONFIG.legalEntity} (Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber})
        </p>

        <div className="text-sm text-slate-300 leading-relaxed space-y-6">
          <section className="space-y-3 bg-[#08152B] border border-white/[0.08] p-6 sm:p-7 rounded-xl">
            <h2 className="text-lg font-bold text-white font-sans">1. Enterprise Identity &amp; Data Controller</h2>
            <p>
              This website is operated by <strong>{BRAND_CONFIG.legalEntity}</strong> (Udyam Registered MSME: <code>{BRAND_CONFIG.udyamRegistrationNumber}</code>), conducting digital systems engineering and commercial consultancy as <strong>{BRAND_CONFIG.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to transparent, lawful, and secure data handling in compliance with applicable Indian information technology and digital personal data protection laws.
            </p>
          </section>

          <section className="space-y-3 bg-[#08152B] border border-white/[0.08] p-6 sm:p-7 rounded-xl">
            <h2 className="text-lg font-bold text-white font-sans">2. Information We Collect</h2>
            <p>We collect only the minimum information necessary to communicate regarding prospective consulting projects and monitor website performance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>
                <strong className="text-white">Project Enquiry Data:</strong> Full name, business or venture name, work email address, phone number (optional), target project scope, and problem descriptions submitted via our enquiry form.
              </li>
              <li>
                <strong className="text-white">Technical &amp; Security Metadata:</strong> Truncated IP hashes, browser user agent strings, and request timestamps used strictly for rate limiting, bot rejection, and spam mitigation.
              </li>
              <li>
                <strong className="text-white">Aggregated Analytics (Subject to Consent):</strong> If you consent to performance cookies, anonymized usage statistics are collected via Google Analytics 4 to understand page visits and loading performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3 bg-[#08152B] border border-white/[0.08] p-6 sm:p-7 rounded-xl">
            <h2 className="text-lg font-bold text-white font-sans">3. How Information is Processed &amp; Stored</h2>
            <p>
              Submitted enquiry information is persisted securely in our dedicated database (hosted in the AWS Mumbai, India region with Row Level Security) and delivered via serverless notification webhooks. We do not sell, rent, or lease prospective client information to third-party brokers, marketing lists, or advertising networks.
            </p>
          </section>

          <section className="space-y-3 bg-[#08152B] border border-white/[0.08] p-6 sm:p-7 rounded-xl">
            <h2 className="text-lg font-bold text-white font-sans">4. Consent &amp; Cookie Preferences</h2>
            <p>
              You may manage or revoke your consent for performance analytics cookies at any time via our{' '}
              <Link href="/cookie-preferences" className="text-[#3B82F6] underline hover:text-white">
                Cookie Preferences
              </Link>{' '}
              portal. Essential security tokens used to authenticate session access and prevent CSRF attacks remain active to protect application integrity.
            </p>
          </section>

          <section className="space-y-3 bg-[#08152B] border border-white/[0.08] p-6 sm:p-7 rounded-xl">
            <h2 className="text-lg font-bold text-white font-sans">5. Contacting the Data Controller</h2>
            <p>
              For data access, correction requests, or questions regarding our privacy practices, contact our designated privacy lead at:{' '}
              <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="text-[#3B82F6] hover:underline font-semibold">
                {BRAND_CONFIG.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
