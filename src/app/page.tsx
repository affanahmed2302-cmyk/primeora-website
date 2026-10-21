import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicePillarsSection from '@/components/ServicePillarsSection';
import ProcessSection from '@/components/ProcessSection';
import FoundersSection from '@/components/FoundersSection';
import FaqSection from '@/components/FaqSection';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* 1 & 2. Hero Section with Cinematic Motion-Picture video and interactive systems map */}
      <HeroSection />

      {/* 3. Six Service Pillars Concise Overview */}
      <ServicePillarsSection />

      {/* 4. Four-Step Process Overview */}
      <ProcessSection />

      {/* 5. Founders & Leadership Introduction */}
      <FoundersSection />

      {/* 6. Clearly Labelled Illustrative Architecture Demonstration */}
      <section className="py-20 md:py-24 bg-[#090807] border-b border-[#242220] relative transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F]">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
              <span className="tracking-widest uppercase">Systems Architecture Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F2EB] tracking-tight font-sans">
              Illustrative Workflow Demonstration
            </h2>
            <p className="text-base text-[#9E988F] leading-relaxed max-w-2xl font-sans">
              An architectural blueprint demonstrating how a specialized professional practice unifies customer discovery, enquiry triage, automated notifications, and reporting into a single system.
            </p>
          </div>

          <div className="bg-[#141312] rounded-2xl border border-[#242220] p-6 sm:p-10 max-w-5xl shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#242220] gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-[#F5F2EB] tracking-wider">
                Hypothetical Scenario: Multi-Specialist Healthcare Clinic
              </span>
              <span className="text-[11px] font-mono text-[#E07A5F] bg-[#E07A5F]/10 border border-[#E07A5F]/20 px-2.5 py-0.5 rounded w-fit font-medium">
                Sample Systems Blueprint
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-[#11100E] rounded-xl border border-[#242220]">
                <span className="text-xs font-mono uppercase text-[#E07A5F] font-semibold block mb-1.5">
                  01. Operational Bottleneck
                </span>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  Patient enquiries arrived simultaneously across social accounts, telephone calls, and paper logs, creating delayed response times and lost consultations during peak operational hours.
                </p>
              </div>

              <div className="p-5 bg-[#11100E] rounded-xl border border-[#242220]">
                <span className="text-xs font-mono uppercase text-[#F5F2EB] font-semibold block mb-1.5">
                  02. Engineered Architecture
                </span>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  A high-speed Next.js web application integrated with official WhatsApp Business API routing, calendar appointment synchronization, and automated confirmation dispatches.
                </p>
              </div>

              <div className="p-5 bg-[#11100E] rounded-xl border border-[#242220]">
                <span className="text-xs font-mono uppercase text-[#E07A5F] font-semibold block mb-1.5">
                  03. Operational Outcome
                </span>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  Lead triage automated 24/7; zero unhandled enquiries between operational shifts; unified executive reporting for weekly appointments and patient acquisition costs.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#242220] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E988F]">
              <span>* Illustrative workflow model with hypothetical operational data presented in accordance with our claims policy.</span>
              <Link href="/work" className="text-[#E07A5F] font-semibold hover:text-[#F08E73] inline-flex items-center gap-1.5 transition-colors font-mono">
                <span>View Full Case Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Readiness Assessment Teaser */}
      <section className="py-20 md:py-24 bg-[#090807] border-b border-[#242220] relative transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] border border-[#242220] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F]">
                <Compass className="w-4 h-4 text-[#E07A5F]" />
                <span className="tracking-widest uppercase">Self-Service Diagnostic</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F2EB] tracking-tight font-sans">
                Evaluate Your Digital Readiness
              </h2>
              <p className="text-sm text-[#9E988F] leading-relaxed font-sans">
                Take our 3-minute diagnostic assessment to identify high-friction bottlenecks across your digital presence, sales pipeline, and internal operations.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#6E6860]">
                <span>• 6 Strategic Dimensions</span>
                <span>• Instant Readiness Score</span>
                <span>• Phased Implementation Plan</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/readiness"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-mono font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors group shadow-sm shadow-[#C25E38]/20"
              >
                <span>Launch Diagnostic Tool</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Concise FAQ Preview */}
      <FaqSection />

      {/* 8. Final Project Enquiry Section (Exact SLA copy) */}
      <section id="contact" className="py-20 md:py-28 bg-[#090807] relative transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E07A5F]">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
              <span className="tracking-widest uppercase">Direct Engagement Channel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F2EB] tracking-tight font-sans">
              Discuss a Project
            </h2>
            <p className="text-base text-[#9E988F] leading-relaxed font-sans">
              Tell us about your business, the bottlenecks you want to remove, and your target timeline. A founding partner will review your requirements. <strong>We aim to respond to enquiries within 1–2 business days.</strong>
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
