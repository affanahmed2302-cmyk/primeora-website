'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import DigitalSystemsMap from '@/components/motion/DigitalSystemsMap';
import { ArrowRight, ShieldCheck, Play, Pause, Compass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.4 } });

      tl.from(headlineRef.current, { y: 12, duration: 0.4, clearProps: 'all' })
        .from(subtextRef.current, { y: 8, duration: 0.35, clearProps: 'all' }, '-=0.2')
        .from(ctaRef.current, { y: 6, duration: 0.3, clearProps: 'all' }, '-=0.2');
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#090807] text-[#F5F2EB] border-b border-[#242220] transition-colors"
      aria-label="Primeora Solutions Cinematic Introduction"
    >
      {/* Cinematic Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {!reducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/video/hero-poster.jpg"
            className="w-full h-full object-cover object-center opacity-35 filter brightness-75 contrast-125 scale-105 transition-opacity duration-1000"
            aria-hidden="true"
          >
            <source src="/video/hero-motion.webm" type="video/webm" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center opacity-30 filter brightness-75 contrast-125"
            style={{ backgroundImage: 'url(/video/hero-poster.jpg)' }}
            aria-hidden="true"
          />
        )}

        {/* Art-Directed Multi-Stop Scrim Gradient for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090807]/90 via-[#090807]/60 to-[#090807] pointer-events-none" />

        {/* Architectural Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,rgba(9,8,7,0.85)_100%)] pointer-events-none" />

        {/* Subtle Architectural Precision Grid Overlay */}
        <div className="absolute inset-0 bg-editorial-grid opacity-25 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cinematic Telemetry & Video Control Strip */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#242220]/80 text-xs font-mono text-[#9E988F]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] text-[#C4BAA9]">
              Engineering Consultancy · Bangalore Studio
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlayback}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141312]/80 hover:bg-[#1C1A18] border border-[#242220] hover:border-[#36332F] text-[11px] text-[#9E988F] hover:text-[#F5F2EB] transition-colors"
              aria-label={isPlaying ? 'Pause background cinema' : 'Play background cinema'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#E07A5F]" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#E07A5F]" />
                  <span>Play Motion</span>
                </>
              )}
            </button>
            <span className="hidden sm:inline text-[11px] text-[#6E6860]">
              NASA Earth Orbital Feed · Public Domain
            </span>
          </div>
        </div>

        {/* Hero Central Proposition */}
        <div className="max-w-4xl mx-auto text-center space-y-7">
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F2EB] leading-[1.12] font-sans break-words"
          >
            Digital systems engineered for{' '}
            <span className="font-serif italic font-normal text-[#E07A5F] block sm:inline">
              measurable enterprise growth.
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-[#9E988F] max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Primeora Solutions partners with ambitious businesses to build resilient digital presence, connected enquiry pipelines, practical workflow automations, and clear operational intelligence.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaRef}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors group shadow-sm shadow-[#C25E38]/20"
            >
              <span>Consult with Partners</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[#F5F2EB] bg-[#141312] hover:bg-[#1C1A18] border border-[#242220] hover:border-[#36332F] rounded-lg transition-colors shadow-sm"
            >
              <span>Explore 6 Practice Pillars</span>
            </Link>

            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#E07A5F] hover:text-[#F08E73] transition-colors gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Digital Diagnostic &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Meaningful Visual Element: Interactive Digital Transformation Systems Map */}
        <DigitalSystemsMap />

        {/* Studio Trust Anchor */}
        <div className="mt-14 pt-6 border-t border-[#242220] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9E988F]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E07A5F]" />
            <span>Bangalore Engineering Practice</span>
          </div>
          <div>
            <span>MSME Udyam: {BRAND_CONFIG.udyamRegistrationNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Response SLA: Within 1–2 Business Days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
