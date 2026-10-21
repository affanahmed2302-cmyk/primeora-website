'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICE_PILLARS } from '@/config/brand';
import { Globe, Search, UserCheck, Zap, BarChart3, Wrench, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'digital-presence': Globe,
  'customer-acquisition': Search,
  'lead-sales-systems': UserCheck,
  'operations-automation': Zap,
  'analytics-insights': BarChart3,
  'ongoing-management': Wrench,
};

export default function InteractiveServiceExplorer() {
  const [activeId, setActiveId] = useState<string>('digital-presence');

  const activePillar = SERVICE_PILLARS.find((p) => p.id === activeId) || SERVICE_PILLARS[0];
  const ActiveIcon = iconMap[activePillar.id] || Globe;

  return (
    <div className="w-full">
      {/* Asymmetric 2-Column Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Practice Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {SERVICE_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.id] || Globe;
            const isSelected = pillar.id === activeId;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveId(pillar.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38] ${
                  isSelected
                    ? 'bg-white dark:bg-[#141312] border-[#C25E38] dark:border-[#E07A5F] shadow-sm'
                    : 'bg-[#F4EFEA]/70 dark:bg-[#141312]/40 border-[#E5DDD0] dark:border-[#242220] hover:border-[#C4BAA9] dark:hover:border-[#33302C]'
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#C25E38]/10 text-[#C25E38] dark:bg-[#E07A5F]/20 dark:text-[#E07A5F]'
                      : 'bg-[#EAE4DC] dark:bg-[#1C1A18] text-[#7C7469] dark:text-[#7A7368]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono text-[11px] font-bold text-[#C25E38] dark:text-[#E07A5F]">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EAE4DC] dark:bg-[#1C1A18] text-[#5A544E] dark:text-[#9E9689]">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold font-sans transition-colors ${
                      isSelected
                        ? 'text-[#191817] dark:text-[#FBF9F5]'
                        : 'text-[#5A544E] dark:text-[#9E9689]'
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#7C7469] dark:text-[#7A7368] line-clamp-1 mt-0.5">
                    {pillar.shortDescription}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Architectural Viewport (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5DDD0] dark:border-[#242220]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#C25E38]/10 dark:bg-[#E07A5F]/20 text-[#C25E38] dark:text-[#E07A5F] flex items-center justify-center">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold">
                  PRACTICE AREA SPECIFICATION
                </span>
                <h3 className="text-2xl font-bold text-[#191817] dark:text-[#FBF9F5] font-sans">
                  {activePillar.title}
                </h3>
              </div>
            </div>

            <Link
              href={`/services/${activePillar.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C25E38] dark:text-[#E07A5F] hover:underline"
            >
              <span>Full Practice Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Problem & Strategic Scope */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#7C7469] dark:text-[#7A7368] block mb-1">
                Target Operational Bottleneck
              </span>
              <p className="text-sm text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
                {activePillar.targetProblem}
              </p>
            </div>

            {/* Deliverables Overview */}
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#7C7469] dark:text-[#7A7368] block mb-3">
                Key Deliverables Handed Over
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePillar.deliverablesSummary.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-[#FBF9F5] dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#242220] text-xs text-[#191817] dark:text-[#FBF9F5]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific Services Included */}
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-[#7C7469] dark:text-[#7A7368] block mb-2">
                Engineered Capabilities
              </span>
              <div className="space-y-2">
                {activePillar.services.slice(0, 3).map((svc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]"
                  >
                    <h4 className="text-xs font-bold text-[#191817] dark:text-[#FBF9F5] mb-0.5">
                      {svc.title}
                    </h4>
                    <p className="text-[11px] text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA & Handover Banner */}
            <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5A544E] dark:text-[#9E9689]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F]" />
                <span>Response SLA: <strong>1–2 Business Days</strong></span>
              </div>

              <Link
                href={`/services/${activePillar.id}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#C25E38] hover:bg-[#A34520] dark:bg-[#E07A5F] dark:hover:bg-[#F08E73] text-white dark:text-[#090807] text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Read Full Specifications &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
