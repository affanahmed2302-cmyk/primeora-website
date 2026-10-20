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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>ENGINEERING DISCIPLINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Our Four-Step Methodology
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Eliminating assumption through structured discovery, architectural blueprints, verified builds, and continuous data-informed optimization.
          </p>
        </div>
      </div>

      <ProcessSection />

      {/* Methodology Detail & Transparency */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#08152B] p-8 rounded-xl border border-white/[0.08]">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-sans">
              <FileText className="w-5 h-5 text-[#3B82F6]" />
              <span>What You Receive in the Blueprint</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Before a single line of production code is authored, you review and approve a complete architectural specification.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Interactive wireframe prototype &amp; design token hierarchy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Data model and third-party API integration mappings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Milestone payment schedule tied to concrete staging previews</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Client dependency checklist with access requirements</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#08152B] p-8 rounded-xl border border-white/[0.08]">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-sans">
              <Code2 className="w-5 h-5 text-[#3B82F6]" />
              <span>Verification &amp; Handover Standards</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              We never perform a "blind launch". Production deployments follow a rigorous automated checklist before domain traffic switchover.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Full responsive testing across desktop, tablet, and mobile browsers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Automated spam filtering, rate limiting, and webhook validation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>Full handover video walkthrough and documentation library</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0" />
                <span>30-day post-launch warranty on all authored software code</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-sans">
            Ready to structure your digital systems?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Schedule an initial discovery consultation to explore your technical goals with our founding engineers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors group"
          >
            <span>Initiate Discovery Phase</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
