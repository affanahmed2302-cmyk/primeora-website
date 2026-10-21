import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeamMembers } from '@/lib/cms-store';
import { INITIAL_FOUNDERS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import {
  Linkedin,
  ArrowRight,
  ShieldCheck,
  ArrowUpRight,
  Mail,
  Code2,
  LineChart,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import KineticTextReveal from '@/components/motion/KineticTextReveal';
import MagneticWrapper from '@/components/motion/MagneticWrapper';

export const metadata: Metadata = {
  title: 'Founding Partners | Primeora Solutions',
  description:
    'Meet the three founding partners of Primeora Solutions: Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R. Direct senior engineering, business strategy, and systems architecture.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/founders',
  },
  openGraph: {
    title: 'Founding Partners | Primeora Solutions',
    description:
      'Direct, senior practitioner execution from Primeora Solutions founding partners: Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R.',
    url: 'https://primeora-solutions.netlify.app/founders',
    siteName: BRAND_CONFIG.name,
    images: [{ url: '/brand/primeora-logo-dark.png' }],
  },
};

export default async function FoundersPage() {
  const members = await getTeamMembers(false);
  const displayMembers = members && members.length > 0 ? members : INITIAL_FOUNDERS;

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            EDITORIAL HEADER WITH INTEGRATED UPPER-RIGHT CONSULTATION ELEMENT
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 md:mb-24 pb-12 border-b border-[#E5DDD0] dark:border-[#242220]">
          {/* Left Column (7 cols): Main Heading & Studio Philosophy */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block">
              Leadership &amp; Execution · Founding Partners
            </span>

            <KineticTextReveal
              text="Direct founder engineering."
              highlightWord="engineering."
              highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5] leading-tight"
            />

            <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] leading-relaxed font-serif max-w-2xl">
              Primeora Solutions was founded on a simple principle: businesses deserve direct, accountable execution from senior practitioners, not junior account managers or offshore handoffs. Every architectural blueprint, software line, and data model is authored and tested by our three founding partners.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1065FF]" />
                <span>Udyam Registered MSME: UDYAM-KR-03-0732181</span>
              </span>
              <span>•</span>
              <span>NIC 62011 Technology Consultancy</span>
            </div>
          </div>

          {/* Right Column (5 cols): Upper-Right Purposeful Consultation Element */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] bg-[#C25E38]/10 dark:bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                  Partner Advisory
                </span>
                <span className="text-[11px] font-mono text-[#1065FF] dark:text-[#60A5FA]">
                  Direct Partner Access
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
                  Consult with the Founding Partners
                </h3>
                <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-1 leading-relaxed">
                  Discuss your business bottlenecks, digital architecture requirements, or custom integrations directly with our team.
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5DDD0] dark:border-[#242220] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                  Response SLA: <strong className="text-[#191817] dark:text-[#FBF9F5]">1–2 business days</strong>
                </div>

                <MagneticWrapper strength={0.2}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <span>Initiate Discovery Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </MagneticWrapper>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL FOUNDER PROFILES (Individually Art-Directed Layouts)
            ========================================================================= */}
        <div className="space-y-16 md:space-y-24">
          {displayMembers.map((founder, idx) => {
            const photo = founder.photoUrl || founder.avatarUrl;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={founder.id}
                className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 shadow-xs transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Portrait Column (4 cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="relative aspect-square max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border border-[#E5DDD0] dark:border-[#33302C] bg-[#EFECE6] dark:bg-[#1C1A18] shadow-sm">
                      <Image
                        src={photo || '/brand/primeora-emblem.png'}
                        alt={`${founder.fullName} - Founding Partner`}
                        fill
                        className="object-cover object-top filter contrast-[1.04]"
                        priority={idx === 0}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#7C7469] dark:text-[#8E867C] pt-2">
                      <span className="flex items-center gap-1 text-[#1065FF]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Partner 0{idx + 1} · Verified</span>
                      </span>
                      {founder.linkedinUrl && (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#5A544E] dark:text-[#9E988F] hover:text-[#191817] dark:hover:text-white transition-colors"
                          aria-label={`${founder.fullName} LinkedIn`}
                        >
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#7C7469]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Narrative Column (8 cols) */}
                  <div className="lg:col-span-8 space-y-5">
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] block mb-1">
                        {founder.department}
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] tracking-tight">
                        {founder.fullName}
                      </h2>
                      <p className="text-sm sm:text-base font-medium text-[#7C7469] dark:text-[#C4BAA9] mt-1 font-mono">
                        {founder.publicTitle}
                      </p>
                    </div>

                    <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                      {founder.bio}
                    </p>

                    {/* Operational Scope & Responsibilities */}
                    <div className="pt-6 border-t border-[#E5DDD0] dark:border-[#242220] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif text-[#5A544E] dark:text-[#9E988F]">
                      <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
                        <span className="font-mono uppercase font-bold text-[#191817] dark:text-[#FBF9F5] block">
                          Executive Scope
                        </span>
                        <p>
                          Accountable for direct architectural decisions, code quality, and delivery timelines within {founder.department}.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
                        <span className="font-mono uppercase font-bold text-[#191817] dark:text-[#FBF9F5] block">
                          Direct Communication
                        </span>
                        <p>
                          Every client engagement has direct messaging access to the lead partner. Zero intermediaries or junior account filters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
