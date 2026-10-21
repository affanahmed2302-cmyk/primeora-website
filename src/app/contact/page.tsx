import React from 'react';
import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import { BRAND_CONFIG } from '@/config/brand';
import { Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';
import KineticTextReveal from '@/components/motion/KineticTextReveal';

export const metadata: Metadata = {
  title: 'Discuss a Project — Project Enquiry & Consultation | Primeora Solutions',
  description:
    'Initiate a project consultation with Primeora Solutions. Tell us about your operational goals, website requirements, or automation bottlenecks. We aim to respond to enquiries within 1–2 business days.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
            Initiate Consultation
          </span>

          <KineticTextReveal
            text="Discuss a project."
            highlightWord="project."
            highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5] mb-4"
          />

          <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] leading-relaxed font-serif">
            Every partnership begins with understanding your commercial objectives. Complete the enquiry form below, and our leadership team will review and reply with initial thoughts. <strong>We aim to respond to enquiries within 1–2 business days.</strong>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Enterprise Credentials */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3 font-serif text-[#191817] dark:text-[#FBF9F5]">
                How We Engage
              </h2>
              <p className="text-sm text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
                We work directly with founders, commercial directors, and practice leaders who value clarity, rigorous engineering, and reliable digital systems.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-xl shadow-xs">
                <Mail className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-[#7C7469] dark:text-[#7A7368] block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${BRAND_CONFIG.contactEmail}`}
                    className="text-sm font-semibold text-[#191817] dark:text-[#FBF9F5] hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors"
                  >
                    {BRAND_CONFIG.contactEmail}
                  </a>
                  <p className="text-xs text-[#7C7469] dark:text-[#7A7368] mt-1 font-mono">
                    Direct partner inbox · We aim to respond within 1–2 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-xl shadow-xs">
                <MapPin className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-[#7C7469] dark:text-[#7A7368] block mb-0.5">
                    Registered Location
                  </span>
                  <span className="text-sm font-semibold text-[#191817] dark:text-[#FBF9F5]">
                    {BRAND_CONFIG.location}
                  </span>
                  <p className="text-xs text-[#7C7469] dark:text-[#7A7368] mt-1 font-mono">
                    Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-xl shadow-xs">
                <Clock className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-[#7C7469] dark:text-[#7A7368] block mb-0.5">
                    Consultation Window
                  </span>
                  <span className="text-sm font-semibold text-[#191817] dark:text-[#FBF9F5]">
                    Monday – Saturday, 09:30 – 18:30 IST
                  </span>
                  <p className="text-xs text-[#7C7469] dark:text-[#7A7368] mt-1">
                    Discovery sessions via Google Meet
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Confidentiality Notice */}
            <div className="p-5 bg-[#FAF7F2] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C25E38] dark:text-[#E07A5F] font-mono mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>CONFIDENTIALITY ASSURANCE</span>
              </div>
              <p className="text-xs text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
                Your business details, current metrics, and architectural pain points are kept strictly confidential. We never resell client contacts or deploy unsolicited sales calls.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
