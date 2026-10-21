import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, Compass, ShieldCheck } from 'lucide-react';
import KineticTextReveal from '@/components/motion/KineticTextReveal';
import MagneticWrapper from '@/components/motion/MagneticWrapper';
import InteractiveProjectGallery from '@/components/work/InteractiveProjectGallery';

export const metadata: Metadata = {
  title: 'Solution Architectures & Workflow Demonstrations | Primeora Solutions',
  description:
    'Explore illustrative system architectures demonstrating how Primeora Solutions connects web platforms, CRM pipelines, and operations automation for businesses.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/work',
  },
};

export default function WorkPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-32 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
            Selected System Architectures
          </span>

          <KineticTextReveal
            text="Workflow & system architectures."
            highlightWord="architectures."
            highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5] mb-4"
          />

          <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] leading-relaxed font-serif">
            In accordance with our strict claims policy, we do not fabricate client logos, customer counts, or unsubstantiated metrics. Below are verified reference architectures illustrating how we solve concrete operational bottlenecks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Compliance Notice */}
        <div className="p-6 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl flex items-start gap-4 max-w-4xl shadow-xs">
          <Info className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
            <strong className="text-[#191817] dark:text-[#FBF9F5] font-semibold font-sans">Demonstration Transparency: </strong>
            These workflow models represent actual technical architectures and system integration workflows engineered by our team. They are formatted as illustrative workflow demonstrations with hypothetical operational scenarios to respect client confidentiality agreements and our strict ban on unverified claims.
          </p>
        </div>

        {/* Interactive Architectural Project Gallery with Active Visual Stage */}
        <InteractiveProjectGallery />

        {/* Bottom CTA */}
        <div className="bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-sans text-[#191817] dark:text-[#FBF9F5]">
            Have an operational bottleneck in your business?
          </h2>
          <p className="text-sm text-[#5A544E] dark:text-[#9E988F] max-w-xl mx-auto mb-6 font-serif">
            Let’s review how your customer enquiry channels, sales pipeline, and internal operations currently work together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticWrapper strength={0.25}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm"
              >
                <span>Request Architecture Review</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </MagneticWrapper>
            <Link
              href="/readiness"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5] bg-white dark:bg-[#1C1A18] border border-[#DDD5C7] dark:border-[#242220] rounded-md transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>Digital Diagnostic (3 mins)</span>
            </Link>
          </div>
          <div className="mt-4 text-xs font-mono text-[#7C7469] dark:text-[#8E867C] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1065FF]" />
            <span>We aim to respond to enquiries within 1–2 business days.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
