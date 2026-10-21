'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  Zap,
  ShieldCheck,
  BarChart3,
  Globe,
  MessageSquare,
  Workflow,
  Copy,
  Check,
  HelpCircle,
} from 'lucide-react';

interface Option {
  label: string;
  description: string;
  score: number; // 1 to 4
  gapTitle?: string;
  strengthTitle?: string;
}

interface Dimension {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  glossaryTerm: string;
  glossaryDefinition: string;
  icon: React.ComponentType<{ className?: string }>;
  options: Option[];
}

const DIMENSIONS: Dimension[] = [
  {
    id: 'presence',
    name: 'Digital Presence & Architecture',
    title: 'How is your primary business website currently architected and performing?',
    subtitle: 'Evaluate your foundation for mobile velocity, accessibility, and modern search discoverability.',
    glossaryTerm: 'AEO (Answer Engine Optimization) & Schema',
    glossaryDefinition:
      'Structured semantic code (JSON-LD) that enables modern AI answer engines (ChatGPT, Perplexity, Google SGE) to accurately index and recommend your business services.',
    icon: Globe,
    options: [
      {
        label: 'Outdated template or legacy DIY builder',
        description: 'Lacks modern responsive speed, broken on smaller mobile screens, and invisible to search crawlers.',
        score: 1,
        gapTitle: 'Critical web architecture deficit with severe mobile friction',
      },
      {
        label: 'Decent visual design, but slow loading speeds (> 3s)',
        description: 'Website looks acceptable on desktop, but high bounce rates on mobile and zero semantic schema.',
        score: 2,
        gapTitle: 'Sub-optimal page load velocity and missing semantic schema markup',
      },
      {
        label: 'Fast responsive website with low conversion rate',
        description: 'Pages load quickly, but customer value proposition is unclear and visitors rarely initiate enquiries.',
        score: 3,
        strengthTitle: 'Modern responsive web baseline ready for conversion architecture',
      },
      {
        label: 'Bespoke, high-performance web platform',
        description: 'Sub-second Core Web Vitals, rich JSON-LD schema, accessible controls, and continuous uptime monitoring.',
        score: 4,
        strengthTitle: 'High-performance web architecture with verified sub-second speed',
      },
    ],
  },
  {
    id: 'discovery',
    name: 'Search & Customer Discovery',
    title: 'How do prospective commercial clients discover your business online?',
    subtitle: 'Assess your organic search reach, Google Business Profile maturity, and local citation authority.',
    glossaryTerm: 'Local SEO & Citation Equity',
    glossaryDefinition:
      'Optimizing Google Business Profile, local directory records, and geo-relevance so local buyers searching for your exact services find you before competitors.',
    icon: Compass,
    options: [
      {
        label: 'Virtually invisible online',
        description: 'Reliant entirely on offline word-of-mouth or unpredictable, unmeasured social media posts.',
        score: 1,
        gapTitle: 'No organic discovery engine; dependent on unpredictable referrals',
      },
      {
        label: 'Unclaimed or dormant Google Business Profile',
        description: 'Basic listing exists, but lacks recent reviews, service descriptions, and localized keyword optimization.',
        score: 2,
        gapTitle: 'Dormant local search profile conceding local market share',
      },
      {
        label: 'Ranks for brand name only',
        description: 'Clients find you if they know your exact business name, but competitors capture commercial service queries.',
        score: 3,
        strengthTitle: 'Established brand equity ready for non-branded commercial search capture',
      },
      {
        label: 'Top 3 ranking for primary commercial keywords',
        description: 'Active review management, optimized citations, high Google Maps authority, and citation in AI engines.',
        score: 4,
        strengthTitle: 'Authoritative local search positioning and active review generation',
      },
    ],
  },
  {
    id: 'enquiry',
    name: 'Enquiry & Lead Management',
    title: 'How does your business capture, triage, and follow up with new enquiries?',
    subtitle: 'Determine whether qualified prospective clients are lost between channels or delayed in response.',
    glossaryTerm: 'CRM & Centralized Lead Triage',
    glossaryDefinition:
      'A structured customer relationship system replacing fragmented personal inboxes, ensuring every lead receives immediate partner routing and SLA tracking.',
    icon: MessageSquare,
    options: [
      {
        label: 'Scattered across individual WhatsApps and personal inboxes',
        description: 'No unified record; follow-ups depend on individual memory and leads regularly drop during peak times.',
        score: 1,
        gapTitle: 'High enquiry leakage across scattered WhatsApp numbers and personal emails',
      },
      {
        label: 'Standard contact form with simple email alert',
        description: 'Enquiries arrive via email with no automated acknowledgement, and manual re-entry into spreadsheets is required.',
        score: 2,
        gapTitle: 'Unstructured email inbox with slow response cycles (> 48 hours)',
      },
      {
        label: 'Structured intake with manual daily status tracking',
        description: 'Team logs leads in a shared spreadsheet and responds within 24 hours, but lacks calendar integration.',
        score: 3,
        strengthTitle: 'Disciplined manual tracking ready for automated webhook routing',
      },
      {
        label: 'Automated 24/7 lead routing & partner alerts',
        description: 'Official WhatsApp Business API integration, instant partner notifications, automated calendar booking, and strict SLA.',
        score: 4,
        strengthTitle: 'Engineered lead intake pipeline with sub-2-hour partner response SLAs',
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations & Workflow Automation',
    title: 'How much repetitive administrative work is required to onboard new clients?',
    subtitle: 'Evaluate operational drag across customer proposals, contract execution, and GST invoicing.',
    glossaryTerm: 'Webhook Pipelines & API Workflows',
    glossaryDefinition:
      'Direct system integrations that connect your CRM deal stages, GST-compliant invoicing software, and project tools without manual data re-entry.',
    icon: Workflow,
    options: [
      {
        label: 'Completely manual data re-entry at every stage',
        description: 'Staff manually copy names, PANs, and project scopes into separate invoicing, doc, and email tools.',
        score: 1,
        gapTitle: 'Significant administrative drag from manual data copy-pasting',
      },
      {
        label: 'A few standalone digital tools without integration',
        description: 'Software exists for billing and communication, but employees manually sync data between them.',
        score: 2,
        gapTitle: 'Fragmented SaaS stack without automated synchronization',
      },
      {
        label: 'Semi-automated onboarding with standardized templates',
        description: 'Templates exist for contracts and invoices, but triggers and handoffs still require human initiation.',
        score: 3,
        strengthTitle: 'Standardized operational procedures ready for automated trigger execution',
      },
      {
        label: 'End-to-end automated operations pipeline',
        description: 'Deal approval automatically generates contracts, issues GST-compliant invoices, and provisions project tracking.',
        score: 4,
        strengthTitle: 'Integrated operations automation delivering up to 85% admin time savings',
      },
    ],
  },
  {
    id: 'intelligence',
    name: 'Executive Analytics & Attribution',
    title: 'How do leadership and commercial partners track business performance?',
    subtitle: 'Assess your capability to make empirical, data-driven decisions based on verified conversion metrics.',
    glossaryTerm: 'Multi-Touch Revenue Attribution',
    glossaryDefinition:
      'Connecting client contracts and revenue back to the specific marketing channel or campaign that originated the relationship, rather than relying on vanity clicks.',
    icon: BarChart3,
    options: [
      {
        label: 'Zero analytics or uninspected standard GA4 setup',
        description: 'No visibility into which campaigns or website pages actually generate qualified revenue.',
        score: 1,
        gapTitle: 'Blind commercial decisions with zero revenue attribution',
      },
      {
        label: 'Surface vanity metrics (clicks, impressions, pageviews)',
        description: 'Reports show website visits, but leadership cannot determine customer acquisition cost (CAC).',
        score: 2,
        gapTitle: 'Reliance on vanity metrics disconnected from business profitability',
      },
      {
        label: 'Monthly consolidated summaries compiled manually',
        description: 'Leadership reviews lead counts and revenue monthly, but compiling disparate spreadsheets takes days.',
        score: 3,
        strengthTitle: 'Strong reporting discipline ready for real-time automated dashboard telemetry',
      },
      {
        label: 'Real-time executive intelligence dashboard',
        description: 'Continuous telemetry displaying pipeline velocity, CAC, conversion per channel, and customer retention.',
        score: 4,
        strengthTitle: 'Real-time executive BI telemetry with verified commercial attribution',
      },
    ],
  },
  {
    id: 'governance',
    name: 'System Security & Ongoing Governance',
    title: 'How does your business govern digital security, backups, and privacy compliance?',
    subtitle: 'Determine your resilience against outages, credential compromise, and data regulation penalties.',
    glossaryTerm: 'DPDP / GDPR & Security Posture',
    glossaryDefinition:
      'Legal compliance and technical access controls (role-based permissions, automated offsite backups, encryption) that protect customer records and guarantee continuity.',
    icon: ShieldCheck,
    options: [
      {
        label: 'Shared passwords, no two-factor authentication, unpatched software',
        description: 'High vulnerability to unauthorized access, ransomware, or catastrophic data loss with zero backups.',
        score: 1,
        gapTitle: 'Severe vulnerability risk from shared credentials and absent backups',
      },
      {
        label: 'Basic host backups, but reactive security upkeep',
        description: 'Updates and security patches are only applied after a site outage or noticeable defect occurs.',
        score: 2,
        gapTitle: 'Reactive maintenance posture leaving systems exposed between incidents',
      },
      {
        label: 'Good hygiene (HTTPS, distinct logins), but no formal SLA',
        description: 'Basic security standards are met, but lacks documented recovery procedures or SLA monitoring.',
        score: 3,
        strengthTitle: 'Clean security fundamentals ready for formal SLA governance',
      },
      {
        label: 'Enterprise-grade governance and automated continuity',
        description: 'Role-based access control (RBAC), daily encrypted backups, strict DPDP compliance, and dedicated engineering SLA.',
        score: 4,
        strengthTitle: 'Institutional-grade security posture with automated continuity protocols',
      },
    ],
  },
];

export default function DigitalReadinessAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const activeDim = DIMENSIONS[currentStep];

  const handleSelectOption = (index: number) => {
    const updated = [...answers];
    updated[currentStep] = index;
    setAnswers(updated);

    if (currentStep < DIMENSIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowGlossary(false);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowGlossary(false);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentStep(0);
    setCompleted(false);
    setCopied(false);
    setShowGlossary(false);
  };

  // Compute Diagnosis Metrics
  const totalScore = answers.reduce((acc, optIdx, qIdx) => {
    const dim = DIMENSIONS[qIdx];
    const opt = dim?.options[optIdx];
    return acc + (opt?.score || 1);
  }, 0);

  const maxScore = DIMENSIONS.length * 4; // 24
  const percentage = Math.round((totalScore / maxScore) * 100);

  let maturityTier = 'Foundational Stage';
  let tierColor = 'text-red-400 bg-red-950/40 border-red-800';
  let tierSummary =
    'Your operations experience significant friction from disconnected manual workflows and lost inbound enquiries. Immediate architectural intervention is recommended.';

  if (percentage >= 80) {
    maturityTier = 'Optimized Stage';
    tierColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
    tierSummary =
      'Your digital systems demonstrate high institutional maturity. Opportunities lie in continuous automated conversion gains and specialized attribution modeling.';
  } else if (percentage >= 60) {
    maturityTier = 'Operational Stage';
    tierColor = 'text-blue-400 bg-blue-950/40 border-blue-800';
    tierSummary =
      'You possess solid fundamentals, but manual handoffs and fragmented reporting limit your commercial velocity and scale.';
  } else if (percentage >= 40) {
    maturityTier = 'Developing Stage';
    tierColor = 'text-amber-400 bg-amber-950/40 border-amber-800';
    tierSummary =
      'You have basic digital visibility, but lack automated enquiry triage, local search domination, and structured data attribution.';
  }

  // Identify strengths and critical gaps
  const scoredDimensions = DIMENSIONS.map((dim, idx) => {
    const selectedIdx = answers[idx] ?? 0;
    const opt = dim.options[selectedIdx];
    return {
      dim,
      selectedOpt: opt,
      score: opt.score,
    };
  });

  const criticalGaps = scoredDimensions.filter((s) => s.score <= 2);
  const strengths = scoredDimensions.filter((s) => s.score >= 3);

  const copyResults = () => {
    const summaryText = `Primeora Solutions Digital Readiness Diagnosis:
Maturity Index: ${percentage}% (${maturityTier})
Total Score: ${totalScore} / ${maxScore}

Dimension Breakdown:
${scoredDimensions.map((s) => `- ${s.dim.name}: Level ${s.score}/4 (${s.selectedOpt.label})`).join('\n')}

Action Plan:
- Critical Gaps: ${criticalGaps.length} identified
- Operational Strengths: ${strengths.length} identified

Response SLA: We aim to respond to enquiries within 1–2 business days.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-[#141312] rounded-2xl border border-[#242220] p-6 sm:p-10 max-w-4xl mx-auto shadow-xl transition-all duration-300 text-[#F5F2EB]">
      {/* Top Header & Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#242220] gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1C1A18] border border-[#242220] text-[#E07A5F]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E07A5F] block">
              Strategic Consultation Diagnostic
            </span>
            <h2 className="text-lg font-bold font-sans text-[#F5F2EB]">
              6-Dimension Digital Systems Audit
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#9E988F]">
          <span className="px-2.5 py-1 rounded bg-[#1C1A18] border border-[#242220]">
            Est: ~3 mins
          </span>
          <span className="text-[#C4BAA9]">
            {completed ? 'Diagnosis Complete' : `Dimension ${currentStep + 1} of ${DIMENSIONS.length}`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#1C1A18] border border-[#242220] h-2 rounded-full overflow-hidden mb-8">
        <div
          className="bg-[#E07A5F] h-full transition-all duration-300"
          style={{
            width: `${completed ? 100 : ((currentStep + 1) / DIMENSIONS.length) * 100}%`,
          }}
        />
      </div>

      {!completed ? (
        <div>
          {/* Active Dimension Header */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9E988F]">
                {activeDim.name}
              </span>
              <button
                type="button"
                onClick={() => setShowGlossary(!showGlossary)}
                className="inline-flex items-center gap-1 text-xs font-mono text-[#E07A5F] hover:underline"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showGlossary ? 'Hide Terminology' : 'What is this?'}</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#F5F2EB] leading-tight">
              {activeDim.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
              {activeDim.subtitle}
            </p>

            {/* Expandable Plain-English Glossary Callout */}
            {showGlossary && (
              <div className="p-4 rounded-xl bg-[#1C1A18] border border-[#36332F] text-xs space-y-1 animate-in fade-in">
                <span className="font-mono font-bold text-[#E07A5F] uppercase block">
                  Plain-English Terminology: {activeDim.glossaryTerm}
                </span>
                <p className="text-[#C4BAA9] leading-relaxed">
                  {activeDim.glossaryDefinition}
                </p>
              </div>
            )}
          </div>

          {/* 4 Architectural Maturity Options */}
          <div className="space-y-3.5 mb-8">
            {activeDim.options.map((opt, idx) => {
              const isSelected = answers[currentStep] === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 group flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#1C1A18] border-[#E07A5F] shadow-sm'
                      : 'bg-[#11100E] border-[#242220] hover:border-[#36332F] hover:bg-[#181715]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono transition-colors ${
                      isSelected
                        ? 'border-[#E07A5F] bg-[#E07A5F] text-black font-bold'
                        : 'border-[#36332F] text-[#9E988F] group-hover:border-[#E07A5F]'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm sm:text-base font-bold font-sans text-[#F5F2EB] group-hover:text-[#E07A5F] transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-[#9E988F] mt-1 leading-relaxed">
                      {opt.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls (Back & Status) */}
          <div className="flex items-center justify-between pt-4 border-t border-[#242220]">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-lg border transition-colors ${
                currentStep === 0
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[#6E6860]'
                  : 'border-[#242220] hover:border-[#36332F] bg-[#1C1A18] text-[#F5F2EB]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <span className="text-xs font-mono text-[#6E6860]">
              Select an option above to advance
            </span>
          </div>
        </div>
      ) : (
        /* Final Comprehensive Diagnostic Results */
        <div className="space-y-8 animate-in fade-in">
          {/* Executive Maturity Header Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1C1A18] border border-[#242220] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9E988F]">
                Digital Systems Maturity Index
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-bold font-sans text-[#F5F2EB]">
                  {percentage}%
                </span>
                <span className={`px-3 py-1 rounded-md text-xs font-mono font-bold border ${tierColor}`}>
                  {maturityTier}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#C4BAA9] max-w-xl leading-relaxed">
                {tierSummary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={copyResults}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#242220] hover:bg-[#36332F] text-xs font-mono text-[#F5F2EB] transition-colors border border-[#36332F]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Diagnosis Copied!' : 'Copy Audit Summary'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-[#1C1A18] text-xs font-mono text-[#9E988F] hover:text-[#F5F2EB] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          </div>

          {/* 6-Dimension Score Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#9E988F] mb-4 font-semibold">
              Dimension-by-Dimension Telemetry
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {scoredDimensions.map((item, idx) => {
                const Icon = item.dim.icon;
                const isGap = item.score <= 2;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#11100E] border border-[#242220] flex items-start gap-3.5"
                  >
                    <div
                      className={`p-2 rounded-lg border flex-shrink-0 ${
                        isGap
                          ? 'bg-amber-950/30 border-amber-800/40 text-amber-400'
                          : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-sans text-[#F5F2EB] truncate">
                          {item.dim.name}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-bold ${
                            isGap ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          Level {item.score}/4
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9E988F] line-clamp-2">
                        {item.selectedOpt.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prioritized Implementation Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Quick Wins */}
            <div className="p-6 rounded-xl bg-[#11100E] border border-[#242220] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F] font-semibold uppercase">
                <Zap className="w-4 h-4" />
                <span>Phase 1: Immediate Quick Wins (&lt; 14 Days)</span>
              </div>
              <p className="text-xs text-[#9E988F]">
                High-impact fixes addressing your most urgent enquiry leaks and discoverability bottlenecks.
              </p>
              <ul className="space-y-2 text-xs text-[#C4BAA9] pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0 mt-0.5" />
                  <span>Configure official WhatsApp Business lead routing and automated partner push alerts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0 mt-0.5" />
                  <span>Inject semantic JSON-LD local business schema to establish modern search indexation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0 mt-0.5" />
                  <span>Standardize client intake with instant automated customer acknowledgements.</span>
                </li>
              </ul>
            </div>

            {/* Strategic Upgrades */}
            <div className="p-6 rounded-xl bg-[#11100E] border border-[#242220] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] font-semibold uppercase">
                <Workflow className="w-4 h-4" />
                <span>Phase 2: Architectural Upgrades (30–60 Days)</span>
              </div>
              <p className="text-xs text-[#9E988F]">
                Systematic engineering to unify business operations and automate executive reporting.
              </p>
              <ul className="space-y-2 text-xs text-[#C4BAA9] pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                  <span>Migrate primary website to bespoke Next.js 15 App Router with sub-second performance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                  <span>Implement CRM webhook pipelines connecting deal stages directly to GST billing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                  <span>Deploy unified executive BI telemetry with channel attribution modeling.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Qualified Consultation Next Step */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1C1A18] to-[#141312] border border-[#36332F] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-xl font-bold font-sans text-[#F5F2EB]">
                Review your diagnosis directly with our founding partners.
              </h4>
              <p className="text-xs sm:text-sm text-[#9E988F] max-w-xl">
                We review your specific friction points and map out a precise engineering proposal. No sales account reps. We aim to respond to enquiries within 1–2 business days.
              </p>
            </div>

            <Link
              href={`/contact?diagnosticScore=${percentage}&tier=${encodeURIComponent(maturityTier)}`}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors flex-shrink-0 shadow-sm shadow-[#C25E38]/20"
            >
              <span>Book Strategic Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
