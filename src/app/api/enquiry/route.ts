import { NextRequest, NextResponse } from 'next/server';
import { saveEnquiry, getEnquiries } from '@/lib/cms-store';
import crypto from 'crypto';

// In-memory rate limiting and duplicate check
const submissionsByIp = new Map<string, { count: number; resetTime: number }>();

function sanitize(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // strip potential HTML tags
    .trim()
    .slice(0, 2000); // hard limit to avoid oversized payload
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // 1. Rate Limiting: max 5 submissions per hour per IP
    const record = submissionsByIp.get(ip);
    if (record) {
      if (now < record.resetTime && record.count >= 5) {
        return NextResponse.json(
          { success: false, error: 'Too many submissions from this connection. Please try again later.' },
          { status: 429 }
        );
      }
      if (now >= record.resetTime) {
        submissionsByIp.set(ip, { count: 0, resetTime: now + 60 * 60 * 1000 });
      }
    } else {
      submissionsByIp.set(ip, { count: 0, resetTime: now + 60 * 60 * 1000 });
    }

    const body = await req.json();

    // 2. Honeypot check: `_hp` field must be empty
    if (body._hp && String(body._hp).trim() !== '') {
      // Silently discard bot submission
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    // 3. Extract & Sanitize fields
    const fullName = sanitize(body.fullName);
    const businessName = sanitize(body.businessName);
    const contactEmail = sanitize(body.contactEmail);
    const phone = sanitize(body.phone);
    const serviceInterest = sanitize(body.serviceInterest);
    const problemSummary = sanitize(body.problemSummary);
    const targetTimeline = sanitize(body.targetTimeline);
    const websiteUrl = sanitize(body.websiteUrl);

    // 4. Validate required fields
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide your full name.' }, { status: 400 });
    }
    if (!businessName || businessName.length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide your business or organization name.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid work email address.' }, { status: 400 });
    }
    if (!problemSummary || problemSummary.length < 15) {
      return NextResponse.json(
        { success: false, error: 'Please provide a brief description of your project or challenge (minimum 15 characters).' },
        { status: 400 }
      );
    }

    // 5. Duplicate Submission Prevention
    // Check if the same email submitted an identical problem in the last 10 minutes
    const recentEnquiries = getEnquiries();
    const tenMinutesAgo = new Date(now - 10 * 60 * 1000).toISOString();
    const isDuplicate = recentEnquiries.some(
      (e) =>
        e.contactEmail.toLowerCase() === contactEmail.toLowerCase() &&
        e.problemSummary === problemSummary &&
        e.createdAt > tenMinutesAgo
    );

    if (isDuplicate) {
      return NextResponse.json(
        { success: true, message: 'Your enquiry was already received. Our team will review it shortly.' }
      );
    }

    // Increment rate limiter
    submissionsByIp.get(ip)!.count += 1;

    // Hash IP for privacy before storage
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);

    const saved = saveEnquiry({
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

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your project enquiry has been securely received.',
      enquiryId: saved.id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
