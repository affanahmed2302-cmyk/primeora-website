'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import SystemSchematicHero from '@/components/motion/SystemSchematicHero';
import DecryptedText from '@/components/react-bits/DecryptedText';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } });

      tl.fromTo(
        badgeRef.current,
        { y: -6, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.4 }
      )
        .fromTo(
          headlineRef.current,
          { y: 12, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          subtextRef.current,
          { y: 8, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.25'
        )
        .fromTo(
          ctaRef.current,
          { y: 6, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FBF9F5] dark:bg-[#121110] border-b border-[#E6DFD5] dark:border-[#2C2926] transition-colors"
    >
      {/* Background Editorial Grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      {/* Subtle Warm Vignette Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(194,94,56,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Studio Category Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3 py-1 bg-white dark:bg-[#1A1917] border border-[#E6DFD5] dark:border-[#2C2926] rounded-md text-xs font-medium text-[#5C5751] dark:text-[#A8A29A] font-mono shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38]" />
            <DecryptedText
              text={BRAND_CONFIG.name}
              speed={35}
              sequential={true}
              className="text-[#191817] dark:text-white font-semibold tracking-wider uppercase"
              encryptedClassName="text-[#C25E38]"
            />
            <span className="text-[#8C867E]">/</span>
            <span>Digital Systems &amp; Strategic Architecture</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#191817] dark:text-white leading-[1.12] font-sans"
          >
            Digital systems engineered for{' '}
            <span className="font-serif italic font-normal text-[#C25E38] block sm:inline">
              measurable business growth.
            </span>
          </h1>

          {/* Subtitle / Honest Studio Positioning */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-[#5C5751] dark:text-[#A8A29A] max-w-2xl mx-auto leading-relaxed"
          >
            Primeora Solutions partners with ambitious businesses to engineer bespoke web platforms, connected enquiry pipelines, practical workflow automations, and clear operational intelligence.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            ref={ctaRef}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors group shadow-sm"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[#191817] dark:text-[#F5F2EB] bg-white dark:bg-[#1A1917] hover:bg-[#F2EDE4] dark:hover:bg-[#242220] border border-[#E6DFD5] dark:border-[#2C2926] rounded-lg transition-colors shadow-sm"
            >
              <span>Explore 6 Practice Pillars</span>
            </Link>

            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3.5 text-sm font-medium text-[#C25E38] hover:text-[#A34520] transition-colors"
            >
              <span>Digital Diagnostic &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Meaningful Visual Element: Procedural Architectural Systems Matrix */}
        <SystemSchematicHero />

        {/* Studio Trust Anchor */}
        <div className="mt-14 pt-6 border-t border-[#E6DFD5] dark:border-[#2C2926] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#5C5751] dark:text-[#A8A29A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C25E38]" />
            <span>Bangalore Engineering Consultancy</span>
          </div>
          <div>
            <span>MSME Udyam: {BRAND_CONFIG.udyamRegistrationNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Direct Founder Architecture &amp; Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
