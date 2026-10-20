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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>SYSTEM ARCHITECTURE REFERENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Workflow &amp; System Architectures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            In accordance with our strict claims policy, we do not fabricate client logos, customer counts, or unsubstantiated metrics. Below are verified reference architectures illustrating how we solve concrete operational bottlenecks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Compliance Notice */}
        <div className="p-5 bg-[#F4EFEA] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl flex items-start gap-3 max-w-4xl shadow-xs">
          <Info className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
            <strong className="text-editorial-ink dark:text-[#FBF9F5] font-semibold">Demonstration Transparency: </strong>
            These workflow models represent actual technical architectures and system integration workflows engineered by our team. They are formatted as illustrative workflow demonstrations with hypothetical operational scenarios to respect client confidentiality agreements and our strict ban on unverified claims.
          </p>
        </div>

        {/* Case Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-7 flex flex-col justify-between hover:border-[#C25E38]/40 dark:hover:border-[#E07A5F]/30 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-1">
                    {model.category}
                  </span>
                  <h2 className="text-xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] leading-snug">
                    {model.title}
                  </h2>
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#FBF9F5] dark:bg-[#22201D] text-[#7C7469] dark:text-[#8E867C] border border-[#DDD5C7] dark:border-[#383430] text-[10px] font-mono rounded">
                    {model.scenarioNote}
                  </span>
                </div>

                {/* Challenge */}
                <div className="mb-4 pt-3 border-t border-[#E5DDD0] dark:border-[#2C2926]">
                  <h3 className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-1">
                    Operational Bottleneck:
                  </h3>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                    {model.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-4 pt-3 border-t border-[#E5DDD0] dark:border-[#2C2926]">
                  <h3 className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-1">
                    Engineered System:
                  </h3>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                    {model.solution}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6 pt-3 border-t border-[#E5DDD0] dark:border-[#2C2926]">
                  <h3 className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-2">
                    Technology Stack:
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {model.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#FBF9F5] dark:bg-[#22201D] text-[#3D3833] dark:text-[#DDD6CC] border border-[#DDD5C7] dark:border-[#383430] rounded text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="pt-3 border-t border-[#E5DDD0] dark:border-[#2C2926] mb-6">
                  <h3 className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-2">
                    Verified Operational Outcomes:
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#3D3833] dark:text-[#D4CDC3]">
                    {model.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors pt-2"
              >
                <span>Discuss Similar Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#F4EFEA] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-sans text-editorial-ink dark:text-[#FBF9F5]">
            Have an Operational Bottleneck in Your Business?
          </h2>
          <p className="text-sm text-[#5A544E] dark:text-[#A8A196] max-w-xl mx-auto mb-6 font-serif">
            Let’s review how your customer enquiry channels, sales pipeline, and internal operations currently work together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm group"
          >
            <span>Request System Architecture Review</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
