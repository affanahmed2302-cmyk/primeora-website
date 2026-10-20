import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicePillarsSection from '@/components/ServicePillarsSection';
import PackagesSection from '@/components/PackagesSection';
import ProcessSection from '@/components/ProcessSection';
import FoundersSection from '@/components/FoundersSection';
import FaqSection from '@/components/FaqSection';
import EnquiryForm from '@/components/EnquiryForm';
import DigitalReadinessAssessment from '@/components/DigitalReadinessAssessment';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, FileSpreadsheet, Lock } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export default function HomePage() {
  return (
    <>
      {/* 1 & 2. Hero Section */}
      <HeroSection />

      {/* 4. Six Service Pillars */}
      <ServicePillarsSection />

      {/* 5. Packages Section */}
      <PackagesSection />

      {/* Interactive Digital Readiness Mini-App */}
      <section className="py-20 md:py-28 bg-architectural-grid border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
              <span>Interactive Self-Assessment</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
              Evaluate Your Digital Readiness
            </h2>
            <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
              Answer four short questions about your current setup to diagnose operational bottlenecks and discover which service tier fits your stage.
            </p>
          </div>

          <DigitalReadinessAssessment />
        </div>
      </section>

      {/* 6. Four-Step Process Section */}
      <ProcessSection />

      {/* 7. Founders & Leadership Section */}
      <FoundersSection />

      {/* 8. Evidence & Architecture Demonstration */}
      <section className="py-20 md:py-24 bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
              <span>Engineering Architecture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
              Demonstration: Integrated Lead & Operations Pipeline
            </h2>
            <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
              An architectural case model illustrating how a local clinic or professional practice connects discovery, enquiry triage, automated notifications, and reporting into a single system.
            </p>
          </div>

          <div className="bg-ivory/50 rounded-xl border border-border-medium p-6 sm:p-10 max-w-4xl mx-auto shadow-subtle">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle">
              <span className="text-xs font-mono font-semibold uppercase text-forest">
                Case Scenario Model: Specialist Clinic Practice
              </span>
              <span className="text-[11px] font-mono text-copper bg-copper-subtle px-2 py-0.5 rounded">
                Verified Architecture Sample
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-lg border border-border-subtle">
                <span className="text-xs font-mono uppercase text-teal font-semibold block mb-1">
                  1. Discovery & Challenge
                </span>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Patient enquiries arrived simultaneously across Instagram DMs, phone calls, and paper forms. 35% of enquiries received follow-ups after 24 hours.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border-subtle">
                <span className="text-xs font-mono uppercase text-forest font-semibold block mb-1">
                  2. Implemented Architecture
                </span>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  A high-speed Next.js booking portal integrated with WhatsApp Business API triage and instant doctor consultation calendar sync.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border-subtle">
                <span className="text-xs font-mono uppercase text-copper font-semibold block mb-1">
                  3. Operational Outcome
                </span>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Enquiry triage reduced to under 3 minutes automatically; zero lost leads between shifts; consolidated weekly appointment metrics.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
              <span>* Factual architecture case model presented in accordance with our strict unsubstantiated claims policy.</span>
              <Link href="/work" className="text-forest font-semibold hover:text-teal inline-flex items-center gap-1">
                <span>View Full Case Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Direct Project Enquiry CTA Section */}
      <section id="contact" className="py-20 md:py-28 bg-architectural-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
              <span>Initiate Conversation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
              Discuss a Project
            </h2>
            <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
              Tell us about your business, the bottlenecks you want to remove, and your target timeline. We will review and reply with clear recommendations.
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
