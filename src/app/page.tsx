import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG, INITIAL_FOUNDERS } from '@/config/brand';
import ArchitecturalHeroParallax from '@/components/hero/ArchitecturalHeroParallax';
import SpatialPracticeLedger from '@/components/services/SpatialPracticeLedger';
import MagneticWrapper from '@/components/motion/MagneticWrapper';
import { ArrowRight, ShieldCheck, Linkedin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Primeora Solutions — Digital Systems Engineered for Measurable Growth',
  description:
    'A strategy and technology engineering consultancy helping businesses build resilient digital presence, connected enquiry systems, practical workflow automation, and actionable intelligence.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app',
  },
};

export default function HomePage() {
  return (
    <div className="bg-[#FBF9F5] dark:bg-[#090807] text-[#191817] dark:text-[#F5F2EB] transition-colors duration-200">
      {/* =========================================================================
          ACT I: CINEMATIC HERO & 3D ISOMETRIC ARCHITECTURAL PARALLAX (Aceternity UI + Animmaster)
          ========================================================================= */}
      <ArchitecturalHeroParallax />

      {/* =========================================================================
          ACT II: THE REALITY VS. THE INTEGRATED ALTERNATIVE (Editorial Contrast Spread)
          ========================================================================= */}
      <section className="py-20 md:py-32 border-t border-[#E5DDD0] dark:border-[#242220] bg-white dark:bg-[#0E0D0C] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left (5 cols): Diagnostic Challenge */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block">
                The Operational Bottleneck
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight leading-[1.15] text-[#191817] dark:text-[#FBF9F5]">
                Why fragmented digital tools cost more than they earn.
              </h2>

              <p className="text-base text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                Most growing businesses don’t suffer from a lack of software. They suffer from disconnected tools: a website built on an outdated template that converts poorly, an ad campaign dropping leads into an unmonitored inbox, and a team wasting hours copying data between spreadsheets.
              </p>

              <div className="p-4 rounded-lg bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                We eliminate the friction between discovery, lead capture, and internal operations by treating your digital presence as a single unified system.
              </div>
            </div>

            {/* Right (7 cols): The 3 Pillars of Unified Engineering */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1065FF] font-semibold block">
                The Primeora Standard
              </span>

              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220]">
                  <h3 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1065FF] flex-shrink-0" />
                    <span>Engineered Web Infrastructure</span>
                  </h3>
                  <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                    Custom Next.js frontends engineered for sub-second Core Web Vitals, accessible semantic markup, and technical search engine discoverability.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220]">
                  <h3 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                    <span>Zero-Loss Lead Triage &amp; CRM</span>
                  </h3>
                  <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                    Multichannel enquiries (forms, WhatsApp, calendar booking) route into a PostgreSQL database and sales CRM within seconds with instant team notifications.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220]">
                  <h3 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1065FF] flex-shrink-0" />
                    <span>Automated Operations &amp; Intelligence</span>
                  </h3>
                  <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                    Billing, invoicing, and reporting synchronize automatically via resilient webhooks, providing leadership with real-time conversion and revenue clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACT III: THE SPATIAL PRACTICE LEDGER (Skiper UI Pattern)
          ========================================================================= */}
      <section className="py-20 md:py-32 border-t border-[#E5DDD0] dark:border-[#242220] bg-[#FBF9F5] dark:bg-[#090807] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
                Practice Areas &amp; Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-[#191817] dark:text-[#FBF9F5]">
                Six connected engineering domains.
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
            >
              <span>View Engagement Tiers &amp; Scopes</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>

        {/* Spatial Accordion Ledger */}
        <SpatialPracticeLedger />
      </section>

      {/* =========================================================================
          ACT IV: DIRECT FOUNDER ENGINEERING & CONSULTATION ROUTE
          ========================================================================= */}
      <section className="py-20 md:py-32 border-t border-[#E5DDD0] dark:border-[#242220] bg-white dark:bg-[#0E0D0C] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1065FF] font-semibold block mb-2">
              Leadership &amp; Accountability
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-[#191817] dark:text-[#FBF9F5]">
              Direct partner execution. No junior handoffs.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
              Every system we build is architected, developed, and quality-tested directly by our three founding partners.
            </p>
          </div>

          {/* Large-Format Editorial Founder Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {INITIAL_FOUNDERS.map((founder, idx) => (
              <div
                key={founder.id}
                className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] transition-all hover:border-[#1065FF]/40 shadow-xs"
              >
                <div>
                  {/* Portrait with Monogram / Frame */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-[#DDD5C7] dark:border-[#2C2926] bg-[#EAE4DC] dark:bg-[#1C1A18] shadow-xs">
                    <Image
                      src={founder.photoUrl || '/brand/primeora-emblem.png'}
                      alt={founder.fullName}
                      fill
                      className="object-cover object-top filter contrast-[1.04]"
                    />
                  </div>

                  <div className="text-[11px] font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-1">
                    Partner 0{idx + 1}
                  </div>

                  <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-1">
                    {founder.fullName}
                  </h3>

                  <span className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] block mb-3 font-medium">
                    {founder.publicTitle}
                  </span>

                  <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed line-clamp-4">
                    {founder.bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#1065FF]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Partner</span>
                  </span>

                  {founder.linkedinUrl && (
                    <a
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#5A544E] dark:text-[#9E988F] hover:text-[#191817] dark:hover:text-white transition-colors"
                      aria-label={`${founder.fullName} LinkedIn`}
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 text-[#7C7469]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Banner with Approved SLA */}
          <div className="rounded-2xl p-8 sm:p-12 bg-[#F4EFEA] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block">
                Commercial Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
                Discuss your digital systems with the founding partners.
              </h3>
              <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif max-w-xl">
                We review technical requirements, current operational bottlenecks, and scope transparent deliverables.
              </p>
              <div className="pt-2 text-xs font-mono font-medium text-[#1065FF] dark:text-[#60A5FA]">
                We aim to respond to enquiries within 1–2 business days.
              </div>
            </div>

            <div className="flex-shrink-0">
              <MagneticWrapper strength={0.25}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm group"
                >
                  <span>Initiate Discovery Enquiry</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
