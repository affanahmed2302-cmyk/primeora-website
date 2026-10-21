import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import SpatialPracticeLedger from '@/components/services/SpatialPracticeLedger';
import PackagesSection from '@/components/PackagesSection';
import KineticTextReveal from '@/components/motion/KineticTextReveal';
import MagneticWrapper from '@/components/motion/MagneticWrapper';

export const metadata: Metadata = {
  title: 'Engineering Practices & Service Systems | Primeora Solutions',
  description:
    'Comprehensive breakdown of Primeora Solutions’ six engineering practices: Digital Presence, Customer Acquisition, Lead Systems, Automation, Analytics, and Turnkey Management.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/services',
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
            Practice Directory
          </span>

          <KineticTextReveal
            text="Six connected engineering practices."
            highlightWord="practices."
            highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5] mb-4"
          />

          <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] leading-relaxed font-serif">
            We don’t sell fragmented gigs or superficial redesigns. We architect and maintain an interconnected system covering your web infrastructure, search discovery, enquiry pipeline, operations, and leadership intelligence.
          </p>
        </div>
      </div>

      {/* Spatial Practice Ledger (Skiper UI Expandable Architecture) */}
      <div className="mb-24">
        <SpatialPracticeLedger />
      </div>

      {/* Commercial Engagement Tiers */}
      <PackagesSection />

      {/* Direct Scope Consultation CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1065FF] font-semibold block">
              Architectural Advisory
            </span>
            <h3 className="text-2xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
              Need guidance scoping your engineering requirements?
            </h3>
            <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
              Take our 6-dimension Digital Readiness Assessment or speak directly with our founding partners. We evaluate your operational bottlenecks and deliver an objective architectural proposal.
            </p>
            <div className="pt-2 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
              We aim to respond to enquiries within 1–2 business days.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5] bg-[#FAF6F0] dark:bg-[#1C1A18] hover:bg-[#EFECE6] dark:hover:bg-[#242220] border border-[#E5DDD0] dark:border-[#242220] rounded-md transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>Run Diagnostic (3 mins)</span>
            </Link>

            <MagneticWrapper strength={0.2}>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm"
              >
                <span>Consult with Partners</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
