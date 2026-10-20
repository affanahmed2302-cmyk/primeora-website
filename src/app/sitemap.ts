import { MetadataRoute } from 'next';
import { SERVICE_PILLARS } from '@/config/brand';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeorasolutions.com';
  const currentDate = new Date().toISOString();

  // Core public routes
  const routes = [
    '',
    '/services',
    '/process',
    '/about',
    '/team',
    '/work',
    '/readiness',
    '/insights',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-preferences',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/services' || route === '/contact' ? 0.9 : 0.7,
  }));

  // Dedicated individual service practice routes
  const pillarRoutes = SERVICE_PILLARS.map((p) => ({
    url: `${siteUrl}/services/${p.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...pillarRoutes];
}
