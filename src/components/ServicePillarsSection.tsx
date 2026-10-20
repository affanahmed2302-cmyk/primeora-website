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
    <section id="services" className="py-20 md:py-28 bg-[#040D1A] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>PRACTICE PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Six Connected Service Pillars
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
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
                className="bg-[#08152B] border border-white/[0.08] rounded-xl p-7 flex flex-col justify-between hover:border-[#166CFF]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#040D1A] border border-white/10 flex items-center justify-center text-[#3B82F6] group-hover:border-[#166CFF]/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      0{idx + 1} / {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 font-sans group-hover:text-[#3B82F6] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {pillar.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <p className="text-xs font-mono uppercase text-slate-500 mb-2.5">Key Deliverables:</p>
                    <ul className="space-y-1.5 mb-6">
                      {pillar.deliverablesSummary.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-[#166CFF] mt-0.5">•</span>
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
                  <span>Explore Practice Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 bg-[#08152B] border border-white/[0.08] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white font-sans">
              Need a tailored combination across multiple practice areas?
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              We structure custom implementation scopes or turnkey retainer partnerships based on your operational bottlenecks.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#040D1A] hover:bg-[#0E1F3D] border border-white/10 rounded-md transition-colors flex-shrink-0"
          >
            <span>Compare Package Tiers →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
