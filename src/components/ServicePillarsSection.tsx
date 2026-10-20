'use client';

import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState(SERVICE_PILLARS[0].id);
  const activePillar = SERVICE_PILLARS.find((p) => p.id === activeTab) || SERVICE_PILLARS[0];
  const ActiveIcon = iconMap[activePillar.id] || Globe;

  return (
    <section id="services" className="py-20 md:py-28 bg-[#07090F] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Portfolio Architecture</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Six Connected Service Pillars
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            Rather than isolated tasks, our services integrate into a unified system that supports every stage of client acquisition and daily operations.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-2 sm:gap-3">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.id] || Globe;
            const isActive = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveTab(pillar.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-azure to-violet text-white shadow-[0_4px_20px_rgba(61,110,245,0.4)] border border-azure-bright/50'
                    : 'bg-[#0B0F1A] text-slate-400 hover:text-white hover:bg-[#121829] border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Card */}
        <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Pillar Overview & Deliverables Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-azure/20 to-violet/20 border border-azure/30 text-azure-bright rounded-xl">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono font-semibold text-violet-light">
                    {activePillar.badge}
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activePillar.shortDescription}
              </p>

              <div className="p-4 bg-[#101524] border border-white/10 rounded-xl">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Target Friction Addressed:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activePillar.targetProblem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-3">
                  Key Scope Deliverables:
                </h4>
                <ul className="space-y-2">
                  {activePillar.deliverablesSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href={`/services#${activePillar.id}`}
                  className="inline-flex items-center text-sm font-semibold text-azure-bright hover:text-white transition-colors group"
                >
                  <span>Read full specifications &amp; boundaries</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Concrete Services in Pillar */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Included Service Modules:
              </h4>

              <div className="space-y-4">
                {activePillar.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#101524] border border-white/10 rounded-xl hover:border-azure/30 transition-colors"
                  >
                    <h5 className="font-['Space_Grotesk'] text-base font-bold text-white mb-1.5">
                      {service.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {service.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-slate-300"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
