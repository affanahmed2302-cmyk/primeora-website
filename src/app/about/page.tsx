import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import FoundersSection from '@/components/FoundersSection';
import { Shield, Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the Practice — Leadership & Operating Principles',
  description:
    'Learn about Ritkara Veyra, our founders Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R., our operating principles, and our engineering-led approach to digital consulting.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="bg-architectural-grid py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Philosophy & Practice</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            About Ritkara Veyra
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            We are a strategy and technology consultancy founded on a single conviction: modern businesses do not need more disconnected tools—they need their existing systems to work together.
          </p>
        </div>
      </div>

      {/* Purpose & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-copper">
              The Problem with Fragmented Digital Services
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest leading-tight">
              Why We Built a Joined-Up Digital Practice
            </h2>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              When business owners seek digital help, they are usually forced to assemble a patchwork of isolated freelancers: a designer who builds a site that doesn’t convert, an SEO marketer who doesn’t understand technical code, and an automation hobbyist whose scripts break silently.
            </p>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Ritkara Veyra was established to provide an integrated engineering alternative. We bring business strategy, full-stack software development, and internal workflow automation into one accountable team.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-border-medium shadow-card space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest">
              Our Operating Commitments
            </h3>
            <ul className="space-y-3 text-sm text-charcoal">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Understand before prescribing:</strong> We diagnose your operational friction before proposing any tool or technology stack.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Explicit scope & exclusions:</strong> Every proposal details what is delivered, client dependencies, and exact boundaries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Data security & least privilege:</strong> We never ask for client passwords in plain text and use delegated API access.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Verified deliverables & handover:</strong> We test all code, forms, and automations before release and provide full client documentation.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Identity & Governance Box */}
        <div className="bg-ivory-light border border-border-medium rounded-xl p-6 sm:p-8 mb-20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-forest text-ivory rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-forest mb-1">
                Legal Entity & Registered Enterprise Details
              </h3>
              <p className="text-xs sm:text-sm text-charcoal leading-relaxed mb-3">
                {BRAND_CONFIG.legalNotice}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-charcoal-muted">
                <div>
                  <span className="font-bold text-forest">Enterprise: </span>
                  <span>{BRAND_CONFIG.legalEntity}</span>
                </div>
                <div>
                  <span className="font-bold text-forest">Udyam No: </span>
                  <span>{BRAND_CONFIG.udyamRegistrationNumber}</span>
                </div>
                <div>
                  <span className="font-bold text-forest">Classification: </span>
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
