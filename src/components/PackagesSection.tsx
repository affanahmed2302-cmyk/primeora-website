import React from 'react';
import Link from 'next/link';
import { PACKAGES } from '@/config/brand';
import { Check, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-ivory border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Structured Engagements</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            Transparent Engagement Tiers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Every business requires different depth. We scope engagements clearly so you know exactly what is included, what is excluded, and how work progresses.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-xl p-7 sm:p-8 transition-all relative ${
                pkg.popular
                  ? 'bg-white border-2 border-forest shadow-card-hover -translate-y-1'
                  : 'bg-white/80 border border-border-medium shadow-subtle hover:border-forest/40'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-forest text-ivory text-xs font-semibold tracking-wider uppercase font-mono rounded-full shadow-subtle">
                  {pkg.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-forest">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-2 min-h-[40px] leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="p-3.5 bg-ivory-light border border-border-subtle rounded-md mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-charcoal-muted block mb-1">
                  Ideal For:
                </span>
                <p className="text-xs text-charcoal font-medium leading-relaxed">
                  {pkg.idealFor}
                </p>
              </div>

              {/* Inclusions */}
              <div className="flex-1 space-y-3 mb-6">
                <span className="text-xs font-mono uppercase font-semibold text-forest block">
                  Included Scope:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Exclusions */}
              <div className="pt-4 border-t border-border-subtle mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-charcoal-muted block mb-2">
                  Not Included in this Tier:
                </span>
                <ul className="space-y-1.5 text-xs text-charcoal-muted">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-copper flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    pkg.popular
                      ? 'bg-forest text-ivory hover:bg-forest-light shadow-subtle'
                      : 'bg-ivory text-forest border border-border-medium hover:bg-ivory-dark'
                  }`}
                >
                  <span>Discuss {pkg.name} Tier</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <p className="text-[11px] text-center text-charcoal-muted mt-2 font-mono">
                  {pkg.commitment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Policy Note */}
        <div className="mt-12 max-w-2xl mx-auto p-4 bg-white/60 border border-border-subtle rounded-lg text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest mb-1">
            <ShieldCheck className="w-4 h-4 text-teal" />
            <span>Scope & Pricing Transparency Policy</span>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Exact pricing is provided as a formal written proposal following discovery. We do not publish arbitrary price tags because custom integrations, domain architectures, and API requirements vary. No surprise hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
}
