'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  Globe,
  Layers,
  LineChart,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Zap,
  Activity,
  Cpu,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SceneContent {
  id: string;
  stepNumber: string;
  badge: string;
  badgeColor: string;
  title: string;
  narrative: string;
  impactLabel: string;
  impactMetrics: { label: string; value: string; status: 'negative' | 'positive' | 'warning' }[];
  keyDeliverable: string;
}

const SCENES: SceneContent[] = [
  {
    id: 'fragmented',
    stepNumber: 'STAGE 01',
    badge: 'The Operational Friction',
    badgeColor: 'text-[#C25E38] dark:text-[#E07A5F] border-[#C25E38]/30 bg-[#C25E38]/10',
    title: 'Disconnected tools create silent customer loss.',
    narrative:
      'Growing businesses often accumulate software in isolation: a generic website template that loads slowly, ad campaigns pointing to an unmonitored inbox, and office staff manually copying lead details into spreadsheets. Enquiries slip through response delays, and leadership has zero visibility into true marketing ROI.',
    impactLabel: 'Observed Bottlenecks',
    impactMetrics: [
      { label: 'Mobile Bounce Rate', value: '68%', status: 'negative' },
      { label: 'Average Enquiry Response', value: '14+ Hours', status: 'negative' },
      { label: 'Data Re-entry Drag', value: '8 hrs / week', status: 'negative' },
    ],
    keyDeliverable: 'Problem: Disjointed customer touchpoints and administrative friction.',
  },
  {
    id: 'connected',
    stepNumber: 'STAGE 02',
    badge: 'The Engineering Intervention',
    badgeColor: 'text-[#1065FF] dark:text-[#60A5FA] border-[#1065FF]/30 bg-[#1065FF]/10',
    title: 'A unified pipeline capturing every commercial opportunity.',
    narrative:
      'Primeora replaces disconnected silos with an engineered inbound architecture. A custom Next.js web application renders in under a second. Enquiries from web forms, WhatsApp, and calls route directly into a hardened PostgreSQL database within seconds, automatically alerting your team on WhatsApp and populating your CRM.',
    impactLabel: 'Engineered Pipeline',
    impactMetrics: [
      { label: 'Core Web Vitals (LCP)', value: '0.78s', status: 'positive' },
      { label: 'Enquiry Notification', value: '< 15 Seconds', status: 'positive' },
      { label: 'Lead Capture Loss', value: '0% Guaranteed', status: 'positive' },
    ],
    keyDeliverable: 'Solution: Sub-second web platform + instant PostgreSQL lead triage.',
  },
  {
    id: 'clarity',
    stepNumber: 'STAGE 03',
    badge: 'The Commercial Outcome',
    badgeColor: 'text-[#C25E38] dark:text-[#E07A5F] border-[#C25E38]/30 bg-[#C25E38]/10',
    title: 'Automated operations and actionable executive intelligence.',
    narrative:
      'With inbound capture stabilized, backend workflows synchronize automatically. Client onboarding, payment gateway webhooks, and GST tax invoicing trigger without human data entry. Practice leadership views live revenue intelligence, customer acquisition costs, and channel velocity in a single dashboard.',
    impactLabel: 'Executive Velocity',
    impactMetrics: [
      { label: 'Invoicing Automation', value: '100% Hands-off', status: 'positive' },
      { label: 'Live Data Latency', value: 'Sub-minute', status: 'positive' },
      { label: 'System Uptime SLA', value: '99.9% Monitored', status: 'positive' },
    ],
    keyDeliverable: 'Outcome: Leadership clarity, automated billing, and direct IP ownership.',
  },
];

export default function ScrollStoryTransformation() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle stage change via scroll observer
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      
      if (progress < 0.33) {
        setActiveStage(0);
      } else if (progress < 0.67) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentScene = SCENES[activeStage];

  return (
    <section
      ref={containerRef}
      className="relative border-t border-[#E5DDD0] dark:border-[#242220] bg-white dark:bg-[#0E0D0C] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
            Visual Storytelling · The Systems Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-[#191817] dark:text-[#FBF9F5] leading-tight">
            How we transform fragmented operations into unified commercial velocity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
            Scroll to observe the step-by-step transition from common operational drag into an engineered, high-velocity digital system.
          </p>
        </div>

        {/* Desktop Sticky Stage + Scrolling Narrative (lg:grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Interactive Navigation & Story Chapters */}
          <div className="lg:col-span-5 space-y-8">
            {SCENES.map((scene, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={scene.id}
                  onClick={() => setActiveStage(idx)}
                  className={`cursor-pointer p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FAF6F0] dark:bg-[#141312] border-[#C25E38] dark:border-[#E07A5F] shadow-sm'
                      : 'bg-transparent border-[#E5DDD0] dark:border-[#242220] hover:border-[#DDD5C7] dark:hover:border-[#33302C] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold tracking-wider text-[#7C7469] dark:text-[#8E867C]">
                      {scene.stepNumber}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${scene.badgeColor}`}
                    >
                      {scene.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-3 leading-snug">
                    {scene.title}
                  </h3>

                  <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed mb-4">
                    {scene.narrative}
                  </p>

                  {/* Impact Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
                    {scene.impactMetrics.map((metric, i) => (
                      <div key={i} className="text-center sm:text-left">
                        <div
                          className={`text-base sm:text-lg font-bold font-mono ${
                            metric.status === 'positive'
                              ? 'text-[#1065FF] dark:text-[#60A5FA]'
                              : 'text-[#C25E38] dark:text-[#E07A5F]'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div className="text-[10px] font-mono text-[#7C7469] dark:text-[#8E867C] leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7 cols): Sticky Visual Stage showing Real Scene Changes */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="w-full bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
              {/* Stage Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD0] dark:border-[#242220]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5]">
                    Interactive Architectural Viewport
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                  Scene {activeStage + 1} of 3
                </div>
              </div>

              {/* Dynamic Visual Scene based on activeStage */}
              <div className="my-6 flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {activeStage === 0 && (
                    <motion.div
                      key="stage-0"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                      className="w-full space-y-4"
                    >
                      {/* Fragmented Scene: Warning State */}
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 uppercase block">
                            Operational Bottleneck Detected
                          </span>
                          <p className="text-xs text-[#5A544E] dark:text-[#C4BAA9] mt-0.5 font-serif">
                            Legacy website taking 4.8s to render on mobile. Enquiries landing in unmonitored inbox. 3 missed commercial leads this week.
                          </p>
                        </div>
                      </div>

                      {/* Disconnected silos simulation */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-dashed border-[#E5DDD0] dark:border-[#33302C] text-center">
                          <Globe className="w-5 h-5 mx-auto text-[#7C7469] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            Outdated Template
                          </div>
                          <div className="text-[10px] font-mono text-red-500 mt-0.5">Slow LCP · No Schema</div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-dashed border-[#E5DDD0] dark:border-[#33302C] text-center">
                          <MessageSquare className="w-5 h-5 mx-auto text-[#7C7469] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            Scattered Inboxes
                          </div>
                          <div className="text-[10px] font-mono text-red-500 mt-0.5">14h Response Lag</div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-dashed border-[#E5DDD0] dark:border-[#33302C] text-center">
                          <Layers className="w-5 h-5 mx-auto text-[#7C7469] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            Manual Spreadsheets
                          </div>
                          <div className="text-[10px] font-mono text-red-500 mt-0.5">Human Copy-Paste</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C] flex items-center justify-between">
                        <span>Current System Health: Critical Friction</span>
                        <span className="text-red-500 font-bold">FAIL</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStage === 1 && (
                    <motion.div
                      key="stage-1"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                      className="w-full space-y-4"
                    >
                      {/* Connected Pipeline Scene: Precision Engineering */}
                      <div className="p-4 rounded-xl bg-[#1065FF]/10 border border-[#1065FF]/30 flex items-start gap-3">
                        <Zap className="w-5 h-5 text-[#1065FF] dark:text-[#60A5FA] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-mono font-bold text-[#1065FF] dark:text-[#60A5FA] uppercase block">
                            Sub-Second Inbound Pipeline Active
                          </span>
                          <p className="text-xs text-[#5A544E] dark:text-[#C4BAA9] mt-0.5 font-serif">
                            Next.js edge runtime + PostgreSQL ACID transaction pipeline. Multichannel enquiries deduplicated and pushed to WhatsApp in &lt;15 seconds.
                          </p>
                        </div>
                      </div>

                      {/* Connected Nodes */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#1065FF]/40 text-center shadow-xs">
                          <Cpu className="w-5 h-5 mx-auto text-[#1065FF] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            Next.js 15 App
                          </div>
                          <div className="text-[10px] font-mono text-[#1065FF] mt-0.5">0.78s LCP · 100 AEO</div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#1065FF]/40 text-center shadow-xs">
                          <Database className="w-5 h-5 mx-auto text-[#1065FF] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            PostgreSQL DB
                          </div>
                          <div className="text-[10px] font-mono text-[#1065FF] mt-0.5">Zero Lead Loss</div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#1065FF]/40 text-center shadow-xs">
                          <Activity className="w-5 h-5 mx-auto text-[#1065FF] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            WhatsApp API
                          </div>
                          <div className="text-[10px] font-mono text-[#1065FF] mt-0.5">&lt;15s Partner Alert</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#181715] border border-[#1065FF]/30 text-[11px] font-mono text-[#1065FF] dark:text-[#60A5FA] flex items-center justify-between">
                        <span>Pipeline Telemetry: 100% Inbound Capture</span>
                        <span className="font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          OPTIMIZED
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeStage === 2 && (
                    <motion.div
                      key="stage-2"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                      className="w-full space-y-4"
                    >
                      {/* Clarity Scene: Executive Intelligence */}
                      <div className="p-4 rounded-xl bg-[#C25E38]/10 border border-[#C25E38]/30 flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-mono font-bold text-[#C25E38] dark:text-[#E07A5F] uppercase block">
                            Unified Executive Clarity
                          </span>
                          <p className="text-xs text-[#5A544E] dark:text-[#C4BAA9] mt-0.5 font-serif">
                            Automated GST billing, live client attribution, and 99.9% uptime SLA monitoring. Full code repository transferred to your organization.
                          </p>
                        </div>
                      </div>

                      {/* Executive metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#C25E38]/40 text-center shadow-xs">
                          <LineChart className="w-5 h-5 mx-auto text-[#C25E38] dark:text-[#E07A5F] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            BI Intelligence
                          </div>
                          <div className="text-[10px] font-mono text-[#C25E38] dark:text-[#E07A5F] mt-0.5">
                            Real-time Revenue
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#C25E38]/40 text-center shadow-xs">
                          <ShieldCheck className="w-5 h-5 mx-auto text-[#C25E38] dark:text-[#E07A5F] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            SLA Guarantee
                          </div>
                          <div className="text-[10px] font-mono text-[#C25E38] dark:text-[#E07A5F] mt-0.5">
                            1-2 Day Response
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#C25E38]/40 text-center shadow-xs">
                          <Layers className="w-5 h-5 mx-auto text-[#C25E38] dark:text-[#E07A5F] mb-1.5" />
                          <div className="text-xs font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                            Code Transfer
                          </div>
                          <div className="text-[10px] font-mono text-[#C25E38] dark:text-[#E07A5F] mt-0.5">
                            100% IP Ownership
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#181715] border border-[#C25E38]/30 text-[11px] font-mono text-[#C25E38] dark:text-[#E07A5F] flex items-center justify-between">
                        <span>Commercial Velocity: Fully Integrated</span>
                        <span className="font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          EXCELLENCE
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stage Bottom Action */}
              <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="font-mono text-[#7C7469] dark:text-[#8E867C]">
                  {currentScene.keyDeliverable}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline flex-shrink-0"
                >
                  <span>Scope Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
