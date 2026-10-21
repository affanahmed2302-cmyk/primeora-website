import React from 'react';
import type { Metadata } from 'next';
import DigitalReadinessAssessment from '@/components/DigitalReadinessAssessment';

export const metadata: Metadata = {
  title: 'Digital Readiness Diagnostic — 6-Dimension Systems Audit | Primeora Solutions',
  description:
    'Take our 3-minute interactive digital readiness diagnostic to evaluate bottlenecks across web infrastructure, local search, lead capture, automations, and executive analytics.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/readiness',
  },
};

export default function ReadinessPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#090807] min-h-screen text-[#F5F2EB] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E07A5F] px-3 py-1 rounded-full bg-[#1C1A18] border border-[#242220]">
          <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
          <span className="tracking-widest uppercase">Objective Systems Diagnostic</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans text-[#F5F2EB]">
          Digital Readiness Assessment
        </h1>

        <p className="text-base sm:text-lg text-[#9E988F] leading-relaxed max-w-2xl mx-auto font-sans">
          A structured 6-dimension evaluation designed to help business leadership identify operational friction, eliminate lost enquiries, and establish clear engineering priorities.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitalReadinessAssessment />
      </div>
    </div>
  );
}
