'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface FaqItem {
  question: string;
  answer: string;
}

const GENERAL_FAQS: FaqItem[] = [
  {
    question: 'What does Primeora Solutions do?',
    answer:
      'Primeora Solutions acts as a strategy and technology engineering consultancy providing a connected "Digital A-Z" practice for businesses. We design and engineer websites, establish technical SEO and Answer Engine Optimization (AEO), set up sales CRMs and WhatsApp routing, automate operations, and implement business intelligence dashboards.',
  },
  {
    question: 'How does an engagement typically start?',
    answer:
      'Every engagement starts with a Discovery consultation to review your existing tools, customer pathways, and operational bottlenecks. We then deliver a written Blueprint detailing the exact scope, technology stack, timeline, exclusions, and cost before any code is written.',
  },
  {
    question: 'Do you guarantee a specific volume of leads, rankings, or revenue?',
    answer:
      'No, and we caution against any agency that promises guaranteed leads or Google search positions. Search engine algorithms and client sales conversions depend on product-market fit, pricing, market demand, and third-party platform policies. What we guarantee is robust software engineering, technical SEO compliance, fast-loading platforms, automated lead capture, and empirical conversion tracking.',
  },
  {
    question: 'How are project pricing and payment milestones structured?',
    answer:
      'We work on structured milestone payments tied to verifiable deliverables (e.g., Blueprint approval, staging build deployment, final handover and training). Custom scopes are detailed in a formal written proposal so there are never surprise fees.',
  },
  {
    question: 'Can you automate our customer follow-up and billing workflows?',
    answer:
      'Yes. We connect web enquiry forms directly to your CRM, WhatsApp Business account, team Slack/email, and GST-compliant invoicing software with error handling so no data is dropped silently.',
  },
  {
    question: 'What legal business entity and registration backs Primeora Solutions?',
    answer:
      `Primeora Solutions is a recognized Udyam-registered MSME (Registration No: ${BRAND_CONFIG.udyamRegistrationNumber}) based in Bangalore, Karnataka. All client contracts, service agreements, and tax invoices are executed directly under Primeora Solutions.`,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#07090F] border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Direct Answers</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Transparent explanations of how we operate, scope boundaries, and client responsibilities.
          </p>
        </div>

        <div className="space-y-4">
          {GENERAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl overflow-hidden transition-all bg-[#0B0F1A]/80 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.4)] hover:border-azure/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-bright"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-azure-bright' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
