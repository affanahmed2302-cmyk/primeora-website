'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  FileCode2,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Layers,
  FolderGit2,
  Database,
  Network,
  Activity,
} from 'lucide-react';

interface PhaseDetail {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  blueprintLayer: string;
  inputs: string[];
  engineeringWork: string[];
  deliverable: string;
  assurance: string;
}

const PHASES: PhaseDetail[] = [
  {
    id: 'discovery',
    step: 'PHASE 01',
    title: 'Discovery & Operational Audit',
    subtitle: 'Inspecting current bottlenecks, lost enquiry channels, and technical debt.',
    blueprintLayer: 'Layer 1: Diagnostic Wireframe & Friction Map',
    inputs: [
      'DNS & domain registrar access',
      'Current ad account & analytics read-access',
      'Lead handling workflow & team interview',
    ],
    engineeringWork: [
      'Core Web Vitals mobile performance benchmark',
      'Enquiry response latency measurement',
      'Data re-entry & spreadsheet friction assessment',
    ],
    deliverable: 'Objective Technical Audit & Architecture Scope Document',
    assurance: 'Fixed milestone schedule · Zero ambiguous estimates',
  },
  {
    id: 'blueprint',
    step: 'PHASE 02',
    title: 'Architecture Blueprint',
    subtitle: 'Authoring database schema, API contracts, and conversion typography.',
    blueprintLayer: 'Layer 2: Technical Schematics & Schema Graph',
    inputs: [
      'Approved brand copy & high-res vector assets',
      'Payment gateway merchant credentials',
      'CRM pipeline stage requirements',
    ],
    engineeringWork: [
      'PostgreSQL transactional relational schema design',
      'Next.js 15 App Router component & page hierarchy',
      'Schema.org JSON-LD microdata entity mapping',
    ],
    deliverable: 'Complete Interactive Prototype & Signed Engineering Spec',
    assurance: 'Full architectural sign-off before production coding',
  },
  {
    id: 'build',
    step: 'PHASE 03',
    title: 'Build & Edge Launch',
    subtitle: 'Writing clean code, passing automated tests, and edge CDN deployment.',
    blueprintLayer: 'Layer 3: Production Code & Automated Security Pipeline',
    inputs: [
      'Production API keys & environment secrets',
      'Google Business Profile manager access',
      'Team WhatsApp Business recipient phone numbers',
    ],
    engineeringWork: [
      'Sub-second edge frontend compilation with Tailwind CSS',
      'Honeypot bot filtering & timing attack protection',
      'Automated 60-check pre-deployment audit verification',
    ],
    deliverable: 'Live Production Deployment on Global Edge CDN',
    assurance: 'Zero downtime cutover · 100% test pass verified',
  },
  {
    id: 'grow',
    step: 'PHASE 04',
    title: 'Handover & Continuous Stewardship',
    subtitle: 'Direct repository transfer, 30-day warranty, and proactive SLA.',
    blueprintLayer: 'Layer 4: Sovereign Ownership & SLA Telemetry',
    inputs: [
      'Client GitHub organization or team handle',
      'DNS name server confirmation',
      'Designated escalation point of contact',
    ],
    engineeringWork: [
      'Complete Git repository & copyright assignment transfer',
      '24/7 automated ping monitoring from 5 global locations',
      'Weekly security dependency patches & uptime checks',
    ],
    deliverable: 'Full GitHub IP Transfer + 30-Day Complete Warranty',
    assurance: '1–2 business day SLA response · 100% Client Ownership',
  },
];

export default function ProgressiveArchitecturalBlueprint() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = PHASES[activePhase];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-10 shadow-xs">
        {/* Header Bar with Interactive Phase Stepper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5DDD0] dark:border-[#242220]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-1">
              Progressive Architecture Construction
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
              How the System Develops Across 4 Stages
            </h2>
          </div>

          {/* Stepper Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#FAF6F0] dark:bg-[#1A1917] p-1.5 rounded-xl border border-[#E5DDD0] dark:border-[#242220]">
            {PHASES.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePhase(idx)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activePhase === idx
                    ? 'bg-[#1065FF] text-white font-bold shadow-xs'
                    : 'text-[#5A544E] dark:text-[#9E988F] hover:text-[#191817] dark:hover:text-white'
                }`}
              >
                0{idx + 1} {p.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint Visual Layer & Detailed Phase Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          {/* Left Column (5 cols): Visual Blueprint Layer Simulation */}
          <div className="lg:col-span-5 bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-xs font-mono font-bold text-[#1065FF] uppercase">
                {phase.blueprintLayer}
              </span>
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                Stage 0{activePhase + 1}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {activePhase === 0 && (
                  <div className="p-4 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] space-y-2 text-xs font-mono">
                    <div className="text-[#C25E38] dark:text-[#E07A5F] font-bold">Diagnostic Scopes</div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Benchmark LCP across 3G/4G/WiFi
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Audit lead capture loss &amp; spam
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Map manual data re-entry bottlenecks
                    </div>
                  </div>
                )}

                {activePhase === 1 && (
                  <div className="p-4 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] space-y-2 text-xs font-mono">
                    <div className="text-[#1065FF] font-bold">System Architecture Layer</div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • PostgreSQL Table Schemas &amp; Indexes
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Next.js App Router Route Tree
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • AEO JSON-LD Knowledge Graph
                    </div>
                  </div>
                )}

                {activePhase === 2 && (
                  <div className="p-4 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] space-y-2 text-xs font-mono">
                    <div className="text-green-600 font-bold">Production Build &amp; Edge CDN</div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • 60 / 60 Automated E2E Checks Passing
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Sub-second Edge Rendering (&lt; 0.8s)
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Zero-Loss Inbound Webhook Bus
                    </div>
                  </div>
                )}

                {activePhase === 3 && (
                  <div className="p-4 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] space-y-2 text-xs font-mono">
                    <div className="text-[#C25E38] dark:text-[#E07A5F] font-bold">Sovereign Handover Package</div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • Complete GitHub Repository Transfer
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • 30-Day Zero-Cost Bug Warranty
                    </div>
                    <div className="text-[11px] text-[#5A544E] dark:text-[#9E988F]">
                      • 1–2 Business Day Partner SLA Active
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="p-2.5 rounded bg-white dark:bg-[#1A1917] border border-[#E5DDD0] dark:border-[#242220] text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C] flex items-center justify-between">
              <span>Commitment Standard:</span>
              <span className="text-[#1065FF] font-bold">{phase.assurance}</span>
            </div>
          </div>

          {/* Right Column (7 cols): Narrative & Deliverable Dossier */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold">
                {phase.step}
              </span>
              <h3 className="text-2xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mt-1">
                {phase.title}
              </h3>
              <p className="text-sm sm:text-base text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed mt-2">
                {phase.subtitle}
              </p>
            </div>

            {/* Two-Column Grid: Inputs vs Engineering Work */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
              <div className="space-y-2">
                <span className="font-mono uppercase font-semibold text-[#191817] dark:text-[#FBF9F5] flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
                  <span>Client Dependencies:</span>
                </span>
                <ul className="space-y-1.5 text-[#5A544E] dark:text-[#9E988F]">
                  {phase.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#7C7469] mt-0.5">•</span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-mono uppercase font-semibold text-[#191817] dark:text-[#FBF9F5] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#1065FF]" />
                  <span>Engineering Undertaken:</span>
                </span>
                <ul className="space-y-1.5 text-[#5A544E] dark:text-[#9E988F]">
                  {phase.engineeringWork.map((work, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1065FF] flex-shrink-0 mt-0.5" />
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Handover Deliverable Box */}
            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold">
                  Handover Deliverable
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                  {phase.deliverable}
                </span>
              </div>
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
