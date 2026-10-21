'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICE_PILLARS } from '@/config/brand';
import { Send, CheckCircle2, AlertCircle, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';

// Isolated subcomponent to parse search params without blocking SSR/SSG
function SearchParamsSync({
  onParams,
}: {
  onParams: (service?: string, pkg?: string, notes?: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const srv = searchParams.get('service') || undefined;
    const pkg = searchParams.get('package') || undefined;
    const notes = searchParams.get('notes') || undefined;
    if (srv || pkg || notes) {
      onParams(srv, pkg, notes);
    }
  }, [searchParams, onParams]);

  return null;
}

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    contactEmail: '',
    phone: '',
    serviceInterest: 'Digital Presence',
    problemSummary: '',
    targetTimeline: 'Within 1-2 months',
    websiteUrl: '',
    _hp: '', // Honeypot field for bot detection
    _ts: Date.now(), // Client mount timestamp
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Callback to handle pre-filled parameters from query string
  const handleParams = useCallback((srv?: string, pkg?: string, notes?: string) => {
    setFormData((prev) => {
      let updated = { ...prev };
      if (srv) {
        updated.serviceInterest = srv;
      } else if (pkg) {
        updated.serviceInterest = `Package Tier: ${pkg.toUpperCase()}`;
      }
      if (notes) {
        updated.problemSummary = prev.problemSummary
          ? `${prev.problemSummary}\n\n[Context: ${notes}]`
          : `[Context: ${notes}] `;
      }
      return updated;
    });
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      errs.businessName = 'Please enter your business or project name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim() || !emailRegex.test(formData.contactEmail.trim())) {
      errs.contactEmail = 'Please provide a valid work email address.';
    }
    if (!formData.problemSummary.trim() || formData.problemSummary.trim().length < 15) {
      errs.problemSummary = 'Please share at least 15 characters describing what you wish to solve.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.message || 'We could not submit your request. Please try again or email us directly.');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error during transmission. Please email primeorasolutions.in@gmail.com directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white dark:bg-[#1C1A18] rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#EBF5EE] dark:bg-[#172E20] text-[#1E7E34] dark:text-[#4ADE80] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-editorial-ink dark:text-[#FBF9F5] mb-3 font-sans">
          Enquiry Received
        </h3>
        <p className="text-sm text-[#5A544E] dark:text-[#A8A196] leading-relaxed mb-6 font-serif">
          Thank you, <strong className="text-editorial-ink dark:text-[#FBF9F5]">{formData.fullName}</strong>. Your project brief has been received and routed directly to our founding partners. <strong>We aim to respond to enquiries within 1–2 business days.</strong>
        </p>
        <div className="p-4 bg-[#FBF9F5] dark:bg-[#22201D] rounded-lg border border-[#DDD5C7] dark:border-[#33302B] text-xs font-mono text-[#7C7469] dark:text-[#8E867C] mb-8 text-left space-y-1">
          <div><strong className="text-[#3D3833] dark:text-[#DDD6CC]">Business:</strong> {formData.businessName}</div>
          <div><strong className="text-[#3D3833] dark:text-[#DDD6CC]">Target Practice:</strong> {formData.serviceInterest}</div>
          <div><strong className="text-[#3D3833] dark:text-[#DDD6CC]">Confirmation Email:</strong> {formData.contactEmail}</div>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              fullName: '',
              businessName: '',
              contactEmail: '',
              phone: '',
              serviceInterest: 'Digital Presence',
              problemSummary: '',
              targetTimeline: 'Within 1-2 months',
              websiteUrl: '',
              _hp: '',
              _ts: Date.now(),
            });
          }}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C25E38] dark:text-[#E07A5F] hover:text-editorial-ink dark:hover:text-white transition-colors"
        >
          Submit Another Request →
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Silent client query param listener */}
      <Suspense fallback={null}>
        <SearchParamsSync onParams={handleParams} />
      </Suspense>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1C1A18] rounded-xl border border-[#E5DDD0] dark:border-[#2C2926] p-6 sm:p-10 relative overflow-hidden shadow-sm transition-colors duration-200"
        noValidate
      >
        {/* Honeypot field (hidden from genuine users, catches bots) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_hp_input">Do not fill this field</label>
          <input
            id="_hp_input"
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData._hp}
            onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
          />
        </div>

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 rounded-lg flex items-start gap-3 text-red-800 dark:text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to submit enquiry</p>
              <p className="text-xs text-red-700 dark:text-red-300/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Row 1: Name & Business */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
                Full Name <span className="text-[#C25E38] dark:text-[#E07A5F]">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Ramesh Patel"
                className={`w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border ${
                  errors.fullName ? 'border-red-500' : 'border-[#DDD5C7] dark:border-[#2C2926]'
                } rounded-lg text-editorial-ink dark:text-[#FBF9F5] placeholder-[#9C948A] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors`}
              />
              {errors.fullName && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="businessName" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
                Business / Entity Name <span className="text-[#C25E38] dark:text-[#E07A5F]">*</span>
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Vertex Retail Pvt Ltd"
                className={`w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border ${
                  errors.businessName ? 'border-red-500' : 'border-[#DDD5C7] dark:border-[#2C2926]'
                } rounded-lg text-editorial-ink dark:text-[#FBF9F5] placeholder-[#9C948A] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors`}
              />
              {errors.businessName && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.businessName}</p>}
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
                Work Email Address <span className="text-[#C25E38] dark:text-[#E07A5F]">*</span>
              </label>
              <input
                id="contactEmail"
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="ramesh@vertexretail.com"
                className={`w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border ${
                  errors.contactEmail ? 'border-red-500' : 'border-[#DDD5C7] dark:border-[#2C2926]'
                } rounded-lg text-editorial-ink dark:text-[#FBF9F5] placeholder-[#9C948A] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors`}
              />
              {errors.contactEmail && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.contactEmail}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg text-editorial-ink dark:text-[#FBF9F5] placeholder-[#9C948A] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Service Pillar & Target Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="serviceInterest" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
                Primary Practice Area <span className="text-[#C25E38] dark:text-[#E07A5F]">*</span>
              </label>
              <select
                id="serviceInterest"
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                className="w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg text-editorial-ink dark:text-[#FBF9F5] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors"
              >
                {SERVICE_PILLARS.map((pillar) => (
                  <option key={pillar.id} value={pillar.title} className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                    {pillar.title}
                  </option>
                ))}
                <option value="Package Tier: LAUNCH" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Package Tier: Launch (Foundation)
                </option>
                <option value="Package Tier: GROW" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Package Tier: Grow (Growth System)
                </option>
                <option value="Package Tier: COMPLETE PARTNER" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Package Tier: Complete Partner (Custom Architecture)
                </option>
                <option value="General Consultation" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  General Consultation / Multi-Service
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="targetTimeline" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
                Implementation Target
              </label>
              <select
                id="targetTimeline"
                value={formData.targetTimeline}
                onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                className="w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg text-editorial-ink dark:text-[#FBF9F5] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors"
              >
                <option value="Immediate (< 3 weeks)" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Immediate (Under 3 weeks)
                </option>
                <option value="Within 1-2 months" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Within 1-2 months
                </option>
                <option value="Planning / Next Quarter" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Planning for next quarter
                </option>
                <option value="Ongoing advisory" className="bg-white dark:bg-[#1C1A18] text-editorial-ink dark:text-[#FBF9F5]">
                  Ongoing management partnership
                </option>
              </select>
            </div>
          </div>

          {/* Row 4: Problem Summary */}
          <div>
            <label htmlFor="problemSummary" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
              Problem Description &amp; Desired Outcome <span className="text-[#C25E38] dark:text-[#E07A5F]">*</span>
            </label>
            <textarea
              id="problemSummary"
              required
              rows={4}
              value={formData.problemSummary}
              onChange={(e) => setFormData({ ...formData, problemSummary: e.target.value })}
              placeholder="Outline your current business bottleneck (e.g. website does not convert, manual WhatsApp enquiry follow-ups, fragmented inventory, or no marketing analytics)."
              className={`w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border ${
                errors.problemSummary ? 'border-red-500' : 'border-[#DDD5C7] dark:border-[#2C2926]'
              } rounded-lg text-editorial-ink dark:text-[#FBF9F5] placeholder-[#9C948A] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors`}
            />
            {errors.problemSummary && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.problemSummary}</p>}
          </div>

          {/* Row 5: Current Website */}
          <div>
            <label htmlFor="websiteUrl" className="block text-xs font-semibold uppercase tracking-wider text-[#3D3833] dark:text-[#DDD6CC] mb-2 font-mono">
              Existing Website or Online Presence (Optional)
            </label>
            <input
              id="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://yourcompany.com"
              className="w-full px-4 py-3 bg-[#FBF9F5] dark:bg-[#121110] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg text-editorial-ink dark:text-[#FBF9F5] placeholder-[#9C948A] text-sm focus:outline-none focus:border-[#C25E38] dark:focus:border-[#E07A5F] focus:ring-1 focus:ring-[#C25E38] dark:focus:ring-[#E07A5F] transition-colors"
            />
          </div>
        </div>

        {/* Response SLA Commitment */}
        <div className="mt-6 p-3 bg-[#FBF9F5] dark:bg-[#121110] border border-[#DDD5C7] dark:border-[#2C2926] rounded-lg flex items-center gap-2.5 text-xs font-mono text-[#5C5751] dark:text-[#A8A29A]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <span>Response commitment: <strong>We aim to respond to enquiries within 1–2 business days.</strong></span>
        </div>

        {/* Submit Button & Privacy Notice */}
        <div className="mt-6 pt-6 border-t border-[#E5DDD0] dark:border-[#2C2926] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#C25E38] hover:bg-[#A84F2E] rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Submitting Securely...</span>
              </>
            ) : (
              <>
                <span>Submit Project Enquiry</span>
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-[#7C7469] dark:text-[#8E867C]">
            <Shield className="w-4 h-4 text-[#C25E38] dark:text-[#E07A5F] flex-shrink-0" />
            <span>
              Direct founder review. Strictly confidential. No spam.
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
