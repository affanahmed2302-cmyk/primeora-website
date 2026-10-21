import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, CheckCircle2, Compass, ShieldCheck, Cpu } from 'lucide-react';
import KineticTextReveal from '@/components/motion/KineticTextReveal';
import MagneticWrapper from '@/components/motion/MagneticWrapper';

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
    <div className="pt-28 pb-20 md:pt-36 md:pb-32 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
            Selected Architectures
          </span>

          <KineticTextReveal
            text="Workflow & system architectures."
            highlightWord="architectures."
            highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5] mb-4"
          />

          <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] leading-relaxed font-serif">
            In accordance with our strict claims policy, we do not fabricate client logos, customer counts, or unsubstantiated metrics. Below are verified reference architectures illustrating how we solve concrete operational bottlenecks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Compliance Notice */}
        <div className="p-6 bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl flex items-start gap-4 max-w-4xl shadow-xs">
          <Info className="w-5 h-5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
            <strong className="text-[#191817] dark:text-[#FBF9F5] font-semibold font-sans">Demonstration Transparency: </strong>
            These workflow models represent actual technical architectures and system integration workflows engineered by our team. They are formatted as illustrative workflow demonstrations with hypothetical operational scenarios to respect client confidentiality agreements and our strict ban on unverified claims.
          </p>
        </div>

        {/* Asymmetric Architectural Dossiers (Replaces 3-card grid) */}
        <div className="space-y-12">
          {CASE_MODELS.map((model, idx) => (
            <div
              key={model.id}
              className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left (5 cols): Diagnostic & Problem */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold">
                      Dossier 0{idx + 1}
                    </span>
                    <span className="text-[#A8A196]">•</span>
                    <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                      {model.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] tracking-tight">
                    {model.title}
                  </h2>

                  <span className="inline-block px-2.5 py-1 bg-[#FAF6F0] dark:bg-[#1C1A18] text-[#7C7469] dark:text-[#8E867C] border border-[#E5DDD0] dark:border-[#242220] text-xs font-mono rounded">
                    {model.scenarioNote}
                  </span>

                  <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
                    <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold mb-1">
                      Operational Bottleneck Solved:
                    </span>
                    <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                      {model.challenge}
                    </p>
                  </div>
                </div>

                {/* Right (7 cols): System Blueprint & Outcomes */}
                <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#E5DDD0] lg:dark:border-[#242220] lg:pl-10">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#1065FF] block font-semibold mb-2">
                      Engineered System Architecture:
                    </span>
                    <p className="text-sm sm:text-base text-[#3D3833] dark:text-[#D4CDC3] leading-relaxed font-serif">
                      {model.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold mb-2">
                      Technology Stack:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {model.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#FAF6F0] dark:bg-[#1C1A18] text-[#191817] dark:text-[#FBF9F5] border border-[#E5DDD0] dark:border-[#242220] rounded text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
                    <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block font-semibold mb-3">
                      Verified Operational Outcomes:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3]">
                      {model.outcomes.map((out, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1065FF] flex-shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline"
                    >
                      <span>Discuss Similar Architecture</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-sans text-[#191817] dark:text-[#FBF9F5]">
            Have an operational bottleneck in your business?
          </h2>
          <p className="text-sm text-[#5A544E] dark:text-[#9E988F] max-w-xl mx-auto mb-6 font-serif">
            Let’s review how your customer enquiry channels, sales pipeline, and internal operations currently work together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticWrapper strength={0.25}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm"
              >
                <span>Request Architecture Review</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </MagneticWrapper>
            <Link
              href="/readiness"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5] bg-white dark:bg-[#1C1A18] border border-[#DDD5C7] dark:border-[#242220] rounded-md transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>Digital Diagnostic (3 mins)</span>
            </Link>
          </div>
          <div className="mt-4 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
            We aim to respond to enquiries within 1–2 business days.
          </div>
        </div>
      </div>
    </div>
  );
}
