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
    <footer className="bg-[#02070E] text-slate-400 pt-16 pb-12 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <PrimeoraLogo variant="full" size="md" />
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {BRAND_CONFIG.tagline}. An engineering consultancy helping businesses design high-performance websites, connected enquiry pipelines, workflow automation, and actionable business intelligence.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#3B82F6] flex-shrink-0" />
                <span>{BRAND_CONFIG.udyamStatus}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3B82F6] flex-shrink-0" />
                <span>{BRAND_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3B82F6] flex-shrink-0" />
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
                className="inline-flex items-center gap-1.5 text-xs text-[#3B82F6] hover:text-white transition-colors"
              >
                <span>Google Business Profile &amp; Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Service Pillars Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
              Practice Areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_PILLARS.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    href={`/services/${pillar.id}`}
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
              Firm &amp; Method
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Practices &amp; Packages
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-white transition-colors">
                  Four-Step Methodology
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Selected Work &amp; Architecture
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Partners &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/readiness" className="hover:text-white transition-colors">
                  Digital Readiness Tool
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Knowledge Base &amp; Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
              Governance &amp; Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Project Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-preferences" className="hover:text-white transition-colors">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-white transition-colors text-left"
                >
                  Manage Consent
                </button>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Primeora Solutions. All rights reserved.</p>
          <p className="text-center md:text-right font-mono">
            Udyam Registered MSME: {BRAND_CONFIG.udyamRegistrationNumber} • Bangalore, India
          </p>
        </div>
      </div>
    </footer>
  );
}
