import React from 'react';
import type { Metadata } from 'next';
import DigitalReadinessAssessment from '@/components/DigitalReadinessAssessment';

export const metadata: Metadata = {
  title: 'Digital Readiness Diagnostic — Evaluate Your Digital Maturity',
  description:
    'Take our 4-minute interactive digital readiness assessment to diagnose bottlenecks in your website, lead flow, automation, and reporting.',
};

export default function ReadinessPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="bg-architectural-grid py-16 md:py-24 border-b border-border-subtle mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Diagnostic Tool</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            Digital Readiness Assessment
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
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
