import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import { Shield, Scale, FileCheck, AlertCircle, Building2, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Engagement Governance & Commercial Terms | Primeora Solutions',
  description:
    'Terms and commercial governance conditions governing website use and digital consulting engagements for Primeora Solutions in accordance with Indian commercial law.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-sans text-editorial-ink dark:text-[#FBF9F5]">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-[#7C7469] dark:text-[#8E867C] font-mono mb-10">
          Last revised: 21 October 2026 &middot; Operating Entity: {BRAND_CONFIG.legalEntity} (Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber}) &middot; Jurisdiction: Bengaluru, Karnataka, India
        </p>

        <div className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed space-y-6">
          {/* Section 1: Entity Identification */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C25E38]" />
              <span>1. Enterprise Identity &amp; Corporate Status</span>
            </h2>
            <p>
              This website is owned and operated by <strong>{BRAND_CONFIG.legalEntity}</strong>, registered with the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India under Udyam Registration Number <code>{BRAND_CONFIG.udyamRegistrationNumber}</code> (Classification: Micro Enterprise, Services), trading commercially as <strong>{BRAND_CONFIG.name}</strong> (&ldquo;Primeora Solutions&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p className="text-xs text-[#7C7469] dark:text-[#8E867C]">
              Principal Address: {BRAND_CONFIG.registeredAddress} &middot; Official Contact: {BRAND_CONFIG.officialEmail} &middot; {BRAND_CONFIG.contactPhone}.
            </p>
          </section>

          {/* Section 2: Website Use & Scope */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#C25E38]" />
              <span>2. Informational Purpose &amp; Non-Binding Quotations</span>
            </h2>
            <p>
              Case studies, service tier outlines, estimated delivery ranges, and technical architectures published on this website are provided solely for general informational and commercial scoping purposes. They do not constitute an irrevocable unilateral offer or guarantee of specific performance.
            </p>
            <p>
              Formal client engagements require a dedicated discovery workshop and the mutual execution of an individualized, legally binding <strong>Primeora Solutions Master Services Agreement (MSA)</strong> and Statement of Work (SOW) outlining defined milestones, acceptance criteria, and fee schedules.
            </p>
          </section>

          {/* Section 3: Intellectual Property Handover */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#C25E38]" />
              <span>3. Intellectual Property Handover &amp; Licensing</span>
            </h2>
            <p>
              All software source code, bespoke application architectures, user interface assets, and custom databases developed specifically for a client under an executed Statement of Work become the exclusive intellectual property of the client upon receipt of full milestone payments.
            </p>
            <p className="text-xs text-[#7C7469] dark:text-[#8E867C]">
              Pre-existing software frameworks, generic automation scripts, third-party libraries, and open-source tools integrated into deliverables remain governed by their respective commercial or open-source licenses (e.g. MIT, Apache 2.0).
            </p>
          </section>

          {/* Section 4: Limitation of Liability */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#C25E38]" />
              <span>4. Limitation of Liability</span>
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, in no event shall Primeora Solutions, its founders, or contractors be liable for indirect, punitive, incidental, special, or consequential damages, including loss of profits, data corruption, or business interruption arising out of the use or inability to use this website.
            </p>
            <p>
              For formal client engagements, liability is strictly limited to the total fees actually received by Primeora Solutions under the specific Statement of Work giving rise to the claim during the preceding six (6) month period.
            </p>
          </section>

          {/* Section 5: Governing Law & Dispute Resolution */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#C25E38]" />
              <span>5. Governing Law &amp; Exclusive Jurisdiction</span>
            </h2>
            <p>
              These Terms, all commercial disclosures, and website operations are governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, including the Indian Contract Act, 1872, the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023.
            </p>
            <p>
              Any disputes, controversies, or claims arising out of or in connection with website use or services shall first be submitted to mutual amicable consultation for thirty (30) days. In the event mutual resolution cannot be achieved, the dispute shall be subject to the exclusive territorial jurisdiction of the competent courts of <strong>Bengaluru (Urban), Karnataka, India</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
