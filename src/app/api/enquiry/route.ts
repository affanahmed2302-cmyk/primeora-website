import { NextRequest, NextResponse } from 'next/server';
import { saveEnquiry, getEnquiries, checkEnquiryRateLimit } from '@/lib/cms-store';
import { sendEnquiryNotification } from '@/lib/notifications';
import { getTrustedClientIp, hashIdentifier } from '@/lib/rate-limiter';
import { readBoundedJson } from '@/lib/request-guard';
import crypto from 'crypto';

// In-memory rate limiting tracker (per-instance defense)
const inMemorySubmissions = new Map<string, { count: number; resetTime: number }>();

function sanitizeText(str: unknown, maxLength: number): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '') // Strip control characters
    .trim()
    .slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Bounded body consumption: Max 32KB stream reader
    const { data: body, error: bodyError, status: bodyStatus } = await readBoundedJson<Record<string, unknown>>(
      req,
      32 * 1024
    );
    if (bodyError || !body) {
      return NextResponse.json(
        { success: false, error: bodyError || 'Invalid request body' },
        { status: bodyStatus || 400 }
      );
    }

    const ip = getTrustedClientIp(req);
    const now = Date.now();
    const ipHash = hashIdentifier(ip);

    // 2. In-Memory Rate Limiting (Defense-in-depth)
    const memRecord = inMemorySubmissions.get(ipHash);
    if (memRecord) {
      if (now < memRecord.resetTime && memRecord.count >= 5) {
        return NextResponse.json(
          { success: false, error: 'Too many submissions. Please wait before submitting another enquiry.' },
          { status: 429 }
        );
      }
      if (now >= memRecord.resetTime) {
        inMemorySubmissions.set(ipHash, { count: 0, resetTime: now + 60 * 60 * 1000 });
      }
    } else {
      inMemorySubmissions.set(ipHash, { count: 0, resetTime: now + 60 * 60 * 1000 });
    }

    // 3. Durable Database Rate Limiting (Cross-serverless invocation check)
    const isAllowedByDurableRateLimiter = await checkEnquiryRateLimit(ipHash);
    if (!isAllowedByDurableRateLimiter) {
      return NextResponse.json(
        { success: false, error: 'Too many enquiries submitted from this network. Please try again in an hour.' },
        { status: 429 }
      );
    }



    // 4. Honeypot check (_hp must be absent or empty)
    if (body._hp && String(body._hp).trim() !== '') {
      // Silently return success to bot without saving
      return NextResponse.json({ success: true, message: 'Enquiry received successfully.' });
    }

    // 5. Bot Timing Check (_ts must not be sub-second)
    if (body._ts && typeof body._ts === 'number') {
      const elapsed = now - body._ts;
      if (elapsed > 0 && elapsed < 1500) {
        // Form submitted in under 1.5 seconds indicates automated script
        return NextResponse.json({ success: true, message: 'Enquiry received successfully.' });
      }
    }

    // 6. Field Extraction & Strict Sanitization
    const fullName = sanitizeText(body.fullName, 100);
    const businessName = sanitizeText(body.businessName, 120);
    const contactEmail = sanitizeText(body.contactEmail, 255).toLowerCase();
    const phone = sanitizeText(body.phone, 30);
    const serviceInterest = sanitizeText(body.serviceInterest, 100);
    const problemSummary = sanitizeText(body.problemSummary, 2000);
    const targetTimeline = sanitizeText(body.targetTimeline, 100);
    const websiteUrl = sanitizeText(body.websiteUrl, 255);

    // 7. Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide your full name (at least 2 characters).' }, { status: 400 });
    }
    if (!businessName || businessName.length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide your business or organization name.' }, { status: 400 });
    }

    // Strict RFC 5322 compliant regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid business email address.' }, { status: 400 });
    }

    if (!problemSummary || problemSummary.length < 15) {
      return NextResponse.json(
        { success: false, error: 'Please provide a brief description of your project or challenge (minimum 15 characters).' },
        { status: 400 }
      );
    }

    if (phone && !/^[0-9+\s\-().]{7,25}$/.test(phone)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid phone number format.' }, { status: 400 });
    }

    // 8. Duplicate Submission Prevention (10-minute duplicate window)
    const recentEnquiries = await getEnquiries();
    const tenMinutesAgo = new Date(now - 10 * 60 * 1000).toISOString();
    const isDuplicate = recentEnquiries.some(
      (e) =>
        e.contactEmail.toLowerCase() === contactEmail &&
        e.problemSummary === problemSummary &&
        e.createdAt > tenMinutesAgo
    );

    if (isDuplicate) {
      return NextResponse.json({
        success: true,
        message: 'Your enquiry was already received. Our consulting team will review it shortly.',
      });
    }

    // 9. Increment in-memory rate limiter
    inMemorySubmissions.get(ipHash)!.count += 1;

    // 10. Persist enquiry
    const saved = await saveEnquiry({
      fullName,
      businessName,
      contactEmail,
      phone,
      serviceInterest: serviceInterest || 'General Enquiry',
      problemSummary,
      targetTimeline,
      websiteUrl,
      ipHash,
    });

    // 11. Trigger email notification (non-blocking for client responsiveness)
    sendEnquiryNotification(saved).catch((err) => {
      console.warn('[Notification Error]', err);
    });

    // 12. Operational Audit Logging (ZERO PII — strictly non-identifiable metrics)
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[Enquiry Audit] ID: ${saved.id} | IP Hash: ${ipHash} | Status: Received`);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your project enquiry has been securely received.',
      enquiryId: saved.id,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
