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
      className="py-20 md:py-28 bg-[#F4EFEA] dark:bg-[#171615] border-b border-[#E5DDD0] dark:border-[#2C2926] relative overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>DELIVERY METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-ink dark:text-[#FBF9F5] tracking-tight font-sans">
            How We Work Together
          </h2>
          <p className="mt-3 text-base text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-2xl font-serif">
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
                className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-6 flex flex-col justify-between hover:border-[#C25E38]/50 dark:hover:border-[#E07A5F]/40 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-[#C25E38] dark:text-[#E07A5F]">
                      0{step.step}
                    </span>
                    <div className="p-2 bg-[#FBF9F5] dark:bg-[#24221F] border border-[#DDD5C7] dark:border-[#383430] text-[#C25E38] dark:text-[#E07A5F] rounded-lg group-hover:border-[#C25E38]/50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-editorial-ink dark:text-[#FBF9F5] mb-1 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#C25E38] dark:text-[#E07A5F] mb-3 font-medium">
                    {step.tagline}
                  </p>
                  <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] text-xs space-y-2">
                  <div>
                    <span className="text-[#7C7469] dark:text-[#8E867C] block uppercase font-mono text-[10px] font-medium">Client Input:</span>
                    <span className="text-[#3D3833] dark:text-[#D4CDC3]">{step.clientActions}</span>
                  </div>
                  <div>
                    <span className="text-[#C25E38] dark:text-[#E07A5F] block uppercase font-mono text-[10px] font-medium">Milestone Output:</span>
                    <span className="text-editorial-ink dark:text-[#FBF9F5] font-medium">{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Process Page */}
        <div className="mt-10 flex justify-end">
          <Link
            href="/process"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors group"
          >
            <span>Read Detailed Four-Step Engineering Lifecycle</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
