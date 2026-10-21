import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeamMembers } from '@/lib/cms-store';
import { INITIAL_FOUNDERS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Linkedin, Globe, CheckCircle2, ArrowRight, ShieldCheck, Clock, ArrowUpRight, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Founding Partners | Primeora Solutions',
  description:
    'Meet the three founding partners of Primeora Solutions: Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R. Direct senior engineering and business architecture.',
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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#090807] min-h-screen text-[#F5F2EB] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F]">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
            <span className="tracking-widest uppercase">Executive Practice Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans text-[#F5F2EB] leading-tight">
            Direct Founder Engineering
          </h1>

          <p className="text-base sm:text-lg text-[#9E988F] leading-relaxed font-sans">
            Primeora Solutions was founded on a simple principle: businesses deserve direct, accountable execution from senior practitioners, not junior account managers or offshore handoffs.
          </p>
        </div>

        {/* Detailed 3 Founders Showcase */}
        <div className="space-y-10 mb-20">
          {displayMembers.map((founder, idx) => {
            const photo = founder.photoUrl || founder.avatarUrl;
            const hasRealPhoto = Boolean(photo && photo.trim().length > 0);

            return (
              <div
                key={founder.id}
                className="bg-[#141312] border border-[#242220] hover:border-[#36332F] rounded-2xl p-8 sm:p-12 transition-all duration-300 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Portrait, Name, Verification */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-start gap-5">
                      {hasRealPhoto ? (
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-[#36332F] bg-[#1C1A18] shadow-md">
                          <Image
                            src={photo!}
                            alt={`${founder.fullName} - Founding Partner`}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover object-center filter contrast-[1.04]"
                          />
                        </div>
                      ) : (
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex-shrink-0 border border-[#36332F] bg-[#1C1A18] flex flex-col items-center justify-center text-[#F5F2EB] shadow-md">
                          <span className="font-mono font-bold text-3xl tracking-wider text-[#E07A5F]">
                            {founder.fullName.split(' ').map((n) => n[0]).join('')}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E988F] mt-1">
                            Partner
                          </span>
                        </div>
                      )}

                      <div className="min-w-0 flex-1 pt-1">
                        <span className="font-mono text-xs text-[#E07A5F] block font-semibold tracking-wider uppercase mb-1">
                          Partner 0{idx + 1}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#F5F2EB] tracking-tight">
                          {founder.fullName}
                        </h2>
                        <p className="text-sm font-medium text-[#C4BAA9] mt-0.5">
                          {founder.publicTitle}
                        </p>
                        <span className="text-xs font-mono text-[#6E6860] block mt-1">
                          {founder.department}
                        </span>
                      </div>
                    </div>

                    {/* Official Verification Pill */}
                    <div>
                      {hasRealPhoto ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#1065FF]/15 text-[#60A5FA] border border-[#1065FF]/30">
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-[#1065FF]" />
                          <span>Verified Founding Partner</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#1C1A18] text-[#9E988F] border border-[#242220]">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0 text-[#E07A5F]" />
                          <span>Official portrait pending submission</span>
                        </span>
                      )}
                    </div>

                    {/* Verified Channel Links */}
                    <div className="pt-2 flex flex-wrap gap-2.5">
                      {founder.linkedinUrl && (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1C1A18] hover:bg-[#242220] border border-[#242220] hover:border-[#36332F] rounded-lg text-xs font-mono text-[#F5F2EB] transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-[#1065FF]" />
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3 h-3 text-[#6E6860]" />
                        </a>
                      )}

                      {founder.portfolioUrl && (
                        <a
                          href={founder.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1C1A18] hover:bg-[#242220] border border-[#242220] hover:border-[#36332F] rounded-lg text-xs font-mono text-[#F5F2EB] transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#E07A5F]" />
                          <span>Portfolio</span>
                          <ArrowUpRight className="w-3 h-3 text-[#6E6860]" />
                        </a>
                      )}

                      <a
                        href={`mailto:${BRAND_CONFIG.contactEmail}?subject=Direct consultation request for ${encodeURIComponent(founder.fullName)}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1C1A18] hover:bg-[#242220] border border-[#242220] hover:border-[#36332F] rounded-lg text-xs font-mono text-[#F5F2EB] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#E07A5F]" />
                        <span>Direct Inbox</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Bio & Practice Responsibilities */}
                  <div className="lg:col-span-7 space-y-6 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#242220] lg:pl-10">
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#9E988F] mb-2 font-semibold">
                        Role &amp; Executive Focus
                      </h3>
                      <p className="text-sm sm:text-base text-[#C4BAA9] leading-relaxed">
                        {founder.bio}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#9E988F] mb-3 font-semibold">
                        Core Direct Responsibilities
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {founder.responsibilities.map((resp, rIdx) => (
                          <li
                            key={rIdx}
                            className="flex items-start gap-2.5 text-xs text-[#F5F2EB] p-2.5 rounded-lg bg-[#11100E] border border-[#242220]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Partner Invitation */}
        <div className="bg-[#141312] border border-[#242220] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl font-bold font-sans text-[#F5F2EB]">
              Speak directly with our founding partners.
            </h3>
            <p className="text-sm text-[#9E988F] leading-relaxed">
              Every prospective engagement begins with a direct, qualified technical consultation. We assess your operational bottlenecks and provide honest architectural direction. Response SLA: within 1–2 business days.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors flex-shrink-0 shadow-sm"
          >
            <span>Book a Direct Consultation</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
