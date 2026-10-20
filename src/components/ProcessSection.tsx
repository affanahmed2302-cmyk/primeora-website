'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { PROCESS_STEPS } from '@/config/brand';
import { Compass, FileCode2, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const stepIcons = [Compass, FileCode2, Rocket, TrendingUp];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(stepsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-20 md:py-28 bg-[#040D1A] border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>DELIVERY METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            How We Work Together
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
            A disciplined four-step engineering process designed to eliminate ambiguity, enforce milestone accountability, and deliver measurable operational outcomes.
          </p>
        </div>

        {/* Process Step Timeline */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;
            return (
              <div
                key={step.step}
                className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6 flex flex-col justify-between hover:border-[#166CFF]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-[#166CFF]">
                      0{step.step}
                    </span>
                    <div className="p-2 bg-[#040D1A] border border-white/10 text-[#3B82F6] rounded-lg group-hover:border-[#166CFF]/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#3B82F6] mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs space-y-2">
                  <div>
                    <span className="text-slate-500 block uppercase font-mono text-[10px]">Client Input:</span>
                    <span className="text-slate-300">{step.clientActions}</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] block uppercase font-mono text-[10px]">Milestone Output:</span>
                    <span className="text-slate-200">{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Dedicated Process Page */}
        <div className="mt-10 flex justify-end">
          <Link
            href="/process"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors group"
          >
            <span>Read Complete 4-Step Methodology &amp; Project Timelines</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
