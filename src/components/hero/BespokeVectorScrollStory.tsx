'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, CheckCircle2, ArrowUpRight, Compass } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChapterData {
  id: string;
  num: string;
  stageName: string;
  badge: string;
  badgeColor: string;
  headline: string;
  subhead: string;
  description: string;
  bulletLabel: string;
  bullets: string[];
}

const CHAPTERS: ChapterData[] = [
  {
    id: 'fragmented-work',
    num: '01',
    stageName: 'Operational Friction',
    badge: 'Common Industry Dilemma',
    badgeColor: 'text-[#C25E38] dark:text-[#E07A5F] border-[#C25E38]/30 bg-[#C25E38]/10',
    headline: 'Disconnected business tools create silent customer loss.',
    subhead: 'Isolated templates · Manual data re-entry · Unmonitored lead decay',
    description:
      'Growing businesses often accumulate software in silos: a bloated website builder that lags on mobile devices, ad spend directing to an unmonitored inbox, and office staff copying customer details into spreadsheets. Leads go unanswered, follow-ups slip through delays, and leadership lacks clarity on true marketing return.',
    bulletLabel: 'Identified Bottlenecks:',
    bullets: [
      'Disjointed customer touchpoints and high mobile bounce',
      'Manual copy-pasting across isolated spreadsheets',
      'Untracked marketing spend and delayed customer response',
    ],
  },
  {
    id: 'connected-systems',
    num: '02',
    stageName: 'Systems Architecture',
    badge: 'Engineering Intervention',
    badgeColor: 'text-[#1065FF] dark:text-[#60A5FA] border-[#1065FF]/30 bg-[#1065FF]/10',
    headline: 'A unified pipeline capturing and routing every enquiry.',
    subhead: 'Edge Next.js platform · PostgreSQL ACID ledger · Instant partner dispatch',
    description:
      'Primeora replaces brittle tools with an engineered inbound infrastructure. A custom Next.js web application renders at the edge. Customer enquiries from web forms, WhatsApp, and phone channels route directly into a hardened PostgreSQL database, triggering immediate team alerts and eliminating lead drop-off.',
    bulletLabel: 'Architectural Interventions:',
    bullets: [
      'Next.js edge application with semantic Schema.org microdata',
      'Direct PostgreSQL transactional pipeline with bot defenses',
      'Immediate partner notification via WhatsApp Business API',
    ],
  },
  {
    id: 'clear-operations',
    num: '03',
    stageName: 'Commercial Clarity',
    badge: 'Operational Outcome',
    badgeColor: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    headline: 'Automated workflows and transparent executive visibility.',
    subhead: 'Event-driven billing · Live attribution telemetry · Complete IP ownership',
    description:
      'With inbound capture secured, backend workflows synchronize automatically. Client onboarding, payment gateway webhooks, and GST tax invoicing execute without manual intervention. Founding partners and executive leadership monitor live channel velocity and operational capacity in a single unified view.',
    bulletLabel: 'Operational Capabilities:',
    bullets: [
      'Automated GST-compliant invoicing and ledger synchronization',
      'Cross-channel attribution telemetry and acquisition velocity',
      'Direct client intellectual property and full GitHub code transfer',
    ],
  },
];

export default function BespokeVectorScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<SVGSVGElement>(null);
  const scene2Ref = useRef<SVGSVGElement>(null);
  const scene3Ref = useRef<SVGSVGElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial vector states
      gsap.set(scene1Ref.current, { opacity: 1, scale: 1 });
      gsap.set(scene2Ref.current, { opacity: 0, scale: 0.95 });
      gsap.set(scene3Ref.current, { opacity: 0, scale: 0.95 });

      if (prefersReducedMotion) {
        return;
      }

      // 2. Continuous reversible scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8, // Smooth bidirectional scrub
        },
      });

      // Transition Scene 01 -> Scene 02 (scrub range 1.0 to 2.2)
      tl.to(
        scene1Ref.current,
        {
          opacity: 0,
          scale: 1.04,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        1.0
      )
        .to(
          scene2Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          1.0
        )
        // Hold Scene 02 in view
        .to({}, { duration: 1.0 }, 2.2)

        // Transition Scene 02 -> Scene 03 (scrub range 3.2 to 4.4)
        .to(
          scene2Ref.current,
          {
            opacity: 0,
            scale: 1.04,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          3.2
        )
        .to(
          scene3Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          3.2
        )
        // Hold Scene 03 in view to section bottom
        .to({}, { duration: 1.0 }, 4.4);

      // 3. State update only on stage threshold crossings (Zero re-render thrashing!)
      let currentStage = 0;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          const target = p < 0.35 ? 0 : p < 0.68 ? 1 : 2;
          if (target !== currentStage) {
            currentStage = target;
            setActiveStage(target);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const jumpToStage = (idx: number) => {
    setActiveStage(idx);
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetTop = rect.top + scrollTop;
    const scrollDistance = rect.height - window.innerHeight;

    let destination = targetTop;
    if (idx === 1) destination = targetTop + scrollDistance * 0.5;
    if (idx === 2) destination = targetTop + scrollDistance * 0.95;

    window.scrollTo({
      top: destination,
      behavior: 'smooth',
    });
  };

  const currentChapter = CHAPTERS[activeStage];

  return (
    <section
      ref={sectionRef}
      id="systems-story"
      className="relative min-h-[220vh] bg-[#FBF9F5] dark:bg-[#090807] border-t border-[#E5DDD0] dark:border-[#242220] transition-colors duration-200"
    >
      {/* Sticky Visual Stage (Releases smoothly when section ends) */}
      <div
        ref={stageRef}
        className="sticky top-20 sm:top-24 w-full h-[calc(100vh-5rem)] flex items-center justify-center py-4 sm:py-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full max-h-[860px]">
          {/* Header Bar with Stage Selector */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5DDD0] dark:border-[#242220]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1065FF] animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5]">
                Systems Transformation Journey
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                · Reversible Scroll-Synchronized Architecture
              </span>
            </div>

            {/* Direct Stage Navigation Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => jumpToStage(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? 'bg-[#191817] dark:bg-white text-white dark:text-[#090807] font-bold shadow-xs'
                        : 'bg-[#FAF6F0] dark:bg-[#141312] text-[#5A544E] dark:text-[#9E988F] hover:text-[#191817] dark:hover:text-white border border-[#E5DDD0] dark:border-[#242220]'
                    }`}
                    aria-label={`Jump to stage 0${idx + 1}`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden md:inline ml-1.5">· {ch.stageName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Split Layout: Left Narrative (4 cols) | Right Bespoke Vector Canvas (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-4 sm:my-6 min-h-0">
            {/* Left Column: Synchronized Chapter Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${currentChapter.badgeColor}`}
                >
                  Stage {currentChapter.num} · {currentChapter.badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans tracking-tight text-[#191817] dark:text-[#FBF9F5] leading-tight">
                {currentChapter.headline}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-[#C25E38] dark:text-[#E07A5F] font-medium">
                {currentChapter.subhead}
              </p>

              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif leading-relaxed line-clamp-3 sm:line-clamp-none">
                {currentChapter.description}
              </p>

              {/* Scope Checklist (Shown on sm+ to prevent mobile viewport squishing) */}
              <div className="pt-2 sm:pt-3 border-t border-[#E5DDD0] dark:border-[#242220] space-y-1.5 hidden sm:block">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#191817] dark:text-[#FBF9F5] font-semibold block">
                  {currentChapter.bulletLabel}
                </span>
                <ul className="space-y-1 text-xs font-serif text-[#5A544E] dark:text-[#9E988F]">
                  {currentChapter.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1065FF] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Hand-Crafted Bespoke Vector Canvas */}
            <div className="lg:col-span-7 h-full flex items-center justify-center">
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl border border-[#E5DDD0] dark:border-[#242220] bg-white dark:bg-[#121110] shadow-sm overflow-hidden flex items-center justify-center p-4 sm:p-6">
                {/* Visual Viewport Accents: Architectural Grid & Calipers */}
                <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>

                {/* Corner Architectural Caliper Ticks */}
                <div className="absolute top-3 left-3 text-[9px] font-mono text-[#7C7469] dark:text-[#8E867C] select-none">
                  + 01.AX_L
                </div>
                <div className="absolute top-3 right-3 text-[9px] font-mono text-[#7C7469] dark:text-[#8E867C] select-none">
                  SEC // 0{activeStage + 1}
                </div>
                <div className="absolute bottom-3 left-3 text-[9px] font-mono text-[#7C7469] dark:text-[#8E867C] select-none">
                  AXONOMETRIC_SYS
                </div>
                <div className="absolute bottom-3 right-3 text-[9px] font-mono text-[#7C7469] dark:text-[#8E867C] select-none">
                  PRIMEORA_STUDIO
                </div>

                {/* =========================================================================
                    VECTOR SCENE 01: THE FRAGMENTED WORKFLOW (Axonometric Disconnected Planes)
                    ========================================================================= */}
                <svg
                  ref={scene1Ref}
                  viewBox="0 0 800 500"
                  className="absolute inset-0 w-full h-full will-change-transform will-change-opacity pointer-events-none p-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="v7-s1-grad-plane" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Disconnected Plane A: Isolated Template Website */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    {/* Isometric Floor Outline */}
                    <path
                      d="M 120 180 L 320 80 L 440 140 L 240 240 Z"
                      fill="url(#v7-s1-grad-plane)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    {/* Architectural Platform Height */}
                    <path
                      d="M 120 180 L 120 195 L 240 255 L 440 155 L 440 140"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                    />
                    <path d="M 240 240 L 240 255" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />

                    {/* Window Header Bar */}
                    <path d="M 150 165 L 310 85" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx="165" cy="155" r="3" fill="#C25E38" />
                    <circle cx="180" cy="147" r="3" fill="currentColor" fillOpacity="0.3" />
                    <circle cx="195" cy="140" r="3" fill="currentColor" fillOpacity="0.3" />

                    {/* Wireframe Mockup Lines */}
                    <path d="M 170 190 L 280 135" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />
                    <path d="M 180 205 L 340 125" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    <path d="M 190 220 L 320 155" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

                    {/* Alert Badge: Unoptimized */}
                    <rect
                      x="280"
                      y="140"
                      width="120"
                      height="24"
                      rx="4"
                      fill="#C25E38"
                      fillOpacity="0.12"
                      stroke="#C25E38"
                      strokeWidth="1"
                    />
                    <text x="290" y="156" fill="#C25E38" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      ! SLOW LOAD / DROPOFF
                    </text>
                  </g>

                  {/* Disconnected Plane B: Scattered Spreadsheet Rows */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    {/* Isometric Floor */}
                    <path
                      d="M 440 320 L 640 220 L 740 270 L 540 370 Z"
                      fill="url(#v7-s1-grad-plane)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <path
                      d="M 440 320 L 440 335 L 540 385 L 740 285 L 740 270"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                    />

                    {/* Spreadsheet Column Dividers */}
                    <path d="M 470 305 L 670 205" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    <path d="M 500 320 L 700 220" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    <path d="M 530 275 L 590 305" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    <path d="M 580 250 L 640 280" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

                    {/* Manual CSV Error Badge */}
                    <rect
                      x="480"
                      y="320"
                      width="130"
                      height="24"
                      rx="4"
                      fill="#C25E38"
                      fillOpacity="0.12"
                      stroke="#C25E38"
                      strokeWidth="1"
                    />
                    <text x="490" y="336" fill="#C25E38" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      MANUAL RE-ENTRY DRAG
                    </text>
                  </g>

                  {/* Disconnected Plane C: Unlinked Inbox Queue */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <path
                      d="M 180 380 L 340 300 L 420 340 L 260 420 Z"
                      fill="url(#v7-s1-grad-plane)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <path
                      d="M 180 380 L 180 395 L 260 435 L 420 355 L 420 340"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                    />

                    <path d="M 210 365 L 350 295" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
                    <path d="M 230 385 L 370 315" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                  </g>

                  {/* Fractured Interrupted Communication Lines with Warning X markers */}
                  <g>
                    {/* Broken link 1 */}
                    <path
                      d="M 280 215 C 330 250, 360 260, 400 290"
                      stroke="#C25E38"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      strokeOpacity="0.7"
                    />
                    <circle cx="340" cy="255" r="8" fill="#FAF6F0" dark-fill="#1A1917" stroke="#C25E38" strokeWidth="1.5" />
                    <line x1="336" y1="251" x2="344" y2="259" stroke="#C25E38" strokeWidth="1.5" />
                    <line x1="344" y1="251" x2="336" y2="259" stroke="#C25E38" strokeWidth="1.5" />

                    {/* Broken link 2 */}
                    <path
                      d="M 430 180 C 490 200, 520 220, 550 240"
                      stroke="#C25E38"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      strokeOpacity="0.7"
                    />
                    <circle cx="490" cy="210" r="8" fill="#FAF6F0" dark-fill="#1A1917" stroke="#C25E38" strokeWidth="1.5" />
                    <line x1="486" y1="206" x2="494" y2="214" stroke="#C25E38" strokeWidth="1.5" />
                    <line x1="494" y1="206" x2="486" y2="214" stroke="#C25E38" strokeWidth="1.5" />
                  </g>
                </svg>

                {/* =========================================================================
                    VECTOR SCENE 02: THE CONNECTED CONDUIT (Unified Architectural Flow)
                    ========================================================================= */}
                <svg
                  ref={scene2Ref}
                  viewBox="0 0 800 500"
                  className="absolute inset-0 w-full h-full will-change-transform will-change-opacity pointer-events-none p-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="v7-s2-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1065FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#E07A5F" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Level 1: Edge Web Platform Tier */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <path
                      d="M 250 140 L 450 40 L 610 120 L 410 220 Z"
                      fill="currentColor"
                      fillOpacity="0.04"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                    />
                    <path
                      d="M 250 140 L 250 155 L 410 235 L 610 135 L 610 120"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                    />
                    <path d="M 410 220 L 410 235" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />

                    {/* Edge Architecture Node Labels */}
                    <rect
                      x="330"
                      y="110"
                      width="160"
                      height="26"
                      rx="4"
                      fill="#1065FF"
                      fillOpacity="0.1"
                      stroke="#1065FF"
                      strokeWidth="1"
                    />
                    <text x="342" y="127" fill="#1065FF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      NEXT.js APP ROUTER // EDGE
                    </text>
                  </g>

                  {/* Level 2: Transactional Core & Triage Hub */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <path
                      d="M 190 280 L 390 180 L 550 260 L 350 360 Z"
                      fill="currentColor"
                      fillOpacity="0.06"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    <path
                      d="M 190 280 L 190 295 L 350 375 L 550 275 L 550 260"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                    />
                    <path d="M 350 360 L 350 375" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />

                    <rect
                      x="260"
                      y="250"
                      width="180"
                      height="26"
                      rx="4"
                      fill="#1065FF"
                      fillOpacity="0.12"
                      stroke="#1065FF"
                      strokeWidth="1"
                    />
                    <text x="272" y="267" fill="#1065FF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      POSTGRESQL ACID LEDGER
                    </text>
                  </g>

                  {/* Level 3: Real-time Dispatch Node */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <path
                      d="M 430 360 L 590 280 L 710 340 L 550 420 Z"
                      fill="currentColor"
                      fillOpacity="0.04"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                    />
                    <path
                      d="M 430 360 L 430 375 L 550 435 L 710 355 L 710 340"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                    />

                    <rect
                      x="480"
                      y="335"
                      width="170"
                      height="26"
                      rx="4"
                      fill="#E07A5F"
                      fillOpacity="0.12"
                      stroke="#E07A5F"
                      strokeWidth="1"
                    />
                    <text x="492" y="352" fill="#E07A5F" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      PARTNER WHATSAPP DISPATCH
                    </text>
                  </g>

                  {/* Central Glowing Conduit System (Solid Vector Interconnection) */}
                  <g>
                    {/* Vertical Primary Data Bus */}
                    <line x1="410" y1="220" x2="350" y2="280" stroke="#1065FF" strokeWidth="3" strokeLinecap="round" />
                    <line x1="410" y1="220" x2="350" y2="280" stroke="#1065FF" strokeWidth="8" strokeOpacity="0.15" />

                    {/* Secondary Pipeline Bus */}
                    <line x1="450" y1="270" x2="490" y2="335" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="450" y1="270" x2="490" y2="335" stroke="#E07A5F" strokeWidth="6" strokeOpacity="0.15" />

                    {/* Flowing Data Node Pulses */}
                    <circle cx="410" cy="220" r="5" fill="#1065FF" />
                    <circle cx="380" cy="250" r="3.5" fill="#1065FF" />
                    <circle cx="350" cy="280" r="5" fill="#1065FF" />
                    <circle cx="490" cy="335" r="5" fill="#E07A5F" />
                  </g>
                </svg>

                {/* =========================================================================
                    VECTOR SCENE 03: THE COORDINATED HORIZON (Executive Commercial Velocity)
                    ========================================================================= */}
                <svg
                  ref={scene3Ref}
                  viewBox="0 0 800 500"
                  className="absolute inset-0 w-full h-full will-change-transform will-change-opacity pointer-events-none p-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Concentric Executive Telemetry & Alignment Geometry */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    {/* Outer Compass Horizon */}
                    <circle cx="400" cy="250" r="190" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                    <circle
                      cx="400"
                      cy="250"
                      r="190"
                      stroke="#1065FF"
                      strokeWidth="1.5"
                      strokeDasharray="4 8"
                      strokeOpacity="0.4"
                    />

                    {/* Mid Telemetry Ring */}
                    <circle cx="400" cy="250" r="130" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    <circle cx="400" cy="250" r="70" stroke="#1065FF" strokeWidth="1.5" strokeOpacity="0.5" />
                    <circle cx="400" cy="250" r="12" fill="#1065FF" />

                    {/* Cardinal Coordinate Axes */}
                    <line x1="160" y1="250" x2="640" y2="250" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    <line x1="400" y1="50" x2="400" y2="450" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

                    {/* Diagonal Alignment Crosshairs */}
                    <line x1="265" y1="115" x2="535" y2="385" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" />
                    <line x1="265" y1="385" x2="535" y2="115" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" />
                  </g>

                  {/* Satellite Systems Blocks */}
                  {/* Wing 1: Invoicing & Billing Engine (Top-Left) */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <rect
                      x="110"
                      y="120"
                      width="190"
                      height="70"
                      rx="8"
                      fill="currentColor"
                      fillOpacity="0.04"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <circle cx="135" cy="145" r="4" fill="#1065FF" />
                    <text x="148" y="149" fill="currentColor" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                      EVENT-DRIVEN BILLING
                    </text>
                    <text x="135" y="172" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">
                      GST Webhooks · Ledger Sync
                    </text>
                    {/* Connecting Vector */}
                    <path d="M 300 155 L 340 195 L 370 230" stroke="#1065FF" strokeWidth="1.5" strokeOpacity="0.6" />
                  </g>

                  {/* Wing 2: Live Acquisition Telemetry (Top-Right) */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <rect
                      x="500"
                      y="120"
                      width="190"
                      height="70"
                      rx="8"
                      fill="currentColor"
                      fillOpacity="0.04"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <circle cx="525" cy="145" r="4" fill="#E07A5F" />
                    <text x="538" y="149" fill="currentColor" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                      CHANNEL ATTRIBUTION
                    </text>
                    <text x="525" y="172" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">
                      Enquiry Velocity · Conversion
                    </text>
                    <path d="M 500 155 L 460 195 L 430 230" stroke="#E07A5F" strokeWidth="1.5" strokeOpacity="0.6" />
                  </g>

                  {/* Wing 3: Direct Client IP & Code Vault (Bottom Center) */}
                  <g className="text-[#191817] dark:text-[#FBF9F5]">
                    <rect
                      x="280"
                      y="370"
                      width="240"
                      height="64"
                      rx="8"
                      fill="currentColor"
                      fillOpacity="0.04"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <circle cx="305" cy="395" r="4" fill="#10B981" />
                    <text x="318" y="399" fill="currentColor" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                      CLIENT IP REPOSITORY VAULT
                    </text>
                    <text x="305" y="420" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">
                      Full GitHub Transfer · Zero Lock-in
                    </text>
                    <path d="M 400 370 L 400 320" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Footer Bar: Real SLA & Direct Consultation */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 pt-2 sm:pt-3 border-t border-[#E5DDD0] dark:border-[#242220] text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
              <span className="font-semibold text-[#191817] dark:text-[#FBF9F5]">Response Target:</span>
              <span>1–2 business days</span>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:underline shrink-0"
            >
              <span>Discuss Architecture</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
