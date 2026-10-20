import React from 'react';
import type { Metadata } from 'next';
import DigitalReadinessAssessment from '@/components/DigitalReadinessAssessment';

export const metadata: Metadata = {
  title: 'Digital Readiness Diagnostic — Evaluate Your Digital Maturity — Primeora Solutions',
  description:
    'Take our 4-minute interactive digital readiness assessment to diagnose bottlenecks in your website, lead flow, automation, and reporting.',
};

export default function ReadinessPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      <div className="bg-[#0B0F1A]/60 py-16 md:py-24 border-b border-white/10 mb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Diagnostic Tool</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Digital Readiness Assessment
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            A practical, non-sensitive questionnaire designed to help business owners understand their current operational bottlenecks and identify high-leverage digital priorities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitalReadinessAssessment />
      </div>
    </div>
  );
}
