'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Pause, Compass, CheckCircle2 } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  targetNode: number;
  progress: number;
  label: string;
  color: string;
}

export default function CinematicSystemHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [processedCount, setProcessedCount] = useState<number>(142);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) setIsPlaying(false);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Real-time canvas simulation: Fragmented Signals -> Triage Gate -> Orchestrated Core -> Unified Output
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const stages = [
      { name: 'Inbound Inquiries', x: 0.15, y: 0.5 },
      { name: 'Triage Gate', x: 0.42, y: 0.5 },
      { name: 'CRM & Pipeline', x: 0.68, y: 0.5 },
      { name: 'Executive Telemetry', x: 0.90, y: 0.5 },
    ];

    const labels = ['Web Form', 'WhatsApp Lead', 'Direct Consultation', 'Search Influx', 'Email RFQ'];
    const particles: Particle[] = [];

    // Seed initial particles
    for (let i = 0; i < 18; i++) {
      particles.push({
        x: Math.random() * width * 0.25,
        y: height * 0.25 + Math.random() * height * 0.5,
        speed: 0.004 + Math.random() * 0.006,
        size: 3 + Math.random() * 2.5,
        targetNode: 1,
        progress: Math.random(),
        label: labels[Math.floor(Math.random() * labels.length)],
        color: '#E07A5F',
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, width, height);

      // Node coordinates
      const nodes = [
        { x: width * 0.12, y: height * 0.5 },
        { x: width * 0.40, y: height * 0.5 },
        { x: width * 0.68, y: height * 0.5 },
        { x: width * 0.90, y: height * 0.5 },
      ];

      // Draw Connection Buses
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length - 1; i++) {
        const from = nodes[i];
        const to = nodes[i + 1];

        // Base line
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 24, 23, 0.08)';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Traveling pulse
        const pulseProgress = ((frame * 0.008 + i * 0.33) % 1);
        const px = from.x + (to.x - from.x) * pulseProgress;
        const py = from.y + (to.y - from.y) * pulseProgress;

        ctx.fillStyle = isDark ? 'rgba(224, 122, 95, 0.6)' : 'rgba(194, 94, 56, 0.6)';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Main Stage Nodes
      nodes.forEach((node, idx) => {
        const isHovered = activeStage === idx;
        const radius = isHovered ? 18 : 14;

        // Outer glow/ring
        ctx.strokeStyle = isDark
          ? isHovered ? '#E07A5F' : 'rgba(255, 255, 255, 0.15)'
          : isHovered ? '#C25E38' : 'rgba(25, 24, 23, 0.15)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner core
        ctx.fillStyle = isDark
          ? isHovered ? '#E07A5F' : '#1C1A18'
          : isHovered ? '#C25E38' : '#F2EDE4';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Particles (Data Packets)
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.y = height * 0.25 + Math.random() * height * 0.5;
          p.x = 0;
          p.label = labels[Math.floor(Math.random() * labels.length)];
          setProcessedCount((prev) => prev + 1);
        }

        // Curved flow through nodes
        const currentStageIdx = Math.floor(p.progress * 3);
        const nextStageIdx = Math.min(currentStageIdx + 1, 3);
        const subProgress = (p.progress * 3) % 1;

        const startNode = nodes[currentStageIdx];
        const endNode = nodes[nextStageIdx];

        p.x = startNode.x + (endNode.x - startNode.x) * subProgress;
        p.y = startNode.y + (Math.sin(subProgress * Math.PI) * (currentStageIdx === 0 ? 35 : -25));

        // Draw Packet
        ctx.fillStyle = isDark ? '#E07A5F' : '#C25E38';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (isPlaying) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      animFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, reducedMotion, activeStage]);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FBF9F5] dark:bg-[#090807] text-[#191817] dark:text-[#FBF9F5] border-b border-[#E5DDD0] dark:border-[#242220] transition-colors duration-200"
      aria-label="Primeora Solutions Introduction"
    >
      {/* Background Architectural Canvas & Grid */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-60 dark:opacity-45 block" />
        <div className="absolute inset-0 bg-editorial-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FBF9F5]/40 to-[#FBF9F5] dark:via-[#090807]/40 dark:to-[#090807] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Telemetry Strip & Play/Pause Controller */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-[#E5DDD0] dark:border-[#242220] text-xs font-mono text-[#5A544E] dark:text-[#9E9689]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C25E38] dark:bg-[#E07A5F] animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] font-semibold text-[#191817] dark:text-[#FBF9F5]">
              Systems Engineering · Bangalore Studio
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[11px]">
              <span className="text-[#7C7469] dark:text-[#7A7368]">Pipeline Throughput:</span>
              <span className="text-[#191817] dark:text-[#FBF9F5] font-bold">{processedCount} events/min</span>
            </div>

            <button
              type="button"
              onClick={togglePlayback}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EFECE6] dark:bg-[#141312] border border-[#DDD5C7] dark:border-[#242220] text-[11px] font-medium text-[#191817] dark:text-[#FBF9F5] hover:border-[#C25E38] dark:hover:border-[#E07A5F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C25E38]"
              aria-label={isPlaying ? 'Pause system simulation' : 'Resume system simulation'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#C25E38] dark:text-[#E07A5F]" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#C25E38] dark:text-[#E07A5F]" />
                  <span>Resume Motion</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Narrative: Concise Headline & Supporting Proposition */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#191817] dark:text-[#FBF9F5] font-serif leading-[1.08] mb-6">
            Digital systems engineered for{' '}
            <span className="italic font-normal text-[#C25E38] dark:text-[#E07A5F]">
              measurable clarity.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5A544E] dark:text-[#9E9689] leading-relaxed font-sans mb-8">
            Primeora Solutions partners with ambitious businesses to replace fragmented web presence, lost customer enquiries, and manual spreadsheets with durable, automated operational systems.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#C25E38] hover:bg-[#A34520] dark:bg-[#E07A5F] dark:hover:bg-[#F08E73] text-white dark:text-[#090807] text-sm font-semibold transition-all shadow-sm hover:shadow-md group"
            >
              <span>Consult with Partners</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white dark:bg-[#141312] border border-[#DDD5C7] dark:border-[#242220] hover:border-[#C25E38] dark:hover:border-[#E07A5F] text-[#191817] dark:text-[#FBF9F5] text-sm font-medium transition-colors shadow-xs"
            >
              <span>Explore Practice Areas</span>
            </Link>

            <Link
              href="/readiness"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#7C7469] dark:text-[#9E9689] hover:text-[#C25E38] dark:hover:text-[#E07A5F] transition-colors"
            >
              <Compass className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F]" />
              <span>Digital Diagnostic →</span>
            </Link>
          </div>
        </div>

        {/* Live Transformation Pipeline Model */}
        <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-8 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Raw Lead Inbound',
                subtitle: 'Multichannel Capture',
                desc: 'Website forms, WhatsApp enquiries, phone calls, and direct consultations.',
              },
              {
                step: '02',
                title: 'Automated Triage',
                subtitle: 'Validation & Routing',
                desc: 'Instant deduplication, intent qualification, and immediate founder notification.',
              },
              {
                step: '03',
                title: 'Connected Operations',
                subtitle: 'CRM & Calendars',
                desc: 'Zero-touch record synchronization with PostgreSQL and Google/Outlook calendars.',
              },
              {
                step: '04',
                title: 'Executive Telemetry',
                subtitle: 'Analytics & SLA',
                desc: 'Guaranteed 1–2 day response tracking and verified commercial conversion metrics.',
              },
            ].map((node, idx) => (
              <div
                key={node.step}
                onMouseEnter={() => setActiveStage(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeStage === idx
                    ? 'border-[#C25E38] dark:border-[#E07A5F] bg-[#FAF7F2] dark:bg-[#1C1A18] shadow-xs'
                    : 'border-[#E5DDD0] dark:border-[#242220] bg-transparent hover:border-[#C4BAA9] dark:hover:border-[#33302C]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#C25E38] dark:text-[#E07A5F]">
                    {node.step}
                  </span>
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      activeStage === idx
                        ? 'text-[#C25E38] dark:text-[#E07A5F]'
                        : 'text-[#C4BAA9] dark:text-[#45403A]'
                    }`}
                  />
                </div>
                <h2 className="text-sm font-bold text-[#191817] dark:text-[#FBF9F5] mb-0.5 font-sans">
                  {node.title}
                </h2>
                <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#7A7368] block mb-2 font-medium">
                  {node.subtitle}
                </span>
                <p className="text-xs text-[#5A544E] dark:text-[#9E9689] leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
