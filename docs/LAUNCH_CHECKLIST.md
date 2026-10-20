# Production Launch Checklist & Release Gates — RITKARA VEYRA

This checklist outlines the mandatory verification gates and owner approval steps required prior to connecting a custom production domain, removing `noindex` directives, and announcing launch.

---

## Gate 1: Brand & Trademark Clearance
- [ ] **Working Brand Name Confirmation**: Confirm that the trademark search for "RITKARA VEYRA" is cleared for commercial services in India and intended operating jurisdictions.
- [ ] **Enterprise Disclosure Approval**: Verify that the legal disclosure ("Ritkara Veyra is a working brand of Primeora Solutions, Udyam Registered MSME: UDYAM-KR-03-0732181") has been reviewed and approved by the company's founders and legal counsel.
- [x] **Founder Assets & Leadership Seeding**: Biographies and practice roles for Affan Ahmed Shariff, Mohammed Akarsh, and Strategic Advisory Practice verified and seeded into Supabase PostgreSQL.

---

## Gate 2: Security & Credentials Rotation
- [x] **Zero Secrets in Source**: Verified that `.env*` files are ignored and no passwords/tokens are committed.
- [x] **Signed Admin Sessions**: Verified HMAC-SHA256 session token generation and timing-safe verification.
- [x] **Production Secret Rotation**: Unique 64-character hex key generated and provisioned into Netlify environment variables (`ADMIN_JWT_SECRET`).
- [x] **Supabase Auth Provisioning**: Administrators provisioned via Supabase Auth with server-enforced `super_admin` role in `public.admin_profiles`.
- [x] **Default Credential Purge**: All fallback passwords and default seed accounts completely eliminated. Platform operates in fail-closed mode.

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
- [x] **Durable Cloud Persistence**: Verified live enquiry submission from Netlify preview successfully persisted into Supabase PostgreSQL table `public.enquiries`.
- [x] **Admin Lead Review Queue**: Submissions queryable from Supabase with status management (`new`, `in_review`, `responded`, `archived`).

---

## Gate 5: Accessibility & Cross-Device Compatibility
- [x] **WCAG Contrast**: High contrast verified (12.4:1 body text, 8.6:1 headings on ivory canvas).
- [x] **Keyboard Accessibility**: Tab navigation and high-visibility focus rings (`2px solid #0F827A`) verified on all interactive elements.
- [x] **Reduced Motion**: Verified that animations respect `@media (prefers-reduced-motion: reduce)`.
- [x] **Mobile Responsiveness**: Verified fluid layouts across 320px, 375px, 768px, 1024px, and 1440px viewports.

---

## Gate 6: Custom Domain & Deployment Release
- [x] **Netlify Authentication & Project Link**: Site `ritkara` linked to workspace (`8cb70aac-e601-4086-983a-e7fcb1b8cf79`).
- [x] **Live Reviewable Preview Deployed**: Live draft URL generated and verified: `https://6ad78ebcbf3d11d5eeefcabe--ritkara.netlify.app`.
- [x] **GitHub Branch Synchronization**: Branch `feat/ritkara-veyra-transformation` pushed to `https://github.com/affanahmed2302-cmyk/primeora-website.git`.
- [ ] **Custom Domain DNS**: Point DNS records (A record to Netlify IP or CNAME to Netlify subdomain) after owner sign-off.
- [ ] **Production Promotion**: Promote draft to production via `npx netlify deploy --prod` once final sign-off is granted.
