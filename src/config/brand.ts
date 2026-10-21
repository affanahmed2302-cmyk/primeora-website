import { ServicePillar, PackageTier, ProcessStep, TeamMember } from '@/types';

export const BRAND_CONFIG = {
  // Brand identity (central configuration)
  name: 'PRIMEORA SOLUTIONS',
  shortName: 'Primeora Solutions',
  tagline: 'Digital Systems Engineered for Measurable Growth',
  description:
    'A strategy and technology engineering consultancy helping businesses build resilient digital presence, connected enquiry systems, practical workflow automation, and clear performance intelligence.',

  // Legal & Enterprise Details
  legalEntity: 'Primeora Solutions',
  udyamRegistrationNumber: 'UDYAM-KR-03-0732181',
  udyamStatus: 'Udyam Registered MSME (Micro Enterprise, NIC 62011)',
  registeredAddress:
    '1st Floor, #11, Affan Ahmed Shariff Building, Bangalore North, Bengaluru (Urban), Karnataka 560023, India',
  officialEmail: 'PrimeoraSolutions.in@gmail.com',
  contactPhone: '+91 94807 51817',
  legalNotice:
    'Primeora Solutions (Udyam Registered MSME: UDYAM-KR-03-0732181). All client contracts, service agreements, and formal proposals are executed directly by Primeora Solutions.',
  location: 'Bangalore, Karnataka, India (PIN 560023)',

  // Contact & Channels
  contactEmail: 'primeorasolutions.in@gmail.com',
  enquiryEmail: 'primeorasolutions.in@gmail.com',
  gbpUrl: 'https://g.page/r/CX12e6eETsn3EBM/review',
  instagramUrl: 'https://instagram.com/primeorasolutions',

  // Master Brand Visual Assets (Extracted directly from authentic Logo_assets)
  assets: {
    logo: '/brand/primeora-logo-dark.png',
    logoDark: '/brand/primeora-logo-dark.png',
    logoLight: '/brand/primeora-logo-light.png',
    logoMaster: '/brand/primeora-logo-dark.png',
    logoCropped: '/brand/primeora-logo-dark.png',
    emblem: '/brand/primeora-emblem.png',
    emblemSolid: '/brand/primeora-emblem.png',
    appIcon: '/brand/primeora-app-icon.png',
  },

  // Brand Color Palette (Derived strictly from authentic Logo_assets)
  colors: {
    canvas: '#040D1A',          // Deep midnight navy canvas
    surface: '#08152B',         // Architectural surface
    surfaceElevated: '#0E1F3D', // Elevated card surface
    border: 'rgba(255, 255, 255, 0.08)',
    blue: '#166CFF',            // Authentic Primeora cobalt royal blue
    blueHover: '#1055CC',
    blueLight: '#3B82F6',
    white: '#F8FAFC',           // Optical crisp white
    slate: '#94A3B8',           // Supporting slate neutral
    slateMuted: '#64748B',
    // Backwards-compatible aliases
    obsidian: '#040D1A',
    navy: '#08152B',
    azure: '#166CFF',
    azureLight: '#3B82F6',
    violet: '#166CFF',
    platinum: '#F8FAFC',
    forest: '#08152B',
    teal: '#166CFF',
    ivory: '#040D1A',
    copper: '#166CFF',
    charcoal: '#F8FAFC',
  },

  // Primary Navigation Links (Actual routes)
  navLinks: [
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Founders', href: '/founders' },
    { label: 'Readiness', href: '/readiness' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'digital-presence',
    title: 'Digital Presence',
    badge: 'Foundation',
    shortDescription:
      'Engineered business websites, e-commerce stores, and digital brand infrastructure designed for durability, speed, and clear customer orientation.',
    targetProblem:
      'Businesses often rely on outdated template builders, broken mobile layouts, slow loading speeds, or fragmented social accounts that fail to communicate credibility or capture enquiries.',
    deliverablesSummary: [
      'Bespoke, responsive business websites',
      'High-conversion e-commerce stores',
      'Brand typography and digital identity systems',
      'Google Business Profile setup and audit',
      'DNS, domain, and professional email setup',
    ],
    services: [
      {
        title: 'Business Website Development',
        description:
          'Custom-built, fast-loading, responsive business websites engineered for clear communication, high accessibility, and search indexability.',
        deliverables: ['Custom frontend & backend', 'Semantic HTML5 structure', 'Mobile-first layout', 'Content management handoff'],
        clientInputs: ['Approved text copy', 'High-res brand assets', 'Domain registrar access'],
        dependencies: ['Hosting infrastructure', 'Domain registrar propagation'],
        exclusions: ['Unlimited third-party stock photo purchases', 'Unscoped custom application modules'],
      },
      {
        title: 'E-commerce Website Development',
        description:
          'Robust online stores with clear product catalogues, secure checkout experiences, tax compliance structures, and payment gateway integrations.',
        deliverables: ['Catalogue setup', 'Payment gateway integration', 'Automated order confirmations', 'Shipping rule configuration'],
        clientInputs: ['Product pricing & SKU metadata', 'Gateway merchant credentials', 'Shipping policies'],
        dependencies: ['Bank approval for merchant gateway', 'Logistics API accounts'],
        exclusions: ['Payment processor transaction commissions', 'Physical warehouse management'],
      },
      {
        title: 'Google Business Profile & Local Foundation',
        description:
          'Comprehensive setup and optimization of your local Google Business Profile to represent accurate operating hours, service categories, and contact points.',
        deliverables: ['Category selection & mapping', 'Service catalogue configuration', 'Attributes audit', 'Verification guidance'],
        clientInputs: ['Physical business verification documents', 'Official business photos'],
        dependencies: ['Google platform verification processes'],
        exclusions: ['Guaranteed #1 local rankings', 'Removal of legitimate user reviews outside platform policy'],
      },
    ],
    faqs: [
      {
        question: 'How long does a custom business website build take?',
        answer:
          'A typical bespoke 5-to-8 page business website takes 2 to 4 weeks from signed proposal and complete content submission through design, engineering, QA, and deployment.',
      },
      {
        question: 'Who owns the website and code after launch?',
        answer:
          'The client owns all custom website code, domain assets, and media upon full project milestone payment. We provide full repository transfer and deployment documentation.',
      },
    ],
  },
  {
    id: 'customer-acquisition',
    title: 'Customer Acquisition',
    badge: 'Visibility',
    shortDescription:
      'Search discoverability, Answer Engine Optimization (AEO), content workflows, and scoped advertising systems to attract qualified commercial enquiries.',
    targetProblem:
      'Websites that generate zero traffic, invisible local listings, content produced without consistency, and ad spend burned on broad keywords without attribution.',
    deliverablesSummary: [
      'Technical SEO and on-page schema architecture',
      'Answer Engine Optimization (AEO) for AI search engines',
      'Structured content and social publishing workflows',
      'Email & WhatsApp broadcast workflows (where scoped)',
      'Paid advertising campaigns with transparent attribution',
    ],
    services: [
      {
        title: 'Local SEO & Technical Optimization',
        description:
          'Engineered on-page metadata, semantic schema markup, clean site architecture, and local citation consistency to increase organic relevance.',
        deliverables: ['JSON-LD structured data', 'Sitemap & robots configuration', 'Speed & Core Web Vitals optimization', 'Keyword mapping'],
        clientInputs: ['Service target areas', 'Core customer search queries', 'Existing search console access'],
        dependencies: ['Search engine crawler schedules'],
        exclusions: ['Guaranteed top 3 search rankings (violates Google guidelines)'],
      },
      {
        title: 'Answer Engine Optimization (AEO)',
        description:
          'Formatting business knowledge into precise, authoritative question-and-answer structures that AI search systems (Perplexity, ChatGPT, Google AI Overviews) can parse and cite.',
        deliverables: ['FAQ & entity documentation', 'Structured data enrichment', 'Knowledgebase formatting'],
        clientInputs: ['Expert business insights', 'Verified service policies and pricing frameworks'],
        dependencies: ['Third-party AI search crawling and indexing models'],
        exclusions: ['Guaranteed inclusion in specific AI answers'],
      },
      {
        title: 'Content & Social Publishing Systems',
        description:
          'Repeatable editorial workflows and templates enabling consistent, authoritative social posting and newsletter publishing without ad-hoc scramble.',
        deliverables: ['Editorial calendar template', 'Visual asset templates', 'Scheduling tool integration'],
        clientInputs: ['Brand voice preferences', 'Topic approval and factual review'],
        dependencies: ['Social media platform API stability'],
        exclusions: ['Guaranteed viral impressions', '24/7 community management unless scoped'],
      },
    ],
    faqs: [
      {
        question: 'Do you guarantee first-page Google rankings?',
        answer:
          'No ethical agency guarantees search rankings because Google algorithms change constantly. What we guarantee is rigorous technical compliance, semantic entity markup, high speed, and verifiable best practices.',
      },
      {
        question: 'What is Answer Engine Optimization (AEO)?',
        answer:
          'AEO optimizes content structure so generative AI engines (Google AI Overviews, Perplexity, etc.) can extract clear, accurate facts about your services and present your business as the source.',
      },
    ],
  },
  {
    id: 'lead-sales-systems',
    title: 'Lead & Sales System',
    badge: 'Conversion',
    shortDescription:
      'Structured CRM pipelines, WhatsApp Business integrations, booking engines, and automated enquiry follow-up workflows so zero leads slip through.',
    targetProblem:
      'Enquiries scattered across WhatsApp chats, personal inboxes, and loose sticky notes, resulting in slow response times, forgotten follow-ups, and unmeasured conversion rates.',
    deliverablesSummary: [
      'Custom CRM setup & pipeline configuration',
      'Official WhatsApp Business API integration',
      'Automated consultation and booking workflows',
      'Secure payment links & invoice dispatch',
      'Multi-channel enquiry capture & team routing',
    ],
    services: [
      {
        title: 'CRM Setup & Sales Pipeline Design',
        description:
          'Implementation and structuring of a dedicated CRM to track prospects from first enquiry through proposal, negotiation, and closed engagement.',
        deliverables: ['Pipeline stage definition', 'Custom deal fields', 'Lead source attribution', 'Team training workshop'],
        clientInputs: ['Sales team roles', 'Historic client stages', 'Standard deal values'],
        dependencies: ['CRM platform subscription (e.g. HubSpot, Zoho, Pipedrive)'],
        exclusions: ['CRM monthly license fees payable to provider'],
      },
      {
        title: 'WhatsApp Business & Chatbot Integration',
        description:
          'Automated welcome messages, instant triage menus, and qualified lead routing built on official WhatsApp Business APIs.',
        deliverables: ['WhatsApp Business Cloud setup', 'Interactive triage menu', 'Internal agent alert triggers'],
        clientInputs: ['Meta Business Manager verification', 'Approved message templates'],
        dependencies: ['Meta API verification and per-conversation fees'],
        exclusions: ['Meta conversation template fees'],
      },
      {
        title: 'Enquiry Capture & Fast Routing',
        description:
          'Direct integration of web enquiry forms with instant SMS/Email/Slack alerts so team members follow up within minutes.',
        deliverables: ['Sanitized form integration', 'Multi-channel notifications', 'Automated customer acknowledgement'],
        clientInputs: ['Assigned response personnel emails and numbers'],
        dependencies: ['Notification delivery APIs'],
        exclusions: ['Answering customer inquiries on behalf of client'],
      },
    ],
    faqs: [
      {
        question: 'Which CRM platforms do you support?',
        answer:
          'We configure HubSpot, Zoho CRM, Pipedrive, and lightweight custom solutions based on your team size, budget, and operational complexity.',
      },
      {
        question: 'Does automation replace our human sales team?',
        answer:
          'No. Automation handles repetitive initial triage, instant acknowledgements, and follow-up reminders so your team can focus on meaningful high-value conversations.',
      },
    ],
  },
  {
    id: 'operations-automation',
    title: 'Operations & Automation',
    badge: 'Efficiency',
    shortDescription:
      'Cross-tool automations, invoicing workflows, and integrated operational pipelines that eliminate repetitive copy-pasting between systems.',
    targetProblem:
      'Staff spending hours re-entering customer information from websites into spreadsheets, manual billing errors, delayed invoices, and siloed internal tools.',
    deliverablesSummary: [
      'End-to-end business process automation (Make / Zapier / n8n / APIs)',
      'GST-compliant invoicing integration',
      'Project management and task delegation workflows',
      'Inventory sync between store and warehouse',
      'Selected AI-assisted document classification',
    ],
    services: [
      {
        title: 'Business Workflow Automation',
        description:
          'Connecting your core business apps so data flows automatically with built-in error handling and fallback alerts.',
        deliverables: ['Integration scenario architecture', 'Error notification fallback', 'Audit trail documentation'],
        clientInputs: ['App API access keys', 'Workflow logic specification'],
        dependencies: ['Third-party API rate limits and uptime'],
        exclusions: ['Automation platform monthly subscription costs'],
      },
      {
        title: 'Invoicing & GST Billing Connections',
        description:
          'Automated creation and dispatch of compliant tax invoices immediately upon order completion or milestone approval.',
        deliverables: ['Invoice generator webhook', 'PDF dispatch automation', 'Payment reconciliation logging'],
        clientInputs: ['GSTIN, tax slab structure, billing details'],
        dependencies: ['Accounting software API (Zoho Books, Tally, QuickBooks)'],
        exclusions: ['Formal tax advisory and accounting auditing'],
      },
    ],
    faqs: [
      {
        question: 'What happens if an external API fails during an automation?',
        answer:
          'We engineer every workflow with automated exception handling: failed executions are logged, alerted to an admin inbox, and queued for retry so no data is silently lost.',
      },
    ],
  },
  {
    id: 'analytics-insights',
    title: 'Analytics & Insights',
    badge: 'Clarity',
    shortDescription:
      'Data preparation, executive business intelligence dashboards, and practical performance reporting to replace guesswork with empirical evidence.',
    targetProblem:
      'Business owners operating blind without knowing customer acquisition cost, which marketing channels actually convert, or where operational bottlenecks occur.',
    deliverablesSummary: [
      'Executive KPI dashboards (Looker Studio / Metabase / Custom)',
      'Multi-source data aggregation and cleaning',
      'Lead and sales conversion rate tracking',
      'Monthly actionable executive summaries',
      'Privacy-compliant tracking implementation',
    ],
    services: [
      {
        title: 'Business Intelligence Dashboards',
        description:
          'Clean, intuitive visual dashboards aggregating revenue, enquiries, website traffic, and team completion metrics in real time.',
        deliverables: ['Live dashboard setup', 'Data source connections', 'Filter controls', 'Mobile-responsive layout'],
        clientInputs: ['Database access or spreadsheet exports', 'Priority business KPIs'],
        dependencies: ['Data source stability and refresh intervals'],
        exclusions: ['Forecasting financial outcomes with legal guarantee'],
      },
      {
        title: 'Attribution & Conversion Tracking',
        description:
          'Configuring Google Analytics 4, Server-Side tracking, and UTM parameter standards to identify exactly which campaigns yield paying clients.',
        deliverables: ['GA4 property setup', 'Conversion event triggers', 'UTM tracking taxonomy guide'],
        clientInputs: ['Google account administrative access'],
        dependencies: ['Browser cookie consent compliance rules'],
        exclusions: ['Tracking visitors who reject essential cookies'],
      },
    ],
    faqs: [
      {
        question: 'Will our business data be shared with external third parties?',
        answer:
          'Never. All dashboards and analytical connectors connect directly between your private data stores and secure visualization platforms without intermediate exposure.',
      },
    ],
  },
  {
    id: 'ongoing-management',
    title: 'Ongoing Management',
    badge: 'Reliability',
    shortDescription:
      'Continuous technical maintenance, security hardening, content updates, and proactive optimization to protect your digital assets over time.',
    targetProblem:
      'Websites abandoned post-launch that break on software updates, accumulate security vulnerabilities, display stale content, and slowly degrade in search performance.',
    deliverablesSummary: [
      'Uptime monitoring & automated health checks',
      'Regular security updates & dependency audits',
      'Routine content updates & image replacements',
      'Scheduled backups & disaster recovery protocol',
      'Monthly performance review & recommendations',
    ],
    services: [
      {
        title: 'Technical Upkeep & Security Monitoring',
        description:
          'Proactive dependency patching, SSL certificate management, DNS monitoring, and rapid recovery assistance in case of hosting disruption.',
        deliverables: ['Monthly vulnerability review', 'Continuous uptime monitoring', 'Offsite automated backups'],
        clientInputs: ['Hosting and server administrative credentials'],
        dependencies: ['Cloud hosting provider SLA'],
        exclusions: ['Costs of third-party security incident forensics'],
      },
      {
        title: 'Continuous Content & Performance Refinement',
        description:
          'Ongoing allocation of engineering and design hours for new landing pages, seasonal promotions, and conversion rate optimizations.',
        deliverables: ['Agreed monthly maintenance hours', 'Staging review before publishing', 'Priority support response'],
        clientInputs: ['Requested update briefs and text assets'],
        dependencies: ['Advance submission of monthly requests'],
        exclusions: ['Unscoped major architectural overhauls'],
      },
    ],
    faqs: [
      {
        question: 'Can we cancel our ongoing management agreement?',
        answer:
          'Yes. Our management agreements operate on simple 30-day notice terms with zero lock-in contracts or punitive cancellation clauses.',
      },
    ],
  },
];

export const PACKAGES: PackageTier[] = [
  {
    id: 'launch',
    name: 'Launch',
    tagline: 'Establish your professional digital foundation with precision.',
    idealFor: 'New ventures, professional service firms, and local businesses establishing a credible online presence.',
    inclusions: [
      'Custom 5–8 page responsive business website',
      'Brand typography, color system & asset guidelines',
      'Google Business Profile setup and category optimization',
      'Basic CRM & WhatsApp enquiry notification setup',
      'Technical SEO foundation & semantic schema markup',
      'Domain, DNS, and professional business email setup',
      'Mobile-first responsive design & accessibility testing',
    ],
    exclusions: [
      'E-commerce shopping cart & payment processing',
      'Ongoing monthly content creation',
      'Paid advertising budget & campaign execution',
    ],
    deliverables: [
      'Production website deployed on global CDN',
      'Complete repository ownership transfer',
      'Handover documentation and 30-day post-launch warranty',
    ],
    commitment: 'Typically 2 to 4 weeks implementation period',
  },
  {
    id: 'grow',
    name: 'Grow',
    tagline: 'Scale inbound enquiries with connected lead systems and search visibility.',
    badge: 'Most Popular',
    popular: true,
    idealFor: 'Established businesses ready to systematically capture and follow up with commercial leads.',
    inclusions: [
      'Everything in Launch foundation',
      'Full Local SEO + Answer Engine Optimization (AEO)',
      'Sales CRM pipeline configuration with custom deal stages',
      'WhatsApp Business API automated triage & team notifications',
      'Automated appointment booking or consultation calendar',
      'Cross-tool enquiry capture & instant lead notification alerts',
      'Monthly performance & analytics review dashboard',
    ],
    exclusions: [
      'Full-time dedicated software engineering team',
      'Third-party software monthly subscription costs',
      'Paid ad spend billed by platforms (Google/Meta)',
    ],
    deliverables: [
      'Connected digital acquisition & sales capture system',
      'Live executive KPI reporting dashboard',
      'Bi-weekly optimization sprints during onboarding',
    ],
    commitment: 'Project setup + agreed quarterly optimization sprint',
  },
  {
    id: 'complete-partner',
    name: 'Complete Partner',
    tagline: 'Full-spectrum digital engineering, automation, and ongoing ownership.',
    idealFor: 'Growing enterprises seeking a single engineering partner to run their entire digital stack.',
    inclusions: [
      'Everything in Grow system',
      'Custom workflow automation across billing, tasks, and CRM',
      'E-commerce or advanced web application capabilities',
      'Continuous technical maintenance, security patching, and uptime SLA',
      'Ongoing landing page development and seasonal content updates',
      'Advanced Business Intelligence dashboards with multi-source sync',
      'Priority direct Slack/WhatsApp engineering channel',
    ],
    exclusions: [
      'Third-party platform fees, API usage, and ad spend',
      'Legal entity compliance filings outside digital tools',
    ],
    deliverables: [
      'End-to-end digital infrastructure management',
      'Dedicated engineering capacity allocation',
      'Monthly executive strategy & performance sessions',
    ],
    commitment: 'Custom annual or retainer partnership agreement',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery',
    tagline: 'Understanding reality before prescribing tools.',
    description:
      'We audit your current digital channels, customer touchpoints, and operational bottlenecks. We ask detailed questions about who your best clients are, how you close sales, and what technology friction slows your team down.',
    clientActions: 'Share existing domain/account access, sample client journeys, and prioritized business bottlenecks.',
    deliverable: 'Discovery Assessment Document with verified technical requirements and defined scope boundaries.',
  },
  {
    step: 2,
    title: 'Blueprint',
    tagline: 'Architecting the exact solution before writing code.',
    description:
      'We construct a comprehensive blueprint detailing page architecture, data models, third-party integrations, design specifications, and milestone timelines. Nothing is left to ambiguous assumption.',
    clientActions: 'Review and formally approve the specification, milestone schedule, and asset checklists.',
    deliverable: 'Complete Architecture Specification, clickable prototype / design review, and written milestone schedule.',
  },
  {
    step: 3,
    title: 'Build & Launch',
    tagline: 'Engineering with production discipline and automated verification.',
    description:
      'We build your digital assets using modern frameworks, configure APIs, implement automated enquiry flows, and test across device viewports, screen readers, and network speeds before a zero-downtime deployment.',
    clientActions: 'Provide brand copy approval, verify test forms, and approve staging preview.',
    deliverable: 'Live, tested production deployment with SSL, security headers, canonical redirects, and verified forms.',
  },
  {
    step: 4,
    title: 'Grow & Optimize',
    tagline: 'Iterative refinement based on empirical performance data.',
    description:
      'Post-launch, we monitor real customer usage, enquiry velocity, and search indexation. We provide regular performance reviews and implement continuous enhancements to increase operational efficiency.',
    clientActions: 'Participate in monthly KPI reviews and provide feedback on inbound lead quality.',
    deliverable: 'Monthly Performance Reports, ongoing security updates, and scheduled feature optimizations.',
  },
];

export const INITIAL_FOUNDERS: TeamMember[] = [
  {
    id: 'affan-ahmed-shariff',
    fullName: 'Affan Ahmed Shariff',
    publicTitle: 'Founder, Business Development',
    department: 'Commercial & Partnerships',
    bio: 'Leads client acquisition, strategic partnerships, revenue strategy, and enterprise client relationships. Affan works closely with business owners to identify digital bottlenecks and structure high-impact project engagements.',
    responsibilities: [
      'Client acquisition & relationship management',
      'Strategic commercial partnerships',
      'Revenue growth and service scoping',
      'Qualified project enquiry consultations',
    ],
    photoUrl: '/team/affan-ahmed-shariff.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/affan-ahmed-shariff',
    portfolioUrl: 'https://affanahmed2302-cmyk.github.io/',
    displayOrder: 1,
    status: 'published',
    isFounder: true,
  },
  {
    id: 'akarsh-thodaskar',
    fullName: 'Akarsh P. Thodaskar',
    publicTitle: 'Founder, Technology & Development',
    department: 'Engineering & Architecture',
    bio: 'Oversees technical architecture, software engineering, third-party API integrations, and cloud infrastructure. Akarsh ensures every website, CRM flow, and automation is engineered with clean code, high security, and high reliability.',
    responsibilities: [
      'Full-stack software engineering',
      'API integrations & automation backend',
      'Performance optimization & security auditing',
      'Continuous deployment & cloud infrastructure',
    ],
    photoUrl: '/team/akarsh-thodaskar.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/akarsh-p-6963b5397?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    displayOrder: 2,
    status: 'published',
    isFounder: true,
  },
  {
    id: 'dhananjaya-gr',
    fullName: 'Dhananjaya G.R.',
    publicTitle: 'Founder, Business Strategy & Systems',
    department: 'Strategy & Operations',
    bio: 'Guides enterprise business strategy, analytical models, operational workflow automation, and client proposals. Dhananjaya focuses on translating business goals into rigorous, measurable digital systems and operational efficiency.',
    responsibilities: [
      'Business strategy & client proposals',
      'Data analytics & intelligence dashboards',
      'Workflow & operations automation architecture',
      'Internal system optimization & QA standards',
    ],
    photoUrl: '/team/dhananjaya-gr.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/dhananjaya-gr',
    displayOrder: 3,
    status: 'published',
    isFounder: true,
  },
];
