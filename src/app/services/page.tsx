import React from 'react';
import type { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, Search, UserCheck, Zap, BarChart3, Wrench, ShieldCheck } from 'lucide-react';
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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>PRACTICE PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Six Connected Service Practices
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
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
                className="bg-[#08152B] border border-white/[0.08] rounded-xl p-7 flex flex-col justify-between hover:border-[#166CFF]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#040D1A] border border-white/10 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      0{idx + 1} / {pillar.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 font-sans group-hover:text-[#3B82F6] transition-colors">
                    {pillar.title}
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {pillar.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-white/[0.06] mb-6">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {pillar.deliverablesSummary.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#166CFF] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/services/${pillar.id}`}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors pt-2"
                >
                  <span>Read Full Scope &amp; Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Packages Tier Section */}
      <PackagesSection />

      {/* Engagement Scoping Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Have unique operational requirements?
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              We also design bespoke single-pillar engagements or cross-pillar digital transformations. Schedule a 30-minute discovery consultation with our technical partners.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors flex-shrink-0"
          >
            <span>Discuss Custom Scope →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
