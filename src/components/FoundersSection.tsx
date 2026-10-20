'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TeamMember } from '@/types';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { Linkedin, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';

interface FoundersSectionProps {
  initialMembers?: TeamMember[];
}

export default function FoundersSection({ initialMembers }: FoundersSectionProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers || INITIAL_FOUNDERS);

  useEffect(() => {
    // Dynamically fetch published team members from the CMS API
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
    <section id="team" className="py-20 md:py-28 bg-[#040D1A] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>PARTNERS &amp; LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Direct Founder Engineering
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
            Primeora operates with zero account-manager layers. Every engagement is scoped, architected, and directly reviewed by the founding partners.
          </p>
        </div>

        {/* 3 Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.slice(0, 3).map((person) => (
            <div
              key={person.id}
              className="bg-[#08152B] border border-white/[0.08] rounded-xl p-7 flex flex-col justify-between hover:border-[#166CFF]/40 transition-colors group"
            >
              <div>
                {/* Person Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg bg-[#040D1A] border border-white/10 flex items-center justify-center flex-shrink-0 text-[#3B82F6] font-mono font-bold text-base">
                    {person.fullName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans group-hover:text-[#3B82F6] transition-colors">
                      {person.fullName}
                    </h3>
                    <p className="text-xs font-mono text-[#3B82F6] mt-0.5">
                      {person.publicTitle}
                    </p>
                    <span className="text-[11px] text-slate-500 block">
                      {person.department}
                    </span>
                  </div>
                </div>

                {/* Concise Bio */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {person.bio}
                </p>

                {/* Direct Responsibilities */}
                {person.responsibilities && person.responsibilities.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.06] mb-6">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2">
                      Core Responsibilities:
                    </span>
                    <ul className="space-y-1.5">
                      {person.responsibilities.slice(0, 3).map((resp, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-[#166CFF]">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Verified Links */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                {person.linkedinUrl && (
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#040D1A] hover:bg-[#0E1F3D] border border-white/10 rounded-md text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                )}
                {person.portfolioUrl && (
                  <a
                    href={person.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#040D1A] hover:bg-[#0E1F3D] border border-white/10 rounded-md text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Portfolio</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Link to Dedicated Team & About Page */}
        <div className="mt-10 flex justify-end">
          <Link
            href="/team"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors group"
          >
            <span>View Full Founding Team &amp; Governance Structure</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
