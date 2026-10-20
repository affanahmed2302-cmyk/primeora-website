import React from 'react';
import type { Metadata } from 'next';
import ProcessSection from '@/components/ProcessSection';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Code2, LineChart, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Four-Step Methodology — Discovery to Continuous Optimization — Primeora Solutions',
  description:
    'Learn how Primeora Solutions executes client projects with engineering discipline: Discovery, Blueprint, Build & Launch, and Grow & Optimize.',
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      <div className="bg-[#0B0F1A]/60 py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Engineering Discipline</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-white tracking-tight">
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
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-azure-bright" />
              <span>What You Receive in the Blueprint</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Before a single line of production code is authored, you review and approve a complete architectural specification.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0" />
                <span>Interactive wireframe prototype &amp; design token hierarchy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0" />
                <span>Data model and third-party API integration mappings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0" />
                <span>Milestone payment schedule tied to concrete staging previews</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0" />
                <span>Client dependency checklist with access requirements</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-violet-light" />
              <span>Verification &amp; Handover Standards</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              We never perform a "blind launch". Production deployments follow a rigorous automated checklist before domain traffic switchover.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-light flex-shrink-0" />
                <span>Full responsive testing across desktop, tablet, and mobile browsers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-light flex-shrink-0" />
                <span>Automated spam filtering, rate limiting, and webhook validation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-light flex-shrink-0" />
                <span>Full handover video walkthrough and documentation library</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-light flex-shrink-0" />
                <span>30-day post-launch warranty on all authored software code</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-gradient-to-r from-azure/20 via-[#0B0F1A] to-violet/20 border border-azure/30 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to structure your digital systems?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Schedule an initial discovery consultation to explore your technical goals with our founding engineers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-azure to-violet rounded-xl shadow-[0_4px_25px_rgba(61,110,245,0.4)] hover:shadow-[0_6px_35px_rgba(61,110,245,0.6)] hover:scale-[1.02] transition-all"
          >
            <span>Start with a Discovery Session</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
