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
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#7C7469] dark:text-[#8E867C] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-editorial-ink dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#9C948A]" />
          <Link href="/services" className="hover:text-editorial-ink dark:hover:text-white transition-colors">
            SERVICES
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#9C948A]" />
          <span className="text-[#C25E38] dark:text-[#E07A5F] font-semibold">{pillar.title.toUpperCase()}</span>
        </nav>

        {/* Practice Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#22201D] text-[#5A544E] dark:text-[#B8B0A5] border border-[#DDD5C7] dark:border-[#33302B] rounded-md text-xs font-mono mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E38] dark:bg-[#E07A5F]" />
            <span>PRACTICE SPECIFICATION / {pillar.badge.toUpperCase()}</span>
          </div>

          <div className="flex items-start gap-5 mt-2">
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] flex items-center justify-center text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 shadow-xs">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-editorial-ink dark:text-[#FBF9F5]">
                {pillar.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#5A544E] dark:text-[#A8A196] leading-relaxed max-w-3xl font-serif">
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
            <div className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-7 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3 text-xs font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Commercial Friction Addressed</span>
              </div>
              <h2 className="text-xl font-bold mb-3 font-sans text-editorial-ink dark:text-[#FBF9F5]">
                Why Businesses Need This Practice
              </h2>
              <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed">
                {pillar.targetProblem}
              </p>
            </div>

            {/* 2. Detailed Service Modules */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] block mb-1 font-medium">
                  MODULE BREAKDOWN
                </span>
                <h2 className="text-2xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">
                  Technical Scope &amp; Deliverables
                </h2>
              </div>

              <div className="space-y-6">
                {pillar.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-6 sm:p-7 hover:border-[#C25E38]/40 dark:hover:border-[#E07A5F]/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">
                        {srv.title}
                      </h3>
                      <span className="text-xs font-mono text-[#7C7469] dark:text-[#8E867C]">
                        MOD 0{idx + 1}
                      </span>
                    </div>

                    <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-[#E5DDD0] dark:border-[#2C2926] text-xs">
                      <div>
                        <p className="font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-2">
                          Standard Deliverables:
                        </p>
                        <ul className="space-y-1.5">
                          {srv.deliverables.map((d, i) => (
                            <li key={i} className="text-[#3D3833] dark:text-[#D4CDC3] flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-2">
                          Client Inputs Required:
                        </p>
                        <ul className="space-y-1.5">
                          {srv.clientInputs.map((inp, i) => (
                            <li key={i} className="text-[#5A544E] dark:text-[#A8A196] flex items-start gap-2">
                              <span className="text-[#9C948A] mt-0.5">•</span>
                              <span>{inp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Exclusions and Dependencies if specified */}
                    {(srv.exclusions.length > 0 || srv.dependencies.length > 0) && (
                      <div className="mt-5 pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] text-[11px] text-[#7C7469] dark:text-[#8E867C] space-y-1">
                        {srv.exclusions.length > 0 && (
                          <p>
                            <span className="font-semibold text-editorial-ink dark:text-[#FBF9F5]">Explicit Exclusions: </span>
                            {srv.exclusions.join('; ')}.
                          </p>
                        )}
                        {srv.dependencies.length > 0 && (
                          <p>
                            <span className="font-semibold text-editorial-ink dark:text-[#FBF9F5]">Prerequisites: </span>
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
              <div className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-7 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F]" />
                  <h2 className="text-xl font-bold font-sans text-editorial-ink dark:text-[#FBF9F5]">
                    Practice Guidance &amp; FAQ
                  </h2>
                </div>

                <div className="space-y-5">
                  {pillar.faqs.map((faq, i) => (
                    <div key={i} className="pb-5 border-b border-[#E5DDD0] dark:border-[#2C2926] last:border-0 last:pb-0">
                      <h3 className="text-sm font-bold mb-1.5 font-sans text-editorial-ink dark:text-[#FBF9F5]">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed font-serif">
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
            <div className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-6 sm:p-7 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-[#C25E38] dark:text-[#E07A5F] font-semibold block mb-2">
                PROJECT CONSULTATION
              </span>
              <h3 className="text-lg font-bold mb-2 font-sans text-editorial-ink dark:text-[#FBF9F5]">
                Scope Your {pillar.title} System
              </h3>
              <p className="text-xs text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-6 font-serif">
                Review your requirements directly with an engineering partner. We prepare a detailed Blueprint with fixed milestones and verified timelines.
              </p>

              <Link
                href={`/contact?service=${encodeURIComponent(pillar.title)}`}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors group mb-3 shadow-sm"
              >
                <span>Discuss This Practice</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/readiness"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-editorial-ink dark:text-[#FBF9F5] bg-[#FBF9F5] dark:bg-[#22201D] hover:bg-[#EAE4DC] dark:hover:bg-[#2C2926] border border-[#DDD5C7] dark:border-[#383430] rounded-md transition-colors shadow-xs"
              >
                <span>Take Readiness Diagnostic</span>
              </Link>

              <div className="mt-5 pt-4 border-t border-[#E5DDD0] dark:border-[#2C2926] text-[11px] font-mono text-[#7C7469] dark:text-[#8E867C] space-y-1">
                <p>• Written Architecture Blueprint</p>
                <p>• Fixed Milestone Commitments</p>
                <p>• Bangalore MSME: {BRAND_CONFIG.udyamRegistrationNumber}</p>
              </div>
            </div>

            {/* Other Pillars Directory */}
            <div className="bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] rounded-xl p-6 shadow-xs">
              <h4 className="text-xs font-mono uppercase text-[#7C7469] dark:text-[#8E867C] font-semibold mb-4">
                Other Practice Pillars
              </h4>
              <ul className="space-y-2 text-xs">
                {otherPillars.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/services/${other.id}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-[#FBF9F5] dark:hover:bg-[#22201D] text-[#5A544E] dark:text-[#A8A196] hover:text-editorial-ink dark:hover:text-[#FBF9F5] transition-colors"
                    >
                      <span>{other.title}</span>
                      <ArrowRight className="w-3 h-3 text-[#9C948A]" />
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
