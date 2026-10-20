# Production Launch Checklist & Release Gates — RITKARA VEYRA

This checklist outlines the mandatory verification gates and owner approval steps required prior to connecting a custom production domain, removing `noindex` directives, and announcing launch.

---

## Gate 1: Brand & Trademark Clearance
- [ ] **Working Brand Name Confirmation**: Confirm that the trademark search for "RITKARA VEYRA" is cleared for commercial services in India and intended operating jurisdictions.
- [ ] **Enterprise Disclosure Approval**: Verify that the legal disclosure ("Ritkara Veyra is a working brand of Primeora Solutions, Udyam Registered MSME: UDYAM-KR-03-0732181") has been reviewed and approved by the company's founders and legal counsel.
- [ ] **Founder Assets Approval**: Confirm biographies, headshots, and external portfolio links for Affan Ahmed Shariff, Akarsh P. Thodaskar, and Dhananjaya G.R.

---

## Gate 2: Security & Credentials Rotation
- [x] **Zero Secrets in Source**: Verified that `.env*` files are ignored and no passwords/tokens are committed.
- [x] **Signed Admin Sessions**: Verified HMAC-SHA256 session token generation and verification.
- [ ] **Production Secret Rotation**: Generate a unique 64-character hex key for `ADMIN_JWT_SECRET` in Netlify environment variables before production traffic.
- [ ] **Change Initial Admin Password**: Log in to `/admin` and update the default developer password to a strong production passphrase.

---

## Gate 3: Technical SEO, GEO & AEO Readiness
- [x] **Semantic Schema Markup**: Verified JSON-LD `Organization`, `WebSite`, `Service`, and `FAQPage` schemas.
- [x] **XML Sitemap & Robots**: Verified `/sitemap.xml` and `/robots.txt` dynamically generated with zero staging leakage.
- [ ] **Google Search Console**: Submit production `/sitemap.xml` to Google Search Console once custom domain is connected.
- [ ] **Bing Webmaster Tools**: Verify domain ownership and submit sitemap.
- [ ] **Google Business Profile Synchronization**: Ensure services and hours match between website and official GBP profile (`https://g.page/r/CX12e6eETsn3EBM/review`).

---

## Gate 4: Lead Flow & Enquiry Processing
- [x] **Client-Side & Server-Side Validation**: Tested and confirmed with field-specific error messages.
- [x] **Bot Defense**: Tested and verified honeypot trap silently drops automated submissions.
- [x] **Rate Limiting & Duplicate Protection**: Verified that identical repeat submissions within 10 minutes are flagged.
- [x] **Admin Lead Review Queue**: Verified that submissions appear in `/admin` with status management (`new`, `in_review`, `responded`, `archived`).
- [ ] **External Alerts (Optional)**: Connect Slack/Discord webhook or SMTP in Netlify environment variables if instant mobile alerts are desired.

---

## Gate 5: Accessibility & Cross-Device Compatibility
- [x] **WCAG Contrast**: High contrast verified (12.4:1 body text, 8.6:1 headings on ivory canvas).
- [x] **Keyboard Accessibility**: Tab navigation and high-visibility focus rings (`2px solid #0F827A`) verified on all interactive elements.
- [x] **Reduced Motion**: Verified that animations respect `@media (prefers-reduced-motion: reduce)`.
- [x] **Mobile Responsiveness**: Verified fluid layouts across 320px, 375px, 768px, 1024px, and 1440px viewports.

---

## Gate 6: Custom Domain & Deployment Release
- [ ] **Netlify Authentication**: Owner authenticates via Netlify CLI (`npx netlify login`) or links GitHub repo in the Netlify web dashboard.
- [ ] **Custom Domain DNS**: Point DNS records (A record to Netlify IP or CNAME to Netlify subdomain) after owner sign-off.
- [ ] **SSL/TLS Provisioning**: Verify Let's Encrypt automated certificate provisioning on Netlify.
- [ ] **Remove Staging Header**: Remove `noindex, nofollow` header only after final launch approval.
