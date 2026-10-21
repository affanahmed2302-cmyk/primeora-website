'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_PILLARS } from '@/config/brand';
import { ChevronDown, ArrowRight, CheckCircle2, Clock, Shield, Sparkles } from 'lucide-react';

export default function SpatialPracticeLedger() {
  const [activePillarId, setActivePillarId] = useState<string>(SERVICE_PILLARS[0].id);

  return (
    <div className="w-full">
      {/* Full-Width Typographic Rows (Skiper UI Spatial Pattern) */}
      <div className="divide-y divide-[#E5DDD0] dark:divide-[#242220] border-y border-[#E5DDD0] dark:border-[#242220]">
        {SERVICE_PILLARS.map((pillar, idx) => {
          const isActive = activePillarId === pillar.id;
          const indexStr = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={pillar.id}
              className={`transition-colors duration-200 ${
                isActive
                  ? 'bg-white/60 dark:bg-[#141312]/60'
                  : 'hover:bg-[#F4EFEA]/40 dark:hover:bg-[#141312]/30'
              }`}
            >
              {/* Row Trigger */}
              <button
                type="button"
                onClick={() => setActivePillarId(isActive ? '' : pillar.id)}
                className="w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38]"
                aria-expanded={isActive}
              >
                {/* Number & Pillar Title */}
                <div className="flex items-start md:items-center gap-4 sm:gap-8 min-w-[280px] lg:min-w-[360px]">
                  <span className="font-mono text-sm sm:text-base font-semibold text-[#7C7469] dark:text-[#8E867C]">
                    {indexStr}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] tracking-tight">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] block mt-0.5 font-medium">
                      {pillar.badge}
                    </span>
                  </div>
                </div>

                {/* Mid: Target Bottleneck & Deliverable Preview */}
                <div className="hidden lg:block max-w-md text-xs text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                  <p className="line-clamp-2">{pillar.shortDescription}</p>
                </div>

                {/* Right: Expand Indicator */}
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-xs font-mono font-medium text-[#7C7469] dark:text-[#8E867C] hidden sm:inline">
                    {isActive ? 'Close Specifications' : 'Inspect Architecture'}
                  </span>
                  <div
                    className={`p-2 rounded-full border border-[#DDD5C7] dark:border-[#2C2926] bg-[#F4EFEA] dark:bg-[#1A1917] text-[#191817] dark:text-white transition-transform duration-200 ${
                      isActive ? 'rotate-180 bg-[#C25E38] dark:bg-[#E07A5F] text-white border-transparent' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Expandable Architectural Workbench (Skiper UI Motion Transition) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                    className="overflow-hidden bg-[#FAF6F0] dark:bg-[#0E0D0C] border-t border-[#E5DDD0] dark:border-[#242220]"
                  >
                    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Col 1: Operational Diagnostic */}
                        <div className="space-y-4">
                          <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold">
                            Target Bottleneck Solved
                          </span>
                          <p className="text-sm text-[#3D3833] dark:text-[#D4CDC3] leading-relaxed font-serif">
                            {pillar.targetProblem}
                          </p>

                          <div className="pt-3 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center gap-2 text-xs font-mono text-[#5A544E] dark:text-[#9E988F]">
                            <Clock className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
                            <span>Delivery Timeframe: 2 to 4 weeks</span>
                          </div>
                        </div>

                        {/* Col 2: Verified Deliverables */}
                        <div className="space-y-3">
                          <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold">
                            Core Engineering Deliverables
                          </span>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3]">
                            {pillar.deliverablesSummary.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#1065FF] flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Col 3: Capabilities & Action Link */}
                        <div className="space-y-4 flex flex-col justify-between bg-white dark:bg-[#141312] p-6 rounded-xl border border-[#E5DDD0] dark:border-[#242220]">
                          <div>
                            <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold mb-3">
                              Engineered Capabilities
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {pillar.services.map((srv, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 text-xs font-mono bg-[#F4EFEA] dark:bg-[#1C1A18] border border-[#DDD5C7] dark:border-[#2C2926] rounded text-[#3D3833] dark:text-[#D4CDC3]"
                                >
                                  {srv.title}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between">
                            <Link
                              href={`/services/${pillar.id}`}
                              className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                            >
                              <span>Full Architectural Specification</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </Link>

                            <Link
                              href={`/contact?pillar=${pillar.id}`}
                              className="px-3 py-1.5 bg-[#C25E38] hover:bg-[#A34520] text-white text-xs font-mono font-medium rounded transition-colors"
                            >
                              Scope Project
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
