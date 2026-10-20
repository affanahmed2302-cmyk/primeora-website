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
      {/* 1 & 2. Hero Section with dynamic WebGL particle canvas & React Bits DecryptedText */}
      <HeroSection />

      {/* 4. Six Service Pillars */}
      <ServicePillarsSection />

      {/* 5. Packages Section */}
      <PackagesSection />

      {/* Interactive Digital Readiness Mini-App */}
      <section className="py-20 md:py-28 bg-[#07090F] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
              <span>Interactive Self-Assessment</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Evaluate Your Digital Readiness
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              Answer four short questions about your current setup to diagnose operational bottlenecks and discover which service tier fits your stage.
            </p>
          </div>

          <DigitalReadinessAssessment />
        </div>
      </section>

      {/* 6. Four-Step Process Section with GSAP scroll animation */}
      <ProcessSection />

      {/* 7. Founders & Leadership Section with confirmed team profiles */}
      <FoundersSection />

      {/* 8. Evidence & Architecture Demonstration */}
      <section className="py-20 md:py-24 bg-[#07090F] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
              <span>Engineering Architecture</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Illustrative Workflow Demonstration
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              An architectural scenario illustrating how a specialized clinic or professional practice connects discovery, enquiry triage, automated notifications, and reporting into a single system.
            </p>
          </div>

          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-10 max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-white">
                Hypothetical Scenario: Multi-Doctor Healthcare Clinic
              </span>
              <span className="text-[10px] font-mono text-azure-bright bg-azure/10 border border-azure/20 px-2.5 py-0.5 rounded-full w-fit">
                Illustrative Architecture Sample
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#101524] rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase text-azure-bright font-semibold block mb-1.5">
                  1. Operational Friction
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Patient enquiries arrived simultaneously across Instagram DMs, phone calls, and manual logs, causing delayed responses and missed consultations during peak clinic hours.
                </p>
              </div>

              <div className="p-5 bg-[#101524] rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase text-violet-light font-semibold block mb-1.5">
                  2. Implemented Architecture
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A high-speed Next.js booking portal integrated with official WhatsApp Business API triage and instant doctor consultation calendar sync.
                </p>
              </div>

              <div className="p-5 bg-[#101524] rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase text-azure-bright font-semibold block mb-1.5">
                  3. Operational Outcome
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enquiry triage automated 24/7; zero unhandled leads between shifts; consolidated weekly appointment metrics and reporting.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <span>* Illustrative workflow model with hypothetical operational data presented in accordance with our claims policy.</span>
              <Link href="/work" className="text-azure-bright font-semibold hover:text-white inline-flex items-center gap-1 transition-colors">
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
      <section id="contact" className="py-20 md:py-28 bg-[#07090F] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
              <span>Initiate Conversation</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Discuss a Project
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              Tell us about your business, the bottlenecks you want to remove, and your target timeline. We will review and reply with clear recommendations.
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
