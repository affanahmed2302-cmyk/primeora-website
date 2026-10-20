'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand';
import { ArrowRight, Compass, Cpu, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillarGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 24,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 18,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          pillarGridRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.7,
          },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-architectural-grid border-b border-border-subtle"
    >
      {/* Subtle architectural gradient ambient accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Tagline / Architectural Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 border border-forest/15 rounded-full text-xs font-semibold text-forest tracking-wider uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span>{BRAND_CONFIG.tagline}</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest leading-[1.12]"
          >
            Practical digital systems engineered for how your business actually works.
          </h1>

          {/* Subtitle / Positioning */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto leading-relaxed"
          >
            Ritkara Veyra coordinates digital presence, customer acquisition, enquiry capture, operations automation, and performance intelligence into one connected system.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            ref={ctaRef}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-ivory bg-forest rounded-md hover:bg-forest-light transition-all shadow-card hover:shadow-card-hover group"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-charcoal bg-white border border-border-medium rounded-md hover:bg-ivory-light transition-all hover:border-forest/40"
            >
              <span>Explore Six Service Pillars</span>
            </Link>
          </div>
        </div>

        {/* Three Complementary Foundations Card Grid */}
        <div
          ref={pillarGridRef}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {/* Strategy */}
          <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-lg border border-border-subtle shadow-subtle hover:border-forest/30 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-md bg-forest/10 text-forest flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-lg font-bold text-forest mb-2">1. Business Strategy</h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              We diagnose commercial friction, define scope boundaries, and align digital investments with measurable revenue and operational goals.
            </p>
          </div>

          {/* Technology */}
          <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-lg border border-border-subtle shadow-subtle hover:border-forest/30 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-md bg-teal/10 text-teal flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-lg font-bold text-forest mb-2">2. Technology & Build</h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              High-speed web platforms, semantic search architecture, secure API integrations, and CRM configurations built for longevity.
            </p>
          </div>

          {/* Systems */}
          <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-lg border border-border-subtle shadow-subtle hover:border-forest/30 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-md bg-copper/10 text-copper flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-lg font-bold text-forest mb-2">3. Business Systems</h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Automated enquiry routing, error-handled workflows, and live intelligence dashboards that keep teams organized and accountable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
