import React from 'react';
import { BRAND_CONFIG, SERVICE_PILLARS } from '@/config/brand';

interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'Service' | 'FAQPage' | 'Breadcrumb';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type = 'Organization', data }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeora-solutions.netlify.app';

  let schema: Record<string, unknown> = {};

  if (type === 'Organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      alternateName: BRAND_CONFIG.legalEntity,
      url: siteUrl,
      logo: `${siteUrl}${BRAND_CONFIG.assets.logo}`,
      description: BRAND_CONFIG.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560023',
        addressCountry: 'IN',
      },
      identifier: {
        '@type': 'PropertyValue',
        name: 'Udyam Registration Number',
        value: BRAND_CONFIG.udyamRegistrationNumber,
      },
      sameAs: [
        BRAND_CONFIG.gbpUrl,
        BRAND_CONFIG.instagramUrl,
      ],
      founder: [
        {
          '@type': 'Person',
          name: 'Affan Ahmed Shariff',
          jobTitle: 'Founder, Business Development',
        },
        {
          '@type': 'Person',
          name: 'Akarsh P. Thodaskar',
          jobTitle: 'Founder, Technology & Development',
        },
        {
          '@type': 'Person',
          name: 'Dhananjaya G.R.',
          jobTitle: 'Founder, Business Strategy & Systems',
        },
      ],
      ...data,
    };
  } else if (type === 'WebSite') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: BRAND_CONFIG.name,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/services?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      ...data,
    };
  } else if (type === 'FAQPage') {
    // Generate FAQ schema from the service pillars
    const allFaqs = SERVICE_PILLARS.flatMap((p) => p.faqs);
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
      ...data,
    };
  } else {
    schema = {
      '@context': 'https://schema.org',
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
