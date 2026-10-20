'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Compass, FileCode2, Rocket, TrendingUp, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepMeta {
  step: number;
  id: string;
  phase: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  clientInput: string;
  deliverable: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: {
    badgeBg: string;
    badgeText: string;
    border: string;
    hoverBorder: string;
    numberText: string;
    iconBg: string;
    iconText: string;
    pillBg: string;
  };
}

const STEPS: StepMeta[] = [
  {
    step: 1,
    id: 'discovery',
    phase: 'PHASE 01',
    badge: 'Diagnostic & Scope',
    title: 'Discovery',
    tagline: 'Understanding reality before prescribing tools.',
    description:
      'We audit your current digital channels, customer touchpoints, and operational bottlenecks. We ask rigorous questions about your high-value clients, sales workflows, and technology friction.',
    clientInput: 'Access to current accounts, existing customer journey workflows, and prioritized business bottlenecks.',
    deliverable: 'Discovery Assessment Document with defined technical scope boundaries and acceptance criteria.',
    duration: '3–5 Days',
    icon: Compass,
    accentColor: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-900/50',
      hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-700',
      numberText: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconText: 'text-amber-700 dark:text-amber-300',
      pillBg: 'bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
    },
  },
  {
    step: 2,
    id: 'blueprint',
    phase: 'PHASE 02',
    badge: 'Architecture & Design',
    title: 'Blueprint',
    tagline: 'Architecting the exact solution before writing code.',
    description:
      'We construct a comprehensive technical blueprint detailing information architecture, data models, third-party API mappings, design specifications, and milestone timelines. Nothing is left to assumption.',
    clientInput: 'Formal review and sign-off on technical specifications, wireframes, and milestone schedules.',
    deliverable: 'Complete Architecture Blueprint, clickable UI prototypes, and written milestone schedule.',
    duration: '5–8 Days',
    icon: FileCode2,
    accentColor: {
      badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
      badgeText: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-900/50',
      hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-700',
      numberText: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconText: 'text-blue-700 dark:text-blue-300',
      pillBg: 'bg-blue-100/70 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
    },
  },
  {
    step: 3,
    id: 'build-launch',
    phase: 'PHASE 03',
    badge: 'Engineering & QA',
    title: 'Build & Launch',
    tagline: 'Engineering with production discipline and automated verification.',
    description:
      'We build your digital assets using modern frameworks, configure CRM & webhook integrations, and execute rigorous accessibility, responsive, and performance tests prior to zero-downtime deployment.',
    clientInput: 'Brand copy approval, staging review verification, and merchant/domain DNS access.',
    deliverable: 'Live production release with SSL certification, security headers, canonical routing, and verified enquiry capture.',
    duration: '2–4 Weeks',
    icon: Rocket,
    accentColor: {
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-900/50',
      hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-700',
      numberText: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconText: 'text-emerald-700 dark:text-emerald-300',
      pillBg: 'bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
    },
  },
  {
    step: 4,
    id: 'grow-optimize',
    phase: 'PHASE 04',
    badge: 'Telemetry & Scale',
    title: 'Grow & Optimize',
    tagline: 'Iterative refinement based on empirical performance data.',
    description:
      'Post-launch, we monitor real enquiry velocity, search indexation, and operational usage. We deliver monthly executive reviews, proactive security updates, and data-informed feature sprints.',
    clientInput: 'Monthly executive KPI review attendance and feedback on inbound commercial lead quality.',
    deliverable: 'Monthly Performance Dashboards, proactive security patches, and ongoing optimization sprints.',
    duration: 'Continuous',
    icon: TrendingUp,
    accentColor: {
      badgeBg: 'bg-orange-500/10 dark:bg-orange-500/20',
      badgeText: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-200 dark:border-orange-900/50',
      hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-700',
      numberText: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-50 dark:bg-orange-950/40',
      iconText: 'text-orange-700 dark:text-orange-300',
      pillBg: 'bg-orange-100/70 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300',
    },
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = stepsContainerRef.current?.querySelectorAll<HTMLElement>('.process-card');
    if (!cards || cards.length === 0) return;

    // Subtle transform-only scroll reveal with automatic cleanup
    // Default opacity is ALWAYS 1 in CSS so content is never hidden
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 18,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      aria-labelledby="process-heading"
      className="py-20 md:py-28 bg-[#F4EFEA] dark:bg-[#171615] border-b border-[#E5DDD0] dark:border-[#2C2926] relative overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>DELIVERY METHODOLOGY</span>
          </div>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-4xl font-bold text-editorial-ink dark:text-[#FBF9F5] tracking-tight font-sans"
          >
            How We Work Together
          </h2>
          <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-2xl font-serif">
            A disciplined four-step engineering lifecycle designed to eliminate ambiguity, enforce milestone accountability, and guarantee zero-downtime production outcomes.
          </p>
        </div>

        {/* Process Step Progression Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between mb-8 px-2 max-w-6xl mx-auto">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-initial">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold border ${step.accentColor.border} ${step.accentColor.badgeBg} ${step.accentColor.badgeText}`}
                >
                  0{step.step}
                </span>
                <span className="text-xs font-sans font-semibold text-editorial-ink dark:text-[#FBF9F5]">
                  {step.title}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 mx-4 h-px bg-gradient-to-r from-[#D8CEBF] to-[#C7BBA8] dark:from-[#3A3632] dark:to-[#4A4540]" />
              )}
            </div>
          ))}
        </div>

        {/* 4 Process Cards */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`process-card opacity-100 bg-white dark:bg-[#1C1A18] border ${step.accentColor.border} ${step.accentColor.hoverBorder} rounded-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group relative`}
              >
                {/* Top: Header, Badge, Number, Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-lg font-bold ${step.accentColor.numberText}`}>
                        0{step.step}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${step.accentColor.pillBg} uppercase tracking-wider font-semibold`}>
                        {step.badge}
                      </span>
                    </div>

                    <div
                      className={`p-2 rounded-lg border ${step.accentColor.border} ${step.accentColor.iconBg} ${step.accentColor.iconText} transition-transform duration-200 group-hover:scale-105`}
                      aria-hidden="true"
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-editorial-ink dark:text-[#FBF9F5] mb-1 font-sans">
                    {step.title}
                  </h3>
                  <p className={`text-xs font-mono ${step.accentColor.numberText} mb-3 font-medium`}>
                    {step.tagline}
                  </p>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-5">
                    {step.description}
                  </p>
                </div>

                {/* Bottom: Inputs, Deliverables, Duration */}
                <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] text-xs space-y-3">
                  <div>
                    <span className="text-[#7C7469] dark:text-[#8E867C] block uppercase font-mono text-[10px] font-semibold tracking-wider mb-0.5">
                      Client Input
                    </span>
                    <span className="text-[#3D3833] dark:text-[#D4CDC3] leading-snug block">
                      {step.clientInput}
                    </span>
                  </div>

                  <div>
                    <span className={`${step.accentColor.numberText} block uppercase font-mono text-[10px] font-semibold tracking-wider mb-0.5 flex items-center gap-1`}>
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      Milestone Deliverable
                    </span>
                    <span className="text-editorial-ink dark:text-[#FBF9F5] font-medium leading-snug block">
                      {step.deliverable}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-[#7C7469] dark:text-[#8E867C] font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#A0988C] dark:text-[#70685E]" />
                      Duration:
                    </span>
                    <span className="font-semibold text-editorial-ink dark:text-[#EAE4DC]">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout linking to /process */}
        <div className="mt-12 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-white dark:bg-[#201E1B] text-editorial-ink dark:text-[#FBF9F5] border border-[#DDD5C7] dark:border-[#3A3631] hover:border-[#C25E38] dark:hover:border-[#E07A5F] hover:text-[#C25E38] dark:hover:text-[#E07A5F] shadow-xs hover:shadow-sm transition-all duration-200 group"
          >
            <span>Explore the Complete 4-Step Engineering Architecture &amp; Quality Gates</span>
            <ArrowRight className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
