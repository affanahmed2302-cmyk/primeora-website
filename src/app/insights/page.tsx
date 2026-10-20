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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>KNOWLEDGEBASE &amp; GUIDANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Technical Insights &amp; Practice Guidance
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Practical explanations addressing real business-owner challenges across digital presence, search discoverability, workflow automation, and analytics.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {INSIGHTS_ARTICLES.map((art, idx) => (
          <article
            key={idx}
            className="bg-[#08152B] rounded-xl border border-white/[0.08] p-7 sm:p-8 hover:border-[#166CFF]/40 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-[#3B82F6]">
                {art.category}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {art.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 font-sans group-hover:text-[#3B82F6] transition-colors">
              {art.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {art.summary}
            </p>

            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-[#166CFF] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Takeaway: </strong>
                  {art.keyTakeaway}
                </span>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors flex-shrink-0"
              >
                <span>Discuss Practice Strategy</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
