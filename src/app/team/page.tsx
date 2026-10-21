import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeamMembers } from '@/lib/cms-store';
import { INITIAL_FOUNDERS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Linkedin, Globe, CheckCircle2, ArrowRight, ShieldCheck, Mail, Clock, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Founding Partners & Leadership | Primeora Solutions',
  description:
    'Meet the three founding partners of Primeora Solutions: Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R. Direct senior engineering and strategy execution.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/team',
  },
};

export default async function TeamPage() {
  const members = await getTeamMembers(false);
  const displayMembers = members && members.length > 0 ? members : INITIAL_FOUNDERS;

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#121110] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header without eyebrow */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5]">
            Founding Partners &amp; Leadership
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            Primeora Solutions was founded on a simple principle: businesses deserve direct, accountable execution from experienced practitioners, not junior account reps.
          </p>
        </div>

        {/* Detailed Founders & Leadership Directory */}
        <div className="space-y-10 mb-20">
          {displayMembers.map((founder) => {
            const photo = founder.photoUrl || founder.avatarUrl;
            const hasRealPhoto = Boolean(photo && photo.trim().length > 0);

            return (
              <div
                key={founder.id}
                className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-8 sm:p-10 hover:border-[#C25E38]/40 dark:hover:border-[#E07A5F]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Profile Summary */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-4">
                      {hasRealPhoto ? (
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#DDD5C7] dark:border-[#383430] bg-[#EAE4DC] dark:bg-[#22201D] shadow-xs">
                          <Image
                            src={photo!}
                            alt={`${founder.fullName} - Founding Partner`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover object-center filter contrast-[1.03]"
                          />
                        </div>
                      ) : (
                        <div className="relative w-20 h-20 rounded-2xl flex-shrink-0 border-2 border-[#DDD5C7] dark:border-[#383430] bg-gradient-to-br from-[#EAE4DC] to-[#DDD5C7] dark:from-[#24221F] dark:to-[#1B1917] flex flex-col items-center justify-center text-[#191817] dark:text-[#FBF9F5] shadow-xs">
                          <span className="font-mono font-bold text-2xl tracking-wider text-[#C25E38] dark:text-[#E07A5F]">
                            {founder.fullName.split(' ').map((n) => n[0]).join('')}
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#7C7469] dark:text-[#8E867C] -mt-0.5">
                            Partner
                          </span>
                        </div>
                      )}

                      <div className="min-w-0">
                        <h2 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
                          {founder.fullName}
                        </h2>
                        <p className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] mt-0.5 font-medium">
                          {founder.publicTitle}
                        </p>
                        <span className="text-xs text-[#7C7469] dark:text-[#8E867C] block truncate">
                          {founder.department}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-1">
                      {hasRealPhoto ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#E8F0FE] dark:bg-[#14233C] text-[#1A56DB] dark:text-[#60A5FA] border border-[#BED2FA] dark:border-[#1E3A8A]">
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>Verified Founding Partner</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#F4EFEA] dark:bg-[#22201E] text-[#7C7469] dark:text-[#A8A196] border border-[#DDD5C7] dark:border-[#33302B]">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0 text-[#C25E38] dark:text-[#E07A5F]" />
                          <span>Official portrait pending submission</span>
                        </span>
                      )}
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2.5">
                      {founder.linkedinUrl && (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FBF9F5] dark:bg-[#22201D] hover:bg-[#EAE4DC] dark:hover:bg-[#2A2825] border border-[#DDD5C7] dark:border-[#383430] rounded-md text-xs text-[#3D3833] dark:text-[#DDD6CC] hover:text-[#191817] dark:hover:text-white transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-[#1065FF]" />
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3 h-3 text-[#7C7469] dark:text-[#8E867C]" />
                        </a>
                      )}
                      {founder.portfolioUrl && (
                        <a
                          href={founder.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FBF9F5] dark:bg-[#22201D] hover:bg-[#EAE4DC] dark:hover:bg-[#2A2825] border border-[#DDD5C7] dark:border-[#383430] rounded-md text-xs text-[#3D3833] dark:text-[#DDD6CC] hover:text-[#191817] dark:hover:text-white transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
                          <span>Portfolio</span>
                          <ArrowUpRight className="w-3 h-3 text-[#7C7469] dark:text-[#8E867C]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Bio & Key Responsibilities */}
                  <div className="lg:col-span-8 space-y-5">
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#7C7469] dark:text-[#8E867C] font-semibold mb-2">
                        Professional Biography
                      </h3>
                      <p className="text-sm sm:text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                        {founder.bio}
                      </p>
                    </div>

                    {founder.responsibilities && founder.responsibilities.length > 0 && (
                      <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926]">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-[#7C7469] dark:text-[#8E867C] font-semibold mb-3">
                          Practice Responsibilities
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {founder.responsibilities.map((resp, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3]">
                              <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accountability Guarantee */}
        <div className="bg-[#F4EFEA] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-8 max-w-4xl mx-auto text-center shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2">
            Direct Founder Account Management
          </h2>
          <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] max-w-2xl mx-auto leading-relaxed mb-6 font-serif">
            When you engage Primeora Solutions, your project scope is formulated by Affan, architected by Akarsh, and system-analyzed by Dhananjaya. No third-party handoffs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm group"
          >
            <span>Initiate Founder Consultation</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
