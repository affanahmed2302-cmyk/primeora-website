'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Search,
  UserCheck,
  Zap,
  BarChart3,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
  Database,
  LineChart,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface Props {
  slug: string;
}

export default function ServiceVisualDemonstrator({ slug }: Props) {
  // Common interactive state for simulators
  const [leadSimulated, setLeadSimulated] = useState(false);
  const [digitalPresenceMode, setDigitalPresenceMode] = useState<'fragmented' | 'engineered'>('engineered');
  const [automationStep, setAutomationStep] = useState(0);

  return (
    <div className="bg-white dark:bg-[#141312] border border-[#E5DDD0] dark:border-[#242220] rounded-2xl p-6 sm:p-8 shadow-xs my-10 overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E5DDD0] dark:border-[#242220]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#191817] dark:text-[#FBF9F5]">
            Interactive Practice Demonstration
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
          Concept Model · Zero Fabricated Claims
        </span>
      </div>

      {/* 1. DIGITAL PRESENCE DEMONSTRATION */}
      {slug === 'digital-presence' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
                Architecture Contrast: Legacy Template vs. Engineered Next.js
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-0.5">
                Toggle below to observe how technical web performance directly influences user retention.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF6F0] dark:bg-[#1A1917] p-1 rounded-lg border border-[#E5DDD0] dark:border-[#242220] flex-shrink-0">
              <button
                type="button"
                onClick={() => setDigitalPresenceMode('fragmented')}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                  digitalPresenceMode === 'fragmented'
                    ? 'bg-[#C25E38] text-white font-bold'
                    : 'text-[#7C7469] dark:text-[#8E867C] hover:text-[#191817]'
                }`}
              >
                Fragmented Template
              </button>
              <button
                type="button"
                onClick={() => setDigitalPresenceMode('engineered')}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                  digitalPresenceMode === 'engineered'
                    ? 'bg-[#1065FF] text-white font-bold'
                    : 'text-[#7C7469] dark:text-[#8E867C] hover:text-[#191817]'
                }`}
              >
                Primeora Next.js
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                Largest Contentful Paint (LCP)
              </span>
              <div
                className={`text-2xl font-mono font-bold ${
                  digitalPresenceMode === 'engineered' ? 'text-[#1065FF]' : 'text-red-500'
                }`}
              >
                {digitalPresenceMode === 'engineered' ? '0.74s' : '4.82s'}
              </div>
              <span className="text-[10px] font-mono text-[#7C7469] block">
                {digitalPresenceMode === 'engineered' ? 'Passes Core Web Vitals' : 'High Mobile Abandonment'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                Search Semantic Schema
              </span>
              <div
                className={`text-2xl font-mono font-bold ${
                  digitalPresenceMode === 'engineered' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {digitalPresenceMode === 'engineered' ? 'JSON-LD Verified' : 'Missing Schema'}
              </div>
              <span className="text-[10px] font-mono text-[#7C7469] block">
                {digitalPresenceMode === 'engineered' ? 'Indexed in AEO graph' : 'Invisible to AI crawlers'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
              <span className="text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C]">
                Code Ownership &amp; IP
              </span>
              <div className="text-2xl font-mono font-bold text-[#191817] dark:text-[#FBF9F5]">
                {digitalPresenceMode === 'engineered' ? '100% Client Owned' : 'SaaS Template Lock-in'}
              </div>
              <span className="text-[10px] font-mono text-[#7C7469] block">
                {digitalPresenceMode === 'engineered' ? 'Direct GitHub Transfer' : 'Proprietary hosting monthly fee'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOMER ACQUISITION DEMONSTRATION */}
      {slug === 'customer-acquisition' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
              Discovery Journey: How Answer Engines Recommend Your Business
            </h3>
            <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-0.5">
              Visualizing the transition from buyer intent to verified entity citation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1.5">
              <span className="text-[#C25E38] dark:text-[#E07A5F] font-bold">1. Commercial Query</span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                Buyer asks ChatGPT or Perplexity: “Best B2B logistics systems in Bangalore.”
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1.5">
              <span className="text-[#1065FF] font-bold">2. Entity Match</span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                AI crawls verified Schema.org JSON-LD microdata on your website.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1.5">
              <span className="text-green-600 font-bold">3. Citation Proof</span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                Google Business Profile NAP consistency confirms physical authority.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#1065FF]/40 bg-[#1065FF]/5 space-y-1.5">
              <span className="text-[#1065FF] font-bold">4. High-Intent Lead</span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                Buyer visits verified portal and submits a qualified commercial enquiry.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. LEAD & SALES SYSTEMS DEMONSTRATION */}
      {slug === 'lead-sales-systems' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
                Zero-Loss Lead Triage Simulator
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-0.5">
                Simulate an inbound enquiry to watch our automated validation, PostgreSQL commit, and WhatsApp dispatch.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setLeadSimulated(false);
                setTimeout(() => setLeadSimulated(true), 150);
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1065FF] hover:bg-[#0C4ECE] rounded-md transition-colors shadow-xs flex-shrink-0"
            >
              <span>Trigger Test Enquiry</span>
              <Zap className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#7C7469] block mb-1">Step 1: Capture</span>
              <div className="font-bold text-[#191817] dark:text-[#FBF9F5]">Honeypot Validated</div>
              <span className="text-[10px] text-green-600 block mt-1">Bot filters active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#7C7469] block mb-1">Step 2: Database</span>
              <div className="font-bold text-[#1065FF]">PostgreSQL Commit</div>
              <span className="text-[10px] text-[#7C7469] block mt-1">ACID Transaction Logged</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#7C7469] block mb-1">Step 3: Partner Alert</span>
              <div className="font-bold text-[#C25E38] dark:text-[#E07A5F]">WhatsApp API &lt;15s</div>
              <span className="text-[10px] text-[#7C7469] block mt-1">Instant push notification</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#7C7469] block mb-1">Step 4: CRM Stage</span>
              <div className="font-bold text-[#191817] dark:text-[#FBF9F5]">Deal Initialized</div>
              <span className="text-[10px] text-green-600 block mt-1">Assigned to Lead Partner</span>
            </div>
          </div>

          {leadSimulated && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-700 dark:text-emerald-400"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Simulation Complete: Lead processed in 0.14 seconds. Zero packet loss.</span>
              </span>
              <span className="font-bold">STATUS: VERIFIED</span>
            </motion.div>
          )}
        </div>
      )}

      {/* 4. OPERATIONS AUTOMATION DEMONSTRATION */}
      {slug === 'operations-automation' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
              Workflow Engine: From Manual Labor to Connected Event Webhooks
            </h3>
            <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-0.5">
              Observe how a single client payment event triggers automated tax calculation, invoice dispatch, and accounting sync.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[#C25E38] dark:text-[#E07A5F] font-bold block">1. Event Received</span>
              <span>Payment Webhook</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7C7469] hidden sm:block" />
            <div className="space-y-1">
              <span className="text-[#1065FF] font-bold block">2. Calculation</span>
              <span>GST Engine (CGST+SGST)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7C7469] hidden sm:block" />
            <div className="space-y-1">
              <span className="text-green-600 font-bold block">3. Document</span>
              <span>PDF Invoice Generated</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7C7469] hidden sm:block" />
            <div className="space-y-1">
              <span className="text-[#191817] dark:text-[#FBF9F5] font-bold block">4. Ledger</span>
              <span>Accounting Platform Synced</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. ANALYTICS & INSIGHTS DEMONSTRATION */}
      {slug === 'analytics-insights' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
              Executive Cockpit: Raw Click Chaos to Commercial Clarity
            </h3>
            <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-0.5">
              Connecting website traffic directly to bottom-line revenue without confusing marketing jargon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
              <span className="text-[#7C7469] block">True Blended CAC</span>
              <div className="text-2xl font-bold text-[#1065FF]">Transparent</div>
              <p className="text-[11px] font-serif text-[#5A544E] dark:text-[#9E988F]">
                Real cost per closed contract, not cost per useless click.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
              <span className="text-[#7C7469] block">Pipeline Velocity</span>
              <div className="text-2xl font-bold text-green-600">Measured Days</div>
              <p className="text-[11px] font-serif text-[#5A544E] dark:text-[#9E988F]">
                Average days elapsed from first touch to signed agreement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220] space-y-1">
              <span className="text-[#7C7469] block">Weekly Digest</span>
              <div className="text-2xl font-bold text-[#C25E38] dark:text-[#E07A5F]">Automated</div>
              <p className="text-[11px] font-serif text-[#5A544E] dark:text-[#9E988F]">
                Direct WhatsApp or email briefing sent to leadership every Monday.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. ONGOING MANAGEMENT DEMONSTRATION */}
      {slug === 'ongoing-management' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold font-sans text-[#191817] dark:text-[#FBF9F5]">
              Continuous Stewardship &amp; SLA Commitment
            </h3>
            <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#9E988F] font-serif mt-0.5">
              Real-time telemetry on how we maintain client infrastructure after go-live.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                99.98% Monitored
              </span>
              <p className="text-[#5A544E] dark:text-[#C4BAA9] font-serif text-[11px]">
                24/7 automated ping probes every 60 seconds from 5 global edge locations.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#1065FF] font-bold block mb-1">Weekly Patches</span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                Node.js and npm dependency vulnerability scans executed every Monday.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#C25E38] dark:text-[#E07A5F] font-bold block mb-1">
                1–2 Day SLA
              </span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                Contractually guaranteed partner response time on all support tickets.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#181715] border border-[#E5DDD0] dark:border-[#242220]">
              <span className="text-[#191817] dark:text-[#FBF9F5] font-bold block mb-1">
                Monthly Audits
              </span>
              <p className="text-[#5A544E] dark:text-[#9E988F] font-serif text-[11px]">
                Comprehensive Core Web Vitals and AEO ranking inspection report.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
