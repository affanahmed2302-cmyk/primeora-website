import React from 'react';
import Link from 'next/link';
import { PACKAGES } from '@/config/brand';
import { Check, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-[#07090F] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Structured Engagements</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Transparent Engagement Tiers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            Every business requires different depth. We scope engagements clearly so you know exactly what is included, what is excluded, and how work progresses.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-2xl p-7 sm:p-8 transition-all duration-300 relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${
                pkg.popular
                  ? 'bg-[#101524] border-2 border-azure-bright shadow-[0_0_35px_rgba(61,110,245,0.25)] -translate-y-1'
                  : 'bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 hover:border-azure/40'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-gradient-to-r from-azure to-violet text-white text-xs font-semibold tracking-wider uppercase font-mono rounded-full shadow-[0_2px_15px_rgba(61,110,245,0.5)]">
                  {pkg.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 min-h-[40px] leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="p-3.5 bg-[#07090F] border border-white/10 rounded-xl mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-slate-400 block mb-1">
                  Ideal For:
                </span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {pkg.idealFor}
                </p>
              </div>

              {/* Inclusions */}
              <div className="flex-1 space-y-3 mb-6">
                <span className="text-xs font-mono uppercase font-semibold text-white block">
                  Included Scope:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-azure-bright flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Exclusions */}
              <div className="pt-4 border-t border-white/10 mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-slate-400 block mb-2">
                  Not Included in this Tier:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-azure to-violet text-white shadow-[0_4px_20px_rgba(61,110,245,0.4)] hover:shadow-[0_6px_25px_rgba(61,110,245,0.6)] hover:scale-[1.02]'
                      : 'bg-white/5 text-slate-200 border border-white/10 hover:border-azure/40 hover:bg-white/10'
                  }`}
                >
                  <span>Discuss {pkg.name} Tier</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <p className="text-[11px] text-center text-slate-500 mt-2 font-mono">
                  {pkg.commitment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Policy Note */}
        <div className="mt-12 max-w-2xl mx-auto p-5 bg-[#0B0F1A]/80 border border-white/10 rounded-2xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-azure-bright mb-1 font-mono">
            <ShieldCheck className="w-4 h-4 text-azure-bright" />
            <span>Scope &amp; Pricing Transparency Policy</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Exact pricing is provided as a formal written proposal following discovery. We do not publish arbitrary price tags because custom integrations, domain architectures, and API requirements vary. No surprise hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
}
