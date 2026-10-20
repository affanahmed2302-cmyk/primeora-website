import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Website Terms of Use & Engagement Governance',
  description:
    'Terms of use governing the Ritkara Veyra website and commercial engagement boundaries operated by Primeora Solutions.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-teal" />
          <span>Legal Disclosures</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-4">
          Terms & Conditions
        </h1>
        <p className="text-xs text-charcoal-muted font-mono mb-8">
          Last updated: 20 October 2026 &middot; Operating Entity: {BRAND_CONFIG.legalEntity}
        </p>

        <div className="prose prose-slate max-w-none text-sm text-charcoal leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">1. Enterprise Identity & Brand Governance</h2>
            <p>
              These Terms and Conditions govern the use of this website. This website is owned and operated by <strong>{BRAND_CONFIG.legalEntity}</strong> (Udyam Registered MSME: <code>{BRAND_CONFIG.udyamRegistrationNumber}</code>), conducting commercial advisory, engineering, and digital systems consulting under the working brand name <strong>{BRAND_CONFIG.name}</strong>.
            </p>
            <p className="p-3 bg-ivory-light border border-border-subtle rounded text-xs text-charcoal-muted">
              <strong>Corporate Disclosure:</strong> Ritkara Veyra is the working brand of Primeora Solutions. Formal commercial proposals, client engagement contracts, master service agreements, and tax invoices are executed under Primeora Solutions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">2. Informational Purpose & No Unilateral Warranty</h2>
            <p>
              The content, service descriptions, package tiers, and architectural case models presented on this website are for informational and planning purposes only. They do not constitute a binding unilateral offer to deliver specific outcomes. Formal client engagements require a customized Discovery and a mutually executed written Service Agreement specifying agreed deliverables, milestone pricing, and client dependencies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">3. Service Agreement Precedence</h2>
            <p>
              When a client engages our practice for software engineering, website development, CRM integration, automation, or analytics, the relationship is governed by the specific written <strong>Primeora Solutions Service Agreement</strong> and project proposal agreed between the parties. In the event of any conflict between this website copy and an executed Service Agreement, the executed Service Agreement shall govern.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">4. Intellectual Property & Ownership</h2>
            <p>
              All trademarks, master logos, geometric emblems, design systems, and editorial copy displayed on this website are the intellectual property of Primeora Solutions and its founders. Upon full payment of milestone fees in custom client projects, client-specific custom code and branding assets are transferred to the client as stipulated in their contract.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">5. Performance Claims & Third-Party Dependencies</h2>
            <p>
              We design digital systems according to engineering best practices. However, we do not warrant or guarantee specific search engine rankings, conversion volumes, or sales increases, as these rely on market dynamics, client operational responsiveness, and independent platform policies (Google, Meta, WhatsApp, CRM providers). Third-party subscription fees, API quotas, and merchant processing charges remain the client&rsquo;s direct responsibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">6. Governing Law & Jurisdiction</h2>
            <p>
              These website terms shall be construed in accordance with the laws of India. Any legal dispute or proceeding arising out of website usage shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-forest">7. Contact & Notices</h2>
            <p>
              Formal legal notices or queries regarding these terms should be addressed in writing to:
            </p>
            <div className="p-4 bg-ivory-light border border-border-subtle rounded-md font-mono text-xs">
              <p>Operating Entity: {BRAND_CONFIG.legalEntity}</p>
              <p>Registration: {BRAND_CONFIG.udyamStatus}</p>
              <p>Email: <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="text-forest underline">{BRAND_CONFIG.contactEmail}</a></p>
              <p>Location: {BRAND_CONFIG.location}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
