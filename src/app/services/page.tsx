import React from 'react';
import type { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, Search, UserCheck, Zap, BarChart3, Wrench, Clock, Compass } from 'lucide-react';
import InteractiveServiceExplorer from '@/components/services/InteractiveServiceExplorer';
import PackagesSection from '@/components/PackagesSection';

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-serif text-[#191817] dark:text-[#FBF9F5] mb-4">
            Six connected practice areas.
          </h1>
          <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E9689] leading-relaxed font-sans">
            We don’t sell fragmented gigs or superficial redesigns. We architect and maintain an interconnected system covering your web infrastructure, search discovery, enquiry pipeline, operations, and leadership intelligence.
          </p>
        </div>
      </div>

      {/* Asymmetric Interactive Practice Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <InteractiveServiceExplorer />
      </div>

      {/* Commercial Packages Section */}
      <PackagesSection />

      {/* Direct Scope Consultation CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl font-bold font-serif text-[#191817] dark:text-[#FBF9F5]">
              Need guidance scoping your engineering requirements?
            </h3>
            <p className="text-sm text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
              Take our 6-dimension Digital Readiness Assessment or speak directly with our founding partners. We evaluate your operational bottlenecks and deliver an objective architectural proposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5] bg-[#FBF9F5] dark:bg-[#1C1A18] hover:bg-[#EFECE6] dark:hover:bg-[#242220] border border-[#E5DDD0] dark:border-[#242220] rounded-lg transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>Run Diagnostic (3 mins)</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] dark:bg-[#E07A5F] dark:hover:bg-[#F08E73] dark:text-[#090807] rounded-lg transition-colors shadow-sm"
            >
              <span>Consult with Partners</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
