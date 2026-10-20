import React from 'react';
import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import { BRAND_CONFIG } from '@/config/brand';
import { Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discuss a Project — Project Enquiry & Consultation | Primeora Solutions',
  description:
    'Initiate a project consultation with Primeora Solutions. Tell us about your operational goals, website requirements, or automation bottlenecks.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>DIRECT PARTNER ACCESS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Discuss a Project
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Every partnership begins with understanding your commercial objectives. Complete the enquiry form below, and our leadership team will review and reply with initial thoughts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Enterprise Credentials */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3 font-sans">
                How We Engage
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We work directly with founders, commercial directors, and practice leaders who value clarity, rigorous engineering, and reliable digital systems.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-[#08152B] border border-white/[0.08] rounded-xl">
                <Mail className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${BRAND_CONFIG.contactEmail}`}
                    className="text-sm font-semibold text-white hover:text-[#3B82F6] transition-colors"
                  >
                    {BRAND_CONFIG.contactEmail}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct partner inbox · Replies within 1 business day
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#08152B] border border-white/[0.08] rounded-xl">
                <MapPin className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-0.5">
                    Registered Location
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {BRAND_CONFIG.location}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#08152B] border border-white/[0.08] rounded-xl">
                <Clock className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-0.5">
                    Consultation Window
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Monday – Saturday, 09:30 – 18:30 IST
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Video discovery calls via Google Meet
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Anti-Spam Guarantee */}
            <div className="p-5 bg-[#08152B] border border-white/[0.08] rounded-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3B82F6] font-mono mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Spam &amp; Confidentiality Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your submitted contact information and project details are kept strictly confidential. We never sell, share, or broadcast your email address. All discussions are covered by mutual confidentiality standards.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Secure Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
