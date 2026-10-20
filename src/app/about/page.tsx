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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>FIRM PHILOSOPHY &amp; GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
            About Primeora Solutions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            We are a strategy and technology engineering consultancy founded on a single conviction: modern businesses do not need more disconnected tools—they need their digital systems to work together.
          </p>
        </div>
      </div>

      {/* Purpose & Operating Commitments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">
          <div className="space-y-5">
            <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold block">
              The Problem with Fragmented Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans leading-tight text-editorial-ink dark:text-[#FBF9F5]">
              Why We Built an Integrated Systems Practice
            </h2>
            <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
              When business owners seek digital help, they are usually forced to assemble a patchwork of isolated freelancers: a designer who builds a site that doesn’t convert, an SEO marketer who doesn’t understand technical code, and an automation hobbyist whose scripts break silently.
            </p>
            <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
              Primeora Solutions was established to provide an integrated engineering alternative. We bring business strategy, full-stack software development, and internal workflow automation into one accountable team.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1C1A18] p-8 rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] space-y-4 shadow-xs">
            <h3 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">
              Our Operating Commitments
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-editorial-ink dark:text-[#FBF9F5]">Understand before prescribing:</strong> We diagnose your operational friction before proposing any tool or technology stack.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-editorial-ink dark:text-[#FBF9F5]">Explicit scope &amp; exclusions:</strong> Every proposal details what is delivered, client dependencies, and exact boundaries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-editorial-ink dark:text-[#FBF9F5]">Data security &amp; least privilege:</strong> We never ask for client passwords in plain text and use delegated API access.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-editorial-ink dark:text-[#FBF9F5]">Verified deliverables &amp; handover:</strong> We test all code, forms, and automations before release and provide full client documentation.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Identity & Governance Box */}
        <div className="bg-[#F4EFEA] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-8 mb-20 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-[#22201D] text-[#C25E38] dark:text-[#E07A5F] border border-[#DDD5C7] dark:border-[#383430] rounded-lg flex-shrink-0 shadow-xs">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1 font-sans text-editorial-ink dark:text-[#FBF9F5]">
                Legal Entity &amp; Registered Enterprise Details
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-4">
                {BRAND_CONFIG.legalNotice}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                <div>
                  <span className="block text-[#3D3833] dark:text-[#DDD6CC] font-semibold">Entity Type:</span>
                  <span>{BRAND_CONFIG.udyamStatus}</span>
                </div>
                <div>
                  <span className="block text-[#3D3833] dark:text-[#DDD6CC] font-semibold">Registration Number:</span>
                  <span>{BRAND_CONFIG.udyamRegistrationNumber}</span>
                </div>
                <div>
                  <span className="block text-[#3D3833] dark:text-[#DDD6CC] font-semibold">Base Operations:</span>
                  <span>{BRAND_CONFIG.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Founders & Leadership Section */}
      <FoundersSection />

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans mb-3 text-editorial-ink dark:text-[#FBF9F5]">
          Explore a Collaborative Partnership
        </h2>
        <p className="text-sm text-[#5A544E] dark:text-[#A8A196] max-w-xl mx-auto mb-6 font-serif">
          Ready to review your digital architecture directly with our founding partners?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm group"
        >
          <span>Initiate Discovery Enquiry</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
