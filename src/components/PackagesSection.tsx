import React from 'react';
import Link from 'next/link';
import { PACKAGES } from '@/config/brand';
import { Check, X, ArrowRight } from 'lucide-react';

export default function PackagesSection() {
  return (
    <section id="packages" className="py-16 md:py-24 bg-[#F4EFEA] dark:bg-[#171615] border-b border-[#E5DDD0] dark:border-[#2C2926] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>COMMERCIAL ENGAGEMENT MODELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-ink dark:text-[#FBF9F5] tracking-tight font-sans">
            Transparent Engagement Tiers
          </h2>
          <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-2xl font-serif">
            Every business requires different depth. We scope engagements clearly so you know exactly what is included, what is excluded, and how work progresses.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-xl p-7 transition-all duration-200 relative ${
                pkg.popular
                  ? 'bg-white dark:bg-[#1C1A18] border-2 border-[#C25E38] dark:border-[#E07A5F] shadow-md'
                  : 'bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] hover:border-[#C25E38]/40 dark:hover:border-[#E07A5F]/30 shadow-xs'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#C25E38] dark:bg-[#E07A5F] text-white text-[11px] font-semibold uppercase tracking-wider font-mono rounded shadow-xs">
                  {pkg.badge}
                </div>
              )}

              <div className="mb-6 pt-1">
                <h3 className="text-2xl font-bold text-editorial-ink dark:text-[#FBF9F5] font-sans">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] mt-2 min-h-[40px] leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="p-3.5 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#33302B] rounded-lg mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-[#7C7469] dark:text-[#8E867C] block mb-1">
                  Ideal For:
                </span>
                <p className="text-xs text-[#3D3833] dark:text-[#D4CDC3] leading-relaxed">
                  {pkg.idealFor}
                </p>
              </div>

              {/* Inclusions */}
              <div className="flex-1 space-y-3 mb-6">
                <span className="text-xs font-mono uppercase font-semibold text-editorial-ink dark:text-[#FBF9F5] block">
                  Included Scope:
                </span>
                <ul className="space-y-2 text-xs text-[#3D3833] dark:text-[#D4CDC3]">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Exclusions */}
              <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] mb-6">
                <span className="text-[11px] font-mono uppercase font-semibold text-[#7C7469] dark:text-[#8E867C] block mb-2">
                  Explicit Exclusions:
                </span>
                <ul className="space-y-1.5 text-xs text-[#7C7469] dark:text-[#8E867C]">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3 h-3 text-[#9C948A] flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href={`/contact?package=${pkg.id.toLowerCase()}`}
                className={`inline-flex items-center justify-center w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  pkg.popular
                    ? 'bg-[#C25E38] hover:bg-[#A84F2E] text-white shadow-sm'
                    : 'bg-[#FBF9F5] dark:bg-[#22201D] hover:bg-[#EAE4DC] dark:hover:bg-[#2C2926] text-editorial-ink dark:text-[#FBF9F5] border border-[#DDD5C7] dark:border-[#383430]'
                }`}
              >
                <span>Select {pkg.name} Scope</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
