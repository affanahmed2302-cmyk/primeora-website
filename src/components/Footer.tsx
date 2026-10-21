'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG, SERVICE_PILLARS } from '@/config/brand';
import PrimeoraLogo from '@/components/brand/PrimeoraLogo';
import { Shield, ExternalLink, Mail, MapPin, Inbox } from 'lucide-react';

export default function Footer() {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <footer className="bg-[#F4EFEA] dark:bg-[#090807] text-[#5A544E] dark:text-[#9E988F] pt-16 pb-12 border-t border-[#E5DDD0] dark:border-[#242220] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5DDD0] dark:border-[#242220]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <PrimeoraLogo variant="full" size="md" />
            </Link>

            <p className="text-sm text-[#5A544E] dark:text-[#9C948A] max-w-sm leading-relaxed font-serif">
              {BRAND_CONFIG.tagline}. An engineering consultancy helping businesses design high-performance websites, connected enquiry pipelines, workflow automation, and actionable business intelligence.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#5A544E] dark:text-[#9C948A]">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>{BRAND_CONFIG.udyamStatus}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <span>{BRAND_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.contactEmail}`}
                  className="hover:text-editorial-ink dark:hover:text-white transition-colors"
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
                className="inline-flex items-center gap-1.5 text-xs text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors font-medium"
              >
                <span>Google Business Profile &amp; Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Service Pillars Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5] mb-4 font-mono">
              Practice Areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_PILLARS.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    href={`/services/${pillar.id}`}
                    className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors"
                  >
                    {pillar.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Methodology Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5] mb-4 font-mono">
              Firm &amp; Method
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  All Practices &amp; Packages
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Four-Step Methodology
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Selected Work &amp; Architecture
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link href="/founders" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Founding Partners
                </Link>
              </li>
              <li>
                <Link href="/readiness" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Digital Readiness Tool
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Knowledge Base &amp; Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-editorial-ink dark:text-[#FBF9F5] mb-4 font-mono">
              Governance &amp; Portal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Project Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-preferences" className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors text-left"
                >
                  Manage Consent
                </button>
              </li>
              <li className="pt-2 border-t border-[#E5DDD0] dark:border-[#262422]">
                <Link
                  href="/admin/enquiries"
                  className="inline-flex items-center gap-1.5 text-xs text-[#7C7469] dark:text-[#8E867C] hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Enquiries Inbox</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-xs text-[#7C7469] dark:text-[#8E867C] hover:text-editorial-ink dark:hover:text-slate-300 transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7C7469] dark:text-[#8E867C]">
          <p>© {new Date().getFullYear()} Primeora Solutions. All rights reserved.</p>
          <p className="text-center md:text-right font-mono">
            Udyam Registered MSME: {BRAND_CONFIG.udyamRegistrationNumber} • Bangalore, India
          </p>
        </div>
      </div>
    </footer>
  );
}
