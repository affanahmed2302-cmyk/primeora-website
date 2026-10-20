import React from 'react';
import type { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Six Service Pillars — Digital Presence, CRM, Automation & Analytics — Primeora Solutions',
  description:
    'Comprehensive overview of Primeora Solutions’ six connected service pillars: Digital Presence, Customer Acquisition, Lead & Sales System, Operations & Automation, Analytics & Insights, and Ongoing Management.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B0F1A]/60 py-16 md:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Engineering Architecture</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Six Connected Service Pillars
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            We don’t believe in disconnected freelance gigs. We design and operate a joined-up Digital A-Z system spanning your website, search visibility, CRM pipeline, operations, and analytics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Detailed Service Pillars List */}
        <div className="space-y-24 mb-24">
          {SERVICE_PILLARS.map((pillar, pIdx) => (
            <div
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-32 pt-8 border-t first:border-t-0 border-white/10"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-bold text-azure-bright">
                      0{pIdx + 1}
                    </span>
                    <span className="text-xs uppercase font-mono font-semibold tracking-wider text-violet-light px-2.5 py-0.5 bg-violet/10 border border-violet/20 rounded-full">
                      {pillar.badge}
                    </span>
                  </div>
                  <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                    {pillar.title}
                  </h2>
                </div>

                <Link
                  href={`/contact?pillar=${pillar.id}`}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-azure-bright hover:text-white transition-colors"
                >
                  <span>Request Scope for this Pillar</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              {/* Problem & Inclusions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Operational Friction Addressed
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {pillar.targetProblem}
                    </p>
                  </div>

                  <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-azure-bright mb-3">
                      Master Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {pillar.deliverablesSummary.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sub-services breakdown */}
                <div className="lg:col-span-7 space-y-4">
                  {pillar.services.map((svc, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-azure/30 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                    >
                      <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">
                        {svc.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {svc.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-white/10">
                        <div>
                          <span className="font-semibold text-slate-200 block mb-1">
                            Client Inputs Needed:
                          </span>
                          <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                            {svc.clientInputs.map((inp, idx) => (
                              <li key={idx}>{inp}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-200 block mb-1">
                            Dependencies &amp; Exclusions:
                          </span>
                          <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                            {svc.dependencies.map((dep, idx) => (
                              <li key={idx}>Dependency: {dep}</li>
                            ))}
                            {svc.exclusions.map((exc, idx) => (
                              <li key={idx} className="text-slate-500">
                                Excludes: {exc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Enquiry Section */}
        <div id="enquiry" className="mt-20 pt-16 border-t border-white/10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
              Initiate a Scope Consultation
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Submit your project details to review architectural feasibility, timeline, and deliverables with our leadership team.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
