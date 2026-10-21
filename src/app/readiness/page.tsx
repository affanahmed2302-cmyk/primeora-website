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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-serif text-[#191817] dark:text-[#FBF9F5] mb-4">
          Digital readiness assessment.
        </h1>

        <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E9689] leading-relaxed max-w-2xl mx-auto font-sans">
          A structured 6-dimension evaluation designed to help business leadership identify operational friction, eliminate lost enquiries, and establish clear engineering priorities.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitalReadinessAssessment />
      </div>
    </div>
  );
}
