'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG, SERVICE_PILLARS } from '@/config/brand';
import PrimeoraLogo from '@/components/brand/PrimeoraLogo';
import { Shield, ExternalLink, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <footer className="bg-[#040509] text-slate-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <PrimeoraLogo variant="full" size="md" />
            </Link>

            <p className="text-sm text-slate max-w-sm leading-relaxed">
              {BRAND_CONFIG.tagline}. An integrated strategy and technology engineering consultancy delivering high-speed web platforms, structured lead systems, workflow automation, and business intelligence.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-azure-bright flex-shrink-0" />
                <span>{BRAND_CONFIG.udyamStatus}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-azure-bright flex-shrink-0" />
                <span>{BRAND_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-azure-bright flex-shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.contactEmail}
                </a>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={BRAND_CONFIG.gbpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-azure-light hover:text-white transition-colors"
              >
                <span>Google Business Profile & Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Service Pillars Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
              Service Pillars
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_PILLARS.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    href={`/services#${pillar.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {pillar.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Methodology Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
              Methodology & Firm
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/process" className="hover:text-white transition-colors">
                  Four-Step Methodology
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About & Leadership
                </Link>
              </li>
              <li>
                <Link href="/readiness" className="hover:text-white transition-colors">
                  Digital Readiness Tool
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Field Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Contact Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
              Governance & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors text-xs text-slate-500 hover:text-slate-300">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalEntity}. All rights reserved.
          </p>
          <p className="text-center sm:text-right text-[11px]">
            Engineered with Next.js, TypeScript &amp; PostgreSQL. Bangalore, Karnataka.
          </p>
        </div>
      </div>
    </footer>
  );
}
