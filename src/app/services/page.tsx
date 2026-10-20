import React from 'react';
import type { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, Search, UserCheck, Zap, BarChart3, Wrench } from 'lucide-react';
import PackagesSection from '@/components/PackagesSection';

const iconMap = {
  'digital-presence': Globe,
  'customer-acquisition': Search,
  'lead-sales-systems': UserCheck,
  'operations-automation': Zap,
  'analytics-insights': BarChart3,
  'ongoing-management': Wrench,
};

export const metadata: Metadata = {
  title: 'Engineering Practices & Package Tiers | Primeora Solutions',
  description:
    'Detailed breakdown of Primeora Solutions’ six engineering practices: Digital Presence, Customer Acquisition, Lead Systems, Automation, Analytics, and Turnkey Management.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/services',
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>PRACTICE PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Six Connected Service Practices
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            We don’t sell fragmented gigs. We architect and maintain an interconnected system covering your website, search discovery, enquiry pipeline, operations, and leadership intelligence.
          </p>
        </div>
      </div>

      {/* Practice Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.id] || Globe;
            return (
              <div
                key={pillar.id}
                className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-7 flex flex-col justify-between hover:border-[#C25E38]/50 dark:hover:border-[#E07A5F]/40 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FBF9F5] dark:bg-[#24221F] border border-[#DDD5C7] dark:border-[#383430] flex items-center justify-center text-[#C25E38] dark:text-[#E07A5F]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                      0{idx + 1} / {pillar.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-editorial-ink dark:text-[#FBF9F5] mb-2 font-sans group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors">
                    {pillar.title}
                  </h2>

                  <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-6">
                    {pillar.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] mb-6">
                    <span className="text-[11px] font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block mb-2 font-medium">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {pillar.deliverablesSummary.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-[#3D3833] dark:text-[#D4CDC3] flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/services/${pillar.id}`}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors"
                >
                  <span>Explore Practice Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commercial Packages Section */}
      <PackagesSection />

      {/* Direct Scope Consultation CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans mb-3 text-editorial-ink dark:text-[#FBF9F5]">
          Unsure Which Package Tier Fits Your Growth Stage?
        </h2>
        <p className="text-sm text-[#5A544E] dark:text-[#A8A196] max-w-xl mx-auto mb-6 font-serif">
          Schedule a technical discovery call. We diagnose your bottleneck first and recommend the leanest scope that solves it.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm group"
        >
          <span>Request Technical Scope Consultation</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
