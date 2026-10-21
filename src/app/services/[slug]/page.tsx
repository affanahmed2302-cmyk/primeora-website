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
  Clock,
  Layers,
  FileCheck,
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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#090807] min-h-screen text-[#F5F2EB] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#9E988F] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#F5F2EB] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6E6860]" />
          <Link href="/services" className="hover:text-[#F5F2EB] transition-colors">
            SERVICES
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6E6860]" />
          <span className="text-[#E07A5F] font-semibold">{pillar.title.toUpperCase()}</span>
        </nav>

        {/* Practice Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-start gap-5 mt-2">
            <div className="w-14 h-14 rounded-2xl bg-[#141312] border border-[#242220] flex items-center justify-center text-[#E07A5F] flex-shrink-0 shadow-xs">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E07A5F] block mb-1">
                Engineering Practice Area
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-[#F5F2EB]">
                {pillar.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#9E988F] leading-relaxed max-w-3xl font-sans">
                {pillar.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Plain-English Problem & Commercial Friction */}
            <div className="bg-[#141312] border border-[#242220] rounded-2xl p-7 sm:p-9 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase text-[#E07A5F] font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>The Commercial Problem Addressed</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#F5F2EB]">
                Why Businesses Need This System
              </h2>
              <p className="text-sm sm:text-base text-[#C4BAA9] leading-relaxed">
                {pillar.targetProblem}
              </p>
            </div>

            {/* 2. Detailed Technical Scope Modules */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-[#9E988F] block mb-1 font-semibold">
                  ENGINEERING MODULES
                </span>
                <h2 className="text-2xl font-bold font-sans text-[#F5F2EB]">
                  What Primeora Implements
                </h2>
              </div>

              <div className="space-y-6">
                {pillar.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="bg-[#141312] border border-[#242220] hover:border-[#36332F] rounded-2xl p-7 sm:p-8 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F5F2EB]">
                        {srv.title}
                      </h3>
                      <span className="text-xs font-mono text-[#E07A5F] px-2 py-0.5 rounded bg-[#1C1A18] border border-[#242220]">
                        MOD 0{idx + 1}
                      </span>
                    </div>

                    <p className="text-sm text-[#9E988F] leading-relaxed mb-6 font-sans">
                      {srv.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#242220] text-xs">
                      <div>
                        <p className="font-mono uppercase text-[#F5F2EB] font-semibold mb-2 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-[#E07A5F]" />
                          <span>What You Receive:</span>
                        </p>
                        <ul className="space-y-2">
                          {srv.deliverables.map((d, i) => (
                            <li key={i} className="text-[#C4BAA9] flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase text-[#F5F2EB] font-semibold mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#60A5FA]" />
                          <span>What You Provide:</span>
                        </p>
                        <ul className="space-y-2">
                          {srv.clientInputs.map((inp, i) => (
                            <li key={i} className="text-[#9E988F] flex items-start gap-2">
                              <span className="text-[#6E6860] mt-0.5">•</span>
                              <span>{inp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Exclusions & Dependencies */}
                    {(srv.exclusions.length > 0 || srv.dependencies.length > 0) && (
                      <div className="mt-5 pt-4 border-t border-[#242220] text-[11px] text-[#9E988F] space-y-1">
                        {srv.exclusions.length > 0 && (
                          <p>
                            <span className="font-semibold text-[#F5F2EB]">Explicit Exclusions: </span>
                            {srv.exclusions.join('; ')}.
                          </p>
                        )}
                        {srv.dependencies.length > 0 && (
                          <p>
                            <span className="font-semibold text-[#F5F2EB]">Prerequisites: </span>
                            {srv.dependencies.join('; ')}.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. The 4-Step Working Process */}
            <div className="bg-[#141312] border border-[#242220] rounded-2xl p-7 sm:p-9 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#9E988F] block mb-1 font-semibold">
                  DELIVERY METHODOLOGY
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#F5F2EB]">
                  How We Implement This Practice
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#11100E] border border-[#242220] space-y-1.5">
                  <span className="text-[#E07A5F] font-bold">01 Discovery &amp; Audit</span>
                  <p className="text-[#9E988F] font-sans">
                    Detailed inspection of your current tech stack, bottlenecks, and commercial goals.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#11100E] border border-[#242220] space-y-1.5">
                  <span className="text-[#E07A5F] font-bold">02 Architecture Blueprint</span>
                  <p className="text-[#9E988F] font-sans">
                    Comprehensive technical specification with fixed milestone schedules and zero ambiguity.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#11100E] border border-[#242220] space-y-1.5">
                  <span className="text-[#E07A5F] font-bold">03 Build &amp; Launch</span>
                  <p className="text-[#9E988F] font-sans">
                    Engineered implementation, automated verification, security hardening, and zero-downtime deployment.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#11100E] border border-[#242220] space-y-1.5">
                  <span className="text-[#E07A5F] font-bold">04 Grow &amp; Optimize</span>
                  <p className="text-[#9E988F] font-sans">
                    Post-launch telemetry, proactive uptime monitoring, and scheduled conversion refinements.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Practice FAQs */}
            {pillar.faqs && pillar.faqs.length > 0 && (
              <div className="bg-[#141312] border border-[#242220] rounded-2xl p-7 sm:p-9 shadow-xs">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-4 h-4 text-[#E07A5F]" />
                  <h2 className="text-xl font-bold font-sans text-[#F5F2EB]">
                    Practice Guidance &amp; FAQ
                  </h2>
                </div>

                <div className="space-y-5">
                  {pillar.faqs.map((faq, i) => (
                    <div key={i} className="pb-5 border-b border-[#242220] last:border-0 last:pb-0">
                      <h3 className="text-sm font-bold mb-1.5 font-sans text-[#F5F2EB]">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed font-sans">
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
            <div className="bg-[#141312] border border-[#242220] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <span className="text-[11px] font-mono uppercase text-[#E07A5F] font-semibold block">
                PARTNER CONSULTATION
              </span>
              <h3 className="text-lg font-bold font-sans text-[#F5F2EB]">
                Scope Your {pillar.title} System
              </h3>
              <p className="text-xs text-[#9E988F] leading-relaxed font-sans">
                Review your requirements directly with our founding partners. We prepare a detailed Blueprint with fixed milestones and verified timelines.
              </p>

              <div className="p-3 rounded-lg bg-[#11100E] border border-[#242220] text-xs font-mono text-[#9E988F] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E07A5F] flex-shrink-0" />
                <span>Response SLA: Within 1–2 business days</span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(pillar.title)}`}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors group shadow-sm shadow-[#C25E38]/20"
              >
                <span>Discuss This Practice</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/readiness"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-mono text-[#F5F2EB] bg-[#1C1A18] hover:bg-[#242220] border border-[#242220] hover:border-[#36332F] rounded-lg transition-colors"
              >
                <span>Run Diagnostic (3 mins) &rarr;</span>
              </Link>
            </div>

            {/* Other Practice Pillars Navigation */}
            <div className="bg-[#141312] border border-[#242220] rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-[#9E988F] font-semibold block mb-3">
                OTHER PRACTICE PILLARS
              </span>
              <div className="space-y-2">
                {otherPillars.map((other) => {
                  const OtherIcon = iconMap[other.id] || Globe;
                  return (
                    <Link
                      key={other.id}
                      href={`/services/${other.id}`}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#11100E] hover:bg-[#1C1A18] border border-[#242220] hover:border-[#36332F] transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2.5 text-[#9E988F] group-hover:text-[#F5F2EB]">
                        <OtherIcon className="w-3.5 h-3.5 text-[#E07A5F]" />
                        <span className="font-sans font-medium">{other.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#6E6860] group-hover:text-[#E07A5F] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
