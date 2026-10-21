'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TeamMember } from '@/types';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { Linkedin, Globe, ArrowRight, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

interface FoundersSectionProps {
  initialMembers?: TeamMember[];
}

export default function FoundersSection({ initialMembers }: FoundersSectionProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers || INITIAL_FOUNDERS);

  useEffect(() => {
    // Dynamically fetch published members from the CMS API
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.members) && data.members.length > 0) {
          setMembers(data.members);
        }
      })
      .catch(() => {
        // Fallback to initial config
      });
  }, []);

  return (
    <section id="founders" className="py-20 md:py-28 bg-[#FBF9F5] dark:bg-[#090807] border-b border-[#E5DDD0] dark:border-[#242220] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191817] dark:text-[#F5F2EB] tracking-tight font-sans">
            Direct Founder Engineering
          </h2>
          <p className="mt-3 text-base text-[#5A544E] dark:text-[#9E988F] leading-relaxed max-w-2xl font-serif">
            Primeora operates with zero account-manager layers. Every engagement is scoped, architected, and directly reviewed by the founding partners.
          </p>
        </div>

        {/* 3 Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.slice(0, 3).map((person) => {
            const photo = person.photoUrl || person.avatarUrl;
            const hasRealPhoto = Boolean(photo && photo.trim().length > 0);

            return (
              <div
                key={person.id}
                className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-xl p-7 flex flex-col justify-between hover:border-[#C25E38]/40 dark:hover:border-[#36332F] hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  {/* Person Header with Portrait or Monogram Crest */}
                  <div className="flex items-start gap-4 mb-5">
                    {hasRealPhoto ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#DDD5C7] dark:border-[#36332F] bg-[#F4EFEA] dark:bg-[#1C1A18] shadow-xs">
                        <Image
                          src={photo!}
                          alt={`${person.fullName} - Founding Partner`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover object-center filter contrast-[1.04]"
                        />
                      </div>
                    ) : (
                      <div className="relative w-16 h-16 rounded-xl flex-shrink-0 border border-[#DDD5C7] dark:border-[#36332F] bg-[#F4EFEA] dark:bg-[#1C1A18] flex flex-col items-center justify-center text-[#191817] dark:text-[#F5F2EB] shadow-xs">
                        <span className="font-mono font-bold text-lg tracking-wider text-[#C25E38] dark:text-[#E07A5F]">
                          {person.fullName.split(' ').map((n) => n[0]).join('')}
                        </span>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#7C7469] dark:text-[#9E988F] -mt-0.5">
                          Partner
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#191817] dark:text-[#F5F2EB] font-sans group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors truncate">
                        {person.fullName}
                      </h3>
                      <p className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] mt-0.5 font-medium">
                        {person.publicTitle}
                      </p>
                      <span className="text-[11px] text-[#5A544E] dark:text-[#9E988F] block truncate">
                        {person.department}
                      </span>
                    </div>
                  </div>

                  {/* Verification Status Badge */}
                  <div className="mb-4">
                    {hasRealPhoto ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#1065FF]/10 dark:bg-[#1065FF]/15 text-[#1065FF] dark:text-[#60A5FA] border border-[#1065FF]/30">
                        <ShieldCheck className="w-3 h-3 flex-shrink-0 text-[#1065FF]" />
                        <span>Verified Founding Partner</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F4EFEA] dark:bg-[#1C1A18] text-[#7C7469] dark:text-[#9E988F] border border-[#DDD5C7] dark:border-[#242220]">
                        <Clock className="w-3 h-3 flex-shrink-0 text-[#C25E38] dark:text-[#E07A5F]" />
                        <span>Official portrait pending submission</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#5A544E] dark:text-[#9E988F] leading-relaxed mb-5 line-clamp-3">
                    {person.bio}
                  </p>
                </div>

                {/* Verified Links */}
                <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center gap-3">
                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4EFEA] dark:bg-[#1C1A18] hover:bg-[#EAE4DC] dark:hover:bg-[#242220] border border-[#DDD5C7] dark:border-[#242220] rounded-md text-xs font-mono text-[#191817] dark:text-[#F5F2EB] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#1065FF]" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 text-[#7C7469] dark:text-[#6E6860]" />
                    </a>
                  )}
                  {person.portfolioUrl && (
                    <a
                      href={person.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4EFEA] dark:bg-[#1C1A18] hover:bg-[#EAE4DC] dark:hover:bg-[#242220] border border-[#DDD5C7] dark:border-[#242220] rounded-md text-xs font-mono text-[#191817] dark:text-[#F5F2EB] transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
                      <span>Portfolio</span>
                      <ArrowUpRight className="w-3 h-3 text-[#7C7469] dark:text-[#6E6860]" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link to Full Founders Directory */}
        <div className="mt-10 text-center">
          <Link
            href="/founders"
            className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline transition-colors gap-1.5"
          >
            <span>Meet All Founding Partners &amp; Credentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
