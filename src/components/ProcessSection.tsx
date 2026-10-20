import React from 'react';
import { PROCESS_STEPS } from '@/config/brand';
import { Compass, FileCode2, Rocket, TrendingUp } from 'lucide-react';

const stepIcons = [Compass, FileCode2, Rocket, TrendingUp];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Execution Methodology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            How We Work Together
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            A structured four-step engineering lifecycle designed to eliminate ambiguity, deliver on schedule, and protect your commercial focus.
          </p>
        </div>

        {/* Process Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;
            return (
              <div
                key={step.step}
                className="bg-ivory/60 border border-border-subtle rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-forest/30 transition-all hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-copper">
                      0{step.step}
                    </span>
                    <div className="p-2.5 bg-forest text-ivory rounded-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-forest mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-teal mb-3 font-mono">
                    {step.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-border-subtle text-xs">
                  <div>
                    <span className="font-semibold text-forest block">Client Action:</span>
                    <span className="text-charcoal-muted">{step.clientActions}</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold text-teal block">Key Milestone:</span>
                    <span className="text-charcoal-muted">{step.deliverable}</span>
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
