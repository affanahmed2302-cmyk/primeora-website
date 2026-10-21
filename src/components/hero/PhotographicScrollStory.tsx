'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Cpu,
  Database,
  Layers,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SceneData {
  id: string;
  stepNumber: string;
  badge: string;
  badgeStyle: string;
  title: string;
  subtitle: string;
  narrative: string;
  imageSrc: string;
  imageAlt: string;
  impactMetrics: { label: string; value: string; status: 'negative' | 'positive' }[];
  technicalCaption: string;
}

const STORY_SCENES: SceneData[] = [
  {
    id: 'fragmented-friction',
    stepNumber: 'STAGE 01 OF 03',
    badge: 'Operational Friction',
    badgeStyle: 'text-amber-300 border-amber-500/40 bg-amber-950/60',
    title: 'Disconnected tools create silent customer loss.',
    subtitle: 'Fragmented touchpoints · Manual copy-pasting · Unmonitored lead decay',
    narrative:
      'Growing businesses often accumulate software in isolation: a bloated template website that lags on mobile, ad spend pointed to an unmonitored inbox, and office staff manually retyping leads into spreadsheets. Qualified buyers abandon slow pages, response delays drag beyond 14 hours, and leadership has zero visibility into true acquisition ROI.',
    imageSrc: '/images/story/01-fragmented-chaos.jpg',
    imageAlt: 'Fragmented operational friction with disconnected devices, cluttered notes, and disorganized tools',
    impactMetrics: [
      { label: 'Mobile Bounce Rate', value: '68%', status: 'negative' },
      { label: 'Enquiry Response Lag', value: '14+ Hours', status: 'negative' },
      { label: 'Manual Re-entry Drag', value: '8 hrs / week', status: 'negative' },
    ],
    technicalCaption: 'Diagnosis: Fragmented data silos, untracked marketing spend, and friction-laden customer journeys.',
  },
  {
    id: 'engineered-systems',
    stepNumber: 'STAGE 02 OF 03',
    badge: 'Architectural Intervention',
    badgeStyle: 'text-sky-300 border-sky-500/40 bg-sky-950/60',
    title: 'A unified pipeline capturing every commercial opportunity.',
    subtitle: 'Sub-second Next.js edge platform · Hardened PostgreSQL database · Instant WhatsApp dispatch',
    narrative:
      'Primeora replaces brittle tools with an engineered inbound infrastructure. A bespoke Next.js web application renders at the edge in under 800 milliseconds. Customer enquiries from web forms, WhatsApp, and phone calls route immediately into a secure PostgreSQL database, triggering instant team notifications and eliminating lead leakage entirely.',
    imageSrc: '/images/story/02-engineered-systems.jpg',
    imageAlt: 'Precision engineered systems architecture with modern high-speed server racks and clean digital monitoring',
    impactMetrics: [
      { label: 'Core Web Vitals (LCP)', value: '0.78s', status: 'positive' },
      { label: 'Enquiry Dispatch', value: '< 15 Seconds', status: 'positive' },
      { label: 'Lead Capture Retention', value: '100% Verified', status: 'positive' },
    ],
    technicalCaption: 'Architecture: Distributed edge compute, PostgreSQL ACID transactions, and zero-latency alerting.',
  },
  {
    id: 'executive-clarity',
    stepNumber: 'STAGE 03 OF 03',
    badge: 'Commercial Velocity',
    badgeStyle: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60',
    title: 'Automated operations and actionable executive intelligence.',
    subtitle: 'Hands-off client onboarding · Automated GST invoicing · Real-time commercial dashboard',
    narrative:
      'With the acquisition foundation secured, internal workflows synchronize automatically. Client onboarding, payment gateway webhooks, and compliant GST invoicing execute without human intervention. Founding partners and executive leadership monitor live revenue velocity, customer acquisition costs, and conversion metrics in a single unified cockpit.',
    imageSrc: '/images/story/03-executive-clarity.jpg',
    imageAlt: 'Executive clarity in a modern corporate boardroom overlooking a panoramic illuminated city skyline',
    impactMetrics: [
      { label: 'Billing Automation', value: '100% Hands-off', status: 'positive' },
      { label: 'Reporting Latency', value: 'Sub-minute', status: 'positive' },
      { label: 'System Uptime SLA', value: '99.9% Monitored', status: 'positive' },
    ],
    technicalCaption: 'Outcome: Direct intellectual property ownership, operational independence, and compound ROI.',
  },
];

export default function PhotographicScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Setup bidirectional GSAP ScrollTrigger scrub
  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Initialize states: Image 0 visible, 1 & 2 hidden
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.06,
          zIndex: i + 1,
        });
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 24,
          display: i === 0 ? 'block' : 'none',
        });
      });

      if (prefersReducedMotion) {
        return;
      }

      // Master scroll scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth forward and backward scrubbing
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (p < 0.35) {
              setActiveStage(0);
            } else if (p < 0.68) {
              setActiveStage(1);
            } else {
              setActiveStage(2);
            }
          },
        },
      });

      // -------------------------------------------------------------
      // ACT I -> ACT II: Transition from Scene 0 to Scene 1
      // Scrub window: 1.0 to 2.2 in timeline units
      // -------------------------------------------------------------
      tl.to(
        imgRefs.current[0],
        {
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        1.0
      )
        .to(
          textRefs.current[0],
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: 'power1.in',
            onComplete: () => {
              if (textRefs.current[0]) textRefs.current[0].style.display = 'none';
            },
            onReverseComplete: () => {
              if (textRefs.current[0]) textRefs.current[0].style.display = 'block';
            },
          },
          1.0
        )
        .to(
          imgRefs.current[1],
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          1.0
        )
        .set(
          textRefs.current[1],
          {
            display: 'block',
          },
          1.5
        )
        .to(
          textRefs.current[1],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power1.out',
          },
          1.5
        )

        // Hold Scene 1 in view
        .to({}, { duration: 1.0 }, 2.5)

        // -------------------------------------------------------------
        // ACT II -> ACT III: Transition from Scene 1 to Scene 2
        // Scrub window: 3.5 to 4.7 in timeline units
        // -------------------------------------------------------------
        .to(
          imgRefs.current[1],
          {
            opacity: 0,
            scale: 1.05,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          3.5
        )
        .to(
          textRefs.current[1],
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: 'power1.in',
            onComplete: () => {
              if (textRefs.current[1]) textRefs.current[1].style.display = 'none';
            },
            onReverseComplete: () => {
              if (textRefs.current[1]) textRefs.current[1].style.display = 'block';
            },
          },
          3.5
        )
        .to(
          imgRefs.current[2],
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          3.5
        )
        .set(
          textRefs.current[2],
          {
            display: 'block',
          },
          4.0
        )
        .to(
          textRefs.current[2],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power1.out',
          },
          4.0
        )

        // Hold Scene 2 to the end of scroll
        .to({}, { duration: 1.0 }, 5.0);
    }, trackRef);

    return () => ctx.revert();
  }, []);

  // Smooth jump to stage on button click
  const jumpToStage = (idx: number) => {
    setActiveStage(idx);
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const trackTop = rect.top + scrollTop;
    const trackHeight = rect.height - window.innerHeight;

    let targetScroll = trackTop;
    if (idx === 1) targetScroll = trackTop + trackHeight * 0.5;
    if (idx === 2) targetScroll = trackTop + trackHeight * 0.95;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={trackRef}
      id="systems-story"
      className="relative bg-[#090807] text-[#FBF9F5] border-t border-[#242220] min-h-[300vh]"
    >
      {/* Sticky Cinematic Viewport Stage (Locks to full screen during scroll scrub) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stage Top Bar: Controls & Chapter Status */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 z-20 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F] animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E07A5F]">
              Photographic Systems Journey
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[#8E867C]">
              · Scroll to observe transformation
            </span>
          </div>

          {/* Interactive Scene Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {STORY_SCENES.map((scene, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => jumpToStage(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-[#090807] font-bold shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  aria-label={`Jump to ${scene.stepNumber}`}
                >
                  <span className="sm:hidden">0{idx + 1}</span>
                  <span className="hidden sm:inline">0{idx + 1} · {scene.badge.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Dominant Photographic Viewport */}
        <div className="max-w-7xl mx-auto w-full flex-1 my-3 sm:my-4 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black">
          {/* Layered Photographic Canvases */}
          {STORY_SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              ref={(el) => {
                imgRefs.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full will-change-transform will-change-opacity pointer-events-none"
            >
              <Image
                src={scene.imageSrc}
                alt={scene.imageAlt}
                fill
                priority={idx === 0}
                className="object-cover object-center filter contrast-[1.08] brightness-[0.88]"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Cinematic Vignette Overlay to ensure razor-sharp editorial typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60" />
            </div>
          ))}

          {/* HUD Top-Right Telemetry Chip */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono text-[#E07A5F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
            <span>PROGRESS: {Math.round(scrollProgress * 100)}%</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">REVERSIBLE SCRUB ACTIVE</span>
          </div>

          {/* HUD Top-Left Stage Tag */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-md ${
                STORY_SCENES[activeStage].badgeStyle
              }`}
            >
              {STORY_SCENES[activeStage].stepNumber} · {STORY_SCENES[activeStage].badge}
            </span>
          </div>

          {/* Bottom Editorial Content Overlay (Synchronized with Photographic Scrub) */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 lg:p-10 z-20">
            {STORY_SCENES.map((scene, idx) => (
              <div
                key={`text-${scene.id}`}
                ref={(el) => {
                  textRefs.current[idx] = el;
                }}
                className="max-w-4xl space-y-3 sm:space-y-4"
              >
                <div className="text-xs sm:text-sm font-mono text-white/70 uppercase tracking-wider">
                  {scene.subtitle}
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
                  {scene.title}
                </h3>

                <p className="text-sm sm:text-base text-[#D4CFC6] font-serif leading-relaxed max-w-3xl line-clamp-3 sm:line-clamp-none">
                  {scene.narrative}
                </p>

                {/* Live Impact Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-white/15">
                  {scene.impactMetrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-black/50 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-white/10 text-left"
                    >
                      <div
                        className={`text-lg sm:text-2xl font-bold font-mono ${
                          metric.status === 'positive' ? 'text-emerald-400' : 'text-[#E07A5F]'
                        }`}
                      >
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-xs font-mono text-white/70 truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Bottom Bar: Direct Action & Scrub Guidance */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 z-20 pt-2 text-xs font-mono text-[#8E867C]">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">STAGE {activeStage + 1} OF 3</span>
            <span>—</span>
            <span className="text-white/80 truncate">{STORY_SCENES[activeStage].technicalCaption}</span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/readiness"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C25E38] hover:bg-[#A34520] text-white text-xs font-mono font-semibold transition-colors"
            >
              <span>Test Your Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
