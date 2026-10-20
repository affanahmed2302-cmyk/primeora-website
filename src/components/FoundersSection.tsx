'use client';

import React, { useState, useEffect } from 'react';
import { TeamMember } from '@/types';
import { INITIAL_FOUNDERS } from '@/config/brand';
import { User, Linkedin, Globe, CheckCircle2 } from 'lucide-react';

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
    <section id="team" className="py-20 md:py-28 bg-ivory border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Leadership & Practice</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            Founders & Leadership Team
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Direct access to senior practitioners across commercial growth, full-stack software engineering, and enterprise systems strategy.
          </p>
        </div>

        {/* Dynamic Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-xl p-7 sm:p-8 border border-border-subtle shadow-card flex flex-col justify-between hover:border-forest/30 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Person Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-forest/10 border border-forest/15 flex items-center justify-center flex-shrink-0 text-forest overflow-hidden">
                    {person.photoUrl && !person.photoUrl.includes('.jpg') ? (
                      <img
                        src={person.photoUrl}
                        alt={person.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-forest" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest">
                      {person.fullName}
                    </h3>
                    <p className="text-xs font-medium text-teal font-mono mt-0.5">
                      {person.publicTitle}
                    </p>
                    <span className="text-[11px] text-charcoal-muted block">
                      {person.department}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6">
                  {person.bio}
                </p>

                {/* Responsibilities */}
                {person.responsibilities && person.responsibilities.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-border-subtle">
                    <span className="text-[11px] font-mono uppercase font-semibold text-charcoal-muted block mb-2.5">
                      Direct Responsibilities:
                    </span>
                    <ul className="space-y-2">
                      {person.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-charcoal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Verified Links */}
              <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                {person.linkedinUrl ? (
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:text-teal transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-charcoal-muted/70 italic">
                    LinkedIn profile pending verification
                  </span>
                )}

                {person.portfolioUrl && (
                  <a
                    href={person.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-copper hover:text-copper-dark transition-colors ml-auto"
                  >
                    <Globe className="w-4 h-4" />
                    <span>External Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
