'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import KineticTextReveal from '@/components/motion/KineticTextReveal';
import MagneticWrapper from '@/components/motion/MagneticWrapper';
import { ArrowRight, Pause, Play, Shield, Activity, Cpu, Database, Network, LineChart, Code2 } from 'lucide-react';

interface BlueprintItem {
  id: string;
  category: string;
  title: string;
  metric: string;
  metricLabel: string;
  specs: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const BLUEPRINT_ROWS: [BlueprintItem[], BlueprintItem[], BlueprintItem[]] = [
  // Row 1: Web & Search Architecture
  [
    {
      id: 'web-infra',
      category: 'Digital Presence',
      title: 'Edge-Rendered Web Engine',
      metric: 'Next.js 15',
      metricLabel: 'Architecture',
      specs: ['App Router Architecture', 'Global Edge CDN Deployment', 'Semantic Microdata Schema'],
      icon: Code2,
    },
    {
      id: 'aeo-graph',
      category: 'Customer Acquisition',
      title: 'Answer Engine Knowledge Graph',
      metric: 'Schema.org',
      metricLabel: 'Entity Standard',
      specs: ['Structured Knowledge Graph', 'AI Answer Engine Indexing', 'Local Directory Consistency'],
      icon: Network,
    },
    {
      id: 'crm-pipeline',
      category: 'Lead Systems',
      title: 'PostgreSQL Enquiry Pipeline',
      metric: 'ACID',
      metricLabel: 'Database Integrity',
      specs: ['Direct Transactional Ingestion', 'Honeypot Bot Defense', 'Automated Lead Triage'],
      icon: Database,
    },
  ],
  // Row 2: Operations & Automation
  [
    {
      id: 'wa-triage',
      category: 'Operations',
      title: 'WhatsApp Business API Gateway',
      metric: 'Instant',
      metricLabel: 'Partner Alert',
      specs: ['Direct Routing to Partners', 'Webhook Event Bus', 'Submission Deduplication'],
      icon: Cpu,
    },
    {
      id: 'billing-engine',
      category: 'Operations',
      title: 'Automated Billing & Invoicing',
      metric: 'Webhook',
      metricLabel: 'Event-Driven',
      specs: ['Payment Gateway Listeners', 'GST Tax Calculation', 'Ledger Synchronization'],
      icon: Activity,
    },
    {
      id: 'bi-telemetry',
      category: 'Analytics',
      title: 'Executive BI Intelligence Ledger',
      metric: 'SQL Aggregates',
      metricLabel: 'Reporting Engine',
      specs: ['Channel Attribution Tracking', 'Deal Velocity Telemetry', 'Custom Business Intelligence'],
      icon: LineChart,
    },
  ],
  // Row 3: Security, Governance & Uptime
  [
    {
      id: 'security-rbac',
      category: 'Governance',
      title: 'Zero-Trust RBAC & Session Vault',
      metric: 'HMAC-SHA256',
      metricLabel: 'Session Hardening',
      specs: ['Strict HttpOnly Cookies', 'Least Privilege Database Roles', 'Timing-Safe Tokens'],
      icon: Shield,
    },
    {
      id: 'uptime-sla',
      category: 'Reliability',
      title: 'Dedicated Engineering Support',
      metric: '1–2 Days',
      metricLabel: 'Response Target',
      specs: ['Active Health Monitoring', 'Automated Security Patching', 'Clean Deployment Audits'],
      icon: Activity,
    },
    {
      id: 'code-ownership',
      category: 'Ownership',
      title: 'Full Repository Transfer',
      metric: 'Direct Transfer',
      metricLabel: 'IP Rights',
      specs: ['Client GitHub Repository', 'No Proprietary CMS Lock-in', 'Complete Architecture Docs'],
      icon: Code2,
    },
  ],
];

export default function ArchitecturalHeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 280, damping: 30, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isPaused || shouldReduceMotion ? 0 : 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isPaused || shouldReduceMotion ? 0 : -400]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [12, isPaused || shouldReduceMotion ? 0 : 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [1, 0.4]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [10, isPaused || shouldReduceMotion ? 0 : 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [40, isPaused || shouldReduceMotion ? 0 : 200]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col self-auto overflow-hidden antialiased [perspective:1000px] [transform-style:preserve-3d] pt-32 md:pt-40 pb-28 bg-[#FBF9F5] dark:bg-[#090807] transition-colors duration-200"
    >
      {/* Top Header & Positioning Statement */}
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 mb-12 md:mb-16">
        {/* Verification & Studio Origin Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DDD0] dark:border-[#242220]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A544E] dark:text-[#9E988F]">
            <span className="w-2 h-2 rounded-full bg-[#1065FF]" />
            <span className="font-semibold text-editorial-ink dark:text-white">Bangalore Systems Studio</span>
            <span className="text-[#A8A196]">•</span>
            <span>Udyam Registered MSME</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#5A544E] dark:text-[#9E988F] hover:text-[#191817] dark:hover:text-white bg-[#F4EFEA] dark:bg-[#141312] border border-[#DDD5C7] dark:border-[#242220] rounded-md transition-colors"
              aria-label={isPaused ? 'Resume spatial parallax animation' : 'Pause spatial parallax animation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#1065FF]" /> : <Pause className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />}
              <span>{isPaused ? 'Resume Motion' : 'Pause Motion'}</span>
            </button>
          </div>
        </div>

        {/* Cinematic Kinetic Headline */}
        <div className="max-w-4xl">
          <KineticTextReveal
            text="Digital systems engineered for commercial clarity."
            highlightWord="clarity."
            highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-sans tracking-tight text-[#191817] dark:text-[#FBF9F5] leading-[1.08]"
          />

          <p className="mt-6 text-base sm:text-xl text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-2xl font-serif">
            We partner with business leadership to replace fragmented web templates, lost customer enquiries, and manual spreadsheet drag with durable, high-speed operational systems.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticWrapper strength={0.2}>
              <Link
                href="/contact"
                onClick={() => {
                  trackEvent('contact_cta_click', {
                    cta_label: 'Consult with Partners',
                    cta_location: 'hero_primary',
                    destination: '/contact',
                  });
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm group"
              >
                <span>Consult with Partners</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticWrapper>

            <Link
              href="/services"
              className="inline-flex items-center justify-center px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5] bg-white dark:bg-[#141312] hover:bg-[#F2EDE4] dark:hover:bg-[#1C1A18] border border-[#DDD5C7] dark:border-[#242220] rounded-md transition-colors"
            >
              <span>Explore Practice Areas</span>
            </Link>

            <span className="text-xs font-mono text-[#7C7469] dark:text-[#7A7368] sm:ml-2">
              Direct founder accountability • 1–2 business day SLA
            </span>
          </div>
        </div>
      </div>

      {/* 3D Isometric Parallax Showcase (Aceternity UI Pattern) */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateZ: shouldReduceMotion ? 0 : rotateZ,
          translateY: shouldReduceMotion ? 0 : translateY,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
        className="relative z-10 w-full pointer-events-none select-none pt-4"
      >
        {/* Row 1 (Moves Right) */}
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : translateX }}
          className="flex flex-row-reverse space-x-reverse space-x-8 mb-8"
        >
          {BLUEPRINT_ROWS[0].map((item) => (
            <BlueprintCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* Row 2 (Moves Left) */}
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : translateXReverse }}
          className="flex flex-row space-x-8 mb-8"
        >
          {BLUEPRINT_ROWS[1].map((item) => (
            <BlueprintCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* Row 3 (Moves Right) */}
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : translateX }}
          className="flex flex-row-reverse space-x-reverse space-x-8"
        >
          {BLUEPRINT_ROWS[2].map((item) => (
            <BlueprintCard key={item.id} item={item} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function BlueprintCard({ item }: { item: BlueprintItem }) {
  const Icon = item.icon;
  return (
    <div className="h-64 w-[28rem] relative flex-shrink-0 rounded-2xl p-6 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] shadow-md dark:shadow-2xl flex flex-col justify-between overflow-hidden group">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] font-semibold">
            {item.category}
          </span>
          <div className="p-2 rounded-lg bg-[#F4EFEA] dark:bg-[#1C1A18] text-[#1065FF] border border-[#DDD5C7] dark:border-[#2C2926]">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2">
          {item.title}
        </h3>

        {/* Specs Ledger */}
        <ul className="space-y-1.5 mt-3">
          {item.specs.map((spec, i) => (
            <li key={i} className="text-xs font-mono text-[#5A544E] dark:text-[#9E988F] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDD5C7] dark:bg-[#36332F]" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Quantitative Metric */}
      <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex items-baseline justify-between">
        <span className="text-xs font-mono text-[#7C7469] dark:text-[#7A7368]">
          {item.metricLabel}
        </span>
        <span className="text-lg font-bold font-mono text-[#1065FF] dark:text-[#60A5FA]">
          {item.metric}
        </span>
      </div>
    </div>
  );
}
