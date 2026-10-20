'use client';

import React, { useState, useEffect } from 'react';
import { TeamMember } from '@/types';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { User, Linkedin, Globe, CheckCircle2, ArrowUpRight } from 'lucide-react';

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
    <section id="team" className="py-20 md:py-28 bg-[#07090F] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Leadership &amp; Practice</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Founders &amp; Leadership Team
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            Direct access to senior practitioners across commercial growth, full-stack software engineering, and enterprise systems strategy.
          </p>
        </div>

        {/* Dynamic Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((person) => (
            <div
              key={person.id}
              className="bg-[#0B0F1A]/80 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col justify-between hover:border-azure/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Person Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-azure/20 to-violet/20 border border-azure/30 flex items-center justify-center flex-shrink-0 text-azure-bright overflow-hidden shadow-inner">
                    {person.photoUrl && !person.photoUrl.includes('.jpg') ? (
                      <img
                        src={person.photoUrl}
                        alt={person.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-['Space_Grotesk'] font-bold text-lg text-azure-bright">
                        {person.fullName.split(' ').map((n) => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-azure-light transition-colors">
                      {person.fullName}
                    </h3>
                    <p className="text-xs font-medium text-azure-bright font-mono mt-0.5">
                      {person.publicTitle}
                    </p>
                    <span className="text-[11px] text-slate-400 block">
                      {person.department}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {person.bio}
                </p>

                {/* Responsibilities */}
                {person.responsibilities && person.responsibilities.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase font-semibold text-slate-400 block mb-2.5">
                      Direct Responsibilities:
                    </span>
                    <ul className="space-y-2">
                      {person.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-azure-bright flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Verified Links: LinkedIn & Portfolio */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-azure/20 px-3 py-1.5 rounded-lg border border-white/10 hover:border-azure/40 transition-all font-medium"
                      aria-label={`${person.fullName} on LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-azure-bright" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {person.portfolioUrl && (
                    <a
                      href={person.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-violet/20 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet/40 transition-all font-medium"
                      aria-label={`${person.fullName} Portfolio`}
                    >
                      <Globe className="w-3.5 h-3.5 text-violet-light" />
                      <span>Portfolio</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Partner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
