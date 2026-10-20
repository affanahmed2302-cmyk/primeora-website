import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicePillarsSection from '@/components/ServicePillarsSection';
import ProcessSection from '@/components/ProcessSection';
import FoundersSection from '@/components/FoundersSection';
import FaqSection from '@/components/FaqSection';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export default function HomePage() {
  return (
    <>
      {/* 1 & 2. Hero Section with authentic Vanta ambient mesh, studio headline, and primary CTA */}
      <HeroSection />

      {/* 4. Six Service Pillars Concise Overview */}
      <ServicePillarsSection />

      {/* 5. Four-Step Process Overview */}
      <ProcessSection />

      {/* 6. Founders & Leadership Introduction */}
      <FoundersSection />

      {/* 7. Clearly Labelled Illustrative Architecture Demonstration */}
      <section className="py-20 md:py-24 bg-[#040D1A] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
              <span>SOLUTION ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
              Illustrative Workflow Demonstration
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
              An architectural blueprint demonstrating how a specialized professional practice unifies customer discovery, enquiry triage, automated notifications, and reporting into a single system.
            </p>
          </div>

          <div className="bg-[#08152B] rounded-xl border border-white/[0.08] p-6 sm:p-10 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/[0.06] gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-white tracking-wider">
                Hypothetical Scenario: Multi-Specialist Healthcare Clinic
              </span>
              <span className="text-[11px] font-mono text-[#3B82F6] bg-[#166CFF]/10 border border-[#166CFF]/20 px-2.5 py-0.5 rounded w-fit">
                Sample Systems Blueprint
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-[#040D1A] rounded-lg border border-white/[0.06]">
                <span className="text-xs font-mono uppercase text-[#3B82F6] font-semibold block mb-1.5">
                  01. Operational Bottleneck
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Patient enquiries arrived simultaneously across social accounts, telephone calls, and paper logs, creating delayed response times and lost consultations during peak operational hours.
                </p>
              </div>

              <div className="p-5 bg-[#040D1A] rounded-lg border border-white/[0.06]">
                <span className="text-xs font-mono uppercase text-white font-semibold block mb-1.5">
                  02. Engineered Architecture
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A high-speed Next.js web application integrated with official WhatsApp Business API routing, calendar appointment synchronization, and automated confirmation dispatches.
                </p>
              </div>

              <div className="p-5 bg-[#040D1A] rounded-lg border border-white/[0.06]">
                <span className="text-xs font-mono uppercase text-[#3B82F6] font-semibold block mb-1.5">
                  03. Operational Outcome
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lead triage automated 24/7; zero unhandled enquiries between operational shifts; unified executive reporting for weekly appointments and patient acquisition costs.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <span>* Illustrative workflow model with hypothetical operational data presented in accordance with our claims policy.</span>
              <Link href="/work" className="text-[#3B82F6] font-semibold hover:text-white inline-flex items-center gap-1.5 transition-colors">
                <span>View Full Case Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Readiness Assessment Teaser (Preview linking to dedicated /readiness page) */}
      <section className="py-20 md:py-24 bg-[#040D1A] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 sm:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#040D1A] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
                <span>INTERACTIVE DIAGNOSTIC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                Evaluate Your Digital Readiness
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Take our 2-minute diagnostic assessment to identify high-friction bottlenecks across your digital presence, sales pipeline, and internal operations.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span>• 5 Strategic Questions</span>
                <span>• Instant Readiness Score</span>
                <span>• Tailored Recommendations</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/readiness"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors group shadow-sm"
              >
                <span>Launch Diagnostic Tool</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Concise FAQ Preview */}
      <FaqSection />

      {/* 9. Final Project Enquiry Section */}
      <section id="contact" className="py-20 md:py-28 bg-[#040D1A] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
              <span>PROJECT INITIATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
              Discuss a Project
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              Tell us about your business, the bottlenecks you want to remove, and your target timeline. A founding partner will review your requirements and provide an initial perspective within 1 business day.
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
