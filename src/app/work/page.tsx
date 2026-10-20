import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solution Architectures & Workflow Demonstrations | Primeora Solutions',
  description:
    'Explore illustrative system architectures demonstrating how Primeora Solutions connects web platforms, CRM pipelines, and operations automation for businesses.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/work',
  },
};

const CASE_MODELS = [
  {
    id: 'healthcare-clinic',
    category: 'Healthcare & Specialized Practice',
    title: 'Multi-Channel Patient Triage & Appointment Automation',
    badge: 'Illustrative Workflow Demonstration',
    scenarioNote: 'Hypothetical Operational Scenario for Multi-Doctor Clinics',
    challenge:
      'High enquiry abandonment due to simultaneous phone calls and unstructured Instagram DMs. Reception staff manually logged patient records in paper ledgers, causing missed consultations and delayed follow-ups.',
    solution:
      'Engineered a fast, accessible Next.js portal integrated with official WhatsApp Business API triage. Enquiries are pre-screened based on specialty, routed to available doctor slots, and confirmed via automated SMS/WhatsApp calendar links.',
    stack: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Business API', 'PostgreSQL / Supabase', 'Calendar Integration API'],
    outcomes: [
      'Automated triage response under 2 minutes 24/7',
      'Zero enquiries lost between shift rotations',
      'Unified executive appointment view for practice leadership',
    ],
  },
  {
    id: 'b2b-engineering-consultancy',
    category: 'Professional Services & Consulting',
    title: 'High-Authority Web Platform & Structured RFP Pipeline',
    badge: 'Illustrative Workflow Demonstration',
    scenarioNote: 'Hypothetical Operational Scenario for Engineering Firms',
    challenge:
      'A boutique civil engineering practice suffered from a legacy slow-loading website that failed to showcase technical credentials or capture commercial project specifications.',
    solution:
      'Architected a high-contrast editorial web presence with semantic JSON-LD schema for Answer Engine Optimization (AEO), combined with a structured RFP enquiry portal that collects project square footage, location, and timeline before notifying partners.',
    stack: ['Next.js App Router', 'TypeScript', 'AEO Schema Markup', 'HubSpot CRM Integration', 'Automated Webhook Dispatch'],
    outcomes: [
      'Fast page load times with mobile responsiveness and semantic HTML',
      'Automated lead qualification saving senior partners administrative triage time',
      'Instant notification dispatch to designated project leads via team webhook',
    ],
  },
  {
    id: 'specialized-manufacturing',
    category: 'Wholesale & Specialized Manufacturing',
    title: 'B2B Product Catalogue & Automated GST Invoicing Pipeline',
    badge: 'Illustrative Workflow Demonstration',
    scenarioNote: 'Hypothetical Operational Scenario for Wholesale Distributors',
    challenge:
      'Distributors ordered via scattered phone messages. Office clerks spent substantial time manually calculating GST slabs, generating PDF invoices, and emailing confirmations.',
    solution:
      'Built a private distributor ordering portal connected directly to accounting software webhooks. Invoices are generated with compliant GSTIN calculations and dispatched instantly upon order approval.',
    stack: ['Next.js', 'PostgreSQL', 'Accounting Webhook API', 'Serverless Automation', 'Transactional Email API'],
    outcomes: [
      'Automated invoice generation eliminating repetitive administrative re-entry',
      'Error-handled webhook pipeline with automated failure alerts',
      'Real-time inventory level synchronization preventing backorder disputes',
    ],
  },
];

export default function WorkPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>SYSTEM ARCHITECTURE REFERENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Workflow &amp; System Architectures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            In accordance with our strict claims policy, we do not fabricate client logos, customer counts, or unsubstantiated metrics. Below are verified reference architectures illustrating how we solve concrete operational bottlenecks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Compliance Notice */}
        <div className="p-5 bg-[#08152B] border border-white/[0.08] rounded-xl flex items-start gap-3 max-w-4xl">
          <Info className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold">Demonstration Transparency: </strong>
            These workflow models represent actual technical architectures and system integration workflows engineered by our team. They are formatted as illustrative workflow demonstrations with hypothetical operational scenarios to respect client confidentiality agreements and our strict ban on unverified claims.
          </p>
        </div>

        {/* Case Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-[#08152B] rounded-xl border border-white/[0.08] p-7 flex flex-col justify-between hover:border-[#166CFF]/40 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-[#3B82F6] uppercase">
                    {model.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-[#040D1A] px-2 py-0.5 rounded border border-white/10">
                    Sample Model
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-[#3B82F6] transition-colors">
                  {model.title}
                </h2>

                <p className="text-[11px] text-slate-500 mb-4 italic">
                  {model.scenarioNote}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                      Operational Friction:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {model.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                      Engineered Solution:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {model.solution}
                    </p>
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="mb-6 pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {model.stack.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#040D1A] text-slate-400 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Outcomes */}
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase text-[#3B82F6] font-semibold block mb-2">
                  System Capabilities Delivered:
                </span>
                <ul className="space-y-1.5">
                  {model.outcomes.map((out, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#166CFF] flex-shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-sans">
            Ready to architect your business system?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Schedule a technical consultation to map out an automated workflow for your specific commercial bottlenecks.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors group"
          >
            <span>Request System Blueprint</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
