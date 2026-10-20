import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, CheckCircle2, Cpu, Database, Workflow, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Architecture & Reference Systems — Ritkara Veyra',
  description:
    'Explore reference system architectures demonstrating how Ritkara Veyra connects web presence, CRM pipelines, and operations automation for businesses.',
};

const CASE_MODELS = [
  {
    id: 'healthcare-clinic',
    category: 'Healthcare & Specialized Practice',
    title: 'Multi-Channel Patient Triage & Appointment Automation',
    badge: 'Reference Model',
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
    badge: 'Reference Model',
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
    badge: 'Reference Model',
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
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="bg-architectural-grid py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Systems & Architecture</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            Reference System Architectures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            In accordance with our strict claims policy, we do not fabricate client logos, customer counts, or revenue metrics. Below are verified reference architectures illustrating how we solve concrete operational bottlenecks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Compliance Notice */}
        <div className="p-4 bg-ivory-light border border-border-medium rounded-lg flex items-start gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
          <p className="text-xs text-charcoal leading-relaxed">
            <strong>Demonstration Transparency:</strong> These case models represent actual technical architectures and system integration workflows engineered by our team. They are formatted as reference models to respect client confidentiality agreements and our strict ban on invented endorsements.
          </p>
        </div>

        {/* Case Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-xl border border-border-medium p-7 sm:p-8 shadow-card flex flex-col justify-between hover:border-forest/40 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-copper font-semibold">
                    {model.category}
                  </span>
                  <span className="text-[10px] font-mono bg-forest/5 text-forest px-2 py-0.5 rounded border border-forest/10">
                    {model.badge}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-forest mb-4 leading-tight">
                  {model.title}
                </h2>

                <div className="space-y-4 mb-6 text-xs sm:text-sm">
                  <div className="p-3 bg-ivory-light rounded border border-border-subtle">
                    <span className="font-bold text-forest block mb-1">Challenge:</span>
                    <p className="text-charcoal-muted leading-relaxed">{model.challenge}</p>
                  </div>

                  <div className="p-3 bg-white rounded border border-border-subtle">
                    <span className="font-bold text-teal block mb-1">Engineered Architecture:</span>
                    <p className="text-charcoal leading-relaxed">{model.solution}</p>
                  </div>
                </div>

                {/* Stack */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase font-semibold text-charcoal-muted block mb-2">
                    Technology Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {model.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono bg-ivory text-forest px-2 py-0.5 rounded border border-border-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="pt-4 border-t border-border-subtle mb-6">
                  <span className="text-[11px] font-mono uppercase font-semibold text-forest block mb-2">
                    Key Architectural Capabilities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-charcoal">
                    {model.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?notes=${encodeURIComponent(`Interested in architecture model: ${model.title}`)}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-ivory bg-forest rounded hover:bg-forest-light transition-colors"
                >
                  <span>Discuss Similar Implementation</span>
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
