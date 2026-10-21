import React from 'react';
import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';
import Link from 'next/link';
import { Shield, Lock, Scale, Clock, Globe2, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Governance — DPDP Act 2023 & India Compliance | Primeora Solutions',
  description:
    'Read Primeora Solutions’ transparent privacy policy explaining how we collect, protect, and process data from enquiries and website visitors in accordance with the Digital Personal Data Protection Act, 2023 and CERT-In directions.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-editorial-canvas dark:bg-[#121110] min-h-screen text-editorial-ink dark:text-[#FBF9F5] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-sans text-editorial-ink dark:text-[#FBF9F5]">
          Privacy Policy &amp; Data Protection Notice
        </h1>
        <p className="text-xs text-[#7C7469] dark:text-[#8E867C] font-mono mb-10">
          Last revised: 21 October 2026 &middot; Operating Entity: {BRAND_CONFIG.legalEntity} (Udyam MSME: {BRAND_CONFIG.udyamRegistrationNumber}) &middot; Jurisdiction: Bengaluru, Karnataka, India
        </p>

        <div className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed space-y-6">
          {/* Section 1: Entity & Fiduciary Identity */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#C25E38]" />
              <span>1. Enterprise Identity &amp; Data Fiduciary</span>
            </h2>
            <p>
              This website and digital consulting services are operated by <strong>{BRAND_CONFIG.legalEntity}</strong>, registered with the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India under Udyam Registration Number <code>{BRAND_CONFIG.udyamRegistrationNumber}</code> (Classification: Micro Enterprise, Services), trading commercially as <strong>{BRAND_CONFIG.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p>
              For the purposes of the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, Primeora Solutions acts as the <em>Data Fiduciary</em> in respect of personal data submitted by users (&ldquo;Data Principals&rdquo;) through this website and associated inquiry channels.
            </p>
            <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg text-xs font-mono space-y-1">
              <div><strong>Registered Principal Place of Business:</strong> {BRAND_CONFIG.registeredAddress}</div>
              <div><strong>Official Email:</strong> {BRAND_CONFIG.officialEmail} &middot; {BRAND_CONFIG.contactEmail}</div>
              <div><strong>Official Telephone:</strong> {BRAND_CONFIG.contactPhone}</div>
            </div>
          </section>

          {/* Section 2: Data Collected & Purpose Specification */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C25E38]" />
              <span>2. Categories of Personal Data Collected &amp; Purpose Specification</span>
            </h2>
            <p>
              In accordance with Section 5 and Section 6 of the DPDP Act 2023, personal data is processed solely for specified, lawful, and explicit purposes consented to by the Data Principal:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#5A544E] dark:text-[#A8A196]">
              <li>
                <strong className="text-editorial-ink dark:text-[#FBF9F5]">Project Enquiry &amp; Commercial Scoping Data:</strong> Full name, corporate email address, business/organization name, telephone number (optional), requested service category, and project scope narrative submitted through our enquiry form.
                <em className="block text-xs text-[#7C7469] dark:text-[#8E867C] mt-0.5">
                  Purpose: Evaluation of technical consulting engagements, drafting proposals, and scheduled communication.
                </em>
              </li>
              <li>
                <strong className="text-editorial-ink dark:text-[#FBF9F5]">Security &amp; Network Telemetry:</strong> One-way cryptographic IP hashes (SHA-256), browser user-agent tokens, and request timestamps.
                <em className="block text-xs text-[#7C7469] dark:text-[#8E867C] mt-0.5">
                  Purpose: Cyber attack mitigation, brute force protection, bot detection, and fulfillment of cybersecurity audit directives issued by the Indian Computer Emergency Response Team (CERT-In).
                </em>
              </li>
              <li>
                <strong className="text-editorial-ink dark:text-[#FBF9F5]">Aggregated Performance Measurement (Optional):</strong> Granular performance and visitor interactions via Google Analytics 4, collected exclusively when explicit consent is granted via our Cookie Preferences banner.
              </li>
            </ul>
          </section>

          {/* Section 3: Data Security & Infrastructure Localization */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#C25E38]" />
              <span>3. Reasonable Security Safeguards &amp; Data Localization</span>
            </h2>
            <p>
              Under Section 8(5) of the DPDP Act 2023 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg text-xs space-y-1">
                <div className="font-bold text-editorial-ink dark:text-[#FBF9F5]">Geographic Data Localization</div>
                <p className="text-[#7C7469] dark:text-[#8E867C]">
                  All primary client enquiries, authentication profiles, and audit journals are persisted in dedicated PostgreSQL databases localized in AWS <code>ap-south-1</code> (Mumbai, India).
                </p>
              </div>
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg text-xs space-y-1">
                <div className="font-bold text-editorial-ink dark:text-[#FBF9F5]">Cryptographic Access Controls</div>
                <p className="text-[#7C7469] dark:text-[#8E867C]">
                  Enforced TLS 1.3 in-transit encryption, AES-256 rest encryption, Postgres Row Level Security (RLS), and HMAC-signed administrative session cookies.
                </p>
              </div>
            </div>
            <p className="text-xs text-[#7C7469] dark:text-[#8E867C]">
              We do not sell, rent, commercialize, or trade personal data to data brokers, marketing aggregators, or unauthorized third parties.
            </p>
          </section>

          {/* Section 4: Data Retention & CERT-In Directives */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C25E38]" />
              <span>4. Data Retention Schedules &amp; CERT-In Compliance</span>
            </h2>
            <p>
              In accordance with Section 8(7) of the DPDP Act 2023 (erasure upon purpose fulfillment) and CERT-In Direction No. 20(3)/2022-CERT-In dated 28 April 2022:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5A544E] dark:text-[#A8A196]">
              <li>
                <strong>Prospective Enquiry Submissions:</strong> Retained for a maximum period of 24 months from submission date or until commercial engagement conclusion, after which records are purged or anonymized.
              </li>
              <li>
                <strong>System Access &amp; Security Audit Logs:</strong> Retained for a mandatory duration of 180 days to fulfill CERT-In cybersecurity incident investigation obligations, maintaining privacy via salted SHA-256 IP hashes.
              </li>
              <li>
                <strong>Contractual Engagement Documentation:</strong> Retained for 7 years in accordance with applicable Indian accounting and commercial taxation statutory periods.
              </li>
            </ul>
          </section>

          {/* Section 5: Data Principal Rights */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C25E38]" />
              <span>5. Rights of the Data Principal</span>
            </h2>
            <p>
              Data Principals possess specific enforceable rights under Chapter III (Sections 11 through 14) of the DPDP Act 2023:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg space-y-1">
                <strong>Right to Access Information (Sec 11)</strong>
                <p className="text-[#7C7469] dark:text-[#8E867C]">
                  Request a summary of personal data being processed and the identities of any data fiduciaries or processors with whom it was shared.
                </p>
              </div>
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg space-y-1">
                <strong>Right to Correction &amp; Erasure (Sec 12)</strong>
                <p className="text-[#7C7469] dark:text-[#8E867C]">
                  Request correction of inaccurate or misleading data, completion of incomplete records, or erasure of data no longer necessary.
                </p>
              </div>
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg space-y-1">
                <strong>Right of Grievance Redressal (Sec 13)</strong>
                <p className="text-[#7C7469] dark:text-[#8E867C]">
                  Submit complaints directly to our designated Grievance Officer, with guaranteed review within 30 days.
                </p>
              </div>
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-lg space-y-1">
                <strong>Right to Nominate (Sec 14)</strong>
                <p className="text-[#7C7469] dark:text-[#8E867C]">
                  Nominate an individual to exercise data principal rights in the event of death or incapacity.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Grievance Redressal Officer */}
          <section className="space-y-3 bg-white dark:bg-[#1C1A18] border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-7 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold font-sans text-editorial-ink dark:text-[#FBF9F5] flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#C25E38]" />
              <span>6. Grievance Redressal Officer &amp; Regulatory Recourse</span>
            </h2>
            <p>
              In compliance with Section 13 of the DPDP Act 2023, Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Consumer Protection (E-Commerce) Rules, 2020:
            </p>
            <div className="p-4 bg-[#FBF9F5] dark:bg-[#22201D] border border-[#DDD5C7] dark:border-[#383430] rounded-xl text-xs space-y-2">
              <div className="font-bold text-sm text-editorial-ink dark:text-[#FBF9F5]">Designated Grievance &amp; Data Protection Officer:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#5A544E] dark:text-[#A8A196]">
                <div><strong>Designation:</strong> Data Protection &amp; Grievance Redressal Officer</div>
                <div><strong>Enterprise:</strong> {BRAND_CONFIG.legalEntity}</div>
                <div><strong>Email:</strong> <a href={`mailto:${BRAND_CONFIG.officialEmail}`} className="text-[#C25E38] underline">{BRAND_CONFIG.officialEmail}</a></div>
                <div><strong>Direct Contact:</strong> {BRAND_CONFIG.contactPhone}</div>
                <div className="sm:col-span-2">
                  <strong>Postal Address:</strong> {BRAND_CONFIG.registeredAddress}
                </div>
              </div>
              <div className="pt-2 border-t border-[#DDD5C7] dark:border-[#383430] text-[11px] text-[#7C7469] dark:text-[#8E867C]">
                Turnaround Commitment: Acknowledgement within 48 hours; resolution or definitive determination within 30 days of receipt.
              </div>
            </div>
            <p className="text-xs text-[#7C7469] dark:text-[#8E867C]">
              If a grievance is not resolved satisfactorily by our Grievance Officer, the Data Principal retains the statutory right to escalate the matter to the <strong>Data Protection Board of India (DPBI)</strong> pursuant to Section 13(3) of the Act.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
