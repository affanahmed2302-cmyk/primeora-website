'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Globe,
  Search,
  UserCheck,
  Zap,
  BarChart3,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Layers,
  FileCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  Code2,
  Database,
  Network,
  Cpu,
  Activity,
  LineChart,
} from 'lucide-react';

interface PracticeItem {
  id: string;
  num: string;
  title: string;
  category: string;
  displaySubtitle: string;
  problemSummary: string;
  solutionOverview: string;
  deliverables: string[];
  clientInputs: string[];
  slaCommitment: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

const PRACTICES: PracticeItem[] = [
  {
    id: 'digital-presence',
    num: '01',
    category: 'Foundation & Infrastructure',
    title: 'Digital Presence & Engineered Web Platforms',
    displaySubtitle: 'Sub-second web performance, accessible architecture, and clear brand positioning.',
    problemSummary:
      'Most businesses rely on outdated page builders that load slowly on mobile, lack semantic metadata, and fail to convince visitors to take action.',
    solutionOverview:
      'We engineer bespoke Next.js web platforms with sub-second Core Web Vitals, accessible semantic structure, and conversion-focused typography.',
    deliverables: [
      'Custom Next.js App Router frontend & backend',
      'Semantic Schema.org JSON-LD microdata structure',
      'Mobile-first responsive architecture (< 1s LCP)',
      'Direct GitHub repository transfer & documentation',
    ],
    clientInputs: ['Approved text copy', 'High-res brand assets', 'Domain registrar credentials'],
    slaCommitment: 'Sub-second LCP benchmark · 100% Code Ownership',
    href: '/services/digital-presence',
    imageSrc: '/images/services/01-digital-presence.jpg',
    imageAlt: 'Engineered web platforms and digital presence architecture',
  },
  {
    id: 'customer-acquisition',
    num: '02',
    category: 'Search & Visibility',
    title: 'Answer Engine & Local Search Authority',
    displaySubtitle: 'Indexing your business where modern commercial discovery happens.',
    problemSummary:
      'Traditional keyword stuffing is obsolete. Modern buyers use AI answer engines (ChatGPT, Perplexity) and localized Google searches to find verified providers.',
    solutionOverview:
      'We construct Answer Engine Optimization (AEO) entity graphs, optimize Google Business Profile categories, and build high-authority local citations.',
    deliverables: [
      'AEO Schema.org knowledge graph architecture',
      'Google Business Profile audit & category mapping',
      'Local citation network & structured NAP consistency',
      'Answer engine entity indexing verification',
    ],
    clientInputs: ['Business registration proof', 'Official operating hours', 'Service catalogues'],
    slaCommitment: 'Full Entity Verification · Zero Spam Tactics',
    href: '/services/customer-acquisition',
    imageSrc: '/images/services/02-customer-acquisition.jpg',
    imageAlt: 'Search discoverability, answer engine optimization, and local authority',
  },
  {
    id: 'lead-sales-systems',
    num: '03',
    category: 'Pipeline & Conversion',
    title: 'Zero-Loss Lead Triage & CRM Systems',
    displaySubtitle: 'Capturing, verifying, and routing enquiries within seconds.',
    problemSummary:
      'When enquiries sit in an unmonitored email inbox for hours, prospective clients find alternative suppliers. Disconnected forms lose customer trust.',
    solutionOverview:
      'We integrate multi-channel enquiry capture (web forms, WhatsApp, booking links) directly into PostgreSQL and your CRM with instant team notifications.',
    deliverables: [
      'Honeypot-protected resilient web enquiry capture',
      'WhatsApp Business API team dispatch gateway (< 15s)',
      'PostgreSQL transactional database pipeline',
      'Automated CRM deal pipeline & client assignment',
    ],
    clientInputs: ['Current CRM access credentials', 'Enquiry routing hierarchy', 'WhatsApp Business phone'],
    slaCommitment: 'Sub-15 second team notifications · Zero lost leads',
    href: '/services/lead-sales-systems',
    imageSrc: '/images/services/03-lead-systems.jpg',
    imageAlt: 'Lead triage pipelines, database connectivity, and CRM integration',
  },
  {
    id: 'operations-automation',
    num: '04',
    category: 'Efficiency & Scale',
    title: 'Operations Automation & Billing Webhooks',
    displaySubtitle: 'Eliminating repetitive human data entry through connected workflows.',
    problemSummary:
      'Staff spending hours copying order data, generating manual invoices, and cross-checking bank payments creates high operational overhead and costly errors.',
    solutionOverview:
      'We engineer webhook-driven automations connecting payment gateways, automated GST billing calculations, order confirmations, and accounting software.',
    deliverables: [
      'Payment gateway webhook listener with retry logic',
      'Automated GST-compliant PDF invoice generation',
      'Accounting platform ledger synchronization',
      'Automated customer onboarding confirmation dispatch',
    ],
    clientInputs: ['Accounting platform API keys', 'GST tax slab rules', 'Merchant gateway credentials'],
    slaCommitment: '100% Hands-off Invoicing · Error-handled retries',
    href: '/services/operations-automation',
    imageSrc: '/images/services/04-operations-automation.jpg',
    imageAlt: 'Operations automation, payment gateway webhooks, and billing infrastructure',
  },
  {
    id: 'analytics-insights',
    num: '05',
    category: 'Intelligence & Decisions',
    title: 'Executive BI & Channel Attribution Cockpit',
    displaySubtitle: 'Replacing guesswork with real-time operational revenue telemetry.',
    problemSummary:
      'Business leadership often makes marketing and hiring decisions based on vague vanity metrics rather than true acquisition cost and conversion velocity.',
    solutionOverview:
      'We build dedicated business intelligence dashboards tracking end-to-end customer acquisition cost (CAC), channel ROI, and operational capacity in real time.',
    deliverables: [
      'Unified executive dashboard with custom SQL aggregates',
      'Cross-channel acquisition attribution modeling',
      'Conversion velocity and deal stage drop-off telemetry',
      'Automated weekly performance summary digest',
    ],
    clientInputs: ['Ad platform read access', 'Historical revenue data', 'Target KPI definitions'],
    slaCommitment: 'Real-time telemetry · Zero vanity metrics',
    href: '/services/analytics-insights',
    imageSrc: '/images/services/05-analytics-insights.jpg',
    imageAlt: 'Business intelligence telemetry, analytics, and executive attribution dashboards',
  },
  {
    id: 'ongoing-management',
    num: '06',
    category: 'Durability & SLA',
    title: 'Turnkey Systems Maintenance & 1–2 Day SLA',
    displaySubtitle: 'Proactive engineering stewardship to ensure continuous uptime and security.',
    problemSummary:
      'Software neglected after launch suffers from security vulnerabilities, broken third-party APIs, certificate expirations, and unmonitored downtime.',
    solutionOverview:
      'We provide disciplined ongoing stewardship: continuous 24/7 uptime monitoring, weekly security dependency patching, and our verified 1–2 business day SLA.',
    deliverables: [
      '24/7 automated uptime and response time monitoring',
      'Weekly npm/runtime security patches and upgrades',
      'Monthly performance audit and SEO health check',
      'Dedicated partner response within 1–2 business days',
    ],
    clientInputs: ['Domain DNS access', 'Cloud infrastructure hosting access'],
    slaCommitment: '1–2 business day SLA · 99.9% monitored uptime',
    href: '/services/ongoing-management',
    imageSrc: '/images/services/06-ongoing-management.jpg',
    imageAlt: 'High-availability server infrastructure, systems monitoring, and turnkey maintenance',
  },
];

export default function ScrollDrivenPracticeExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const activePractice = PRACTICES[activeIdx];

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Asymmetric Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (7 cols): Typography-Led Practice Index */}
        <div className="lg:col-span-7 space-y-12">
          {PRACTICES.map((practice, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={practice.id}
                onClick={() => setActiveIdx(idx)}
                className={`group p-8 sm:p-10 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#141312] border-[#C25E38] dark:border-[#E07A5F] shadow-sm'
                    : 'bg-[#FAF6F0] dark:bg-[#11100F] border-[#E5DDD0] dark:border-[#242220] hover:border-[#DDD5C7] dark:hover:border-[#33302C] opacity-80 hover:opacity-100'
                }`}
              >
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-[#C25E38] dark:text-[#E07A5F]">
                      {practice.num}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#7C7469] dark:text-[#8E867C]">
                      {practice.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#1065FF] dark:text-[#60A5FA] bg-[#1065FF]/10 px-2 py-0.5 rounded">
                    {practice.slaCommitment}
                  </span>
                </div>

                {/* Distinctive Display Heading */}
                <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#191817] dark:text-[#FBF9F5] mb-2 leading-tight">
                  {practice.title}
                </h3>

                <p className="text-base text-[#C25E38] dark:text-[#E07A5F] font-serif italic mb-4">
                  {practice.displaySubtitle}
                </p>

                <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed mb-6">
                  {practice.solutionOverview}
                </p>

                {/* Key Deliverables Overview */}
                <div className="pt-6 border-t border-[#E5DDD0] dark:border-[#242220] space-y-3">
                  <span className="text-xs font-mono uppercase text-[#191817] dark:text-[#FBF9F5] font-semibold flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#1065FF]" />
                    <span>Scope of Work Delivered:</span>
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif text-[#5A544E] dark:text-[#9E988F]">
                    {practice.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practice Link Action */}
                <div className="pt-6 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between">
                  <Link
                    href={practice.href}
                    className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                  >
                    <span>Inspect Complete {practice.title.split(' ')[0]} Specification</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                    Click to load visual stage
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (5 cols): Sticky Photographic Practice Stage */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="w-full bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-5 sm:p-7 shadow-xs flex flex-col justify-between">
            {/* Top Stage Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E5DDD0] dark:border-[#242220]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1065FF] animate-pulse" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5]">
                  Practice Visual Stage
                </span>
              </div>
              <span className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] font-bold">
                {activePractice.num} / 06
              </span>
            </div>

            {/* Central High-Resolution Photographic Canvas */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E5DDD0] dark:border-[#2C2926] shadow-md bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePractice.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activePractice.imageSrc}
                    alt={activePractice.imageAlt}
                    fill
                    priority
                    className="object-cover object-center filter contrast-[1.06] brightness-[0.92]"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />

                  {/* Editorial Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50" />

                  {/* Top-Left Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 backdrop-blur-md text-[#E07A5F] border border-white/20 shadow-xs">
                      PRACTICE {activePractice.num} · {activePractice.category}
                    </span>
                  </div>

                  {/* Top-Right SLA Chip */}
                  <div className="absolute top-3 right-3 z-10 hidden sm:block">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-sky-300 bg-sky-950/70 backdrop-blur-md border border-sky-400/30">
                      {activePractice.slaCommitment.split('·')[0].trim()}
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-white">
                    <div className="text-[11px] font-mono text-[#60A5FA] mb-1">
                      {activePractice.slaCommitment}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-sans tracking-tight text-white leading-snug">
                      {activePractice.title}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Structured Practice Blueprint Card */}
            <div className="mt-4 p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E5DDD0] dark:border-[#2C2926] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#5A544E] dark:text-[#9E988F] uppercase font-semibold">
                  Required Inputs:
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Client Verified</span>
              </div>
              <p className="text-xs font-serif text-[#5A544E] dark:text-[#9E988F]">
                {activePractice.clientInputs.join(' · ')}
              </p>
            </div>

            {/* Bottom Active Information & Navigation */}
            <div className="pt-4 mt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between text-xs">
              <span className="font-mono text-[#7C7469] dark:text-[#8E867C]">
                Practice {activePractice.num} of 06
              </span>
              <Link
                href={activePractice.href}
                className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
              >
                <span>Full Practice Specification</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
