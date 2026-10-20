'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import HeroCanvas from '@/components/motion/HeroCanvas';
import DecryptedText from '@/components/react-bits/DecryptedText';
import { ArrowRight, Compass, Cpu, Layers, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
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

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 28,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 18,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          cardsRef.current?.children || [],
          {
            opacity: 0,
            y: 24,
            stagger: 0.15,
            duration: 0.8,
          },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-[#07090F] border-b border-white/10"
    >
      {/* Dynamic Interactive WebGL / Particle Canvas */}
      <HeroCanvas />

      {/* Subtle ambient lighting flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-azure/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-violet/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          {/* Tagline / Tech Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#101524]/90 border border-azure/30 rounded-full text-xs font-semibold text-azure-light tracking-wider uppercase font-mono shadow-[0_0_20px_rgba(61,110,245,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-azure-bright animate-ping" />
            <DecryptedText
              text={BRAND_CONFIG.name}
              speed={40}
              sequential={true}
              className="text-white font-bold"
              encryptedClassName="text-azure-bright"
            />
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Digital Systems Studio</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1
            ref={headlineRef}
            className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
          >
            Practical digital systems engineered for{' '}
            <span className="bg-gradient-to-r from-azure-bright via-azure to-violet bg-clip-text text-transparent">
              how your business actually works.
            </span>
          </h1>

          {/* Subtitle / Positioning */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Primeora Solutions synchronizes high-performance websites, local search visibility, automated WhatsApp &amp; CRM lead pipelines, and business intelligence into one accountable system.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            ref={ctaRef}
            className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-azure to-violet rounded-xl shadow-[0_4px_25px_rgba(61,110,245,0.4)] hover:shadow-[0_6px_35px_rgba(61,110,245,0.6)] hover:scale-[1.02] transition-all duration-200 group"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-200 bg-[#101524] hover:bg-[#171E33] border border-white/10 hover:border-azure/40 rounded-xl transition-all duration-200"
            >
              <span>Explore 6 Pillars</span>
            </Link>

            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-azure-light hover:text-white transition-colors"
            >
              <span>Digital Readiness Assessment &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Feature / Architecture Highlight Cards */}
        <div
          ref={cardsRef}
          className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-azure/40 transition-all duration-300 hover:-translate-y-1 group shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-xl bg-azure/15 border border-azure/30 flex items-center justify-center text-azure-bright mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">
              Speed &amp; Conversion Infrastructure
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bespoke web platforms built on Next.js 15, optimized for 99+ Core Web Vitals, accessible semantic HTML, and Google local discoverability.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-azure/40 transition-all duration-300 hover:-translate-y-1 group shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-xl bg-violet/15 border border-violet/30 flex items-center justify-center text-violet-light mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">
              Automated Lead &amp; Enquiry Triage
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Official WhatsApp Business routing and CRM pipelines that capture client inquiries 24/7 with error-handled webhook notifications.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-azure/40 transition-all duration-300 hover:-translate-y-1 group shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-xl bg-azure/15 border border-azure/30 flex items-center justify-center text-azure-bright mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">
              Performance Intelligence &amp; BI
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unified executive dashboards connecting Google Analytics, CRM pipelines, and operations metrics for actionable decision-making.
            </p>
          </div>
        </div>

        {/* Enterprise Trust Anchor */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-azure-bright" />
            <span>Bangalore Enterprise Studio</span>
          </div>
          <div>
            <span>MSME Udyam Registration: {BRAND_CONFIG.udyamRegistrationNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-azure-bright" />
            <span>PostgreSQL &amp; Serverless Cloud Infrastructure</span>
          </div>
        </div>
      </div>
    </section>
  );
}
