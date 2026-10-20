'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';

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
        label: 'Scattered across individual WhatsApp numbers and personal emails',
        description: 'No unified record; follow-ups depend on individual memory.',
        score: 1,
        recommendedPillar: 'Lead & Sales System',
        serviceTag: 'Centralized CRM & WhatsApp Integration',
      },
      {
        label: 'Basic contact form that sends simple email notifications',
        description: 'Prone to spam; manual re-entry required to create customer records.',
        score: 2,
        recommendedPillar: 'Operations & Automation',
        serviceTag: 'Form-to-CRM Webhook Pipelines',
      },
      {
        label: 'Structured intake with manual daily status reviews',
        description: 'Team tracks leads in a spreadsheet, but handoffs are slow.',
        score: 3,
        recommendedPillar: 'Operations & Automation',
        serviceTag: 'Automated Status Progression & Reminders',
      },
      {
        label: 'Automated triage with instant partner alerts and SLA tracking',
        description: 'Mature enquiry pipeline operating with minimal friction.',
        score: 4,
        recommendedPillar: 'Analytics & Insights',
        serviceTag: 'Executive Conversion Dashboards',
      },
    ],
  },
  {
    id: 3,
    title: 'What does your reporting and analytics setup look like today?',
    subtitle: 'Assess your capability to make empirical, data-driven growth decisions.',
    options: [
      {
        label: 'No tracking installed or standard GA4 setup that nobody checks',
        description: 'Zero visibility into which channels or campaigns drive real revenue.',
        score: 1,
        recommendedPillar: 'Analytics & Insights',
        serviceTag: 'Analytics Foundation & Conversion Tracking',
      },
      {
        label: 'Surface vanity metrics (pageviews, clicks) with no conversion link',
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
    <div className="bg-white dark:bg-[#1C1A18] rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-10 max-w-3xl mx-auto shadow-sm transition-colors duration-200">
      {/* Progress Bar */}
      <div className="w-full bg-[#FBF9F5] dark:bg-[#121110] border border-[#DDD5C7] dark:border-[#2C2926] h-2 rounded-full overflow-hidden mb-8">
        <div
          className="bg-[#C25E38] dark:bg-[#E07A5F] h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / (completed ? QUESTIONS.length : QUESTIONS.length)) * 100}%` }}
        />
      </div>

      {!completed ? (
        <div>
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DDD0] dark:border-[#2C2926]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F]">
                Digital Readiness Diagnostic
              </span>
            </div>
            <span className="text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
          </div>

          {/* Question Title */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] mb-1.5">
              {QUESTIONS[currentStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196]">
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
                className="w-full text-left p-4 rounded-lg border border-[#E5DDD0] dark:border-[#2C2926] bg-[#FBF9F5] dark:bg-[#22201D] hover:border-[#C25E38]/50 hover:bg-[#F4EFEA] dark:hover:bg-[#2A2825] transition-all group flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-sm font-semibold text-editorial-ink dark:text-[#FBF9F5] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] block mb-0.5">
                    {opt.label}
                  </span>
                  <span className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed block">
                    {opt.description}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9C948A] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD0] dark:border-[#2C2926]">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5]">
                Diagnostic Assessment Result
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-[#7C7469] dark:text-[#8E867C] hover:text-editorial-ink dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg text-center sm:text-left">
              <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block">Readiness Score</span>
              <span className="text-3xl font-bold text-[#C25E38] dark:text-[#E07A5F] mt-1 block font-mono">
                {percentage}%
              </span>
              <span className="text-[11px] text-[#7C7469] dark:text-[#8E867C]">
                {percentage < 45 ? 'Foundational Stage' : percentage < 75 ? 'Transition Stage' : 'Scaling Stage'}
              </span>
            </div>

            <div className="sm:col-span-2 p-4 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#C25E38]/30 dark:border-[#E07A5F]/30 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] block font-semibold">
                  Recommended Primary Focus:
                </span>
                <span className="text-xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] mt-0.5 block">
                  {topFriction.recommendedPillar}
                </span>
              </div>
              <p className="text-xs text-[#5A544E] dark:text-[#A8A196] mt-2">
                Priority Solution: <strong>{topFriction.serviceTag}</strong>
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#7C7469] dark:text-[#8E867C] mb-2">
              Operational Diagnosis:
            </h4>
            <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
              Based on your responses, your current commercial bottleneck stems from <em>{topFriction.label.toLowerCase()}</em>. By prioritizing the <strong>{topFriction.recommendedPillar}</strong> pillar, your business can establish reliable lead capture and systematic follow-ups without over-committing to unneeded tools.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/contact?service=${encodeURIComponent(topFriction.recommendedPillar)}&notes=${encodeURIComponent(`Diagnostic: ${topFriction.serviceTag}`)}`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm"
            >
              <span>Discuss {topFriction.recommendedPillar} Strategy</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5] bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg hover:bg-[#EAE4DC] dark:hover:bg-[#2C2926] transition-colors"
            >
              <span>Explore All Pillars</span>
            </Link>
          </div>

          <p className="text-[11px] text-center text-[#7C7469] dark:text-[#8E867C]">
            * This assessment is an automated operational diagnostic based on your responses, not a binding commercial guarantee.
          </p>
        </div>
      )}
    </div>
  );
}
