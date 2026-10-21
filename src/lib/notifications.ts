import { EnquirySubmission } from '@/types';
import { updateEnquiry, getEnquiries } from './cms-store';

const COMPANY_NOTIFICATION_EMAIL = process.env.COMPANY_NOTIFICATION_EMAIL || 'primeorasolutions.in@gmail.com';
const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeora-solutions.netlify.app';

export async function sendEnquiryNotification(
  enquiry: EnquirySubmission
): Promise<{ success: boolean; status: 'sent' | 'failed' | 'pending_config'; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Check if transactional provider is configured
  if (!resendApiKey) {
    const errorMsg = 'Transactional email provider not configured. Add RESEND_API_KEY to Netlify environment variables.';
    await updateEnquiry(enquiry.id, {
      notificationStatus: 'pending_config',
      notificationError: errorMsg,
    });
    return { success: false, status: 'pending_config', error: errorMsg };
  }

  // 2. Format transactional email HTML & plain text
  const adminInboxUrl = `${APP_URL}/admin/enquiries`;
  const subject = `[New Enquiry] ${enquiry.businessName} — ${enquiry.serviceInterest}`;
  
  const textBody = `
New Project Enquiry Received — Primeora Solutions

Customer: ${enquiry.fullName}
Business: ${enquiry.businessName}
Email: ${enquiry.contactEmail}
Phone: ${enquiry.phone || 'Not provided'}
Service Practice: ${enquiry.serviceInterest}
Timeline: ${enquiry.targetTimeline || 'Not specified'}
Website: ${enquiry.websiteUrl || 'Not provided'}

Project Summary:
${enquiry.problemSummary}

Submitted At: ${enquiry.createdAt}
Triage in Admin Inbox: ${adminInboxUrl}
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Enquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FBF9F5; padding: 24px; color: #191817;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E6DFD5; border-radius: 8px; padding: 32px;">
    <div style="border-bottom: 2px solid #C25E38; padding-bottom: 16px; margin-bottom: 24px;">
      <h2 style="margin: 0; color: #191817; font-size: 20px;">Primeora Solutions — Inbound Enquiry</h2>
      <p style="margin: 4px 0 0 0; color: #6E6862; font-size: 13px;">New commercial project submission</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #6E6862; width: 140px;">Customer Name:</td>
        <td style="padding: 8px 0; color: #191817; font-weight: 600;">${enquiry.fullName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6862;">Business Entity:</td>
        <td style="padding: 8px 0; color: #191817; font-weight: 600;">${enquiry.businessName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6862;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${enquiry.contactEmail}" style="color: #C25E38; text-decoration: none;">${enquiry.contactEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6862;">Phone:</td>
        <td style="padding: 8px 0; color: #191817;">${enquiry.phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6862;">Practice Pillar:</td>
        <td style="padding: 8px 0; color: #191817; font-weight: 600;">${enquiry.serviceInterest}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6862;">Timeline:</td>
        <td style="padding: 8px 0; color: #191817;">${enquiry.targetTimeline || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6862;">Website URL:</td>
        <td style="padding: 8px 0; color: #191817;">${enquiry.websiteUrl ? `<a href="${enquiry.websiteUrl}" style="color: #C25E38;">${enquiry.websiteUrl}</a>` : 'Not provided'}</td>
      </tr>
    </table>

    <div style="background-color: #F7F4EE; border-left: 3px solid #C25E38; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #6E6862; letter-spacing: 0.05em;">Project Summary & Challenge</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #191817; white-space: pre-wrap;">${enquiry.problemSummary}</p>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${adminInboxUrl}" style="display: inline-block; background-color: #C25E38; color: #FFFFFF; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
        Open Admin Inbox &rarr;
      </a>
    </div>

    <p style="margin-top: 32px; font-size: 12px; color: #8C867E; text-align: center; border-top: 1px solid #E6DFD5; padding-top: 16px;">
      Primeora Solutions • Digital Systems Architecture • Bangalore, India
    </p>
  </div>
</body>
</html>
`.trim();

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Primeora Inbound <onboarding@resend.dev>',
        to: [COMPANY_NOTIFICATION_EMAIL],
        reply_to: enquiry.contactEmail,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (res.ok) {
      await updateEnquiry(enquiry.id, {
        notificationStatus: 'sent',
        notificationError: undefined,
      });
      return { success: true, status: 'sent' };
    } else {
      const errData = await res.json().catch(() => ({ message: res.statusText }));
      const errorMsg = `Resend API rejected with HTTP ${res.status}: ${errData.message || JSON.stringify(errData)}`;
      await updateEnquiry(enquiry.id, {
        notificationStatus: 'failed',
        notificationError: errorMsg,
      });
      return { success: false, status: 'failed', error: errorMsg };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error during notification dispatch';
    await updateEnquiry(enquiry.id, {
      notificationStatus: 'failed',
      notificationError: errorMsg,
    });
    return { success: false, status: 'failed', error: errorMsg };
  }
}

export async function retryEnquiryNotification(
  id: string
): Promise<{ success: boolean; status: string; error?: string }> {
  const enquiries = await getEnquiries();
  const enquiry = enquiries.find((e) => e.id === id);
  if (!enquiry) {
    return { success: false, status: 'not_found', error: 'Enquiry not found' };
  }

  return sendEnquiryNotification(enquiry);
}
