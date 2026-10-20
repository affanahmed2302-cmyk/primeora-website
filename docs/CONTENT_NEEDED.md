# Content & Asset Catalog — Primeora Solutions

## 1. Verified & Integrated Assets

The following core assets and identity elements have been verified, authored, and integrated into the production build:

| Item | File / Location | Status | Details |
| :--- | :--- | :--- | :--- |
| **Brand Mark (Emblem)** | `public/brand/primeora-emblem.svg`<br>`public/brand/emblem-transparent.png`<br>`public/brand/emblem.png` | Integrated | Scalable vector SVG and 512x512 raster PNGs. Faceted prism letter "P" with electric azure & violet gradients. |
| **Brand Lockup (Wordmark)** | `public/brand/primeora-logo.svg`<br>`src/components/brand/PrimeoraLogo.tsx` | Integrated | Horizontal lockup with "PRIMEORA SOLUTIONS" in Space Grotesk. |
| **OpenGraph Master Image** | `public/brand/primeora-master.png` | Integrated | 1200x630 high-resolution social preview image. |
| **Favicon & Apple Touch** | `public/favicon.ico`<br>`public/brand/emblem.png` | Integrated | Multi-size icons referenced in `src/app/layout.tsx`. |
| **Founders Profiles & Links** | `src/config/brand.ts`<br>Supabase `team_members` | Integrated | 3 confirmed partners: Affan Ahmed Shariff (LinkedIn + Portfolio), Akarsh P. Thodaskar (LinkedIn), Dhananjaya G.R. (LinkedIn). |
| **MSME Udyam Registration** | `src/config/brand.ts`<br>Footer & About pages | Integrated | `UDYAM-KR-03-0732181`, Micro Enterprise, NIC 62011, Bangalore, Karnataka. |
| **Contact Email** | `src/config/brand.ts`<br>Contact, Footer, Privacy | Integrated | `primeorasolutions.in@gmail.com`. |
| **Six Connected Pillars** | `src/config/brand.ts`<br>`/services` | Integrated | Digital Presence, Customer Acquisition, Lead & Sales System, Operations & Automation, Analytics & Insights, Ongoing Management. |
| **Methodology** | `src/config/brand.ts`<br>`/process` | Integrated | 4 steps: Discovery, Blueprint, Build & Launch, Grow & Optimize. |
| **Readiness Diagnostic** | `src/components/DigitalReadinessAssessment.tsx` | Integrated | 4-step interactive operational assessment with instant maturity score. |
| **Case Models** | `/work`, Homepage | Integrated | 3 Illustrative Workflow Demonstrations (Specialist Clinic, B2B Engineering, Wholesale Manufacturing) with explicit hypothetical disclosures. |

---

## 2. Optional Production Assets (To Be Supplied by Client If Desired)

| Item | Purpose | Current Production State | Client Action When Available |
| :--- | :--- | :--- | :--- |
| **Founder Headshot Photos** | Profile imagery on `/about` and `/` | Using stylized monogram avatars and fallback initials in electric azure styling | Upload high-resolution square JPG/PNG photos (400x400) to `/public/brand/team/` or via Supabase Storage. |
| **Google Analytics 4 Measurement ID** | Live aggregate traffic analytics | Configured to load only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and visitor grants consent | Add `G-XXXXXXXXXX` to Netlify environment variables if traffic measurement is desired. |
| **Lead Notification Webhook** | Instant Slack/Discord ping on new enquiry | Handled by Supabase enquiry table and email fallback | Add `SLACK_LEAD_WEBHOOK_URL` or `DISCORD_LEAD_WEBHOOK_URL` to Netlify environment variables if instant team chat notifications are desired. |
| **Custom Domain DNS** | Production domain mapping | Deployed on Netlify preview (`https://primeora-solutions.netlify.app`) | Point `primeorasolutions.com` CNAME and ALIAS/ANAME records to Netlify per `docs/DEPLOYMENT.md`. |
