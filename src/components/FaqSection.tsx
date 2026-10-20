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
    question: 'What does Ritkara Veyra do?',
    answer:
      'Ritkara Veyra acts as a strategy and technology consultancy providing a connected "Digital A-Z" practice for businesses. We design and engineer websites, establish technical SEO and Answer Engine Optimization (AEO), set up sales CRMs and WhatsApp routing, automate operations, and implement business intelligence dashboards.',
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
    question: 'What is the relationship between Ritkara Veyra and Primeora Solutions?',
    answer:
      `Ritkara Veyra is the working trade brand of Primeora Solutions (Udyam Registered MSME: ${BRAND_CONFIG.udyamRegistrationNumber}). Formal commercial agreements, tax invoices, and legal governance are executed under Primeora Solutions.`,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-border-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Direct Answers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
            Transparent explanations of how we operate, scope boundaries, and client responsibilities.
          </p>
        </div>

        <div className="space-y-4">
          {GENERAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-border-medium rounded-lg overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-forest">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal-muted flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-forest' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-charcoal-muted leading-relaxed border-t border-border-subtle pt-4 animate-in fade-in">
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
