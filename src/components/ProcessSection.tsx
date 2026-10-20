'use client';

import React, { useRef } from 'react';
import { PROCESS_STEPS } from '@/config/brand';
import { Compass, FileCode2, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';
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
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-20 md:py-28 bg-[#07090F] border-b border-white/10 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-azure/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-azure/10 text-azure-bright border border-azure/20 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Execution Methodology</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How We Work Together
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            A structured four-step engineering lifecycle designed to eliminate ambiguity, deliver on schedule, and protect your commercial focus.
          </p>
        </div>

        {/* Process Step Timeline */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;
            return (
              <div
                key={step.step}
                className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-azure/40 transition-all duration-300 hover:-translate-y-1 relative group shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold bg-gradient-to-r from-azure-bright to-violet bg-clip-text text-transparent">
                      0{step.step}
                    </span>
                    <div className="p-2.5 bg-gradient-to-br from-azure/20 to-violet/20 border border-azure/30 text-azure-bright rounded-xl group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1 group-hover:text-azure-light transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-azure-bright mb-3 font-mono">
                    {step.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="font-semibold text-slate-200 block">Client Action:</span>
                    <span className="text-slate-400">{step.clientActions}</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold text-azure-bright block">Key Milestone:</span>
                    <span className="text-slate-300">{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
