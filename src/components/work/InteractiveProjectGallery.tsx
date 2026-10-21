'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  LineChart,
  MessageSquare,
  Network,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ProjectDossier {
  id: string;
  num: string;
  category: string;
  title: string;
  scenarioNote: string;
  problem: string;
  solution: string;
  stack: string[];
  outcomes: string[];
  visualSchematic: {
    type: string;
    headline: string;
    metrics: { label: string; value: string }[];
    architectureNodes: string[];
  };
}

const DOSSIERS: ProjectDossier[] = [
  {
    id: 'healthcare-clinic',
    num: '01',
    category: 'Healthcare & Specialized Practice',
    title: 'Multi-Channel Patient Triage & Appointment Automation',
    scenarioNote: 'Operational Concept Architecture for Multi-Doctor Clinics',
    problem:
      'High enquiry abandonment from simultaneous phone calls and unstructured Instagram DMs. Reception staff manually logged patient records in paper ledgers, causing missed consultations and delayed follow-ups.',
    solution:
      'Engineered an edge Next.js portal integrated with official WhatsApp Business API triage. Enquiries are pre-screened based on medical specialty, routed to available doctor slots, and confirmed via automated SMS/WhatsApp calendar links.',
    stack: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Business API', 'PostgreSQL', 'Calendar Webhook API'],
    outcomes: [
      'Automated triage response under 2 minutes 24/7',
      'Zero enquiries lost between shift rotations',
      'Unified executive appointment view for practice leadership',
    ],
    visualSchematic: {
      type: 'Triage Flow',
      headline: 'WhatsApp API Gateway -> PostgreSQL Calendar Sync',
      metrics: [
        { label: 'Triage Speed', value: '< 90 sec' },
        { label: 'Lead Capture', value: '100%' },
        { label: 'Admin Hours Saved', value: '12 hrs/wk' },
      ],
      architectureNodes: ['Multi-channel Inbound', 'Honeypot Filter', 'Specialty Routing', 'Calendar Event API'],
    },
  },
  {
    id: 'b2b-engineering-consultancy',
    num: '02',
    category: 'Professional Services & Consulting',
    title: 'High-Authority Web Platform & Structured RFP Pipeline',
    scenarioNote: 'Operational Concept Architecture for Engineering Firms',
    problem:
      'A boutique civil engineering practice suffered from a legacy slow-loading website that failed to showcase technical credentials or capture commercial project specifications.',
    solution:
      'Architected a high-contrast editorial web presence with semantic JSON-LD schema for Answer Engine Optimization (AEO), combined with a structured RFP enquiry portal that collects project square footage, location, and timeline before notifying partners.',
    stack: ['Next.js App Router', 'TypeScript', 'AEO Schema Markup', 'PostgreSQL Pipeline', 'Team Webhooks'],
    outcomes: [
      'Sub-second Core Web Vitals on mobile and desktop',
      'Structured RFP qualification saving partners hours of manual calls',
      'Instant notification dispatch to designated project leads',
    ],
    visualSchematic: {
      type: 'AEO & RFP Architecture',
      headline: 'AEO Entity Graph -> Structured RFP Scoping Engine',
      metrics: [
        { label: 'LCP Benchmark', value: '0.76s' },
        { label: 'AEO Entities', value: '14 Mapped' },
        { label: 'RFP Completeness', value: '100% Fielded' },
      ],
      architectureNodes: ['Answer Engine Crawl', 'Semantic JSON-LD', 'RFP Scoping Form', 'Partner Instant Alert'],
    },
  },
  {
    id: 'specialized-manufacturing',
    num: '03',
    category: 'Wholesale & Specialized Manufacturing',
    title: 'B2B Product Catalogue & Automated GST Invoicing Pipeline',
    scenarioNote: 'Operational Concept Architecture for Wholesale Distributors',
    problem:
      'Distributors ordered via scattered phone messages. Office clerks spent substantial time manually calculating GST slabs, generating PDF invoices, and emailing confirmations.',
    solution:
      'Built a private distributor ordering portal connected directly to accounting software webhooks. Invoices are generated with compliant GSTIN calculations and dispatched instantly upon order approval.',
    stack: ['Next.js', 'PostgreSQL', 'Accounting Webhook API', 'Serverless Automation', 'Transactional Email'],
    outcomes: [
      'Automated invoice generation eliminating repetitive administrative re-entry',
      'Error-handled webhook pipeline with automated failure alerts',
      'Real-time inventory level synchronization preventing backorder disputes',
    ],
    visualSchematic: {
      type: 'Billing Pipeline',
      headline: 'Distributor Portal -> GST Calculation -> PDF Dispatch',
      metrics: [
        { label: 'Invoice Generation', value: 'Instant' },
        { label: 'GST Accuracy', value: '100% Rule-based' },
        { label: 'Paper Reduction', value: '100% Digital' },
      ],
      architectureNodes: ['Distributor Portal', 'Payment Webhook', 'GST Engine', 'Accounting Ledger Sync'],
    },
  },
];

export default function InteractiveProjectGallery() {
  const [activeDossier, setActiveDossier] = useState(0);
  const current = DOSSIERS[activeDossier];

  return (
    <div className="space-y-12">
      {/* Dossier Selection Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-[#141312] p-2 rounded-2xl border border-[#E5DDD0] dark:border-[#242220] shadow-xs">
        {DOSSIERS.map((d, idx) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActiveDossier(idx)}
            className={`flex-1 min-w-[200px] p-3.5 sm:p-4 rounded-xl text-left transition-all ${
              activeDossier === idx
                ? 'bg-[#FAF6F0] dark:bg-[#1C1A18] border border-[#C25E38] dark:border-[#E07A5F] shadow-xs'
                : 'bg-transparent border border-transparent hover:bg-[#FAF6F0]/50 dark:hover:bg-[#181715]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                Dossier 0{idx + 1}
              </span>
              {activeDossier === idx && (
                <span className="w-2 h-2 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
              )}
            </div>
            <div className="text-xs sm:text-sm font-bold font-sans text-[#191817] dark:text-[#FBF9F5] line-clamp-1">
              {d.title}
            </div>
          </button>
        ))}
      </div>

      {/* Main Dossier Detail Spread with Live Visual Stage */}
      <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (6 cols): Problem, Solution & Outcomes */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-bold">
                  Dossier 0{activeDossier + 1} · {current.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] tracking-tight">
                {current.title}
              </h2>
              <span className="inline-block mt-2 px-2.5 py-1 bg-[#FAF6F0] dark:bg-[#1C1A18] text-[#7C7469] dark:text-[#8E867C] border border-[#E5DDD0] dark:border-[#242220] text-xs font-mono rounded">
                {current.scenarioNote}
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold block">
                The Operational Bottleneck:
              </span>
              <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                {current.problem}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-xs font-mono uppercase text-[#1065FF] font-semibold block">
                Primeora Engineered Solution:
              </span>
              <p className="text-sm text-[#3D3833] dark:text-[#D4CDC3] font-serif leading-relaxed">
                {current.solution}
              </p>
            </div>

            {/* Stack Tags */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {current.stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#FAF6F0] dark:bg-[#1C1A18] text-[#191817] dark:text-[#FBF9F5] border border-[#E5DDD0] dark:border-[#242220] rounded text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Outcomes */}
            <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] space-y-2">
              <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold block">
                Verified System Capabilities:
              </span>
              <ul className="space-y-1.5 text-xs font-serif text-[#5A544E] dark:text-[#9E988F]">
                {current.outcomes.map((out, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1065FF] flex-shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (6 cols): Visual Architecture Viewport */}
          <div className="lg:col-span-6 bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0] dark:border-[#242220]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1065FF]" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#191817] dark:text-[#FBF9F5]">
                  {current.visualSchematic.type}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                Schematic 0{activeDossier + 1}
              </span>
            </div>

            <div className="text-xs font-mono font-semibold text-[#1065FF]">
              {current.visualSchematic.headline}
            </div>

            {/* Visual Architecture Nodes */}
            <div className="space-y-2">
              {current.visualSchematic.architectureNodes.map((node, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-[#191817] dark:text-[#FBF9F5]">
                    Node {i + 1}: {node}
                  </span>
                  <span className="text-green-600 font-bold">Active</span>
                </div>
              ))}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
              {current.visualSchematic.metrics.map((m, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] text-center">
                  <div className="text-sm sm:text-base font-bold font-mono text-[#C25E38] dark:text-[#E07A5F]">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#7C7469] dark:text-[#8E867C] mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#7C7469]">
                Full repository transfer included
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
              >
                <span>Discuss Similar Scope</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
