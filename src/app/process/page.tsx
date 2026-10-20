import React from 'react';
import type { Metadata } from 'next';
import ProcessSection from '@/components/ProcessSection';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Code2, LineChart, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Four-Step Process — Discovery to Continuous Optimization',
  description:
    'Learn how Ritkara Veyra executes client projects with engineering discipline: Discovery, Blueprint, Build & Launch, and Grow & Optimize.',
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="bg-architectural-grid py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Engineering Discipline</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            Our Four-Step Methodology
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Eliminating assumption through structured discovery, architectural blueprints, verified builds, and continuous data-informed optimization.
          </p>
        </div>
      </div>

      <ProcessSection />

      {/* Deep Stage Details */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white rounded-xl border border-border-medium p-6 sm:p-10 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-forest text-ivory rounded-md">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-forest">
              What We Require from Clients at Each Stage
            </h2>
          </div>
          <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
            A successful digital system requires close collaboration. We keep client time commitments focused and efficient:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-4 bg-ivory-light border border-border-subtle rounded-lg">
              <span className="font-bold text-forest block mb-1">During Discovery (Week 1):</span>
              <p className="text-xs text-charcoal leading-relaxed">
                A 60-minute briefing session, sharing sample client enquiries, current tool logins via secure delegation, and clarifying your commercial priorities.
              </p>
            </div>
            <div className="p-4 bg-ivory-light border border-border-subtle rounded-lg">
              <span className="font-bold text-forest block mb-1">During Blueprint Review (Week 2):</span>
              <p className="text-xs text-charcoal leading-relaxed">
                Reviewing the architectural specification document and providing consolidated feedback within 3 business days to prevent scope drift.
              </p>
            </div>
            <div className="p-4 bg-ivory-light border border-border-subtle rounded-lg">
              <span className="font-bold text-forest block mb-1">During Build & Testing:</span>
              <p className="text-xs text-charcoal leading-relaxed">
                Supplying final verified text copy, approving staging preview builds, and testing form routing with real team member inboxes.
              </p>
            </div>
            <div className="p-4 bg-ivory-light border border-border-subtle rounded-lg">
              <span className="font-bold text-forest block mb-1">At Launch & Handover:</span>
              <p className="text-xs text-charcoal leading-relaxed">
                Authorizing DNS cutover, receiving administrative repository transfers, and participating in team training for CRM/automation workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-ivory bg-forest rounded-md hover:bg-forest-light transition-colors shadow-subtle"
          >
            <span>Start Step 1: Request a Discovery Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
