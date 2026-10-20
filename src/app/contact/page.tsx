import React from 'react';
import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import { BRAND_CONFIG } from '@/config/brand';
import { Mail, MapPin, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discuss a Project — Project Enquiry & Consultation — Primeora Solutions',
  description:
    'Initiate a project consultation with Primeora Solutions. Tell us about your operational goals, website requirements, or automation bottlenecks.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      <div className="bg-[#0B0F1A]/60 py-16 md:py-24 border-b border-white/10 mb-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Direct Access</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Discuss a Project
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Every partnership begins with understanding your commercial objectives. Complete the enquiry form below, and our leadership team will review and reply with initial thoughts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact & Enterprise Credentials */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-3">
                How We Engage
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We work directly with founders, commercial directors, and practice leaders who value clarity, rigorous engineering, and reliable digital systems.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <Mail className="w-5 h-5 text-azure-bright flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${BRAND_CONFIG.contactEmail}`}
                    className="text-sm font-semibold text-white hover:text-azure-light transition-colors"
                  >
                    {BRAND_CONFIG.contactEmail}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Replies within 1 business day
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <MapPin className="w-5 h-5 text-azure-bright flex-shrink-0 mt-0.5" />
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

              <div className="flex items-start gap-3 p-4 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <Clock className="w-5 h-5 text-azure-bright flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-0.5">
                    Consultation Window
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Monday &ndash; Saturday, 09:30 &ndash; 18:30 IST
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Video discovery calls via Google Meet
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Anti-Spam Guarantee */}
            <div className="p-4 bg-azure/10 border border-azure/20 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-azure-bright font-mono mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Spam &amp; Confidentiality Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your submitted details are used solely to evaluate your project enquiry and reply. We never distribute, sell, or disclose your contact details to third parties.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B0F1A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                Project Enquiry Form
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Tell us about your requirements. Fields marked with * are required.
              </p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
