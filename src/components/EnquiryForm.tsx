'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICE_PILLARS } from '@/config/brand';
import { Send, CheckCircle2, AlertCircle, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';

function EnquiryFormContent() {
  const searchParams = useSearchParams();

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
    _ts: Date.now(), // Client mount timestamp for sub-second bot detection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle pre-filled parameters from query string
  useEffect(() => {
    const srv = searchParams.get('service');
    const pkg = searchParams.get('package');
    const notes = searchParams.get('notes');

    if (srv) {
      setFormData((prev) => ({ ...prev, serviceInterest: srv }));
    } else if (pkg) {
      setFormData((prev) => ({ ...prev, serviceInterest: `Package Tier: ${pkg.toUpperCase()}` }));
    }

    if (notes) {
      setFormData((prev) => ({
        ...prev,
        problemSummary: prev.problemSummary ? `${prev.problemSummary}\n\n[Context: ${notes}]` : `[Context: ${notes}] `,
      }));
    }
  }, [searchParams]);

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
      <div className="bg-white rounded-xl border border-teal/30 p-8 sm:p-10 shadow-card text-center animate-in fade-in">
        <div className="w-14 h-14 bg-teal-subtle text-teal rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-forest mb-2">
          Project Enquiry Received
        </h3>
        <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed mb-6">
          Thank you for reaching out. We have logged your request securely. Our leadership team will review your business context and reply with initial thoughts and next steps.
        </p>
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
          className="px-5 py-2 text-xs font-semibold text-forest bg-ivory border border-border-medium rounded hover:bg-ivory-dark transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-xl border border-border-medium p-6 sm:p-10 shadow-card space-y-5"
    >
      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_hp">Do not fill this field</label>
        <input
          type="text"
          id="_hp"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData._hp}
          onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Affan Ahmed"
            className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
              errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-border-medium'
            } focus:outline-none focus:ring-2 focus:ring-teal`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-600 mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Business / Venture Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="Acme Enterprises"
            className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
              errors.businessName ? 'border-red-400 bg-red-50/20' : 'border-border-medium'
            } focus:outline-none focus:ring-2 focus:ring-teal`}
          />
          {errors.businessName && (
            <p id="businessName-error" className="text-xs text-red-600 mt-1">
              {errors.businessName}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Work Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="contactEmail"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.contactEmail)}
            aria-describedby={errors.contactEmail ? 'contactEmail-error' : undefined}
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            placeholder="you@company.com"
            className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
              errors.contactEmail ? 'border-red-400 bg-red-50/20' : 'border-border-medium'
            } focus:outline-none focus:ring-2 focus:ring-teal`}
          />
          {errors.contactEmail && (
            <p id="contactEmail-error" className="text-xs text-red-600 mt-1">
              {errors.contactEmail}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Phone / WhatsApp Number <span className="text-charcoal-muted text-[10px]">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border-medium focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
      </div>

      {/* Row 3: Service of Interest & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="serviceInterest" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Primary Area of Interest
          </label>
          <select
            id="serviceInterest"
            value={formData.serviceInterest}
            onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border-medium bg-white focus:outline-none focus:ring-2 focus:ring-teal"
          >
            {SERVICE_PILLARS.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
            <option value="Package Tier: LAUNCH">Package: Launch</option>
            <option value="Package Tier: GROW">Package: Grow</option>
            <option value="Package Tier: COMPLETE PARTNER">Package: Complete Partner</option>
            <option value="General Strategic Consultation">General Strategic Consultation</option>
          </select>
        </div>

        <div>
          <label htmlFor="targetTimeline" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Target Completion Timeline
          </label>
          <select
            id="targetTimeline"
            value={formData.targetTimeline}
            onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border-medium bg-white focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="Immediate (Next 2-3 weeks)">Immediate (Next 2-3 weeks)</option>
            <option value="Within 1-2 months">Within 1-2 months</option>
            <option value="Planning for next quarter">Planning for next quarter</option>
            <option value="Exploring initial feasibility">Exploring initial feasibility</option>
          </select>
        </div>
      </div>

      {/* Row 4: Website URL (Optional) */}
      <div>
        <label htmlFor="websiteUrl" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
          Current Website or Social URL <span className="text-charcoal-muted text-[10px]">(Optional)</span>
        </label>
        <input
          type="url"
          id="websiteUrl"
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          placeholder="https://yourbusiness.com"
          className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border-medium focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      {/* Row 5: Problem Description */}
      <div>
        <label htmlFor="problemSummary" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
          Brief Project Description or Challenge <span className="text-red-500">*</span>
        </label>
        <textarea
          id="problemSummary"
          required
          rows={4}
          aria-required="true"
          aria-invalid={Boolean(errors.problemSummary)}
          aria-describedby={errors.problemSummary ? 'problemSummary-error' : undefined}
          value={formData.problemSummary}
          onChange={(e) => setFormData({ ...formData, problemSummary: e.target.value })}
          placeholder="Describe your current situation, what is broken or missing, and the outcome you want to achieve..."
          className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
            errors.problemSummary ? 'border-red-400 bg-red-50/20' : 'border-border-medium'
          } focus:outline-none focus:ring-2 focus:ring-teal`}
        />
        {errors.problemSummary && (
          <p id="problemSummary-error" className="text-xs text-red-600 mt-1">
            {errors.problemSummary}
          </p>
        )}
      </div>

      {/* Submit Button & Privacy Notice */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-ivory bg-forest rounded-md hover:bg-forest-light transition-all shadow-subtle disabled:opacity-50"
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

        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Shield className="w-3.5 h-3.5 text-teal flex-shrink-0" />
          <span>
            Data handled in accordance with our{' '}
            <Link href="/privacy" className="text-forest underline hover:text-teal">
              Privacy Policy
            </Link>
            . Zero spam.
          </span>
        </div>
      </div>
    </form>
  );
}

export default function EnquiryForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-charcoal-muted bg-white rounded-xl border border-border-subtle">Loading enquiry interface...</div>}>
      <EnquiryFormContent />
    </Suspense>
  );
}

