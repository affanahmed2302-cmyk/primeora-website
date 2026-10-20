'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Layers, Cpu, Zap, ArrowRight, ShieldCheck, Activity, BarChart3, MessageSquare } from 'lucide-react';

export default function SystemSchematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReduced(prefersReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Restrained tilt angle max 3.5 degrees for subtle tactile depth
    setRotate({
      x: -y / (rect.height / 7),
      y: x / (rect.width / 7),
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 perspective-1000"
      style={{ perspective: '1200px' }}
      aria-label="Primeora Solutions Connected Architecture Diagram"
    >
      {/* 3D Tilt Container */}
      <div
        className="relative rounded-2xl border border-[#E6DFD5] dark:border-[#2C2926] bg-[#FFFFFF] dark:bg-[#1A1917] p-5 sm:p-8 shadow-card dark:shadow-none transition-transform duration-300 ease-out overflow-hidden"
        style={{
          transform: isReduced ? 'none' : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background Editorial Architectural Grid */}
        <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

        {/* Header telemetry bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#E6DFD5] dark:border-[#2C2926] pb-4 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[#191817] dark:text-[#F5F2EB]">
              LIVE ARCHITECTURE MATRIX
            </span>
            <span className="text-[#8C867E]">/ Enterprise Topology</span>
          </div>

          <div className="flex items-center gap-4 text-[#6E6862] dark:text-[#A8A29A]">
            <span className="hidden sm:inline">Stack: Next.js 15 • Supabase • APIs</span>
            <span className="px-2 py-0.5 rounded bg-[#F7F4EE] dark:bg-[#242220] text-[#C25E38] font-bold border border-[#E6DFD5] dark:border-[#2C2926]">
              A-Z Integration
            </span>
          </div>
        </div>

        {/* 3 Interconnected Functional Nodes */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Node 1: Foundation & Digital Presence */}
          <div className="bg-[#FBF9F5] dark:bg-[#141312] border border-[#E6DFD5] dark:border-[#2C2926] rounded-xl p-5 relative group hover:border-[#C25E38]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#C25E38]/10 text-[#C25E38] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C867E]">
                Layer 01 • Intake
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#191817] dark:text-white font-sans">
              Digital Presence &amp; SEO/AEO
            </h3>
            <p className="text-xs text-[#5C5751] dark:text-[#A8A29A] mt-1.5 leading-relaxed">
              High-performance web architecture engineered for speed, search discovery, and high accessibility.
            </p>
            <div className="mt-4 pt-3 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center justify-between text-[11px] font-mono text-[#8C867E]">
              <span>Search &amp; Discovery</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          {/* Node 2: Automation & Pipeline Engine */}
          <div className="bg-[#FBF9F5] dark:bg-[#141312] border border-[#C25E38]/40 dark:border-[#C25E38]/40 rounded-xl p-5 relative group hover:border-[#C25E38] transition-colors shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#C25E38] text-white flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C25E38] font-bold">
                Layer 02 • Conversion
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#191817] dark:text-white font-sans">
              Enquiry Triage &amp; Automation
            </h3>
            <p className="text-xs text-[#5C5751] dark:text-[#A8A29A] mt-1.5 leading-relaxed">
              WhatsApp Business routing, automated CRM pipeline handoff, and durable lead capture without dropped enquiries.
            </p>
            <div className="mt-4 pt-3 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center justify-between text-[11px] font-mono text-[#8C867E]">
              <span>Triage Pipeline</span>
              <span className="text-[#C25E38] font-bold">Real-Time</span>
            </div>
          </div>

          {/* Node 3: Intelligence & Continuity */}
          <div className="bg-[#FBF9F5] dark:bg-[#141312] border border-[#E6DFD5] dark:border-[#2C2926] rounded-xl p-5 relative group hover:border-[#C25E38]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#C25E38]/10 text-[#C25E38] flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C867E]">
                Layer 03 • Clarity
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#191817] dark:text-white font-sans">
              Intelligence &amp; Management
            </h3>
            <p className="text-xs text-[#5C5751] dark:text-[#A8A29A] mt-1.5 leading-relaxed">
              Executive business intelligence dashboards, multi-touch analytics, and scheduled continuous optimization.
            </p>
            <div className="mt-4 pt-3 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center justify-between text-[11px] font-mono text-[#8C867E]">
              <span>Telemetry BI</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Continuous</span>
            </div>
          </div>
        </div>

        {/* Bottom Schematic Connective Ribbon */}
        <div className="relative z-10 mt-6 pt-4 border-t border-[#E6DFD5] dark:border-[#2C2926] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5C5751] dark:text-[#A8A29A]">
            <Activity className="w-4 h-4 text-[#C25E38]" />
            <span>End-to-End Delivery: <strong>Discovery → Architecture → Engineering → Growth</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C867E]">
            <span>MSME Udyam Verified</span>
            <span>•</span>
            <span>Zero Lock-in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
