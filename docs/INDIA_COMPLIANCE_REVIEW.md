# PRIMEORA SOLUTIONS — INDIA LEGAL & REGULATORY COMPLIANCE REVIEW

**Document Reference:** `DOC-LEGAL-IND-2026-V1`  
**Date of Audit:** 21 October 2026  
**Operating Entity:** PRIMEORA SOLUTIONS  
**Udyam Registration Number:** `UDYAM-KR-03-0732181` (Ministry of MSME, Government of India)  
**Registered Principal Address:** 1st Floor, #11, Affan Ahmed Shariff Building, Bangalore North, Bengaluru (Urban), Karnataka 560023, India  
**Official Communication Channels:** `PrimeoraSolutions.in@gmail.com` | `contact@primeorasolutions.com` | `+91 94807 51817`  
**Statutory Review Scope:** Digital Personal Data Protection Act, 2023; DPDP Rules, 2025; Information Technology Act, 2000; CERT-In Cybersecurity Directions (April 2022); Consumer Protection (E-Commerce) Rules, 2020.

---

## 1. Executive Summary & Regulatory Stance

This document provides an exhaustive, source-grounded legal and regulatory compliance audit for **Primeora Solutions** across its public web property (`https://primeora-solutions.netlify.app`), administrative portal (`/admin`), backend APIs, data pipelines, and client engagement operations.

The enterprise is currently registered as a **Micro Enterprise (Services)** under the Udyam Registration scheme of the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India. The business provides bespoke software architecture, enterprise web platforms, and digital consulting services (NIC Codes 62011, 62012, 62020, 73100).

### Key Audit Findings & Compliance Posture
1. **DPDP Act, 2023 & DPDP Rules, 2025 Readiness:** The website and inquiry workflow have been proactively engineered with granular consent notices (Section 5), unbundled acceptance checkboxes (Section 6), purposeful data minimization, localized data storage in AWS Mumbai (`ap-south-1`), and explicit Data Principal rights pathways (Sections 11–14). The phased commencement schedule has been mapped with precision.
2. **CERT-In Directions (April 2022):** The administrative authentication and enquiry APIs maintain salted SHA-256 IP hashes and audit records designed to support the statutory 180-day log retention mandate and 6-hour cybersecurity incident reporting window without exposing plaintext user identities.
3. **Consumer Protection & E-Commerce Disclosures:** Required legal entity details, registered geographical location in Bengaluru North, customer support coordinates, and Grievance Officer details are published in the website footer, Privacy Policy, and Terms of Service.
4. **Corporate Formalization Advisory:** The enterprise is currently structured under an individual Udyam proprietorship registration. Because Primeora Solutions is governed by three co-founders (**Dhananjaya G.R.**, **Affan Ahmed Shariff**, and **Akarsh P. Thodaskar**), corporate incorporation as a **Private Limited Company** (or LLP) is recommended to formally partition equity, institutionalize contracts, register GSTIN, and secure trademark ownership under Class 42.

---

## 2. Digital Personal Data Protection Act, 2023 (DPDP Act) & Rules, 2025

### 2.1 Statutory Context & Phased Commencement Schedule
The **Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)** was passed by both Houses of the Indian Parliament and received Presidential assent on **11 August 2023**.

The Ministry of Electronics and Information Technology (MeitY) subsequently published the draft **Digital Personal Data Protection Rules, 2025**. Under the published regulatory framework, implementation follows a strict **phased commencement schedule**:
- **Phase 1 (Immediate / Q4 2026 — Rule 4 Commencement):**  
  *Rule 4* (Mandatory notice format under Section 5, plain language itemization of personal data, and purpose specification) enters into full statutory effect on **November 13, 2026**.
- **Phase 2 (18 Months Post-Notification — May 2027 Commencement):**  
  *Rule 3* (Registration and technical standards for Consent Managers), *Rules 5 through 16* (Data Fiduciary obligations, reasonable security safeguards, personal data breach notification to the Data Protection Board of India [DPBI] and data principals, data principal rights workflows, grievance redressal turnaround, and processing of children's data), *Rule 22* (Powers of the Data Protection Board of India), and *Rule 23* (Appeals to TDSAT) commence **18 months post-publication (May 2027)**.

*Compliance Assessment:* Primeora Solutions has implemented Phase 1 and Phase 2 controls immediately in the current application code rather than waiting for enforcement deadlines.

---

### 2.2 Core Statutory Mandates & Technical Implementation Status

| DPDP Statutory Section | Statutory Mandate | Primeora Solutions Technical Implementation | Status |
|---|---|---|---|
| **Section 5 (Notice)** | Every request for consent must be accompanied or preceded by a notice in clear, plain language specifying categories of personal data, purpose of processing, means to exercise rights, and Grievance Officer contact. | The enquiry form at `/contact` displays an unbundled notice at the point of data entry. The comprehensive statutory notice is published at `/privacy`, itemizing project enquiry data, telemetry, and contact details. | **COMPLIANT** |
| **Section 6 (Consent)** | Consent must be free, specific, informed, unconditional, and an unambiguous indication through affirmative action. Pre-ticked boxes are legally invalid. | In `src/app/contact/page.tsx`, the consent checkbox (`termsAccepted`) is **un-ticked by default**, requires an active click, and explicitly links to `/privacy` and `/terms`. | **COMPLIANT** |
| **Section 8(1) (Data Fiduciary Obligations)** | Compliance with the Act irrespective of whether processing is undertaken directly or through a Data Processor. | Primeora Solutions maintains direct control over database records and notification webhooks. Supabase and Netlify are configured under strict service role boundaries. | **COMPLIANT** |
| **Section 8(5) (Security Safeguards)** | Data Fiduciaries must implement reasonable security safeguards to prevent personal data breaches. | 1. TLS 1.3 encryption in transit across all endpoints.<br>2. AES-256 encryption at rest in PostgreSQL.<br>3. Row Level Security (RLS) enabled on all tables.<br>4. HMAC-SHA256 authenticated administrative sessions.<br>5. Temporary passwords expire in 24 hours with forced change.<br>6. Recovery tokens expire in 15 minutes with 5-attempt rate-limiting lockout. | **COMPLIANT** |
| **Section 8(6) (Breach Notification)** | Mandatory notification of personal data breach to the Data Protection Board of India (DPBI) and affected Data Principals in the prescribed form and manner. | Incident response protocol documented in `docs/INCIDENT_RESPONSE.md` specifying notification templates and contact points for the DPBI. | **READY** |
| **Section 8(7) (Data Erasure)** | Data Fiduciaries must erase personal data as soon as the specified purpose is no longer served or consent is withdrawn. | Retention policy codified: Enquiry submissions retained for maximum 24 months post-resolution, then permanently deleted or anonymized. | **COMPLIANT** |
| **Section 11 (Access Right)** | Data Principal's right to obtain a summary of personal data and sharing identities. | Procedure enabled via Grievance Officer email with identity verification protocol. | **COMPLIANT** |
| **Section 12 (Correction & Erasure)** | Right to correction of inaccurate data and erasure of obsolete data. | Handled via self-service email to `PrimeoraSolutions.in@gmail.com` with mandatory 30-day turnaround. | **COMPLIANT** |
| **Section 13 (Grievance Redressal)** | Right to readily available grievance redressal mechanism with designated officer details. | Grievance Officer prominently disclosed in `/privacy` with email, phone, and postal address in Bengaluru. | **COMPLIANT** |
| **Section 14 (Right to Nominate)** | Right to nominate an individual to act on behalf of the Data Principal in the event of death or incapacity. | Included in statutory privacy policy section 5. | **COMPLIANT** |
| **Section 16 (Cross-Border Transfer)** | Personal data may be transferred outside India unless restricted by Central Government notification, subject to local localization rules. | **Primary database is stationed in India:** AWS region `ap-south-1` (Mumbai). Web application CDN edge nodes cache only static assets without persisting personal records abroad. | **COMPLIANT** |

---

### 2.3 Penalty Exposure Under Section 33 & Schedule
Failure to implement adequate safeguards under the DPDP Act carries severe financial penalties enforced by the Data Protection Board of India (DPBI):
- **Up to ₹250 Crore:** Failure to take reasonable security safeguards to prevent personal data breach (Section 8(5)).
- **Up to ₹200 Crore:** Failure to notify the Board and affected Data Principals of a personal data breach (Section 8(6)).
- **Up to ₹200 Crore:** Non-fulfillment of specific obligations in relation to children (Section 9). *(Note: Primeora Solutions is a B2B commercial consulting enterprise that does not target or process personal data of minors).*
- **Up to ₹50 Crore:** Significant non-compliance with other statutory provisions or conditions of registration.

*Risk Mitigation:* The architectural safeguards (RLS, audit logs, IP masking, rate limiting, and zero plaintext credential storage) directly insulate Primeora Solutions from Section 8(5) exposure.

---

## 3. Information Technology Act, 2000 & Subordinate Regulations

### 3.1 SPDI Rules, 2011 (Interim Transitional Standard)
Until the full notification of DPDP Act rules, the *Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011* remain applicable under Section 43A of the IT Act, 2000.
- **Applicability:** Contact inquiries collect business email and contact numbers (classified as Personal Information), but do not collect passwords of end-clients, financial cards, or biometric data (Sensitive Personal Data).
- **Compliance Status:** The comprehensive Privacy Policy at `/privacy` satisfies Rule 4 (policy publication), Rule 5 (consent prior to collection), and Rule 8 (reasonable security practices).

### 3.2 CERT-In Cybersecurity Directions (April 2022)
Under Section 70B(6) of the Information Technology Act, 2000, the Indian Computer Emergency Response Team (CERT-In) issued mandatory cybersecurity directions (Direction No. 20(3)/2022-CERT-In dated 28 April 2022).
- **6-Hour Incident Reporting Mandate:** Any cybersecurity incident (including unauthorized access to database, compromised administrator credentials, or ransomware attack) must be reported to CERT-In (`incident@cert-in.org.in`) within **6 hours** of noticing or being brought to notice.
- **180-Day Log Retention Mandate:** System logs, administrative access journals, and firewall/traffic records must be retained for a mandatory rolling period of **180 days within the Indian jurisdiction**.
- **Implementation Status:**  
  *Audit Table `public.auth_audit_logs`:* Records administrator logins, credential resets, and security events with timestamps and SHA-256 hashed IPs. Logs are preserved in PostgreSQL (AWS Mumbai).

### 3.3 Intermediary Guidelines & Digital Media Ethics Code Rules, 2021
- **Rule 3(2) (Grievance Redressal):** Requirement to designate a Grievance Officer whose name and contact details are published on the website.
- **Implementation Status:** Published in `/privacy`, `/terms`, and website footer. Grievance acknowledgement turnaround: within 48 hours; final resolution: within 30 days.

---

## 4. Consumer Protection (E-Commerce) Rules, 2020 & Commercial Terms

Although Primeora Solutions provides B2B software engineering and digital advisory rather than direct-to-consumer retail, the *Consumer Protection (E-Commerce) Rules, 2020* apply broadly to digital service providers transacting or generating commercial leads electronically.

### Mandatory Commercial Disclosures Audit
1. **Legal Entity Name:** `PRIMEORA SOLUTIONS` disclosed across all public pages.
2. **Principal Geographic Address:** 1st Floor, #11, Affan Ahmed Shariff Building, Bangalore North, Bengaluru (Urban), Karnataka 560023.
3. **Contact Channels:** Dedicated corporate email (`PrimeoraSolutions.in@gmail.com`) and phone (`+91 94807 51817`).
4. **Pricing Transparency:** The website clearly states that package ranges and service tiers are for initial commercial scoping and do not constitute unilateral binding offers; formal work proceeds under customized Master Services Agreements (MSAs) and Statements of Work (SOWs).
5. **Governing Law & Dispute Resolution:** Explicitly designated as the laws of the **Republic of India**, with exclusive judicial jurisdiction vested in the competent civil courts of **Bengaluru (Urban), Karnataka**.

---

## 5. Enterprise Registration & Business Structure Audit

### 5.1 Verification of Official Registration Record
An inspection of the official registration document (`D:\Primeora_Solutions\Documents\Print _ Udyam Registration Certificate (1).pdf`) establishes the following authoritative facts:

| Certificate Attribute | Official Verified Value |
|---|---|
| **Enterprise Name** | **PRIMEORA SOLUTIONS** |
| **Udyam Registration Number** | `UDYAM-KR-03-0732181` |
| **Classification** | Micro Enterprise |
| **Major Activity** | Services |
| **Enterprise Type** | Sole Proprietorship (registered under Affan Ahmed Shariff) |
| **State / District** | Karnataka / Bengaluru (Urban) |
| **Sub-District / City** | Bangalore North / Bengaluru |
| **Official Address** | 1st Floor, #11, Affan Ahmed Shariff Building, Bangalore North, Karnataka 560023 |
| **Official Email** | `PrimeoraSolutions.in@gmail.com` |
| **Official Mobile** | `9480751817` |
| **Date of Incorporation** | Registered 2026 |
| **National Industry Classification (NIC)** | **62011:** Writing, modifying, testing of bespoke software.<br>**62012:** Writing of generic computer software.<br>**62020:** Computer consultancy and facilities management.<br>**73100:** Creative advertising and brand strategy. |

---

### 5.2 Business Structure Analysis & Recommendations
1. **Current Sole Proprietorship Limitation:**  
   The current registration is a Sole Proprietorship registered under co-founder Affan Ahmed Shariff's premises. Under Indian law, a sole proprietorship does not possess an independent legal identity separate from the proprietor, nor does it provide limited liability protection.
2. **Founder Equity & Multi-Founder Alignment:**  
   The enterprise has three active co-founders:
   - **Dhananjaya G.R.** (Co-Founder & Technology Lead)
   - **Affan Ahmed Shariff** (Co-Founder & Business Lead)
   - **Akarsh P. Thodaskar** (Co-Founder & Operations Lead)  
   In a sole proprietorship, co-founders cannot hold equity shares or formal board directorships under the Companies Act, 2013.
3. **Recommended Corporate Transformation (Immediate Priority):**  
   - **Incorporate as a Private Limited Company (Pvt Ltd):** Incorporate *Primeora Solutions Private Limited* through the Ministry of Corporate Affairs (MCA) SPICe+ portal, allocating equity shares and directorships to all three founders.
   - **Alternative (LLP):** Form a *Limited Liability Partnership (LLP)* under the Limited Liability Partnership Act, 2008 with a registered LLP Agreement detailing profit-sharing ratios and partner capital contributions.
   - **Obtain Corporate GSTIN:** Once incorporated, obtain a dedicated Goods and Services Tax Identification Number (GSTIN) under Karnataka jurisdiction (State Code: 29).
   - **Trademark Protection:** File a trademark application for the wordmark `PRIMEORA SOLUTIONS` and the geometric emblem under **Class 42** (Software, Technology, and Cloud Solutions) with the Trade Marks Registry, Controller General of Patents, Designs and Trade Marks (CGPDTM), Chennai/Bengaluru branch.

---

## 6. Website-Specific Compliance Audit & Code Review

### 6.1 Enquiry Collection Workflow (`/contact`)
- **Point-of-Collection Notice:** Implemented above the submit button in `src/app/contact/page.tsx`.
- **Consent Mechanism:** Checkbox is unchecked by default. The submission handler rejects submissions without explicit affirmative consent.
- **Data Minimization:** Only collects: Name, Email, Organization, Service Category, and Scope Notes. No personal home addresses, Aadhaar, or financial data are requested.
- **Bot & Spam Mitigation:** Backend rate-limits submissions (max 5 per hour per IP) and verifies email syntax before dispatching notifications.

### 6.2 Cookie Consent & Tracking Telemetry
- **Interactive Cookie Banner:** Renders on first visit with clear "Accept All", "Decline Non-Essential", and "Configure" options.
- **Consent Persistence:** User choices stored in `localStorage` under `primeora_cookie_consent`.
- **Granular Cookie Portal (`/cookie-preferences`):** Users can toggle Performance/Analytics cookies on or off at any time.
- **Third-Party Script Blocking:** Google Analytics 4 is initialized **only** when `analytics === true`. No third-party ad pixels (e.g. Meta, TikTok, LinkedIn) are loaded without consent.

### 6.3 Administrative Portal Security (`/admin`)
- **Authentication:** Backed by Supabase Auth and database-enforced roles in `admin_profiles`.
- **Session Tokens:** HMAC-SHA256 signed with 8-hour expiry; stored in `HttpOnly`, `SameSite=Lax`, `Secure` cookies.
- **Forced Password Change:** If `must_change_password === true`, all management APIs (`/api/admin/enquiries`, `/api/admin/team`) return HTTP 403 Forbidden until a permanent 10+ character password is saved.
- **Audit Logging:** All administrative logins, temporary credential usage, password updates, and recovery requests are logged to `public.auth_audit_logs`.

---

## 7. Prioritized Remediation Roadmap

```mermaid
flowchart TD
    subgraph Phase 1 [Phase 1: Code & Security Controls - COMPLETED]
        P1A["Unbundled Consent Checkbox on /contact"]
        P1B["DPDP Act Statutory Privacy Notice on /privacy"]
        P1C["Terms of Service with Bengaluru Jurisdiction"]
        P1D["180-Day Audit Logging & Rate Limiting"]
        P1E["Forced Password Change Enforcement"]
    end

    subgraph Phase 2 [Phase 2: Corporate Formalization - RECOMMENDED]
        P2A["MCA SPICe+ Private Limited Incorporation"]
        P2B["Founders' Equity Agreement & SHA"]
        P2C["State GSTIN Registration (Code 29)"]
        P2D["Class 42 Trademark Filing for Primeora Solutions"]
    end

    subgraph Phase 3 [Phase 3: Statutory Milestones]
        P3A["Nov 13, 2026: DPDP Rule 4 Notice Compliance"]
        P3B["May 2027: DPDP Rules 5-16 Full Enforcement"]
        P3C["Continuous CERT-In 6-Hour Incident Readiness"]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
```

### Action Items for Enterprise Founders & Legal Counsel
1. **Corporate Secretary / CA Consultation:** Engage a practicing Company Secretary or Chartered Accountant in Bengaluru to execute the incorporation of *Primeora Solutions Private Limited*.
2. **Custom Domain Transactional Email Setup:** Configure custom SMTP records (SPF, DKIM, DMARC) for `@primeorasolutions.com` in Supabase Auth to ensure delivery of password recovery emails from the official domain.
3. **Data Protection Board Review:** Monitor MeitY notifications regarding the formal constitution and portal launch of the Data Protection Board of India (DPBI).

---

*This compliance review is grounded in the statutory text of the Digital Personal Data Protection Act, 2023, the draft DPDP Rules, 2025, CERT-In directions, and official MSME registration documentation.*
