import React from 'react';
import type { Metadata } from 'next';
import ProcessSection from '@/components/ProcessSection';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Four-Step Methodology — Discovery to Handover | Primeora Solutions',
  description:
    'Learn how Primeora Solutions executes client projects with engineering discipline: Discovery, Blueprint, Build & Launch, and Grow & Optimize.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/process',
  },
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>ENGINEERING DISCIPLINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Our Four-Step Methodology
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            Eliminating assumption through structured discovery, architectural blueprints, verified builds, and continuous data-informed optimization.
          </p>
        </div>
      </div>

      <ProcessSection />

      {/* Methodology Detail & Transparency */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-[#1C1A18] p-8 rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] shadow-xs">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 font-sans text-editorial-ink dark:text-[#FBF9F5]">
              <FileText className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>What You Receive in the Blueprint</span>
            </h3>
            <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-4">
              Before a single line of production code is authored, you review and approve a complete architectural specification.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Interactive wireframe prototype &amp; design token hierarchy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Data model and third-party API integration mappings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Milestone payment schedule tied to concrete staging previews</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Client dependency checklist with access requirements</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#1C1A18] p-8 rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] shadow-xs">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 font-sans text-editorial-ink dark:text-[#FBF9F5]">
              <Code2 className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>Verification &amp; Handover Standards</span>
            </h3>
            <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-4">
              We never perform a "blind launch". Production deployments follow a rigorous automated checklist before domain traffic switchover.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Full responsive testing across desktop, tablet, and mobile browsers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Automated spam filtering, rate limiting, and webhook validation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>Full handover video walkthrough and documentation library</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>30-day post-launch warranty on all authored software code</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-[#F4EFEA] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Ready to structure your digital systems?
          </h2>
          <p className="text-sm text-[#5A544E] dark:text-[#A8A196] max-w-xl mx-auto mb-6 font-serif">
            Schedule a Discovery Consultation to review your requirements with a founding partner.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm group"
          >
            <span>Book Discovery Call</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
