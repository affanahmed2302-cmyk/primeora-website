'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface FaqItem {
  question: string;
  answer: string;
}

const PREVIEW_FAQS: FaqItem[] = [
  {
    question: 'What does Primeora Solutions do?',
    answer:
      'Primeora Solutions is a strategy and technology engineering consultancy providing an integrated practice for growing businesses. We design and engineer modern web platforms, connect CRM and WhatsApp enquiry capture pipelines, automate internal operations, and build leadership business intelligence dashboards.',
  },
  {
    question: 'How does a project engagement start?',
    answer:
      'Every engagement starts with a Discovery consultation to diagnose your technical bottlenecks and commercial goals. We then deliver a formal Architecture Blueprint detailing the exact deliverables, technology stack, milestone timeline, and fixed costs before any implementation begins.',
  },
  {
    question: 'Do you guarantee a specific volume of leads or search rankings?',
    answer:
      'No. We caution strongly against any agency that promises guaranteed leads or Google search rankings. Conversion rates and search positions depend on product-market fit, pricing, and third-party platform algorithms. What we guarantee is rigorous software engineering, modern mobile performance, technical SEO compliance, error-handled lead capture, and empirical analytics tracking.',
  },
  {
    question: 'What legal business entity backs Primeora Solutions?',
    answer:
      `Primeora Solutions is an official Udyam-registered MSME (Registration No: ${BRAND_CONFIG.udyamRegistrationNumber}) based in Bangalore, Karnataka. All client contracts, non-disclosure agreements, and service milestones are executed directly by Primeora Solutions.`,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#040D1A] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>DIRECT ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Honest, transparent guidance on scope boundaries, client input, and technical delivery.
          </p>
        </div>

        <div className="space-y-3">
          {PREVIEW_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#08152B] hover:border-[#166CFF]/30 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#166CFF]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white font-sans">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] pt-4 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/services"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors group"
          >
            <span>Have specific technical questions? Read Our Practice Inclusions &amp; Exclusions</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
