import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import FoundersSection from '@/components/FoundersSection';
import { Shield, Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the Practice — Leadership & Operating Principles — Primeora Solutions',
  description:
    'Learn about Primeora Solutions, our founders Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R., our operating principles, and our engineering-led approach to digital consulting.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      {/* Header */}
      <div className="bg-[#0B0F1A]/60 py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Philosophy &amp; Practice</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-white tracking-tight">
            About Primeora Solutions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            We are a strategy and technology engineering consultancy founded on a single conviction: modern businesses do not need more disconnected tools—they need their digital systems to work together.
          </p>
        </div>
      </div>

      {/* Purpose & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-light">
              The Problem with Fragmented Digital Services
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white leading-tight">
              Why We Built a Joined-Up Digital Practice
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              When business owners seek digital help, they are usually forced to assemble a patchwork of isolated freelancers: a designer who builds a site that doesn’t convert, an SEO marketer who doesn’t understand technical code, and an automation hobbyist whose scripts break silently.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Primeora Solutions was established to provide an integrated engineering alternative. We bring business strategy, full-stack software development, and internal workflow automation into one accountable team.
            </p>
          </div>

          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] space-y-4">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              Our Operating Commitments
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Understand before prescribing:</strong> We diagnose your operational friction before proposing any tool or technology stack.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Explicit scope &amp; exclusions:</strong> Every proposal details what is delivered, client dependencies, and exact boundaries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Data security &amp; least privilege:</strong> We never ask for client passwords in plain text and use delegated API access.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Verified deliverables &amp; handover:</strong> We test all code, forms, and automations before release and provide full client documentation.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Identity & Governance Box */}
        <div className="bg-[#0B0F1A]/90 border border-white/10 rounded-2xl p-6 sm:p-8 mb-20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-azure/20 text-azure-bright border border-azure/30 rounded-xl flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-1">
                Legal Entity &amp; Registered Enterprise Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {BRAND_CONFIG.legalNotice}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-400">
                <div>
                  <span className="font-bold text-white">Enterprise: </span>
                  <span>{BRAND_CONFIG.legalEntity}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Udyam No: </span>
                  <span>{BRAND_CONFIG.udyamRegistrationNumber}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Classification: </span>
                  <span>Micro Enterprise (NIC 62011)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Founders & Team Section */}
        <FoundersSection />
      </div>
    </div>
  );
}
