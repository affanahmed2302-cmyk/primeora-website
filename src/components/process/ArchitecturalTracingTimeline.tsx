'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '@/config/brand';
import { CheckCircle2, FileCode2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ArchitecturalTracingTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* SVG Tracing Beam (Aceternity UI Pattern) */}
      <div className="relative">
        {/* Continuous Background Track */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-[#E5DDD0] dark:bg-[#242220]" />

        {/* Dynamic Animated Laser Line */}
        <motion.div
          style={{ scaleY: shouldReduceMotion ? 1 : scaleY, originY: 0 }}
          className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1065FF] via-[#C25E38] to-[#1065FF] dark:from-[#1065FF] dark:via-[#E07A5F] dark:to-[#1065FF] shadow-sm"
        />

        {/* Milestone Steps */}
        <div className="space-y-16 md:space-y-24 pl-12 md:pl-20">
          {PROCESS_STEPS.map((step) => {
            const stepNum = String(step.step).padStart(2, '0');

            return (
              <div key={step.step} className="relative group">
                {/* Milestone Node Pin */}
                <div className="absolute -left-12 md:-left-20 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-[#141312] border-2 border-[#1065FF] flex items-center justify-center font-mono text-xs font-bold text-[#1065FF] shadow-xs">
                  {stepNum}
                </div>

                {/* Milestone Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left (5 cols): Narrative & Scope */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold">
                      <span>Phase {stepNum}</span>
                      <span className="text-[#A8A196]">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Scheduled Milestone</span>
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-xs font-mono text-[#5A544E] dark:text-[#A8A196] font-medium">
                      {step.tagline}
                    </p>

                    <p className="text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed pt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Right (7 cols): Engineering Specification Dossier */}
                  <div className="lg:col-span-7 bg-[#FAF6F0] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                    {/* Client Inputs Required */}
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-[#7C7469] dark:text-[#8E867C] font-semibold">
                        <FileCode2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F]" />
                        <span>Client Dependencies &amp; Access</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3] leading-relaxed">
                        {step.clientActions}
                      </p>
                    </div>

                    {/* Verified Deliverable */}
                    <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#242220]">
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-[#1065FF] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Handover Deliverable</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3D3833] dark:text-[#D4CDC3] font-mono leading-relaxed bg-white dark:bg-[#1A1917] p-3 rounded-lg border border-[#DDD5C7] dark:border-[#2C2926]">
                        {step.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Bottom Call to Action */}
      <div className="mt-20 pt-12 border-t border-[#E5DDD0] dark:border-[#242220] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
            Ready to initiate Step 01 Discovery?
          </h4>
          <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif">
            We review project briefs directly with founding partners within 1–2 business days.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm"
        >
          <span>Initiate Discovery Phase</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
