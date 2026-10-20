'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG, SERVICE_PILLARS } from '@/config/brand';
import { Shield, ExternalLink, Lock } from 'lucide-react';

export default function Footer() {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <footer className="bg-forest-dark text-ivory/80 pt-16 pb-12 border-t border-forest-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 bg-ivory/10 rounded-sm p-1">
                <Image
                  src={BRAND_CONFIG.assets.emblem}
                  alt=""
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-ivory">
                {BRAND_CONFIG.name}
              </span>
            </Link>

            <p className="text-sm text-ivory/70 max-w-sm leading-relaxed">
              {BRAND_CONFIG.tagline} An integrated strategy and technology consultancy delivering resilient digital presence, structured lead systems, workflow automation, and performance intelligence.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-ivory/60">
              <Shield className="w-3.5 h-3.5 text-teal-light flex-shrink-0" />
              <span>{BRAND_CONFIG.udyamStatus}</span>
            </div>

            <div className="pt-1">
              <a
                href={BRAND_CONFIG.gbpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-light hover:text-white transition-colors"
              >
                <span>Google Business Profile & Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Service Pillars Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory mb-4 font-mono">
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory mb-4 font-mono">
              Methodology & Firm
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/process" className="hover:text-white transition-colors">
                  Four-Step Process
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
                  Case Architecture
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  AEO & Technical Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Discuss a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Disclosures & Compliance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory mb-4 font-mono">
              Governance & Policies
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
                  className="text-left hover:text-white transition-colors"
                >
                  Cookie Preferences
                </button>
              </li>
              <li className="pt-4">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-ivory/40 hover:text-ivory/80 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal Entity Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p className="text-center md:text-left leading-relaxed">
            {BRAND_CONFIG.legalNotice}
          </p>
          <p className="flex-shrink-0">
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
