import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights & Technical Guidance — Practical Systems Engineering',
  description:
    'Authoritative answers to common business questions on websites, local SEO, Answer Engine Optimization (AEO), CRM pipelines, and operations automation.',
};

const INSIGHTS_ARTICLES = [
  {
    slug: 'what-should-a-business-website-include',
    title: 'What should a modern business website actually include?',
    category: 'Digital Presence',
    summary:
      'A business website is not a digital brochure; it is an enquiry engine. Learn why clear value propositions, mobile speed, structured schema markup, and accessible contact pathways matter more than trendy animations.',
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
      'Vanity metrics like impressions and page views distract leadership. Discover the 5 empirical measures that correlate directly with sustainable revenue and operational velocity.',
    readTime: '4 min read',
    keyTakeaway: 'Track Customer Acquisition Cost (CAC), enquiry-to-close velocity, channel conversion rate, and customer lifetime value.',
  },
];

export default function InsightsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="bg-architectural-grid py-16 md:py-24 border-b border-border-subtle mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Knowledgebase & AEO</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            Technical Insights & Practice Guidance
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Practical explanations addressing real business-owner challenges across digital presence, search discoverability, workflow automation, and analytics.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {INSIGHTS_ARTICLES.map((art, idx) => (
          <article
            key={idx}
            className="bg-white rounded-xl border border-border-medium p-7 sm:p-9 shadow-subtle hover:border-forest/40 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase font-semibold text-copper">
                {art.category}
              </span>
              <span className="text-xs font-mono text-charcoal-muted">
                {art.readTime}
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-forest mb-3">
              {art.title}
            </h2>

            <p className="text-sm text-charcoal-muted leading-relaxed mb-4">
              {art.summary}
            </p>

            <div className="p-3 bg-ivory-light border border-border-subtle rounded-md mb-5 text-xs text-charcoal">
              <span className="font-semibold text-teal block mb-0.5">Key Implementation Rule:</span>
              <span>{art.keyTakeaway}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
              <Link
                href="/contact"
                className="text-xs font-semibold text-forest hover:text-teal inline-flex items-center gap-1 group"
              >
                <span>Discuss applying this to your systems</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
