'use client';

import React, { useState } from 'react';
import {
  Globe,
  MessageSquare,
  Zap,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Cpu,
} from 'lucide-react';

interface SystemStage {
  id: string;
  number: string;
  title: string;
  category: string;
  problem: string;
  engineeredSolution: string;
  technologies: string[];
  metrics: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SYSTEM_STAGES: SystemStage[] = [
  {
    id: 'intake',
    number: '01',
    title: 'Intake & Discovery',
    category: 'Presence & Search',
    problem: 'Slow template sites, unindexed pages, zero presence on modern AI answer engines (ChatGPT, Perplexity).',
    engineeredSolution: 'Bespoke Next.js 15 web application with semantic JSON-LD schema, sub-second load times, and Local SEO/AEO indexation.',
    technologies: ['Next.js 15 App Router', 'TypeScript', 'AEO Schema Markup', 'Global Edge CDN'],
    metrics: 'Edge-Rendered Asset Delivery',
    icon: Globe,
  },
  {
    id: 'triage',
    number: '02',
    title: 'Capture & Triage',
    category: 'Lead Systems',
    problem: 'Enquiries lost across WhatsApp, paper logs, and unmonitored inboxes during peak business hours.',
    engineeredSolution: 'Automated 24/7 lead routing via official WhatsApp Business API, instant partner notifications, and calendar sync.',
    technologies: ['WhatsApp Business API', 'Supabase Database', 'Webhook Pipelines', 'Cal.com Sync'],
    metrics: 'Zero Unhandled Inquiries',
    icon: MessageSquare,
  },
  {
    id: 'automation',
    number: '03',
    title: 'Operations Automation',
    category: 'Workflow Engine',
    problem: 'Manual data re-entry into invoicing tools, repetitive admin tasks, and delayed client onboarding.',
    engineeredSolution: 'Cross-platform automations connecting CRM deal stages, GST-compliant invoicing, and task management systems.',
    technologies: ['Custom API Webhooks', 'GST Billing APIs', 'CRM Workflows', 'Task Automation'],
    metrics: '85% Manual Admin Reduction',
    icon: Zap,
  },
  {
    id: 'intelligence',
    number: '04',
    title: 'Executive Intelligence',
    category: 'Analytics & SLA',
    problem: 'No clear visibility into customer acquisition cost, conversion bottlenecks, or revenue per channel.',
    engineeredSolution: 'Unified executive business intelligence dashboard with multi-touch attribution and continuous security monitoring.',
    technologies: ['Real-Time BI Telemetry', 'PostgreSQL Analytics', 'Uptime Auditing', 'Continuous QA'],
    metrics: 'Weekly Executive Briefings',
    icon: BarChart3,
  },
];

export default function DigitalSystemsMap() {
  const [activeStageId, setActiveStageId] = useState<string>('intake');
  const activeStage = SYSTEM_STAGES.find((s) => s.id === activeStageId) || SYSTEM_STAGES[0];
  const ActiveIcon = activeStage.icon;

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-16" aria-label="Interactive Digital Transformation Systems Map">
      {/* Container with tactile architectural card styling */}
      <div className="bg-white dark:bg-[#1A1917] rounded-2xl border border-[#E6DFD5] dark:border-[#2C2926] p-6 sm:p-10 shadow-sm transition-colors duration-200">
        {/* Header Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E6DFD5] dark:border-[#2C2926] gap-3">
          <div>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#191817] dark:text-white tracking-tight">
              Interactive Systems Transformation Map
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5751] dark:text-[#A8A29A] mt-1 font-serif">
              Explore how Primeora unifies fragmented business operations into an integrated, automated digital system.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5C5751] dark:text-[#A8A29A] bg-[#FBF9F5] dark:bg-[#242220] px-3 py-1.5 rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Bangalore Studio Topology</span>
          </div>
        </div>

        {/* 4 Interactive Stage Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {SYSTEM_STAGES.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeStageId;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all text-xs ${
                  isActive
                    ? 'bg-[#FDF3EE] dark:bg-[#2A1D18] border-[#C25E38] text-[#191817] dark:text-white shadow-xs'
                    : 'bg-[#FBF9F5] dark:bg-[#22201D] border-[#E6DFD5] dark:border-[#2C2926] text-[#5C5751] dark:text-[#A8A29A] hover:border-[#DDD5C7] dark:hover:border-[#3D3935]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#C25E38]' : 'text-[#8C867E]'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive
                        ? 'bg-[#C25E38] text-white'
                        : 'bg-white dark:bg-[#1A1917] text-[#8C867E] border border-[#E6DFD5] dark:border-[#2C2926]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#191817] dark:text-white truncate">
                  {stage.title}
                </div>
                <div className="text-[11px] font-mono text-[#8C867E] truncate mt-0.5">
                  {stage.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Architectural Deep-Dive Grid */}
        <div className="bg-[#FBF9F5] dark:bg-[#141312] rounded-xl border border-[#E6DFD5] dark:border-[#2C2926] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Problem vs Solution */}
            <div className="lg:col-span-7 space-y-6">
              {/* Problem State */}
              <div>
                <span className="text-xs font-mono uppercase font-bold text-red-600 dark:text-red-400 block mb-1.5">
                  The Fragmented Reality (Before)
                </span>
                <p className="text-xs sm:text-sm text-[#5C5751] dark:text-[#A8A29A] leading-relaxed">
                  {activeStage.problem}
                </p>
              </div>

              {/* Solution State */}
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[#C25E38] block mb-1.5">
                  Primeora Engineered Architecture (After)
                </span>
                <p className="text-xs sm:text-sm text-[#191817] dark:text-[#F5F2EB] font-medium leading-relaxed">
                  {activeStage.engineeredSolution}
                </p>
              </div>

              {/* Verified Outcome Metric */}
              <div className="pt-4 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#8C867E] block">
                    Measurable Result:
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-sans text-[#191817] dark:text-white">
                    {activeStage.metrics}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Technology & Architecture Stack */}
            <div className="lg:col-span-5 bg-white dark:bg-[#1C1A18] rounded-xl border border-[#E6DFD5] dark:border-[#2C2926] p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#191817] dark:text-white">
                <Cpu className="w-4 h-4 text-[#C25E38]" />
                <span>Production Stack &amp; Protocols</span>
              </div>

              <div className="space-y-2">
                {activeStage.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#FBF9F5] dark:bg-[#242220] border border-[#E6DFD5] dark:border-[#3D3935] text-xs font-mono text-[#191817] dark:text-[#F5F2EB]"
                  >
                    <span>{tech}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Integrated
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E6DFD5] dark:border-[#2C2926] text-[11px] text-[#8C867E] leading-relaxed">
                * All integrations adhere to strict zero-lock-in standards; you retain full source code, API keys, and deployment accounts.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Ribbon */}
        <div className="mt-8 pt-6 border-t border-[#E6DFD5] dark:border-[#2C2926] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#5C5751] dark:text-[#A8A29A]">
            <Workflow className="w-4 h-4 text-[#C25E38]" />
            <span>
              End-to-end delivery: <strong>Discovery &rarr; Architecture &rarr; Build &rarr; Growth</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#8C867E]">MSME Udyam: UDYAM-KR-03-0732181</span>
          </div>
        </div>
      </div>
    </div>
  );
}
