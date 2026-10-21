import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights & Technical Guidance — Practical Systems Engineering | Primeora Solutions',
  description:
    'Authoritative answers to common business questions on websites, local SEO, Answer Engine Optimization (AEO), CRM pipelines, and operations automation from Primeora Solutions.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/insights',
  },
};

const INSIGHTS_ARTICLES = [
  {
    slug: 'what-should-a-business-website-include',
    title: 'What should a modern business website actually include?',
    category: 'Digital Presence',
    summary:
      'A business website is not a digital brochure; it is an enquiry engine. Learn why clear value propositions, mobile speed, structured schema markup, and accessible contact pathways matter more than trendy decorative animations.',
    readTime: '5 min read',
    keyTakeaway: 'Prioritize clarity, mobile load speed, verified company details, and clear enquiry forms over heavy decorative graphics.',
  },
  {
    slug: 'local-seo-and-answer-engine-optimization',
    title: 'How Answer Engine Optimization (AEO) changes local search discovery',
    category: 'Customer Acquisition',
    summary:
      'Generative AI search engines (Perplexity, ChatGPT, Google AI Overviews) extract concise entity facts. Discover how structured JSON-LD data and question-and-answer content position your business for AI citations.',
    readTime: '6 min read',
    keyTakeaway: 'Format company services into explicit, authoritative Q&A sections and validate schema with Search Central standards.',
  },
  {
    slug: 'enquiry-capture-and-followup-automation',
    title: 'Why enquiries get lost: Building a resilient lead capture pipeline',
    category: 'Lead & Sales System',
    summary:
      'When enquiries arrive simultaneously across WhatsApp, email, and social DMs, response times lag. Here is how connecting web forms to CRM triage prevents lead leakage.',
    readTime: '4 min read',
    keyTakeaway: 'Automate initial confirmation and internal triage within 3 minutes; leave deep consultation to human account leads.',
  },
  {
    slug: 'which-workflows-are-suitable-for-automation',
    title: 'Which business workflows are actually ready for automation?',
    category: 'Operations & Automation',
    summary:
      'Not every process should be automated. We outline the criteria for automating invoicing, task delegation, and CRM updates with mandatory human-in-the-loop exception handling.',
    readTime: '5 min read',
    keyTakeaway: 'Automate repetitive, rules-based handoffs with established data formats. Never automate unstructured creative or sensitive human decisions.',
  },
  {
    slug: 'what-should-a-business-dashboard-measure',
    title: 'What should an executive business dashboard actually measure?',
    category: 'Analytics & Insights',
    summary:
      'Vanity metrics like impressions and page views distract leadership. Discover the empirical measures that correlate directly with sustainable revenue and operational velocity.',
    readTime: '4 min read',
    keyTakeaway: 'Track Customer Acquisition Cost (CAC), enquiry-to-close velocity, channel conversion rate, and customer lifetime value.',
  },
];

export default function InsightsPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#FBF9F5] transition-colors duration-200">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-serif text-[#191817] dark:text-[#FBF9F5] mb-4">
            Technical insights &amp; practice guidance.
          </h1>
          <p className="text-base sm:text-lg text-[#5A544E] dark:text-[#9E9689] leading-relaxed font-sans">
            Practical explanations addressing real business-owner challenges across digital presence, search discoverability, workflow automation, and analytics.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {INSIGHTS_ARTICLES.map((art, idx) => (
          <article
            key={idx}
            className="bg-white dark:bg-[#141312] rounded-2xl border border-[#E5DDD0] dark:border-[#242220] p-7 sm:p-9 hover:border-[#C25E38]/50 dark:hover:border-[#E07A5F]/50 hover:shadow-md transition-all duration-200 shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold">
                {art.category}
              </span>
              <span className="text-xs font-mono text-[#7C7469] dark:text-[#7A7368]">
                {art.readTime}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-3 font-serif text-[#191817] dark:text-[#FBF9F5] group-hover:text-[#C25E38] dark:group-hover:text-[#E07A5F] transition-colors">
              {art.title}
            </h2>

            <p className="text-sm text-[#5A544E] dark:text-[#9E9689] leading-relaxed mb-6 font-sans">
              {art.summary}
            </p>

            <div className="p-4 bg-[#FAF7F2] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] rounded-xl mb-6 flex items-start gap-3 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#191817] dark:text-[#FBF9F5] font-sans">Core Architectural Takeaway: </span>
                <span className="text-[#5A544E] dark:text-[#9E9689]">{art.keyTakeaway}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline transition-colors"
            >
              <span>Discuss Implementing This Standard</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ))}

        {/* Footer Guidance CTA */}
        <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 text-center mt-12 shadow-xs">
          <h3 className="text-xl font-bold mb-2 font-serif text-[#191817] dark:text-[#FBF9F5]">
            Have a specific architectural question for your stack?
          </h3>
          <p className="text-xs text-[#5A544E] dark:text-[#9E9689] max-w-md mx-auto mb-5 font-sans">
            Our founding engineering partners review tech stack trade-offs directly during discovery.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] dark:bg-[#E07A5F] dark:hover:bg-[#F08E73] dark:text-[#090807] rounded-lg transition-colors shadow-sm"
          >
            <span>Ask an Engineering Partner</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
