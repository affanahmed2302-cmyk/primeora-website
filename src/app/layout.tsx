import type { Metadata } from 'next';
import './globals.css';
import { BRAND_CONFIG } from '@/config/brand';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import AnalyticsLoader from '@/components/AnalyticsLoader';
import StructuredData from '@/components/StructuredData';
import SmoothScrollProvider from '@/components/motion/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://primeorasolutions.com'),
  title: {
    default: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description: BRAND_CONFIG.description,
  keywords: [
    'Primeora Solutions',
    'Strategy and Technology Consultancy',
    'Digital A-Z',
    'Business Website Development',
    'Local SEO and AEO',
    'WhatsApp Business Automation',
    'CRM Implementation',
    'Business Intelligence Dashboards',
    'Bangalore Technology Consultancy',
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.legalEntity,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/brand/primeora-emblem.svg', type: 'image/svg+xml' },
      { url: '/brand/emblem-transparent.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/brand/emblem.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: BRAND_CONFIG.name,
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: BRAND_CONFIG.description,
    images: [
      {
        url: BRAND_CONFIG.assets.logoMaster,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.name} Master Logo & Brand Emblem`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: BRAND_CONFIG.description,
    images: [BRAND_CONFIG.assets.logoMaster],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('primeora-theme');
                  if (t === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-[#F5F2EB] font-sans antialiased selection:bg-[#C25E38]/20 selection:text-[#C25E38] transition-colors duration-200">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <AnalyticsLoader />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
