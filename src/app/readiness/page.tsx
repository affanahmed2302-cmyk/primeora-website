import React from 'react';
import type { Metadata } from 'next';
import DigitalReadinessAssessment from '@/components/DigitalReadinessAssessment';

export const metadata: Metadata = {
  title: 'Digital Readiness Diagnostic — Evaluate Your Digital Maturity — Primeora Solutions',
  description:
    'Take our 4-minute interactive digital readiness assessment to diagnose bottlenecks in your website, lead flow, automation, and reporting.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/readiness',
  },
};

export default function ReadinessPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
          <span>DIAGNOSTIC TOOL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
          Digital Readiness Assessment
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif max-w-2xl mx-auto">
          A practical, non-sensitive questionnaire designed to help business owners understand their current operational bottlenecks and identify high-leverage digital priorities.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitalReadinessAssessment />
      </div>
    </div>
  );
}
