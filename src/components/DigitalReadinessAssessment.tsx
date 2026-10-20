'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    score: number;
    recommendedPillar: string;
    serviceTag: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'How is your primary business website currently performing?',
    subtitle: 'Evaluate your foundation for digital credibility and search discoverability.',
    options: [
      {
        label: 'No website or outdated legacy landing page',
        description: 'Lacks modern mobile layout, speed, and clear customer orientation.',
        score: 1,
        recommendedPillar: 'Digital Presence',
        serviceTag: 'Business Website Development',
      },
      {
        label: 'Decent site, but invisible on Google / local search',
        description: 'Existing website gets virtually zero organic commercial traffic.',
        score: 2,
        recommendedPillar: 'Customer Acquisition',
        serviceTag: 'Local SEO & Answer Engine Optimization',
      },
      {
        label: 'Healthy traffic, but low visitor-to-enquiry conversion',
        description: 'Visitors browse but do not submit forms or initiate conversations.',
        score: 3,
        recommendedPillar: 'Lead & Sales System',
        serviceTag: 'Enquiry Capture & Fast Routing',
      },
      {
        label: 'High-performing site seeking continuous conversion gains',
        description: 'Looking for proactive engineering updates and ongoing maintenance.',
        score: 4,
        recommendedPillar: 'Ongoing Management',
        serviceTag: 'Technical Upkeep & Performance Refinement',
      },
    ],
  },
  {
    id: 2,
    title: 'How does your team capture and follow up with new enquiries?',
    subtitle: 'Determine whether prospective clients are being lost between channels.',
    options: [
      {
        label: 'Scattered across personal WhatsApp chats & sticky notes',
        description: 'No central tracking; enquiries frequently slip through or get delayed.',
        score: 1,
        recommendedPillar: 'Lead & Sales System',
        serviceTag: 'CRM Setup & Sales Pipeline Design',
      },
      {
        label: 'Forms go into an inbox with manual copy-pasting',
        description: 'Team responds manually within hours or days without automated triage.',
        score: 2,
        recommendedPillar: 'Lead & Sales System',
        serviceTag: 'WhatsApp Business & Chatbot Integration',
      },
      {
        label: 'Basic CRM in place, but disconnected from WhatsApp & billing',
        description: 'Data exists in silos and requires duplicate data entry.',
        score: 3,
        recommendedPillar: 'Operations & Automation',
        serviceTag: 'Business Workflow Automation',
      },
      {
        label: 'Fully automated multi-channel lead routing & pipeline',
        description: 'Ready to analyze conversion velocity across each channel.',
        score: 4,
        recommendedPillar: 'Analytics & Insights',
        serviceTag: 'Attribution & Conversion Tracking',
      },
    ],
  },
  {
    id: 3,
    title: 'How are recurring operational tasks and billing handled?',
    subtitle: 'Identify opportunities to replace administrative friction with automation.',
    options: [
      {
        label: 'Heavy manual entry in spreadsheets & paper invoices',
        description: 'Substantial staff time consumed by repetitive data entry.',
        score: 1,
        recommendedPillar: 'Operations & Automation',
        serviceTag: 'Invoicing & GST Billing Connections',
      },
      {
        label: 'Disconnected software tools with manual data transfer',
        description: 'Store, accounting, and task managers do not speak to each other.',
        score: 2,
        recommendedPillar: 'Operations & Automation',
        serviceTag: 'Business Workflow Automation',
      },
      {
        label: 'Essential workflows automated, but lack exception handling',
        description: 'Occasional silent failures require manual intervention.',
        score: 3,
        recommendedPillar: 'Ongoing Management',
        serviceTag: 'Technical Upkeep & Security Monitoring',
      },
      {
        label: 'Highly streamlined digital operations running smoothly',
        description: 'Seeking executive reporting to guide next strategic expansion.',
        score: 4,
        recommendedPillar: 'Analytics & Insights',
        serviceTag: 'Business Intelligence Dashboards',
      },
    ],
  },
  {
    id: 4,
    title: 'How does leadership review marketing and sales performance?',
    subtitle: 'Assess your capability to make empirical, data-backed decisions.',
    options: [
      {
        label: 'Mainly informal impressions and monthly bank balances',
        description: 'No clear visibility into cost per lead or conversion rate by source.',
        score: 1,
        recommendedPillar: 'Analytics & Insights',
        serviceTag: 'Business Intelligence Dashboards',
      },
      {
        label: 'Fragmented reports from individual ad platforms',
        description: 'Google and Meta report different numbers that cannot be reconciled.',
        score: 2,
        recommendedPillar: 'Analytics & Insights',
        serviceTag: 'Attribution & Conversion Tracking',
      },
      {
        label: 'Consolidated monthly summaries produced manually',
        description: 'Takes several days each month to compile reports from disparate tools.',
        score: 3,
        recommendedPillar: 'Operations & Automation',
        serviceTag: 'Business Workflow Automation',
      },
      {
        label: 'Real-time executive dashboards with verified attribution',
        description: 'Mature analytics infrastructure ready for scale.',
        score: 4,
        recommendedPillar: 'Ongoing Management',
        serviceTag: 'Continuous Content & Performance Refinement',
      },
    ],
  },
];

export default function DigitalReadinessAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (index: number) => {
    const updated = [...answers];
    updated[currentStep] = index;
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentStep(0);
    setCompleted(false);
  };

  // Compute diagnosis
  const selectedOptions = answers.map((optIdx, qIdx) => QUESTIONS[qIdx]?.options[optIdx]).filter(Boolean);
  const totalScore = selectedOptions.reduce((acc, opt) => acc + opt.score, 0);
  const maxScore = QUESTIONS.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Determine top priority pillar based on lowest scoring answers
  const sortedByFriction = [...selectedOptions].sort((a, b) => a.score - b.score);
  const topFriction = sortedByFriction[0] || QUESTIONS[0].options[0];

  return (
    <div className="bg-[#08152B] rounded-xl border border-white/[0.08] p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-[#040D1A] h-1.5 rounded-full overflow-hidden mb-8">
        <div
          className="bg-[#166CFF] h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / (completed ? QUESTIONS.length : QUESTIONS.length)) * 100}%` }}
        />
      </div>

      {!completed ? (
        <div>
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6]">
                Digital Readiness Diagnostic
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
          </div>

          {/* Question Title */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 font-sans">
              {QUESTIONS[currentStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {QUESTIONS[currentStep].subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {QUESTIONS[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className="w-full text-left p-4 rounded-lg border border-white/10 bg-[#040D1A] hover:border-[#166CFF]/50 hover:bg-[#0E1F3D] transition-colors group flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-sm font-semibold text-white group-hover:text-[#3B82F6] block mb-0.5">
                    {opt.label}
                  </span>
                  <span className="text-xs text-slate-400 leading-relaxed block">
                    {opt.description}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#3B82F6] flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                Diagnostic Assessment Result
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#040D1A] border border-white/10 rounded-lg text-center sm:text-left">
              <span className="text-xs font-mono uppercase text-slate-400 block">Readiness Score</span>
              <span className="text-3xl font-bold text-[#166CFF] mt-1 block font-mono">
                {percentage}%
              </span>
              <span className="text-[11px] text-slate-400">
                {percentage < 45 ? 'Foundational Stage' : percentage < 75 ? 'Transition Stage' : 'Scaling Stage'}
              </span>
            </div>

            <div className="sm:col-span-2 p-4 bg-[#08152B] border border-[#166CFF]/30 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#3B82F6] block font-semibold">
                  Recommended Primary Focus:
                </span>
                <span className="text-xl font-bold text-white mt-0.5 block font-sans">
                  {topFriction.recommendedPillar}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Priority Solution: <strong>{topFriction.serviceTag}</strong>
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#040D1A] border border-white/10 rounded-lg">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Operational Diagnosis:
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Based on your responses, your current commercial bottleneck stems from <em>{topFriction.label.toLowerCase()}</em>. By prioritizing the <strong>{topFriction.recommendedPillar}</strong> pillar, your business can establish reliable lead capture and systematic follow-ups without over-committing to unneeded tools.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/contact?service=${encodeURIComponent(topFriction.recommendedPillar)}&notes=${encodeURIComponent(`Diagnostic: ${topFriction.serviceTag}`)}`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors"
            >
              <span>Discuss {topFriction.recommendedPillar} Strategy</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#040D1A] border border-white/10 rounded-lg hover:bg-[#0E1F3D] hover:text-white transition-colors"
            >
              <span>Explore All Pillars</span>
            </Link>
          </div>

          <p className="text-[11px] text-center text-slate-500">
            * This assessment is an automated operational diagnostic based on your responses, not a binding commercial guarantee.
          </p>
        </div>
      )}
    </div>
  );
}
