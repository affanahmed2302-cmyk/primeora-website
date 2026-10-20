'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICE_PILLARS } from '@/config/brand';
import { Globe, Search, UserCheck, Zap, BarChart3, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap = {
  'digital-presence': Globe,
  'customer-acquisition': Search,
  'lead-sales-systems': UserCheck,
  'operations-automation': Zap,
  'analytics-insights': BarChart3,
  'ongoing-management': Wrench,
};

export default function ServicePillarsSection() {
  const [activeTab, setActiveTab] = useState(SERVICE_PILLARS[0].id);
  const activePillar = SERVICE_PILLARS.find((p) => p.id === activeTab) || SERVICE_PILLARS[0];
  const ActiveIcon = iconMap[activePillar.id] || Globe;

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Portfolio Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            Six Connected Service Pillars
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Rather than isolated tasks, our services integrate into a unified system that supports every stage of client acquisition and daily operations.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-2 sm:gap-3">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.id] || Globe;
            const isActive = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveTab(pillar.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-forest text-ivory shadow-subtle'
                    : 'bg-ivory text-charcoal hover:bg-ivory-dark border border-border-subtle'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-light' : 'text-charcoal-muted'}`} />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Card */}
        <div className="bg-ivory/60 border border-border-medium rounded-xl p-6 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Pillar Overview & Deliverables Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-forest text-ivory rounded-lg">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono font-semibold text-copper">
                    {activePillar.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                {activePillar.shortDescription}
              </p>

              <div className="p-4 bg-white/80 border border-border-subtle rounded-lg">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                  Target Friction Addressed:
                </h4>
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                  {activePillar.targetProblem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-forest mb-3">
                  Key Scope Deliverables:
                </h4>
                <ul className="space-y-2">
                  {activePillar.deliverablesSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal">
                      <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href={`/services#${activePillar.id}`}
                  className="inline-flex items-center text-sm font-semibold text-forest hover:text-teal transition-colors group"
                >
                  <span>View detailed specifications & exclusions</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Service Inclusions Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                Included Offerings in this Pillar:
              </h4>

              {activePillar.services.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg border border-border-subtle shadow-subtle hover:border-forest/30 transition-colors"
                >
                  <h5 className="font-serif text-base font-bold text-forest mb-1.5">
                    {srv.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-charcoal-muted mb-3 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-border-subtle">
                    <div>
                      <span className="font-semibold text-forest">Deliverables: </span>
                      <span className="text-charcoal-muted">{srv.deliverables.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-forest">Client Inputs: </span>
                      <span className="text-charcoal-muted">{srv.clientInputs.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Action Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-forest bg-ivory border border-border-medium rounded-md hover:bg-ivory-dark transition-colors"
          >
            <span>Explore All 6 Pillars with Complete Deliverables & FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
