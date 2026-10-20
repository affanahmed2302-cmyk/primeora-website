'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import HeroBackground from '@/components/motion/HeroBackground';
import DecryptedText from '@/components/react-bits/DecryptedText';
import { ArrowRight, Cpu, Layers, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Subtle, non-blocking entrance animation that never leaves content invisible
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } });

      tl.fromTo(
        badgeRef.current,
        { y: -6, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.4 }
      )
        .fromTo(
          headlineRef.current,
          { y: 10, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          subtextRef.current,
          { y: 8, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.25'
        )
        .fromTo(
          ctaRef.current,
          { y: 6, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#040D1A] border-b border-white/[0.08]"
    >
      {/* Restrained Vanta Ambient Mesh with Editorial Grid & Reduced-Motion Fallback */}
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Studio Category Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#08152B] border border-white/10 rounded-md text-xs font-medium text-slate-300 font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <DecryptedText
              text={BRAND_CONFIG.name}
              speed={35}
              sequential={true}
              className="text-white font-semibold tracking-wider uppercase"
              encryptedClassName="text-[#166CFF]"
            />
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Digital Systems & Architecture</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14] font-sans"
          >
            Digital systems engineered for{' '}
            <span className="text-white border-b-2 border-[#166CFF] pb-0.5">
              measurable business growth.
            </span>
          </h1>

          {/* Subtitle / Honest Studio Positioning */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Primeora Solutions partners with ambitious businesses to engineer bespoke web platforms, connected enquiry pipelines, practical workflow automations, and clear operational intelligence.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            ref={ctaRef}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors group shadow-sm"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-slate-200 bg-[#08152B] hover:bg-[#0B172E] border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
              <span>Explore 6 Practice Pillars</span>
            </Link>

            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3.5 text-sm font-medium text-[#3B82F6] hover:text-white transition-colors"
            >
              <span>Digital Diagnostic &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Feature / Architecture Highlight Cards */}
        <div
          ref={cardsRef}
          className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Card 1 */}
          <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6 hover:border-[#166CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#166CFF]/15 border border-[#166CFF]/30 flex items-center justify-center text-[#3B82F6] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-sans">
              Digital Presence &amp; Conversion
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Modern web architecture engineered for speed, mobile responsiveness, semantic accessibility, and clean search discovery.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6 hover:border-[#166CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#166CFF]/15 border border-[#166CFF]/30 flex items-center justify-center text-[#3B82F6] mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-sans">
              Enquiry Triage &amp; Automation
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Structured WhatsApp routing and CRM integrations that capture enquiries 24/7 without dropped leads or manual data entry.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6 hover:border-[#166CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#166CFF]/15 border border-[#166CFF]/30 flex items-center justify-center text-[#3B82F6] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-sans">
              Operations &amp; Intelligence
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Actionable operational dashboards unifying Google Analytics, acquisition pipelines, and performance data for leadership clarity.
            </p>
          </div>
        </div>

        {/* Studio Trust Anchor */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
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
