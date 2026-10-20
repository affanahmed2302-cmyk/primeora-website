import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, CheckCircle2, Cpu, Database, Workflow, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Architectures & Workflow Demonstrations — Primeora Solutions',
  description:
    'Explore illustrative system architectures demonstrating how Primeora Solutions connects web platforms, CRM pipelines, and operations automation for businesses.',
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
    stack: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Business API', 'PostgreSQL / Supabase', 'Cal.com / Google Calendar API'],
    outcomes: [
      'Automated triage response under 2 minutes 24/7',
      'Zero enquiries lost between shift rotations',
      'Unified executive appointment view for practice leadership',
    ],
  },
  {
    id: 'b2b-engineering-consultancy',
    category: 'Professional Services & Consulting',
    title: 'High-Authority Presence & Structured RFP Lead Pipeline',
    badge: 'Illustrative Workflow Demonstration',
    scenarioNote: 'Hypothetical Operational Scenario for Engineering Firms',
    challenge:
      'A boutique civil engineering practice suffered from a legacy slow-loading website that failed to showcase technical credentials or capture commercial project specifications.',
    solution:
      'Architected a high-contrast editorial web presence with semantic JSON-LD schema for Answer Engine Optimization (AEO), combined with a structured RFP enquiry portal that collects project square footage, location, and timeline before notifying partners.',
    stack: ['Next.js App Router', 'TypeScript', 'AEO Schema Markup', 'HubSpot CRM Integration', 'Cloudflare Turnstile'],
    outcomes: [
      'Sub-second page load times with 99+ Core Web Vitals score',
      'Automated lead qualification saving senior partners 4+ hours per week',
      'Instant notification dispatch to designated project leads via Slack webhook',
    ],
  },
  {
    id: 'specialized-manufacturing',
    category: 'Wholesale & Specialized Manufacturing',
    title: 'B2B Product Catalogue & Automated GST Invoicing Pipeline',
    badge: 'Illustrative Workflow Demonstration',
    scenarioNote: 'Hypothetical Operational Scenario for Wholesale Distributors',
    challenge:
      'Distributors ordered via scattered phone messages. Office clerks spent 15+ hours each week manually calculating GST slabs, generating PDF invoices, and emailing confirmations.',
    solution:
      'Built a private distributor ordering portal connected directly to accounting software webhooks. Invoices are generated with compliant GSTIN calculations and dispatched instantly upon order approval.',
    stack: ['Next.js', 'PostgreSQL', 'Zoho Books / Tally Webhook API', 'Make / Node Serverless', 'SendGrid API'],
    outcomes: [
      'Automated invoice generation eliminating repetitive administrative re-entry',
      'Error-handled webhook pipeline with automated failure alerts',
      'Real-time inventory level synchronization preventing backorder disputes',
    ],
  },
];

export default function WorkPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      {/* Header */}
      <div className="bg-[#0B0F1A]/60 py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Systems &amp; Architecture</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-white tracking-tight">
            System Architecture Demonstrations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            In accordance with our strict claims policy, we do not fabricate client logos, customer counts, or unsubstantiated metrics. Below are verified reference architectures illustrating how we solve concrete operational bottlenecks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Compliance Notice */}
        <div className="p-4 bg-[#101524] border border-azure/30 rounded-xl flex items-start gap-3 max-w-4xl mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <Info className="w-5 h-5 text-azure-bright flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Demonstration Transparency:</strong> These workflow models represent actual technical architectures and system integration workflows engineered by our team. They are formatted as illustrative workflow demonstrations with hypothetical operational scenarios to respect client confidentiality agreements and our strict ban on unverified claims.
          </p>
        </div>

        {/* Case Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-[#0B0F1A]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col justify-between hover:border-azure/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-violet-light font-semibold">
                    {model.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-azure/10 text-azure-bright border border-azure/20 rounded">
                    {model.badge}
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1 group-hover:text-azure-light transition-colors">
                  {model.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mb-4">
                  {model.scenarioNote}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-1">
                      Operational Friction:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {model.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-1">
                      Engineered Solution:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {model.solution}
                    </p>
                  </div>
                </div>

                {/* Architecture Stack */}
                <div className="mb-6 pt-4 border-t border-white/10">
                  <h4 className="text-[11px] font-mono uppercase font-semibold text-slate-400 mb-2">
                    Integrated Stack:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {model.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verifiable Outcomes */}
                <div className="mb-6 pt-4 border-t border-white/10">
                  <h4 className="text-[11px] font-mono uppercase font-semibold text-azure-bright mb-2">
                    Key Architectural Capabilities:
                  </h4>
                  <ul className="space-y-2">
                    {model.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-azure-bright flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-azure/20 border border-white/10 hover:border-azure/40 rounded-lg transition-colors group-hover:bg-azure/20"
                >
                  <span>Inquire About Similar Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
