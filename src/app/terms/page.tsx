import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Engagement Governance | Primeora Solutions',
  description:
    'Terms of use governing the Primeora Solutions website and commercial engagement boundaries.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 w-fit shadow-xs">
          <Shield className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
          <span>Legal Disclosures</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-sans text-editorial-ink dark:text-[#FBF9F5]">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-[#7C7469] dark:text-[#8E867C] font-mono mb-10">
          Last updated: 21 October 2026 · Operating Entity: {BRAND_CONFIG.legalEntity} (Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber})
        </p>

        <div className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed space-y-6">
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">1. Enterprise Identity &amp; Brand Governance</h2>
            <p>
              These Terms and Conditions govern the use of this website. This website is owned and operated directly by <strong>{BRAND_CONFIG.legalEntity}</strong> (Udyam Registered MSME: <code>{BRAND_CONFIG.udyamRegistrationNumber}</code>, Bangalore, Karnataka), conducting commercial advisory, software engineering, and digital systems consulting as <strong>{BRAND_CONFIG.name}</strong>.
            </p>
          </section>

          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">2. Informational Purpose &amp; No Unilateral Warranty</h2>
            <p>
              The content, service descriptions, package tiers, and architectural case models presented on this website are for informational and planning purposes only. They do not constitute a binding unilateral offer to deliver specific outcomes. Formal client engagements require a customized Discovery and a mutually executed written Service Agreement specifying agreed deliverables, milestone pricing, and client dependencies.
            </p>
          </section>

          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">3. Service Agreement Precedence</h2>
            <p>
              When a client engages our practice for software engineering, website development, CRM integration, automation, or analytics, the relationship is governed by the specific written <strong>Primeora Solutions Service Agreement</strong> and project proposal agreed between the parties. In the event of any conflict between this website copy and an executed Service Agreement, the executed Service Agreement shall govern.
            </p>
          </section>

          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">4. Intellectual Property &amp; Handover</h2>
            <p>
              Upon final milestone payment, full ownership and repository rights of custom deliverables authored specifically for the client transfer to the client. Pre-existing proprietary utilities, shared open-source libraries, and reusable scripts remain licensed under standard commercial or open-source terms.
            </p>
          </section>

          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising out of the use of this website or formal engagements shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
