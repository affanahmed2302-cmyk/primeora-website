import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  FileCode2,
  Rocket,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Clock,
  Sparkles,
  FileCheck,
  FolderGit2,
  Workflow,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Four-Step Engineering Methodology — Discovery to Handover | Primeora Solutions',
  description:
    'Comprehensive breakdown of Primeora Solutions’ four-step engineering lifecycle: Discovery, Blueprint, Build & Launch, and Grow & Optimize with verified quality gates and warranty standards.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/process',
  },
};

const DETAILED_PHASES = [
  {
    step: 1,
    phaseNumber: '01',
    id: 'discovery',
    name: 'Discovery',
    badge: 'Diagnostic & Scope Definition',
    duration: '3 to 5 Business Days',
    tagline: 'Understanding commercial and operational reality before prescribing technology.',
    icon: Compass,
    accent: {
      border: 'border-amber-200 dark:border-amber-900/50',
      badge: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300',
      headerBg: 'bg-amber-50/50 dark:bg-amber-950/20',
      iconColor: 'text-amber-700 dark:text-amber-400',
      numberColor: 'text-amber-600 dark:text-amber-400',
      pillBg: 'bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
    },
    overview:
      'We conduct a thorough audit of your current digital touchpoints, operational systems, and client acquisition workflows. Rather than selling a pre-packaged template, we identify exactly where customer conversion drops and where manual friction consumes team hours.',
    clientInputs: [
      'Access to existing domain, web hosting, and analytics accounts (read-only where possible).',
      'Walkthrough of your current sales cycle, enquiry volume, and qualification criteria.',
      'Identification of team pain points (e.g. manual copy-pasting, lost customer leads, slow response times).',
      'Competitor and industry benchmarks you consider relevant.',
    ],
    activities: [
      'Technical architecture and dependency audit of existing web assets.',
      'Conversion funnel review to detect friction in enquiry capture and follow-ups.',
      'SEO & entity authority diagnostic, evaluating local search visibility and schema coverage.',
      'Workflow scoping: mapping required third-party integrations (CRM, WhatsApp, Invoicing).',
    ],
    deliverables: [
      'Discovery Assessment Document outlining findings, bottleneck analysis, and recommended architecture.',
      'Detailed Technical Requirements Specification (TRS) with explicitly defined project boundaries.',
      'Mutual non-disclosure agreement (NDA) and formal scope confirmation.',
    ],
    qualityGate: 'Signed agreement on scope boundaries and technical architecture before committing any engineering resources.',
  },
  {
    step: 2,
    phaseNumber: '02',
    id: 'blueprint',
    name: 'Blueprint',
    badge: 'Architecture & System Design',
    duration: '5 to 8 Business Days',
    tagline: 'Architecting the exact system specification before authoring production code.',
    icon: FileCode2,
    accent: {
      border: 'border-blue-200 dark:border-blue-900/50',
      badge: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300',
      headerBg: 'bg-blue-50/50 dark:bg-blue-950/20',
      iconColor: 'text-blue-700 dark:text-blue-400',
      numberColor: 'text-blue-600 dark:text-blue-400',
      pillBg: 'bg-blue-100/70 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
    },
    overview:
      'Before authoring production code, we design the full architectural specification: typography and layout hierarchies, data schemas, API payload structures, and interactive prototypes. Every page and workflow is mapped to eliminate mid-project ambiguity.',
    clientInputs: [
      'Brand assets (vector logos, high-resolution imagery, brand guidelines if existing).',
      'Core service catalogue, pricing structures, and frequently asked client questions.',
      'Design direction preferences and review of interactive wireframes.',
      'Team availability for milestone design review sessions.',
    ],
    activities: [
      'Component-level UX/UI layout authoring with Day/Night contrast and responsive breakpoints.',
      'PostgreSQL data model design with Row-Level Security (RLS) policies and entity relationships.',
      'API contract definition for webhooks, CRM sync, WhatsApp triggers, and automated alerts.',
      'Accessibility review ensuring WCAG 2.1 AA color contrast and screen-reader navigable semantics.',
    ],
    deliverables: [
      'Interactive wireframe prototype & design system token library.',
      'Full Technical Architecture Document covering data models, routes, and security protocols.',
      'Written Milestone Schedule with exact delivery dates and staging preview check-ins.',
    ],
    qualityGate: 'Formal written client approval of interactive wireframe and technical blueprint prior to code authoring.',
  },
  {
    step: 3,
    phaseNumber: '03',
    id: 'build-launch',
    name: 'Build & Launch',
    badge: 'Engineering & Automated Verification',
    duration: '2 to 4 Weeks',
    tagline: 'Engineering with production discipline, end-to-end testing, and zero-downtime release.',
    icon: Rocket,
    accent: {
      border: 'border-emerald-200 dark:border-emerald-900/50',
      badge: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300',
      headerBg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      numberColor: 'text-emerald-600 dark:text-emerald-400',
      pillBg: 'bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
    },
    overview:
      'We engineer your custom digital systems using modern production frameworks (Next.js, TypeScript, Tailwind CSS, Supabase). Every component undergoes automated end-to-end testing, responsive cross-device inspection, and security validation before domain cutover.',
    clientInputs: [
      'Final review and approval of page copy and commercial terms.',
      'Domain DNS access (or cooperation with your current IT administrator for records addition).',
      'Staging preview inspection and feedback on test enquiry flows.',
      'Confirmation of merchant or payment gateway credentials (if e-commerce scoped).',
    ],
    activities: [
      'Full-stack frontend and backend development with strict TypeScript type-safety.',
      'Integration of automated enquiry routing, rate-limiting, and instant notification triggers.',
      'Comprehensive automated testing: Playwright/Selenium test suites across 6 viewports.',
      'Security hardening: CSP headers, HSTS, secure cookies, and cryptographic session management.',
      'DNS migration, SSL certificate provisioning, and zero-downtime global CDN distribution.',
    ],
    deliverables: [
      'Production deployment on global edge CDN with automated backup redundancy.',
      'Verified Google Business Profile optimization and technical JSON-LD schema integration.',
      'Operational administrative CMS console with role-based access control.',
      'Complete Git source code repository handover with clean commit history.',
    ],
    qualityGate: '100% automated test suite pass rate, zero critical console errors, and successful end-to-end enquiry submission verification.',
  },
  {
    step: 4,
    phaseNumber: '04',
    id: 'grow-optimize',
    name: 'Grow & Optimize',
    badge: 'Continuous Telemetry & Evolution',
    duration: 'Ongoing Quarterly Sprints',
    tagline: 'Iterative refinement and performance expansion based on real-world usage telemetry.',
    icon: TrendingUp,
    accent: {
      border: 'border-orange-200 dark:border-orange-900/50',
      badge: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-800 dark:text-orange-300',
      headerBg: 'bg-orange-50/50 dark:bg-orange-950/20',
      iconColor: 'text-orange-700 dark:text-orange-400',
      numberColor: 'text-orange-600 dark:text-orange-400',
      pillBg: 'bg-orange-100/70 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300',
    },
    overview:
      'Launch is the beginning of the operational feedback loop. We monitor enquiry conversion rates, search indexing performance, and infrastructure health, delivering regular performance reports and proactive enhancements.',
    clientInputs: [
      'Monthly briefing on inbound lead quality, closed revenue attribution, and operational changes.',
      'Review of monthly executive analytics summaries and priority feature roadmap.',
      'Notification of upcoming marketing campaigns or seasonal offerings requiring landing pages.',
    ],
    activities: [
      'Google Analytics 4 & Looker Studio telemetry review to identify highest-converting traffic channels.',
      'Proactive dependency patching, framework upgrades, and continuous security audits.',
      'Conversion Rate Optimization (CRO) A/B testing on call-to-actions, headlines, and enquiry forms.',
      'Search engine re-crawling requests and Answer Engine Optimization (AEO) entity updates.',
    ],
    deliverables: [
      'Monthly Executive Performance Dashboard with actionable acquisition and operational metrics.',
      'Proactive security update logs and continuous uptime verification records.',
      'Dedicated engineering capacity allocation for new landing pages and workflow automations.',
    ],
    qualityGate: 'Adherence to 99.9% uptime SLA and quarterly business review alignment on key commercial objectives.',
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header Banner without eyebrow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Our Four-Step Engineering Methodology
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            A transparent, disciplined project lifecycle designed to eliminate assumption through structured discovery, architectural blueprints, verified builds, and continuous optimization.
          </p>
        </div>

        {/* Quick Phase Overview Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {DETAILED_PHASES.map((phase) => (
            <a
              key={phase.id}
              href={`#${phase.id}`}
              className="p-4 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-lg hover:border-[#C25E38]/50 dark:hover:border-[#E07A5F]/50 transition-colors group block"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-mono text-sm font-bold ${phase.accent.numberColor}`}>
                  {phase.phaseNumber}
                </span>
                <Clock className="w-3.5 h-3.5 text-[#8A8175] dark:text-[#7A7165]" />
              </div>
              <h2 className="text-sm font-bold text-editorial-ink dark:text-[#FBF9F5] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors">
                {phase.name}
              </h2>
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C] block mt-0.5">
                {phase.duration}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Comprehensive Phase Deep-Dives */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {DETAILED_PHASES.map((phase) => {
          const Icon = phase.icon;
          return (
            <section
              key={phase.id}
              id={phase.id}
              aria-labelledby={`${phase.id}-title`}
              className={`bg-white dark:bg-[#181715] border ${phase.accent.border} rounded-2xl overflow-hidden shadow-xs`}
            >
              {/* Phase Header */}
              <div className={`p-6 sm:p-8 border-b ${phase.accent.border} ${phase.accent.headerBg}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl border ${phase.accent.border} bg-white dark:bg-[#201E1B] flex items-center justify-center ${phase.accent.iconColor} shadow-xs flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono text-xs font-bold ${phase.accent.numberColor}`}>
                          PHASE {phase.phaseNumber}
                        </span>
                        <span className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${phase.accent.pillBg}`}>
                          {phase.badge}
                        </span>
                      </div>
                      <h2
                        id={`${phase.id}-title`}
                        className="text-2xl sm:text-3xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]"
                      >
                        {phase.name}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#5A544E] dark:text-[#A8A196] bg-white dark:bg-[#24221F] px-3 py-1.5 rounded-md border border-[#DDD5C7] dark:border-[#383430] self-start sm:self-auto">
                    <Clock className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F]" />
                    <span>Duration: <strong>{phase.duration}</strong></span>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-[#3D3833] dark:text-[#D4CDC3] font-serif leading-relaxed">
                  {phase.tagline}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                  {phase.overview}
                </p>
              </div>

              {/* Phase Matrix: Inputs, Activities, Deliverables */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Client Inputs */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7C7469] dark:text-[#8E867C] flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F]" />
                    <span>Client Inputs Required</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#3D3833] dark:text-[#D4CDC3]">
                    {phase.clientInputs.map((input, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#C25E38] dark:text-[#E07A5F] font-bold mt-0.5">•</span>
                        <span>{input}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Core Activities */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7C7469] dark:text-[#8E867C] flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-[#3B82F6] dark:text-[#60A5FA]" />
                    <span>Engineering Activities</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#3D3833] dark:text-[#D4CDC3]">
                    {phase.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#3B82F6] dark:text-[#60A5FA] font-bold mt-0.5">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Milestone Deliverables */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7C7469] dark:text-[#8E867C] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#34D399]" />
                    <span>Milestone Deliverables</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-editorial-ink dark:text-[#FBF9F5] font-medium">
                    {phase.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399] flex-shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quality Gate Footer */}
              <div className="px-6 py-4 sm:px-8 bg-[#FBF9F5] dark:bg-[#1E1C1A] border-t border-[#E5DDD0] dark:border-[#2C2926] flex items-start sm:items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs leading-relaxed">
                  <span className="font-mono uppercase font-bold text-[#7C7469] dark:text-[#8E867C] mr-2">
                    Quality Gate:
                  </span>
                  <span className="text-editorial-ink dark:text-[#EAE4DC] font-medium">
                    {phase.qualityGate}
                  </span>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Handover, Ownership & Warranty Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#34D399]" />
            <span>OPERATIONAL ASSURANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Handover &amp; Warranty Standards
          </h2>
          <p className="mt-2 text-sm text-[#5A544E] dark:text-[#A8A196]">
            Every system built by Primeora Solutions is engineered for long-term client sovereignty and zero proprietary lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1C1A18] p-6 rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] shadow-xs">
            <FolderGit2 className="w-6 h-6 text-[#C25E38] dark:text-[#E07A5F] mb-3" />
            <h3 className="text-base font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] mb-2">
              100% Code &amp; IP Ownership
            </h3>
            <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
              Upon final project milestone settlement, full copyright, source code repositories, and deployment configurations are transferred directly to your organization. You own your digital assets entirely.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1C1A18] p-6 rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#059669] dark:text-[#34D399] mb-3" />
            <h3 className="text-base font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] mb-2">
              30-Day Post-Launch Warranty
            </h3>
            <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
              We stand behind our engineering. We provide a complimentary 30-day warranty window post-deployment to remediate any software bugs, broken links, or form notification issues at zero extra charge.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1C1A18] p-6 rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] shadow-xs">
            <FileCode2 className="w-6 h-6 text-[#3B82F6] dark:text-[#60A5FA] mb-3" />
            <h3 className="text-base font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] mb-2">
              Runbooks &amp; Video Walkthrough
            </h3>
            <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
              We don’t just deliver code—we deliver operational clarity. Your team receives tailored video documentation and written runbooks explaining how to manage content, view enquiries, and run daily operations.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-16 bg-[#F4EFEA] dark:bg-[#1A1816] border border-[#E5DDD0] dark:border-[#2C2926] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] mb-3">
            Start with Phase 01: Discovery
          </h2>
          <p className="text-sm text-[#5A544E] dark:text-[#A8A196] max-w-xl mx-auto mb-6">
            Schedule an initial consultation to audit your current systems, establish scope boundaries, and discuss a structured implementation timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#C25E38] hover:bg-[#A84E2D] text-white text-sm font-semibold shadow-xs transition-colors"
            >
              <span>Request Discovery Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] text-editorial-ink dark:text-[#FBF9F5] hover:border-[#C25E38] text-sm font-semibold shadow-xs transition-colors"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
