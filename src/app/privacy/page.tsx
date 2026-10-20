import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Data Protection & Information Handling — Primeora Solutions',
  description:
    'Read Primeora Solutions’ transparent privacy policy explaining how we collect, protect, and process data from enquiries and website visitors.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-azure-bright" />
          <span>Governance &amp; Compliance</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 font-mono mb-8">
          Last updated: 20 October 2026 &middot; Operating Entity: {BRAND_CONFIG.legalEntity}
        </p>

        <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed space-y-6">
          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">1. Enterprise Identity &amp; Data Controller</h2>
            <p>
              This website is operated by <strong>{BRAND_CONFIG.legalEntity}</strong> (Udyam Registered MSME: <code>{BRAND_CONFIG.udyamRegistrationNumber}</code>), conducting digital systems engineering and commercial consultancy as <strong>{BRAND_CONFIG.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to transparent, lawful, and secure data handling in compliance with applicable Indian information technology and digital personal data protection laws.
            </p>
          </section>

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">2. Information We Collect</h2>
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

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">3. How We Use Your Information</h2>
            <p>Information submitted to Primeora Solutions is used solely for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Reviewing project fit and responding to your direct commercial enquiry.</li>
              <li>Preparing customized architecture proposals and engagement scopes.</li>
              <li>Maintaining operational security, preventing unauthorized access, and halting bot spam.</li>
            </ul>
            <p className="font-medium text-azure-bright">
              We never sell, rent, monetize, or disclose your contact information or project specifications to external data brokers or advertisers. Zero spam.
            </p>
          </section>

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">4. Data Storage &amp; Durability</h2>
            <p>
              Project enquiries are stored in a secured Supabase PostgreSQL database located in the Asia South (Mumbai) region with Row Level Security (RLS) policies enabled. Client data is never stored unencrypted or exposed to public query endpoints.
            </p>
          </section>

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">5. Your Data Rights &amp; Contact</h2>
            <p>
              You have the right to request access to, correction of, or permanent deletion of your submitted enquiry information. To exercise these rights, email our data privacy lead at{' '}
              <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="text-azure-bright hover:underline">
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
