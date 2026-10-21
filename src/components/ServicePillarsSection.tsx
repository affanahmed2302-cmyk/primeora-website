'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICE_PILLARS } from '@/config/brand';
import { Globe, Search, UserCheck, Zap, BarChart3, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <section id="services" className="py-20 md:py-28 bg-[#090807] border-b border-[#242220] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F]">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
            <span className="tracking-widest uppercase">Systemic Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F2EB] tracking-tight font-sans">
            Six Connected Service Pillars
          </h2>
          <p className="text-base text-[#9E988F] leading-relaxed max-w-2xl font-sans">
            Primeora does not sell fragmented deliverables or disjointed code. We engineer an interconnected business system where each pillar reinforces your customer acquisition and daily operations.
          </p>
        </div>

        {/* 6-Pillar Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.id] || Globe;
            return (
              <div
                key={pillar.id}
                className="bg-[#141312] border border-[#242220] hover:border-[#36332F] rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1C1A18] border border-[#242220] flex items-center justify-center text-[#E07A5F] group-hover:border-[#E07A5F]/40 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#9E988F] px-2.5 py-1 rounded bg-[#1C1A18] border border-[#242220]">
                      0{idx + 1} / {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F2EB] mb-2.5 font-sans group-hover:text-[#E07A5F] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#9E988F] leading-relaxed mb-6 font-sans">
                    {pillar.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#242220]">
                    <p className="text-xs font-mono uppercase text-[#E07A5F] mb-3 font-semibold">Key Deliverables:</p>
                    <ul className="space-y-2 mb-6">
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
                  className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#E07A5F] hover:text-[#F08E73] transition-colors gap-1.5 pt-2"
                >
                  <span>Explore Practice Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-8 bg-[#141312] border border-[#242220] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <p className="text-base font-bold text-[#F5F2EB] font-sans">
              Need a tailored architecture across multiple practice areas?
            </p>
            <p className="text-xs text-[#9E988F]">
              We structure custom implementation scopes or turnkey retainer partnerships based on your operational bottlenecks.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#F5F2EB] bg-[#1C1A18] hover:bg-[#242220] border border-[#242220] hover:border-[#36332F] rounded-lg transition-colors flex-shrink-0"
          >
            <span>Compare Package Tiers →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
