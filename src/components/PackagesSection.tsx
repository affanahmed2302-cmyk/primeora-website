import React from 'react';
import Link from 'next/link';
import { PACKAGES, BRAND_CONFIG } from '@/config/brand';
import { Check, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PackagesSection() {
  return (
    <section id="packages" className="py-16 md:py-24 bg-[#040D1A] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>COMMERCIAL ENGAGEMENT MODELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Transparent Engagement Tiers
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
            Every business requires different depth. We scope engagements clearly so you know exactly what is included, what is excluded, and how work progresses.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-xl p-7 transition-colors relative ${
                pkg.popular
                  ? 'bg-[#08152B] border-2 border-[#166CFF]'
                  : 'bg-[#08152B] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#166CFF] text-white text-[11px] font-semibold uppercase tracking-wider font-mono rounded">
                  {pkg.badge}
                </div>
              )}

              <div className="mb-6 pt-1">
                <h3 className="text-2xl font-bold text-white font-sans">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 min-h-[40px] leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="p-3.5 bg-[#040D1A] border border-white/[0.06] rounded-lg mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-slate-400 block mb-1">
                  Ideal For:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pkg.idealFor}
                </p>
              </div>

              {/* Inclusions */}
              <div className="flex-1 space-y-3 mb-6">
                <span className="text-xs font-mono uppercase font-semibold text-white block">
                  Included Scope:
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#166CFF] flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Exclusions */}
              <div className="pt-4 border-t border-white/[0.06] mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-slate-400 block mb-2">
                  Explicit Exclusions:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3 h-3 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    pkg.popular
                      ? 'bg-[#166CFF] hover:bg-[#1055CC] text-white'
                      : 'bg-[#040D1A] text-slate-200 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>Discuss {pkg.name} Tier</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Terms Notice */}
        <div className="mt-12 p-6 bg-[#08152B] border border-white/[0.08] rounded-xl flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Commercial Governance Note: </span>
            All projects are executed under formal service agreements with clear milestone deliverables, defined client review windows, and IP handover upon final milestone completion. Primeora Solutions (Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber}).
          </div>
        </div>
      </div>
    </section>
  );
}
