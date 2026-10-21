'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, FileCode2, Rocket, TrendingUp, CheckCircle2, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

const PHASES = [
  {
    step: '01',
    id: 'discovery',
    title: 'Discovery & Scope',
    duration: '3–5 Business Days',
    tagline: 'Understanding commercial reality before prescribing technology.',
    icon: Compass,
    clientInput: 'Access to existing channels, sales workflow audit, and prioritized business bottlenecks.',
    deliverable: 'Technical Requirements Specification (TRS) with explicitly defined project boundaries.',
    gate: 'Mutual sign-off on scope boundaries and technical architecture before coding.',
  },
  {
    step: '02',
    id: 'blueprint',
    title: 'Architecture Blueprint',
    duration: '5–8 Business Days',
    tagline: 'Architecting the full system specification before authoring production code.',
    icon: FileCode2,
    clientInput: 'Brand assets, service catalogue review, and milestone schedule confirmation.',
    deliverable: 'Clickable interactive UI prototypes, database schema, and third-party API mapping.',
    gate: 'Approved design prototypes, data models, and milestone schedule.',
  },
  {
    step: '03',
    id: 'build-launch',
    title: 'Build & Verified Launch',
    duration: '2–4 Weeks',
    tagline: 'Engineering with production discipline and automated verification.',
    icon: Rocket,
    clientInput: 'Page copy sign-off, domain DNS cooperation, and staging review confirmation.',
    deliverable: 'Live production release on global CDN with SSL, security headers, and enquiry routing.',
    gate: '100% automated test pass rate, zero critical console errors, and verified live test enquiry.',
  },
  {
    step: '04',
    id: 'grow-optimize',
    title: 'Grow & Optimize',
    duration: 'Quarterly Sprints',
    tagline: 'Iterative refinement based on empirical usage telemetry.',
    icon: TrendingUp,
    clientInput: 'Monthly executive briefing on lead quality, revenue attribution, and roadmap priorities.',
    deliverable: 'Monthly Performance Dashboards, proactive security patches, and optimization sprints.',
    gate: 'Adherence to 99.9% uptime SLA and quarterly alignment on key business objectives.',
  },
];

export default function ProcessTimelineView() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Directional Progress Stepper Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {PHASES.map((p, idx) => {
          const Icon = p.icon;
          const isActive = activeStep === idx;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38] ${
                isActive
                  ? 'bg-white dark:bg-[#141312] border-[#C25E38] dark:border-[#E07A5F] shadow-sm'
                  : 'bg-[#F4EFEA]/60 dark:bg-[#141312]/30 border-[#E5DDD0] dark:border-[#242220] hover:border-[#C4BAA9] dark:hover:border-[#33302C]'
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#C25E38] dark:text-[#E07A5F]">
                  PHASE {p.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C25E38] dark:text-[#E07A5F]' : 'text-[#7C7469] dark:text-[#7A7368]'}`} />
              </div>

              <h3 className="text-sm font-bold text-[#191817] dark:text-[#FBF9F5] mb-1 font-sans">
                {p.title}
              </h3>

              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C25E38] dark:text-[#E07A5F]" />
                <span>{p.duration}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-10 shadow-sm">
        {(() => {
          const curr = PHASES[activeStep];
          const Icon = curr.icon;

          return (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DDD0] dark:border-[#242220]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C25E38]/10 dark:bg-[#E07A5F]/20 text-[#C25E38] dark:text-[#E07A5F] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#C25E38] dark:text-[#E07A5F]">
                      PHASE {curr.step} SPECIFICATION
                    </span>
                    <h3 className="text-2xl font-bold text-[#191817] dark:text-[#FBF9F5] font-sans">
                      {curr.title}
                    </h3>
                  </div>
                </div>

                <Link
                  href="/process"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                >
                  <span>Review Complete 4-Step Methodology &rarr;</span>
                </Link>
              </div>

              <p className="text-base text-[#5A544E] dark:text-[#9E9689] font-serif leading-relaxed">
                {curr.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-xl bg-[#FBF9F5] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#7C7469] dark:text-[#7A7368] block mb-1">
                    Client Input Required
                  </span>
                  <p className="text-xs text-[#191817] dark:text-[#FBF9F5] leading-relaxed">
                    {curr.clientInput}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#7C7469] dark:text-[#7A7368] block mb-1">
                    Tangible Deliverable
                  </span>
                  <p className="text-xs text-[#191817] dark:text-[#FBF9F5] leading-relaxed font-medium">
                    {curr.deliverable}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#242220] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-[#7C7469] dark:text-[#7A7368] block">
                    Quality Gate Enforcement
                  </span>
                  <p className="text-xs text-[#191817] dark:text-[#FBF9F5] mt-0.5">
                    {curr.gate}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
