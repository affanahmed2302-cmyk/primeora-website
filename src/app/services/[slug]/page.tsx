import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICE_PILLARS, BRAND_CONFIG } from '@/config/brand';
import {
  Globe,
  Search,
  UserCheck,
  Zap,
  BarChart3,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'digital-presence': Globe,
  'customer-acquisition': Search,
  'lead-sales-systems': UserCheck,
  'operations-automation': Zap,
  'analytics-insights': BarChart3,
  'ongoing-management': Wrench,
};

export async function generateStaticParams() {
  return SERVICE_PILLARS.map((pillar) => ({
    slug: pillar.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = SERVICE_PILLARS.find((p) => p.id === slug);

  if (!pillar) {
    return {
      title: 'Practice Area Not Found | Primeora Solutions',
    };
  }

  return {
    title: `${pillar.title} Practice | Primeora Solutions`,
    description: pillar.shortDescription,
    alternates: {
      canonical: `https://primeora-solutions.netlify.app/services/${pillar.id}`,
    },
    openGraph: {
      title: `${pillar.title} Practice | Primeora Solutions`,
      description: pillar.shortDescription,
      url: `https://primeora-solutions.netlify.app/services/${pillar.id}`,
      siteName: BRAND_CONFIG.name,
      images: [
        {
          url: '/brand/primeora-logo-dark.png',
          width: 1030,
          height: 310,
          alt: pillar.title,
        },
      ],
    },
  };
}

export default async function ServicePillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = SERVICE_PILLARS.find((p) => p.id === slug);

  if (!pillar) {
    notFound();
  }

  const Icon = iconMap[pillar.id] || Globe;
  const otherPillars = SERVICE_PILLARS.filter((p) => p.id !== pillar.id);

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#040D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/services" className="hover:text-white transition-colors">
            SERVICES
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#3B82F6] font-semibold">{pillar.title.toUpperCase()}</span>
        </nav>

        {/* Practice Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08152B] text-slate-300 border border-white/10 rounded-md text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166CFF]" />
            <span>PRACTICE SPECIFICATION / {pillar.badge.toUpperCase()}</span>
          </div>

          <div className="flex items-start gap-5 mt-2">
            <div className="w-14 h-14 rounded-xl bg-[#08152B] border border-white/10 flex items-center justify-center text-[#3B82F6] flex-shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
                {pillar.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {pillar.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Friction & Bottlenecks Addressed */}
            <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-7 sm:p-8">
              <div className="flex items-center gap-2.5 mb-3 text-xs font-mono uppercase text-[#3B82F6]">
                <ShieldAlert className="w-4 h-4" />
                <span>Commercial Friction Addressed</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 font-sans">
                Why Businesses Need This Practice
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {pillar.targetProblem}
              </p>
            </div>

            {/* 2. Detailed Service Modules */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-slate-500 block mb-1">
                  MODULE BREAKDOWN
                </span>
                <h2 className="text-2xl font-bold text-white font-sans">
                  Technical Scope &amp; Deliverables
                </h2>
              </div>

              <div className="space-y-6">
                {pillar.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6 sm:p-7 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-white font-sans">
                        {srv.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        MOD 0{idx + 1}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-white/[0.06] text-xs">
                      <div>
                        <p className="font-mono uppercase text-slate-400 font-semibold mb-2">
                          Standard Deliverables:
                        </p>
                        <ul className="space-y-1.5">
                          {srv.deliverables.map((d, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#166CFF] flex-shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase text-slate-400 font-semibold mb-2">
                          Client Inputs Required:
                        </p>
                        <ul className="space-y-1.5">
                          {srv.clientInputs.map((inp, i) => (
                            <li key={i} className="text-slate-400 flex items-start gap-2">
                              <span className="text-slate-500 mt-0.5">•</span>
                              <span>{inp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Exclusions and Dependencies if specified */}
                    {(srv.exclusions.length > 0 || srv.dependencies.length > 0) && (
                      <div className="mt-5 pt-4 border-t border-white/[0.04] text-[11px] text-slate-500 space-y-1">
                        {srv.exclusions.length > 0 && (
                          <p>
                            <span className="font-semibold text-slate-400">Explicit Exclusions: </span>
                            {srv.exclusions.join('; ')}.
                          </p>
                        )}
                        {srv.dependencies.length > 0 && (
                          <p>
                            <span className="font-semibold text-slate-400">Prerequisites: </span>
                            {srv.dependencies.join('; ')}.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Practice FAQs */}
            {pillar.faqs && pillar.faqs.length > 0 && (
              <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-7 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-4 h-4 text-[#3B82F6]" />
                  <h2 className="text-xl font-bold text-white font-sans">
                    Practice Guidance &amp; FAQ
                  </h2>
                </div>

                <div className="space-y-5">
                  {pillar.faqs.map((faq, i) => (
                    <div key={i} className="pb-5 border-b border-white/[0.06] last:border-0 last:pb-0">
                      <h3 className="text-sm font-bold text-white mb-1.5 font-sans">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Consultation CTA Card */}
            <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6 sm:p-7">
              <span className="text-[11px] font-mono uppercase text-[#3B82F6] font-semibold block mb-2">
                PROJECT CONSULTATION
              </span>
              <h3 className="text-lg font-bold text-white mb-2 font-sans">
                Scope Your {pillar.title} System
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Review your requirements directly with an engineering partner. We prepare a detailed Blueprint with fixed milestones and verified timelines.
              </p>

              <Link
                href={`/contact?service=${encodeURIComponent(pillar.title)}`}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors group mb-3 shadow-sm"
              >
                <span>Discuss This Practice</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/readiness"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-[#040D1A] hover:bg-[#0E1F3D] border border-white/10 rounded-md transition-colors"
              >
                <span>Take Readiness Diagnostic</span>
              </Link>

              <div className="mt-5 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 space-y-1">
                <p>• Written Architecture Blueprint</p>
                <p>• Fixed Milestone Commitments</p>
                <p>• Bangalore MSME: {BRAND_CONFIG.udyamRegistrationNumber}</p>
              </div>
            </div>

            {/* Other Pillars Directory */}
            <div className="bg-[#08152B] border border-white/[0.08] rounded-xl p-6">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-4">
                Other Practice Pillars
              </h4>
              <ul className="space-y-2 text-xs">
                {otherPillars.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/services/${other.id}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-[#040D1A] text-slate-300 hover:text-white transition-colors"
                    >
                      <span>{other.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
