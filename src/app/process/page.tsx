import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ArchitecturalTracingTimeline from '@/components/process/ArchitecturalTracingTimeline';
import ProgressiveArchitecturalBlueprint from '@/components/process/ProgressiveArchitecturalBlueprint';
import KineticTextReveal from '@/components/motion/KineticTextReveal';
import MagneticWrapper from '@/components/motion/MagneticWrapper';
import {
  FolderGit2,
  ShieldCheck,
  FileCode2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Four-Step Engineering Methodology — Discovery to Handover | Primeora Solutions',
  description:
    'Comprehensive breakdown of Primeora Solutions’ four-step engineering lifecycle: Discovery, Blueprint, Build & Launch, and Grow & Optimize with verified quality gates and warranty standards.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/process',
  },
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-32 bg-[#FBF9F5] dark:bg-[#090807] min-h-screen text-[#191817] dark:text-[#F5F2EB] transition-colors duration-200">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
            Engineering Methodology
          </span>

          <KineticTextReveal
            text="Our four-step engineering methodology."
            highlightWord="methodology."
            highlightClass="italic font-serif text-[#C25E38] dark:text-[#E07A5F]"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-[#191817] dark:text-[#FBF9F5]"
          />

          <p className="mt-4 text-base sm:text-lg text-[#5A544E] dark:text-[#9E988F] leading-relaxed font-serif">
            A transparent, disciplined project lifecycle designed to eliminate assumption through structured discovery, architectural blueprints, verified builds, and continuous optimization.
          </p>
        </div>
      </div>

      {/* Progressive Architectural Blueprint Layering */}
      <ProgressiveArchitecturalBlueprint />

      {/* SVG Tracing Beam Timeline (Aceternity UI + Animmaster) */}
      <ArchitecturalTracingTimeline />

      {/* Handover & Operating Assurance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1065FF] font-semibold block mb-2">
            Operational Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
            Handover &amp; Warranty Standards
          </h2>
          <p className="mt-2 text-sm text-[#5A544E] dark:text-[#9E988F] font-serif">
            Every system built by Primeora Solutions is engineered for long-term client sovereignty and zero proprietary lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#141312] p-8 rounded-2xl border border-[#E5DDD0] dark:border-[#242220] shadow-xs flex flex-col justify-between">
            <div>
              <FolderGit2 className="w-6 h-6 text-[#C25E38] dark:text-[#E07A5F] mb-4" />
              <h3 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2">
                100% Code &amp; IP Ownership
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                Upon final project milestone settlement, full copyright, source code repositories, and deployment configurations are transferred directly to your organization. You own your digital assets entirely.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center gap-1.5 text-[11px] font-mono text-[#1065FF]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full GitHub transfer</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#141312] p-8 rounded-2xl border border-[#E5DDD0] dark:border-[#242220] shadow-xs flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-6 h-6 text-[#1065FF] mb-4" />
              <h3 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2">
                30-Day Post-Launch Warranty
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                We stand behind our engineering. We provide a complimentary 30-day warranty window post-deployment to remediate any software bugs, broken links, or form notification issues at zero extra charge.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center gap-1.5 text-[11px] font-mono text-[#1065FF]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero-cost remediation</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#141312] p-8 rounded-2xl border border-[#E5DDD0] dark:border-[#242220] shadow-xs flex flex-col justify-between">
            <div>
              <FileCode2 className="w-6 h-6 text-[#C25E38] dark:text-[#E07A5F] mb-4" />
              <h3 className="text-lg font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-2">
                Runbooks &amp; Video Walkthrough
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed">
                We don’t just deliver code—we deliver operational clarity. Your team receives tailored video documentation and written runbooks explaining how to manage content, view enquiries, and run daily operations.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#E5DDD0] dark:border-[#242220] flex items-center gap-1.5 text-[11px] font-mono text-[#1065FF]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Standardized handover</span>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="mt-20 bg-[#F4EFEA] dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5] mb-3">
            Initiate Phase 01: Discovery
          </h2>
          <p className="text-sm text-[#5A544E] dark:text-[#9E988F] max-w-xl mx-auto mb-6 font-serif">
            Schedule an initial consultation to audit your current systems, establish scope boundaries, and discuss a structured implementation timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticWrapper strength={0.25}>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#C25E38] hover:bg-[#A34520] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
              >
                <span>Request Discovery Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticWrapper>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white dark:bg-[#1C1A18] border border-[#DDD5C7] dark:border-[#242220] text-[#191817] dark:text-[#FBF9F5] hover:border-[#C25E38] text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
          <div className="mt-4 text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
            We aim to respond to enquiries within 1–2 business days.
          </div>
        </div>
      </div>
    </div>
  );
}
