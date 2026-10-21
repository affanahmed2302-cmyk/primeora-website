import React from 'react';
import type { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, Search, UserCheck, Zap, BarChart3, Wrench, Clock } from 'lucide-react';
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
  title: 'Engineering Practices & Service Systems | Primeora Solutions',
  description:
    'Comprehensive breakdown of Primeora Solutions’ six engineering practices: Digital Presence, Customer Acquisition, Lead Systems, Automation, Analytics, and Turnkey Management.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/services',
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#090807] min-h-screen text-[#F5F2EB] transition-colors duration-200">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F]">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
            <span className="tracking-widest uppercase">Comprehensive Practice Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans text-[#F5F2EB]">
            Six Connected Service Practices
          </h1>
          <p className="text-base sm:text-lg text-[#9E988F] leading-relaxed font-sans">
            We don’t sell fragmented gigs or superficial redesigns. We architect and maintain an interconnected system covering your web infrastructure, search discovery, enquiry pipeline, operations, and leadership intelligence.
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
                className="bg-[#141312] border border-[#242220] hover:border-[#36332F] rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#1C1A18] border border-[#242220] flex items-center justify-center text-[#E07A5F] group-hover:border-[#E07A5F]/40 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#9E988F] px-2.5 py-1 rounded bg-[#1C1A18] border border-[#242220]">
                      0{idx + 1} / {pillar.badge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#F5F2EB] mb-2 font-sans group-hover:text-[#E07A5F] transition-colors">
                    {pillar.title}
                  </h2>

                  <p className="text-sm text-[#9E988F] leading-relaxed mb-6 font-sans">
                    {pillar.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#242220] mb-6">
                    <span className="text-xs font-mono uppercase text-[#E07A5F] block mb-3 font-semibold">
                      Standard Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {pillar.deliverablesSummary.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-[#C4BAA9] flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/services/${pillar.id}`}
                  className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#E07A5F] hover:text-[#F08E73] transition-colors gap-1.5"
                >
                  <span>Explore Practice Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commercial Packages Section */}
      <PackagesSection />

      {/* Direct Scope Consultation CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#141312] border border-[#242220] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl font-bold font-sans text-[#F5F2EB]">
              Need help deciding which practices your business requires?
            </h3>
            <p className="text-sm text-[#9E988F] leading-relaxed">
              Take our 6-dimension Digital Readiness Assessment or speak directly with our founding partners. We evaluate your bottlenecks and deliver an objective architectural proposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#F5F2EB] bg-[#1C1A18] hover:bg-[#242220] border border-[#242220] hover:border-[#36332F] rounded-lg transition-colors"
            >
              <span>Run Diagnostic (3 mins)</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors shadow-sm shadow-[#C25E38]/20"
            >
              <span>Consult with Partners</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
