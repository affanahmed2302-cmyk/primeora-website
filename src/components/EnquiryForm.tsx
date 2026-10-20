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
        setErrorMessage(data.error || 'Failed to submit enquiry. Please check your inputs or try again.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please verify your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#08152B] rounded-xl border border-[#166CFF]/40 p-8 sm:p-10 text-center animate-in fade-in">
        <div className="w-14 h-14 bg-[#166CFF]/15 text-[#3B82F6] border border-[#166CFF]/30 rounded-xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-sans">Enquiry Received</h3>
        <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed mb-6">
          Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Your enquiry for{' '}
          <span className="text-white font-medium">{formData.businessName}</span> has been securely stored. A partner
          from Primeora Solutions will review your requirements and respond within 1 business day.
        </p>
        <button
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
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3B82F6] hover:text-white transition-colors"
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
        className="bg-[#08152B] rounded-xl border border-white/[0.08] p-6 sm:p-10 relative overflow-hidden"
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
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div>
              <p className="font-semibold text-red-100">Unable to submit enquiry</p>
              <p className="text-xs text-red-300/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Row 1: Name & Business */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Full Name <span className="text-[#166CFF]">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Ramesh Patel"
                className={`w-full px-4 py-3 bg-[#040D1A] border ${
                  errors.fullName ? 'border-red-500' : 'border-white/10'
                } rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors`}
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="businessName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Business / Entity Name <span className="text-[#166CFF]">*</span>
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Vertex Retail Pvt Ltd"
                className={`w-full px-4 py-3 bg-[#040D1A] border ${
                  errors.businessName ? 'border-red-500' : 'border-white/10'
                } rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors`}
              />
              {errors.businessName && <p className="text-xs text-red-400 mt-1">{errors.businessName}</p>}
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Work Email Address <span className="text-[#166CFF]">*</span>
              </label>
              <input
                id="contactEmail"
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="ramesh@vertexretail.com"
                className={`w-full px-4 py-3 bg-[#040D1A] border ${
                  errors.contactEmail ? 'border-red-500' : 'border-white/10'
                } rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors`}
              />
              {errors.contactEmail && <p className="text-xs text-red-400 mt-1">{errors.contactEmail}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-[#040D1A] border border-white/10 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Service Pillar & Target Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="serviceInterest" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Primary Practice Area <span className="text-[#166CFF]">*</span>
              </label>
              <select
                id="serviceInterest"
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                className="w-full px-4 py-3 bg-[#040D1A] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors"
              >
                {SERVICE_PILLARS.map((pillar) => (
                  <option key={pillar.id} value={pillar.title} className="bg-[#08152B] text-white">
                    {pillar.title}
                  </option>
                ))}
                <option value="Package Tier: LAUNCH" className="bg-[#08152B] text-white">
                  Package Tier: Launch (Foundation)
                </option>
                <option value="Package Tier: GROW" className="bg-[#08152B] text-white">
                  Package Tier: Grow (Growth System)
                </option>
                <option value="Package Tier: COMPLETE PARTNER" className="bg-[#08152B] text-white">
                  Package Tier: Complete Partner (Custom Architecture)
                </option>
                <option value="General Consultation" className="bg-[#08152B] text-white">
                  General Consultation / Multi-Service
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="targetTimeline" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Implementation Target
              </label>
              <select
                id="targetTimeline"
                value={formData.targetTimeline}
                onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                className="w-full px-4 py-3 bg-[#040D1A] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors"
              >
                <option value="Immediate (< 3 weeks)" className="bg-[#08152B] text-white">
                  Immediate (Under 3 weeks)
                </option>
                <option value="Within 1-2 months" className="bg-[#08152B] text-white">
                  Within 1-2 months
                </option>
                <option value="Planning / Next Quarter" className="bg-[#08152B] text-white">
                  Planning for next quarter
                </option>
                <option value="Ongoing advisory" className="bg-[#08152B] text-white">
                  Ongoing management partnership
                </option>
              </select>
            </div>
          </div>

          {/* Row 4: Problem Summary */}
          <div>
            <label htmlFor="problemSummary" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Problem Description & Desired Outcome <span className="text-[#166CFF]">*</span>
            </label>
            <textarea
              id="problemSummary"
              required
              rows={4}
              value={formData.problemSummary}
              onChange={(e) => setFormData({ ...formData, problemSummary: e.target.value })}
              placeholder="Outline your current business bottleneck (e.g. website does not convert, manual WhatsApp enquiry follow-ups, fragmented inventory, or no marketing analytics)."
              className={`w-full px-4 py-3 bg-[#040D1A] border ${
                errors.problemSummary ? 'border-red-500' : 'border-white/10'
              } rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors`}
            />
            {errors.problemSummary && <p className="text-xs text-red-400 mt-1">{errors.problemSummary}</p>}
          </div>

          {/* Row 5: Current Website */}
          <div>
            <label htmlFor="websiteUrl" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Existing Website or Online Presence (Optional)
            </label>
            <input
              id="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://yourcompany.com"
              className="w-full px-4 py-3 bg-[#040D1A] border border-white/10 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#166CFF] focus:ring-1 focus:ring-[#166CFF] transition-colors"
            />
          </div>
        </div>

        {/* Submit Button & Privacy Notice */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#166CFF] hover:bg-[#1055CC] rounded-lg transition-colors disabled:opacity-50"
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

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
            <span>
              Direct founder review. Strictly confidential. No spam.
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
