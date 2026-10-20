import React from 'react';
import type { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Six Service Pillars — Digital Presence, CRM, Automation & Analytics',
  description:
    'Comprehensive overview of Ritkara Veyra’s six connected service pillars: Digital Presence, Customer Acquisition, Lead & Sales System, Operations & Automation, Analytics & Insights, and Ongoing Management.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Page Header */}
      <div className="bg-architectural-grid py-16 md:py-20 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Engineering Architecture</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            Six Connected Service Pillars
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            We don’t believe in disconnected freelance gigs. We design and operate a joined-up Digital A-Z system spanning your website, search visibility, CRM pipeline, operations, and analytics.
          </p>
        </div>
      </div>

      {/* Pillars Deep Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {SERVICE_PILLARS.map((pillar, idx) => (
          <section
            key={pillar.id}
            id={pillar.id}
            className="scroll-mt-28 bg-white rounded-xl border border-border-medium p-8 sm:p-12 shadow-card"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle mb-8">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-copper">
                  Pillar 0{idx + 1} &middot; {pillar.badge}
                </span>
                <h2 className="font-serif text-3xl font-bold text-forest mt-1">
                  {pillar.title}
                </h2>
              </div>
              <Link
                href={`/contact?service=${encodeURIComponent(pillar.title)}`}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold text-ivory bg-forest rounded hover:bg-forest-light transition-colors self-start md:self-auto"
              >
                <span>Discuss {pillar.title}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>

            {/* Problem & Strategy Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="p-5 bg-ivory-light border border-border-subtle rounded-lg">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-forest mb-2">
                  The Problem Solved
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {pillar.targetProblem}
                </p>
              </div>
              <div className="p-5 bg-teal/5 border border-teal/20 rounded-lg">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-teal mb-2">
                  Strategic Scope Outcome
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {pillar.shortDescription}
                </p>
              </div>
            </div>

            {/* Individual Offerings in this Pillar */}
            <div className="space-y-6 mb-10">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-muted">
                Core Offerings & Deliverables Specification:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillar.services.map((srv, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-6 rounded-lg border border-border-subtle bg-ivory/30 hover:border-forest/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-lg font-bold text-forest mb-2">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                        {srv.description}
                      </p>

                      <div className="space-y-3 pt-3 border-t border-border-subtle text-xs">
                        <div>
                          <span className="font-semibold text-forest block mb-1">Deliverables:</span>
                          <ul className="space-y-1">
                            {srv.deliverables.map((d, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-1.5 text-charcoal">
                                <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-semibold text-charcoal-muted block mb-1">Client Inputs:</span>
                          <p className="text-charcoal-muted">{srv.clientInputs.join('; ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] text-copper">
                      <span className="font-semibold">Explicit Exclusions: </span>
                      <span>{srv.exclusions.join('; ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar FAQs */}
            {pillar.faqs && pillar.faqs.length > 0 && (
              <div className="pt-6 border-t border-border-subtle">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-muted mb-4 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-teal" />
                  <span>Frequently Answered Questions ({pillar.title})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pillar.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-4 bg-white border border-border-subtle rounded-lg">
                      <h4 className="font-serif text-sm font-bold text-forest mb-1.5">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-charcoal-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Embedded Enquiry Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Ready to Plan Your Digital Architecture?
          </h2>
          <p className="text-sm text-charcoal-muted mt-2">
            Submit your requirements below to discuss specific scope, timelines, and next steps.
          </p>
        </div>
        <EnquiryForm />
      </div>
    </div>
  );
}
