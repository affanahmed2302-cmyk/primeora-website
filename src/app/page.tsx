import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicePillarsSection from '@/components/ServicePillarsSection';
import ProcessSection from '@/components/ProcessSection';
import FoundersSection from '@/components/FoundersSection';
import FaqSection from '@/components/FaqSection';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* 1 & 2. Hero Section with Day/Night editorial palette and interactive systems transformation map */}
      <HeroSection />

      {/* 4. Six Service Pillars Concise Overview */}
      <ServicePillarsSection />

      {/* 5. Four-Step Process Overview */}
      <ProcessSection />

      {/* 6. Founders & Leadership Introduction */}
      <FoundersSection />

      {/* 7. Clearly Labelled Illustrative Architecture Demonstration (No Eyebrow) */}
      <section className="py-20 md:py-24 bg-[#FBF9F5] dark:bg-[#121110] border-b border-[#E5DDD0] dark:border-[#2C2926] relative transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191817] dark:text-[#FBF9F5] tracking-tight font-sans">
              Illustrative Workflow Demonstration
            </h2>
            <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-2xl font-serif">
              An architectural blueprint demonstrating how a specialized professional practice unifies customer discovery, enquiry triage, automated notifications, and reporting into a single system.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1C1A18] rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-10 max-w-5xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E5DDD0] dark:border-[#2C2926] gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-[#191817] dark:text-[#FBF9F5] tracking-wider">
                Hypothetical Scenario: Multi-Specialist Healthcare Clinic
              </span>
              <span className="text-[11px] font-mono text-[#C25E38] dark:text-[#E07A5F] bg-[#C25E38]/10 dark:bg-[#E07A5F]/10 border border-[#C25E38]/20 dark:border-[#E07A5F]/20 px-2.5 py-0.5 rounded w-fit font-medium">
                Sample Systems Blueprint
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-[#FBF9F5] dark:bg-[#22201E] rounded-lg border border-[#E5DDD0] dark:border-[#2C2926]">
                <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-1.5">
                  01. Operational Bottleneck
                </span>
                <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                  Patient enquiries arrived simultaneously across social accounts, telephone calls, and paper logs, creating delayed response times and lost consultations during peak operational hours.
                </p>
              </div>

              <div className="p-5 bg-[#FBF9F5] dark:bg-[#22201E] rounded-lg border border-[#E5DDD0] dark:border-[#2C2926]">
                <span className="text-xs font-mono uppercase text-[#191817] dark:text-[#FBF9F5] font-semibold block mb-1.5">
                  02. Engineered Architecture
                </span>
                <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                  A high-speed Next.js web application integrated with official WhatsApp Business API routing, calendar appointment synchronization, and automated confirmation dispatches.
                </p>
              </div>

              <div className="p-5 bg-[#FBF9F5] dark:bg-[#22201E] rounded-lg border border-[#E5DDD0] dark:border-[#2C2926]">
                <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-1.5">
                  03. Operational Outcome
                </span>
                <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                  Lead triage automated 24/7; zero unhandled enquiries between operational shifts; unified executive reporting for weekly appointments and patient acquisition costs.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C7469] dark:text-[#8E867C]">
              <span>* Illustrative workflow model with hypothetical operational data presented in accordance with our claims policy.</span>
              <Link href="/work" className="text-[#C25E38] dark:text-[#E07A5F] font-semibold hover:text-[#191817] dark:hover:text-white inline-flex items-center gap-1.5 transition-colors">
                <span>View Full Case Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Readiness Assessment Teaser (No Eyebrow) */}
      <section className="py-20 md:py-24 bg-[#F4EFEA] dark:bg-[#181715] border-b border-[#E5DDD0] dark:border-[#2C2926] relative transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-8 sm:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#191817] dark:text-[#FBF9F5] tracking-tight font-sans">
                Evaluate Your Digital Readiness
              </h2>
              <p className="mt-2 text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
                Take our 2-minute diagnostic assessment to identify high-friction bottlenecks across your digital presence, sales pipeline, and internal operations.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                <span>• 5 Strategic Questions</span>
                <span>• Instant Readiness Score</span>
                <span>• Tailored Recommendations</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/readiness"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors group shadow-sm"
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

      {/* 9. Final Project Enquiry Section (Exact SLA copy) */}
      <section id="contact" className="py-20 md:py-28 bg-[#FBF9F5] dark:bg-[#121110] relative transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191817] dark:text-[#FBF9F5] tracking-tight font-sans">
              Discuss a Project
            </h2>
            <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
              Tell us about your business, the bottlenecks you want to remove, and your target timeline. A founding partner will review your requirements. <strong>We aim to respond to enquiries within 1–2 business days.</strong>
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
