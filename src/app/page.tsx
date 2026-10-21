import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CinematicSystemHero from '@/components/hero/CinematicSystemHero';
import InteractiveServiceExplorer from '@/components/services/InteractiveServiceExplorer';
import ProcessTimelineView from '@/components/process/ProcessTimelineView';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { ArrowRight, ShieldCheck, Clock, ExternalLink, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Primeora Solutions — Digital Systems & Operations Consultancy',
  description:
    'Primeora Solutions partners with ambitious businesses to engineer resilient digital presence, automated enquiry pipelines, and actionable executive telemetry.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app',
  },
};

export default function HomePage() {
  return (
    <div className="bg-[#FBF9F5] dark:bg-[#090807] text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      {/* 1. Cinematic System Hero with Real-Time Motion Pipeline Simulation */}
      <CinematicSystemHero />

      {/* 2. The Operational Reality: Fragmented Chaos vs. Engineered System */}
      <section className="py-20 md:py-28 border-b border-[#E5DDD0] dark:border-[#242220] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191817] dark:text-[#FBF9F5] font-serif mb-4">
              The cost of fragmented digital operations.
            </h2>
            <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E9689] font-sans leading-relaxed">
              Most businesses do not have a traffic problem; they have an architecture problem. Disjointed web pages, unmonitored messaging channels, and manual copy-pasting bleed qualified revenue before a team can respond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Common Reality */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#7C7469] dark:text-[#7A7368] block mb-2">
                  Typical Fragmented Setup
                </span>
                <h3 className="text-xl font-bold text-[#191817] dark:text-[#FBF9F5] mb-4 font-sans">
                  Manual Friction &amp; Lost Enquiries
                </h3>
                <ul className="space-y-3 text-sm text-[#5A544E] dark:text-[#9E9689]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">&times;</span>
                    <span>Outdated website templates that break across modern mobile viewports.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">&times;</span>
                    <span>Customer inquiries scattered across WhatsApp, DMs, and personal inboxes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">&times;</span>
                    <span>Manual spreadsheet logging that delays client follow-up by 24–48 hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">&times;</span>
                    <span>Zero executive visibility into which marketing channels produce revenue.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] text-xs font-mono text-[#7C7469] dark:text-[#7A7368]">
                Result: Lost commercial pipeline and wasted advertising spend.
              </div>
            </div>

            {/* The Primeora Standard */}
            <div className="p-8 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1A18] border border-[#C25E38]/30 dark:border-[#E07A5F]/30 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#C25E38] dark:text-[#E07A5F] block mb-2">
                  Primeora Engineered Architecture
                </span>
                <h3 className="text-xl font-bold text-[#191817] dark:text-[#FBF9F5] mb-4 font-sans">
                  Unified System &amp; Automated Pipeline
                </h3>
                <ul className="space-y-3 text-sm text-[#191817] dark:text-[#FBF9F5]">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                    <span>High-performance web architecture with sub-second page loads.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                    <span>Automated enquiry triage routing instantly to WhatsApp and PostgreSQL CRM.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                    <span>Real-time webhook notifications alerting founders within seconds.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                    <span>Unified executive dashboard tracking response velocity and lead conversion.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-[#C25E38]/20 dark:border-[#E07A5F]/20 text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] font-semibold">
                Result: Zero lost enquiries, 100% data sovereignty, and operational clarity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Practice Areas: Asymmetric Interactive Explorer */}
      <section className="py-20 md:py-28 border-b border-[#E5DDD0] dark:border-[#242220] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191817] dark:text-[#FBF9F5] font-serif mb-3">
                Six connected practice areas.
              </h2>
              <p className="text-base text-[#5A544E] dark:text-[#9E9689] font-sans leading-relaxed">
                We engineer an interconnected business system where digital presence, search discoverability, lead capture, and automation reinforce each other.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline flex-shrink-0"
            >
              <span>View All 6 Practices &rarr;</span>
            </Link>
          </div>

          <InteractiveServiceExplorer />
        </div>
      </section>

      {/* 4. Disciplined Methodology: Directional Progression View */}
      <section className="py-20 md:py-28 border-b border-[#E5DDD0] dark:border-[#242220] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191817] dark:text-[#FBF9F5] font-serif mb-3">
                Disciplined engineering methodology.
              </h2>
              <p className="text-base text-[#5A544E] dark:text-[#9E9689] font-sans leading-relaxed">
                A transparent four-phase project lifecycle with formal milestone gates, client inputs, and verified zero-downtime handovers.
              </p>
            </div>

            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline flex-shrink-0"
            >
              <span>Explore Process Specifications &rarr;</span>
            </Link>
          </div>

          <ProcessTimelineView />
        </div>
      </section>

      {/* 5. Founding Partners & Project Consultation */}
      <section className="py-20 md:py-28 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191817] dark:text-[#FBF9F5] font-serif mb-3">
              Direct founder accountability.
            </h2>
            <p className="text-base text-[#5A544E] dark:text-[#9E9689] font-sans leading-relaxed">
              Every engagement at Primeora is scoped, architected, and delivered directly by senior partners. Zero account-manager layers, zero junior handoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {INITIAL_FOUNDERS.map((founder) => (
              <div
                key={founder.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden mb-4 border border-[#E5DDD0] dark:border-[#242220] bg-[#EAE4DC] dark:bg-[#1C1A18]">
                    <Image
                      src={founder.photoUrl || '/brand/primeora-emblem.png'}
                      alt={founder.fullName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#191817] dark:text-[#FBF9F5] font-sans">
                    {founder.fullName}
                  </h3>
                  <span className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] block mb-2">
                    {founder.publicTitle}
                  </span>
                  <p className="text-xs text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
                    {founder.bio}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#7A7368]">
                    Bangalore, India
                  </span>
                  {founder.linkedinUrl && (
                    <a
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Invitation Callout */}
          <div className="bg-[#FAF7F2] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#191817] dark:text-[#FBF9F5] mb-3">
              Ready to engineer your digital systems?
            </h3>
            <p className="text-sm text-[#5A544E] dark:text-[#9E9689] max-w-xl mx-auto mb-6">
              Schedule an exploratory consultation directly with our founding partners. We audit your existing architecture and provide a structured scope proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#C25E38] hover:bg-[#A34520] dark:bg-[#E07A5F] dark:hover:bg-[#F08E73] text-white dark:text-[#090807] text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Initiate Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/readiness"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white dark:bg-[#1C1A18] border border-[#DDD5C7] dark:border-[#242220] text-[#191817] dark:text-[#FBF9F5] hover:border-[#C25E38] dark:hover:border-[#E07A5F] text-sm font-medium transition-colors"
              >
                <span>Take 3-Min Digital Diagnostic</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
              <Clock className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>We aim to respond to enquiries within 1–2 business days.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
