'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICE_PILLARS } from '@/config/brand';
import { Globe, Search, UserCheck, Zap, BarChart3, Wrench, ArrowRight } from 'lucide-react';

const iconMap = {
  'digital-presence': Globe,
  'customer-acquisition': Search,
  'lead-sales-systems': UserCheck,
  'operations-automation': Zap,
  'analytics-insights': BarChart3,
  'ongoing-management': Wrench,
};

export default function ServicePillarsSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-editorial-canvas dark:bg-[#121110] border-b border-[#E5DDD0] dark:border-[#2C2926] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4EFEA] dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>PRACTICE PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-ink dark:text-[#FBF9F5] tracking-tight font-sans">
            Six Connected Service Pillars
          </h2>
          <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-2xl font-serif">
            Primeora does not sell fragmented deliverables. We engineer an interconnected business system where each pillar reinforces your customer acquisition and daily operations.
          </p>
        </div>

        {/* 6-Pillar Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.id] || Globe;
            return (
              <div
                key={pillar.id}
                className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-7 flex flex-col justify-between hover:border-[#C25E38]/50 dark:hover:border-[#E07A5F]/40 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#FBF9F5] dark:bg-[#24221F] border border-[#DDD5C7] dark:border-[#383430] flex items-center justify-center text-[#C25E38] dark:text-[#E07A5F] group-hover:border-[#C25E38]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                      0{idx + 1} / {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-editorial-ink dark:text-[#FBF9F5] mb-2.5 font-sans group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-6">
                    {pillar.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926]">
                    <p className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] mb-2.5 font-medium">Key Deliverables:</p>
                    <ul className="space-y-1.5 mb-6">
                      {pillar.deliverablesSummary.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-[#3D3833] dark:text-[#D4CDC3] flex items-start gap-2">
                          <span className="text-[#C25E38] dark:text-[#E07A5F] mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/services/${pillar.id}`}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors pt-2"
                >
                  <span>Explore Practice Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 bg-[#F4EFEA] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <p className="text-sm font-semibold text-editorial-ink dark:text-[#FBF9F5] font-sans">
              Need a tailored combination across multiple practice areas?
            </p>
            <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mt-0.5">
              We structure custom implementation scopes or turnkey retainer partnerships based on your operational bottlenecks.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5] bg-white dark:bg-[#22201D] hover:bg-[#EAE4DC] dark:hover:bg-[#2C2926] border border-[#DDD5C7] dark:border-[#383430] rounded-md transition-colors flex-shrink-0 shadow-xs"
          >
            <span>Compare Package Tiers →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
