'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
  ExternalLink,
} from 'lucide-react';

interface PracticeItem {
  id: string;
  num: string;
  title: string;
  category: string;
  shortCategory: string;
  displaySubtitle: string;
  problemSummary: string;
  solutionOverview: string;
  deliverables: string[];
  clientInputs: string[];
  slaCommitment: string;
  href: string;
}

const PRACTICES: PracticeItem[] = [
  {
    id: 'digital-presence',
    num: '01',
    category: 'Foundation & Infrastructure',
    shortCategory: 'Infrastructure',
    title: 'Digital Presence & Engineered Web Platforms',
    displaySubtitle: 'High-speed web performance, accessible architecture, and clear brand positioning.',
    problemSummary:
      'Most businesses rely on outdated page builders that load slowly on mobile, lack semantic metadata, and fail to convince visitors to take action.',
    solutionOverview:
      'We engineer bespoke Next.js web platforms with clean Core Web Vitals, accessible semantic structure, and conversion-focused typography.',
    deliverables: [
      'Custom Next.js App Router frontend & backend',
      'Semantic Schema.org JSON-LD microdata structure',
      'Mobile-first responsive architecture & performance tuning',
      'Direct GitHub repository transfer & documentation',
    ],
    clientInputs: ['Approved text copy', 'High-res brand assets', 'Domain registrar credentials'],
    slaCommitment: 'Clean Performance Architecture · 100% Code Ownership',
    href: '/services/digital-presence',
  },
  {
    id: 'customer-acquisition',
    num: '02',
    category: 'Search & Visibility',
    shortCategory: 'Search & AEO',
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
    slaCommitment: 'Structured Entity Verification · Zero Spam Tactics',
    href: '/services/customer-acquisition',
  },
  {
    id: 'lead-sales-systems',
    num: '03',
    category: 'Pipeline & Conversion',
    shortCategory: 'Lead Triage',
    title: 'Zero-Loss Lead Triage & CRM Systems',
    displaySubtitle: 'Capturing, verifying, and routing enquiries directly to partners.',
    problemSummary:
      'When enquiries sit in an unmonitored email inbox for hours, prospective clients find alternative suppliers. Disconnected forms lose customer trust.',
    solutionOverview:
      'We integrate multi-channel enquiry capture (web forms, WhatsApp, booking links) directly into PostgreSQL and your CRM with instant team notifications.',
    deliverables: [
      'Honeypot-protected resilient web enquiry capture',
      'WhatsApp Business API team dispatch gateway',
      'PostgreSQL transactional database pipeline',
      'Automated CRM deal pipeline & client assignment',
    ],
    clientInputs: ['Current CRM access credentials', 'Enquiry routing hierarchy', 'WhatsApp Business phone'],
    slaCommitment: 'Direct Partner Notification · Resilient Inbound Triage',
    href: '/services/lead-sales-systems',
  },
  {
    id: 'operations-automation',
    num: '04',
    category: 'Efficiency & Scale',
    shortCategory: 'Automations',
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
    slaCommitment: 'Event-Driven Invoicing · Error-Handled Webhooks',
    href: '/services/operations-automation',
  },
  {
    id: 'analytics-insights',
    num: '05',
    category: 'Intelligence & Decisions',
    shortCategory: 'BI & Analytics',
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
    slaCommitment: 'Attribution Modeling · Custom SQL Telemetry',
    href: '/services/analytics-insights',
  },
  {
    id: 'ongoing-management',
    num: '06',
    category: 'Durability & SLA',
    shortCategory: 'SLA Stewardship',
    title: 'Turnkey Systems Maintenance & 1–2 Day SLA',
    displaySubtitle: 'Proactive engineering stewardship to ensure continuous uptime and security.',
    problemSummary:
      'Software neglected after launch suffers from security vulnerabilities, broken third-party APIs, certificate expirations, and unmonitored downtime.',
    solutionOverview:
      'We provide disciplined ongoing stewardship: continuous 24/7 uptime monitoring, weekly security dependency patching, and our verified 1–2 business day SLA.',
    deliverables: [
      'Continuous uptime and API response time monitoring',
      'Weekly npm/runtime security patches and upgrades',
      'Monthly performance audit and SEO health check',
      'Dedicated partner response within 1–2 business days',
    ],
    clientInputs: ['Domain DNS access', 'Cloud infrastructure hosting access'],
    slaCommitment: '1–2 Business Day SLA · Proactive Maintenance',
    href: '/services/ongoing-management',
  },
];

export default function ScrollDrivenPracticeExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Deliberate viewing-region section activation calculator
  const computeActiveSection = useCallback(() => {
    if (isManualScrollRef.current) return;
    if (!sectionRefs.current.length) return;

    // Viewport activation threshold: 38% down from viewport top
    const triggerY = window.innerHeight * 0.38;
    let targetIdx = -1;

    for (let i = 0; i < sectionRefs.current.length; i++) {
      const el = sectionRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Primary check: section spans across the trigger line
      if (rect.top <= triggerY && rect.bottom >= triggerY) {
        targetIdx = i;
        break;
      }
    }

    // Boundary edge cases: above first section or below last section
    if (targetIdx === -1) {
      const firstEl = sectionRefs.current[0];
      const lastEl = sectionRefs.current[sectionRefs.current.length - 1];
      if (firstEl && firstEl.getBoundingClientRect().top > triggerY) {
        targetIdx = 0;
      } else if (lastEl && lastEl.getBoundingClientRect().bottom < triggerY) {
        targetIdx = sectionRefs.current.length - 1;
      }
    }

    if (targetIdx !== -1 && targetIdx !== activeIdxRef.current) {
      activeIdxRef.current = targetIdx;
      setActiveIdx(targetIdx);
    }
  }, []);

  // Jump to practice on tab click, card click, or keyboard activation
  const jumpToPractice = useCallback((idx: number) => {
    if (idx < 0 || idx >= PRACTICES.length) return;
    const targetEl = sectionRefs.current[idx];
    if (!targetEl) return;

    isManualScrollRef.current = true;
    if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);

    activeIdxRef.current = idx;
    setActiveIdx(idx);

    // Calculate smooth scroll offset with comfortable header clearance
    const rect = targetEl.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const targetOffset = currentScrollY + rect.top - (window.innerHeight * 0.22);

    window.scrollTo({
      top: Math.max(0, targetOffset),
      behavior: 'smooth',
    });

    // Update URL hash without causing an instant layout jump
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', `#${PRACTICES[idx].id}`);
    }

    // Release manual scroll flag after smooth scrolling finishes
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
      computeActiveSection();
    }, 700);
  }, [computeActiveSection]);

  // Set up scroll listeners, resize observer, and IntersectionObserver
  useEffect(() => {
    // Initial evaluation / Hash navigation check
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const matchedIdx = PRACTICES.findIndex((p) => p.id === hash);
      if (matchedIdx !== -1) {
        setTimeout(() => {
          jumpToPractice(matchedIdx);
        }, 120);
      } else {
        computeActiveSection();
      }
    } else {
      computeActiveSection();
    }

    // IntersectionObserver observing deliberate section visibility boundaries
    const observer = new IntersectionObserver(
      () => {
        computeActiveSection();
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.2, 0.5, 0.8, 1.0],
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Throttled passive scroll and resize listeners for immediate responsive updates
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        computeActiveSection();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    };
  }, [computeActiveSection, jumpToPractice]);

  const activePractice = PRACTICES[activeIdx];

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Quick Interactive Practice Navigation Tabs */}
      <div className="mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Practice disciplines navigation">
        <div className="flex items-center gap-2 min-w-max p-1.5 bg-[#FAF6F0] dark:bg-[#11100F] border border-[#E5DDD0] dark:border-[#242220] rounded-xl shadow-2xs">
          {PRACTICES.map((practice, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={practice.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={practice.id}
                onClick={() => jumpToPractice(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-[#1E1C1A] text-[#191817] dark:text-[#FBF9F5] shadow-xs border border-[#C25E38] dark:border-[#E07A5F]'
                    : 'text-[#7C7469] dark:text-[#8E867C] hover:text-[#191817] dark:hover:text-[#FBF9F5]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-[#1065FF]' : 'bg-[#E5DDD0] dark:bg-[#33302C]'}`} />
                <span className="font-bold text-[#C25E38] dark:text-[#E07A5F]">{practice.num}</span>
                <span className="hidden sm:inline">{practice.shortCategory}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column (7 cols): Typography-Led Practice Index */}
        <div className="lg:col-span-7 space-y-10 sm:space-y-12">
          {PRACTICES.map((practice, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={practice.id}
                id={practice.id}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                data-practice-index={idx}
                tabIndex={0}
                role="region"
                aria-label={`Practice ${practice.num}: ${practice.title}`}
                aria-current={isActive ? 'true' : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    jumpToPractice(idx);
                  }
                }}
                onClick={() => jumpToPractice(idx)}
                className={`group p-8 sm:p-10 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#141312] border-[#C25E38] dark:border-[#E07A5F] shadow-sm ring-1 ring-[#C25E38]/20 dark:ring-[#E07A5F]/20'
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

                {/* Practice Link Action & Status */}
                <div className="pt-6 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={practice.href}
                    className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                  >
                    <span>Inspect Complete {practice.title.split(' ')[0]} Specification</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C] flex items-center gap-1.5">
                    {isActive ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#1065FF] animate-pulse" />
                        <span className="text-[#1065FF] dark:text-[#60A5FA] font-semibold">Active in Architectural Stage</span>
                      </>
                    ) : (
                      <span>Scroll or click to view visual stage</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column / Mobile Top: Sticky Bespoke Vector Practice Stage */}
        <div className="order-first lg:order-last lg:col-span-5 sticky top-16 sm:top-20 lg:top-28 z-20 mb-8 lg:mb-0">
          <div className="w-full bg-[#FAF6F0]/95 dark:bg-[#141312]/95 backdrop-blur-md border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-4 sm:p-6 lg:p-7 shadow-sm flex flex-col justify-between">
            {/* Top Stage Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 sm:pb-3.5 sm:mb-4 border-b border-[#E5DDD0] dark:border-[#242220]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1065FF] animate-pulse" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5]">
                  Architectural Practice Stage
                </span>
              </div>
              <span className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] font-bold">
                {activePractice.num} / 06
              </span>
            </div>

            {/* Stage Progress Dots / Quick Navigation */}
            <div className="flex items-center gap-1.5 mb-3 w-full">
              {PRACTICES.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => jumpToPractice(idx)}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? 'bg-[#1065FF] dark:bg-[#60A5FA]'
                      : 'bg-[#E5DDD0] dark:bg-[#2C2926] hover:bg-[#C25E38]/40'
                  }`}
                  aria-label={`Jump to stage ${p.num}`}
                />
              ))}
            </div>

            {/* Central Bespoke Vector Architectural Canvas */}
            <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E5DDD0] dark:border-[#2C2926] bg-white dark:bg-[#121110] shadow-xs flex items-center justify-center p-3 sm:p-4">
              {/* Subtle Coordinate Grid */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePractice.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: shouldReduceMotion ? 0.05 : 0.28, ease: 'easeOut' }}
                  className="w-full h-full flex flex-col items-center justify-between"
                >
                  {/* Practice 01: Digital Presence */}
                  {activeIdx === 0 && (
                    <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="30" y="25" width="340" height="190" rx="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
                      <line x1="30" y1="55" x2="370" y2="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                      <circle cx="50" cy="40" r="3.5" fill="#EF4444" />
                      <circle cx="62" cy="40" r="3.5" fill="#F59E0B" />
                      <circle cx="74" cy="40" r="3.5" fill="#10B981" />
                      <rect x="95" y="32" width="160" height="16" rx="3" fill="currentColor" fillOpacity="0.06" />
                      <text x="105" y="44" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">
                        NEXT.JS APP ROUTER // EDGE
                      </text>

                      {/* Layout Hierarchy */}
                      <rect x="50" y="70" width="180" height="30" rx="4" fill="#1065FF" fillOpacity="0.1" stroke="#1065FF" strokeWidth="1" />
                      <text x="60" y="88" fill="#1065FF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                        SEMANTIC MICRODATA SCHEMA
                      </text>
                      <rect x="50" y="112" width="120" height="18" rx="3" fill="currentColor" fillOpacity="0.08" />
                      <rect x="50" y="136" width="200" height="12" rx="2" fill="currentColor" fillOpacity="0.05" />
                      <rect x="50" y="154" width="170" height="12" rx="2" fill="currentColor" fillOpacity="0.05" />

                      {/* Right CDN Cache Column */}
                      <rect x="260" y="70" width="90" height="125" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                      <text x="272" y="90" fill="currentColor" fillOpacity="0.7" fontSize="9" fontFamily="monospace">
                        GLOBAL CDN
                      </text>
                      <circle cx="305" cy="120" r="16" stroke="#1065FF" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="305" cy="120" r="6" fill="#1065FF" />
                      <text x="276" y="155" fill="#1065FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        EDGE CACHE
                      </text>
                      <text x="272" y="175" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        LCP TUNED
                      </text>
                    </svg>
                  )}

                  {/* Practice 02: Customer Acquisition */}
                  {activeIdx === 1 && (
                    <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Central Entity Hub */}
                      <circle cx="200" cy="120" r="35" fill="#C25E38" fillOpacity="0.1" stroke="#C25E38" strokeWidth="1.5" />
                      <text x="175" y="118" fill="#C25E38" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                        AEO ENTITY
                      </text>
                      <text x="180" y="132" fill="#C25E38" fontSize="8" fontFamily="monospace">
                        GRAPH
                      </text>

                      {/* Satellite 1: Local Pack */}
                      <rect x="40" y="45" width="110" height="40" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="52" y="63" fill="currentColor" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        GOOGLE MAPS
                      </text>
                      <text x="52" y="76" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        LocalBusiness NAP
                      </text>
                      <line x1="150" y1="75" x2="175" y2="100" stroke="#C25E38" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Satellite 2: AI Search Index */}
                      <rect x="250" y="45" width="115" height="40" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="262" y="63" fill="currentColor" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        AI ANSWER ENGINES
                      </text>
                      <text x="262" y="76" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        Perplexity &amp; ChatGPT
                      </text>
                      <line x1="260" y1="80" x2="225" y2="100" stroke="#C25E38" strokeWidth="1.5" />

                      {/* Satellite 3: Schema Knowledge */}
                      <rect x="140" y="175" width="120" height="40" rx="4" fill="#1065FF" fillOpacity="0.1" stroke="#1065FF" strokeWidth="1" />
                      <text x="152" y="193" fill="#1065FF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        SCHEMA.ORG JSON-LD
                      </text>
                      <text x="152" y="206" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        Entity Verification
                      </text>
                      <line x1="200" y1="155" x2="200" y2="175" stroke="#1065FF" strokeWidth="1.5" />
                    </svg>
                  )}

                  {/* Practice 03: Lead Systems */}
                  {activeIdx === 2 && (
                    <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Flow Step 1: Web Inbound */}
                      <rect x="25" y="90" width="85" height="55" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="35" y="112" fill="currentColor" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        WEB FORM
                      </text>
                      <text x="35" y="128" fill="#10B981" fontSize="8" fontFamily="monospace">
                        Honeypot OK
                      </text>

                      {/* Conduit Arrow 1 */}
                      <line x1="110" y1="118" x2="145" y2="118" stroke="#1065FF" strokeWidth="2" />
                      <polygon points="145,115 152,118 145,121" fill="#1065FF" />

                      {/* Flow Step 2: PostgreSQL Hub */}
                      <rect x="155" y="75" width="105" height="85" rx="6" fill="#1065FF" fillOpacity="0.1" stroke="#1065FF" strokeWidth="1.5" />
                      <text x="168" y="100" fill="#1065FF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                        POSTGRESQL
                      </text>
                      <text x="168" y="116" fill="currentColor" fillOpacity="0.7" fontSize="8" fontFamily="monospace">
                        ACID Ingestion
                      </text>
                      <line x1="168" y1="126" x2="245" y2="126" stroke="#1065FF" strokeWidth="0.5" strokeOpacity="0.4" />
                      <text x="168" y="142" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        Deduplication
                      </text>

                      {/* Conduit Arrow 2 */}
                      <line x1="260" y1="118" x2="295" y2="118" stroke="#1065FF" strokeWidth="2" />
                      <polygon points="295,115 302,118 295,121" fill="#1065FF" />

                      {/* Flow Step 3: WhatsApp Alert */}
                      <rect x="305" y="90" width="80" height="55" rx="4" fill="#E07A5F" fillOpacity="0.1" stroke="#E07A5F" strokeWidth="1.5" />
                      <text x="315" y="112" fill="#E07A5F" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        WHATSAPP
                      </text>
                      <text x="315" y="128" fill="#E07A5F" fontSize="8" fontFamily="monospace">
                        Partner Alert
                      </text>
                    </svg>
                  )}

                  {/* Practice 04: Operations Automation */}
                  {activeIdx === 3 && (
                    <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Event Bus Container */}
                      <rect x="40" y="30" width="320" height="175" rx="6" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
                      <text x="55" y="52" fill="currentColor" fillOpacity="0.5" fontSize="9" fontFamily="monospace">
                        EVENT BUS // AUTOMATION WEBHOOK
                      </text>

                      {/* Step A: Gateway Hook */}
                      <rect x="60" y="70" width="115" height="42" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="70" y="88" fill="currentColor" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        PAYMENT EVENT
                      </text>
                      <text x="70" y="101" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        Webhook Verified
                      </text>

                      {/* Arrow Down */}
                      <line x1="118" y1="112" x2="118" y2="135" stroke="#1065FF" strokeWidth="1.5" />
                      <polygon points="115,135 118,141 121,135" fill="#1065FF" />

                      {/* Step B: Tax Engine */}
                      <rect x="60" y="142" width="115" height="42" rx="4" fill="#1065FF" fillOpacity="0.1" stroke="#1065FF" strokeWidth="1" />
                      <text x="70" y="160" fill="#1065FF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        GST ENGINE
                      </text>
                      <text x="70" y="173" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        Tax Slabs Applied
                      </text>

                      {/* Arrow Right to Ledger */}
                      <line x1="175" y1="163" x2="215" y2="163" stroke="#1065FF" strokeWidth="1.5" />
                      <polygon points="215,160 221,163 215,166" fill="#1065FF" />

                      {/* Step C: Ledger & Customer Sync */}
                      <rect x="225" y="110" width="115" height="55" rx="4" fill="#E07A5F" fillOpacity="0.1" stroke="#E07A5F" strokeWidth="1" />
                      <text x="235" y="130" fill="#E07A5F" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        LEDGER SYNC
                      </text>
                      <text x="235" y="144" fill="currentColor" fillOpacity="0.7" fontSize="8" fontFamily="monospace">
                        PDF Invoiced
                      </text>
                      <text x="235" y="156" fill="currentColor" fillOpacity="0.5" fontSize="7" fontFamily="monospace">
                        Automated Email
                      </text>
                    </svg>
                  )}

                  {/* Practice 05: Analytics & Insights */}
                  {activeIdx === 4 && (
                    <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Telemetry Frame */}
                      <rect x="35" y="30" width="330" height="180" rx="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="50" y="52" fill="currentColor" fillOpacity="0.7" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                        EXECUTIVE REVENUE &amp; ATTRIBUTION TELEMETRY
                      </text>

                      {/* Telemetry Curves / Axis */}
                      <line x1="55" y1="170" x2="340" y2="170" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                      <line x1="55" y1="75" x2="55" y2="170" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

                      {/* Bar 1 */}
                      <rect x="80" y="115" width="28" height="55" rx="2" fill="#1065FF" fillOpacity="0.3" />
                      <text x="76" y="184" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        ORGANIC
                      </text>

                      {/* Bar 2 */}
                      <rect x="135" y="85" width="28" height="85" rx="2" fill="#1065FF" />
                      <text x="138" y="184" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        AEO/AI
                      </text>

                      {/* Bar 3 */}
                      <rect x="190" y="130" width="28" height="40" rx="2" fill="#E07A5F" fillOpacity="0.5" />
                      <text x="190" y="184" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        REFERRAL
                      </text>

                      {/* Channel Conversion Metric Box */}
                      <rect x="250" y="80" width="95" height="70" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                      <text x="260" y="100" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        ATTRIBUTION
                      </text>
                      <text x="260" y="122" fill="#1065FF" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
                        Direct ROI
                      </text>
                      <text x="260" y="138" fill="currentColor" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
                        Zero Guesswork
                      </text>
                    </svg>
                  )}

                  {/* Practice 06: Ongoing Management */}
                  {activeIdx === 5 && (
                    <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* SLA Ledger Grid */}
                      <rect x="35" y="30" width="330" height="180" rx="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="50" y="54" fill="currentColor" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                        TURNKEY SYSTEMS STEWARDSHIP // SLA
                      </text>

                      {/* Row 1: Uptime Monitoring */}
                      <rect x="50" y="70" width="300" height="28" rx="3" fill="#10B981" fillOpacity="0.08" stroke="#10B981" strokeWidth="0.8" />
                      <circle cx="65" cy="84" r="3.5" fill="#10B981" />
                      <text x="78" y="88" fill="currentColor" fontSize="9" fontFamily="monospace">
                        Continuous 24/7 Automated Health Probes
                      </text>
                      <text x="280" y="88" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        MONITORED
                      </text>

                      {/* Row 2: Security Patch Cycle */}
                      <rect x="50" y="106" width="300" height="28" rx="3" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
                      <circle cx="65" cy="120" r="3.5" fill="#1065FF" />
                      <text x="78" y="124" fill="currentColor" fontSize="9" fontFamily="monospace">
                        Weekly Dependency Audits &amp; Patches
                      </text>
                      <text x="295" y="124" fill="#1065FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        ACTIVE
                      </text>

                      {/* Row 3: Partner SLA */}
                      <rect x="50" y="142" width="300" height="28" rx="3" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
                      <circle cx="65" cy="156" r="3.5" fill="#E07A5F" />
                      <text x="78" y="160" fill="currentColor" fontSize="9" fontFamily="monospace">
                        Direct Partner Response
                      </text>
                      <text x="272" y="160" fill="#E07A5F" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        1–2 DAYS SLA
                      </text>
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Structured Practice Blueprint Card (Desktop & Tablet) */}
            <div className="hidden sm:block mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E5DDD0] dark:border-[#2C2926] space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#5A544E] dark:text-[#9E988F] uppercase font-semibold">
                  Required Inputs:
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Client Scope</span>
              </div>
              <p className="text-xs font-serif text-[#5A544E] dark:text-[#9E988F]">
                {activePractice.clientInputs.join(' · ')}
              </p>
            </div>

            {/* Bottom Active Information & Navigation */}
            <div className="pt-2.5 mt-2.5 sm:pt-3 sm:mt-3 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between text-xs">
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
