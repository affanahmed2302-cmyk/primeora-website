import React from 'react';
import type { Metadata } from 'next';
import { INITIAL_FOUNDERS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Linkedin, Globe, CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Founding Partners & Leadership | Primeora Solutions',
  description:
    'Meet the three founding partners of Primeora Solutions: Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R. Direct senior engineering and strategy execution.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/team',
  },
};

export default function TeamPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>PARTNERS &amp; GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Founding Partners &amp; Leadership
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Primeora Solutions was founded on a simple principle: businesses deserve direct, accountable execution from experienced practitioners, not junior account reps.
          </p>
        </div>

        {/* Detailed 3-Founders Directory */}
        <div className="space-y-10 mb-20">
          {INITIAL_FOUNDERS.map((founder, idx) => (
            <div
              key={founder.id}
              className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 sm:p-10 hover:border-[#166CFF]/30 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Profile Summary */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#040D1A] border border-white/10 flex items-center justify-center text-[#3B82F6] font-mono font-bold text-xl">
                      {founder.fullName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-sans">
                        {founder.fullName}
                      </h2>
                      <p className="text-xs font-mono text-[#3B82F6] mt-0.5">
                        {founder.publicTitle}
                      </p>
                      <span className="text-xs text-slate-500 block">
                        {founder.department}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-3">
                    {founder.linkedinUrl && (
                      <a
                        href={founder.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#040D1A] hover:bg-[#0E1F3D] border border-white/10 rounded-md text-xs text-slate-300 hover:text-white transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    {founder.portfolioUrl && (
                      <a
                        href={founder.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#040D1A] hover:bg-[#0E1F3D] border border-white/10 rounded-md text-xs text-slate-300 hover:text-white transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>Personal Portfolio</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Profile Details */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-500 mb-2">
                      Professional Background &amp; Focus
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>

                  {founder.responsibilities && founder.responsibilities.length > 0 && (
                    <div className="pt-4 border-t border-white/[0.06]">
                      <h3 className="text-xs font-mono uppercase text-slate-500 mb-3">
                        Operational Responsibilities &amp; Client Deliverables
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {founder.responsibilities.map((resp, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#166CFF] flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Governance & Direct Access Commitment */}
        <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 sm:p-10 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#3B82F6]">
              <ShieldCheck className="w-4 h-4" />
              <span>DIRECT FOUNDER EXECUTION POLICY</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans mb-3">
              No Middlemen. No Delegated Subcontracting.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              When you engage Primeora Solutions, your project scope is personally reviewed and written by our founding partners. All core architecture, API integrations, and analytics instrumentation are executed directly by our team in Bangalore, India.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Mail className="w-4 h-4 text-[#3B82F6]" />
              <span>General Partner Inquiries: </span>
              <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="text-white hover:underline">
                {BRAND_CONFIG.contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* CTA to Consultation */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white font-sans mb-3">
            Schedule a Founder Consultation
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Review your digital infrastructure directly with our technical and strategy partners.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors group"
          >
            <span>Discuss a Project</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
