import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Website Terms of Use & Engagement Governance — Primeora Solutions',
  description:
    'Terms of use governing the Primeora Solutions website and commercial engagement boundaries.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#07090F] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 w-fit">
          <Shield className="w-3.5 h-3.5 text-azure-bright" />
          <span>Legal Disclosures</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-slate-400 font-mono mb-8">
          Last updated: 20 October 2026 &middot; Operating Entity: {BRAND_CONFIG.legalEntity}
        </p>

        <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed space-y-6">
          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">1. Enterprise Identity &amp; Brand Governance</h2>
            <p>
              These Terms and Conditions govern the use of this website. This website is owned and operated directly by <strong>{BRAND_CONFIG.legalEntity}</strong> (Udyam Registered MSME: <code>{BRAND_CONFIG.udyamRegistrationNumber}</code>, Bangalore, Karnataka), conducting commercial advisory, software engineering, and digital systems consulting as <strong>{BRAND_CONFIG.name}</strong>.
            </p>
          </section>

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">2. Informational Purpose &amp; No Unilateral Warranty</h2>
            <p>
              The content, service descriptions, package tiers, and architectural case models presented on this website are for informational and planning purposes only. They do not constitute a binding unilateral offer to deliver specific outcomes. Formal client engagements require a customized Discovery and a mutually executed written Service Agreement specifying agreed deliverables, milestone pricing, and client dependencies.
            </p>
          </section>

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">3. Service Agreement Precedence</h2>
            <p>
              When a client engages our practice for software engineering, website development, CRM integration, automation, or analytics, the relationship is governed by the specific written <strong>Primeora Solutions Service Agreement</strong> and project proposal agreed between the parties. In the event of any conflict between this website copy and an executed Service Agreement, the executed Service Agreement shall govern.
            </p>
          </section>

          <section className="space-y-3 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">4. Intellectual Property &amp; Work Product</h2>
            <p>
              All website text, diagrams, and code authored by Primeora Solutions are the property of Primeora Solutions until formal handover pursuant to a written client agreement. Client deliverables, upon receipt of full milestone payments, are transferred to the client with perpetual license or complete copyright assignment as stipulated in the client contract.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
