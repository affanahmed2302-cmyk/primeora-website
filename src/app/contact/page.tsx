import React from 'react';
import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import { BRAND_CONFIG } from '@/config/brand';
import { Mail, MapPin, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discuss a Project — Project Enquiry & Consultation',
  description:
    'Initiate a project consultation with Ritkara Veyra. Tell us about your operational goals, website requirements, or automation bottlenecks.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="bg-architectural-grid py-16 md:py-24 border-b border-border-subtle mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-3">
            <span>Direct Access</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight">
            Discuss a Project
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Every partnership begins with understanding your commercial objectives. Complete the enquiry form below, and our leadership team will review and reply with initial thoughts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>

          {/* Contact Details & Practice Information */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-border-medium p-6 sm:p-7 shadow-card space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest">
                Consulting Practice Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-forest block">General Enquiries:</span>
                    <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="text-charcoal-muted hover:text-forest">
                      {BRAND_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-forest block">Registered Practice Location:</span>
                    <span className="text-charcoal-muted leading-relaxed">
                      {BRAND_CONFIG.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-forest block">Standard Review Time:</span>
                    <span className="text-charcoal-muted">
                      1 to 2 business days for structured proposal review.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle">
                <a
                  href={BRAND_CONFIG.gbpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal font-semibold hover:underline"
                >
                  <span>View Google Business Profile & verified reviews</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Legal Transparency Card */}
            <div className="p-5 bg-ivory-light border border-border-subtle rounded-lg text-xs text-charcoal-muted leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-forest font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal" />
                <span>Enterprise Transparency</span>
              </div>
              <p>
                {BRAND_CONFIG.legalNotice}
              </p>
              <p className="font-mono text-[11px] text-charcoal">
                MSME Registration: {BRAND_CONFIG.udyamRegistrationNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
