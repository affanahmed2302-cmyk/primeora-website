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
    <section id="faq" className="py-20 md:py-28 bg-[#F4EFEA] dark:bg-[#171615] border-b border-[#E5DDD0] dark:border-[#2C2926] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>DIRECT ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-ink dark:text-[#FBF9F5] tracking-tight font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
            Honest, transparent guidance on scope boundaries, client input, and technical delivery.
          </p>
        </div>

        <div className="space-y-3">
          {PREVIEW_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl overflow-hidden bg-white dark:bg-[#1C1A18] hover:border-[#C25E38]/40 dark:hover:border-[#E07A5F]/30 transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C25E38]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-editorial-ink dark:text-[#FBF9F5] font-sans">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7C7469] dark:text-[#8E867C] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C25E38] dark:text-[#E07A5F]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed border-t border-[#E5DDD0] dark:border-[#2C2926] pt-4 animate-in fade-in duration-150">
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
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors group"
          >
            <span>Have specific technical questions? Read Our Practice Inclusions &amp; Exclusions</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
