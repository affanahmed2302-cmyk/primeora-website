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
        {/* Section Header without eyebrow */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191817] dark:text-[#FBF9F5] tracking-tight font-sans">
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
                className="bg-white dark:bg-[#1C1A18] rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] overflow-hidden transition-colors shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-sans font-bold text-sm sm:text-base text-[#191817] dark:text-[#FBF9F5] hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed border-t border-[#E5DDD0]/50 dark:border-[#2C2926]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-[#191817] dark:hover:text-white transition-colors"
          >
            <span>Explore Technical Insights &amp; Guides</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
