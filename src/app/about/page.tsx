import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import FoundersSection from '@/components/FoundersSection';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the Practice — Leadership & Operating Principles — Primeora Solutions',
  description:
    'Learn about Primeora Solutions, our founding partners Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R., our operating principles, and our engineering-led approach to digital consulting.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>FIRM PHILOSOPHY &amp; GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            About Primeora Solutions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            We are a strategy and technology engineering consultancy founded on a single conviction: modern businesses do not need more disconnected tools—they need their digital systems to work together.
          </p>
        </div>
      </div>

      {/* Purpose & Operating Commitments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">
          <div className="space-y-5">
            <span className="text-xs font-mono uppercase text-[#3B82F6] font-semibold block">
              The Problem with Fragmented Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans leading-tight">
              Why We Built an Integrated Systems Practice
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              When business owners seek digital help, they are usually forced to assemble a patchwork of isolated freelancers: a designer who builds a site that doesn’t convert, an SEO marketer who doesn’t understand technical code, and an automation hobbyist whose scripts break silently.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Primeora Solutions was established to provide an integrated engineering alternative. We bring business strategy, full-stack software development, and internal workflow automation into one accountable team.
            </p>
          </div>

          <div className="bg-[#08152B] p-8 rounded-xl border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-white font-sans">
              Our Operating Commitments
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Understand before prescribing:</strong> We diagnose your operational friction before proposing any tool or technology stack.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Explicit scope &amp; exclusions:</strong> Every proposal details what is delivered, client dependencies, and exact boundaries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Data security &amp; least privilege:</strong> We never ask for client passwords in plain text and use delegated API access.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Verified deliverables &amp; handover:</strong> We test all code, forms, and automations before release and provide full client documentation.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Identity & Governance Box */}
        <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 mb-20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#040D1A] text-[#3B82F6] border border-white/10 rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 font-sans">
                Legal Entity &amp; Registered Enterprise Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {BRAND_CONFIG.legalNotice}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-400">
                <div>
                  <span className="font-bold text-white">Enterprise: </span>
                  <span>{BRAND_CONFIG.legalEntity}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Udyam No: </span>
                  <span className="text-[#3B82F6]">{BRAND_CONFIG.udyamRegistrationNumber}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Location: </span>
                  <span>{BRAND_CONFIG.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founders Component */}
        <FoundersSection />
      </div>
    </div>
  );
}
