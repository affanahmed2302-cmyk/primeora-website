'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND_CONFIG } from '@/config/brand';
import PrimeoraLogo from '@/components/brand/PrimeoraLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FBF9F5]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#E6DFD5] dark:border-[#2C2926] shadow-sm py-3'
          : 'bg-[#FBF9F5]/80 dark:bg-[#121110]/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Authentic Brand Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38] rounded-md"
            aria-label={`${BRAND_CONFIG.name} — Home`}
          >
            <PrimeoraLogo variant="full" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
            {BRAND_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium tracking-wide uppercase transition-colors ${
                    isActive
                      ? 'text-[#191817] dark:text-white font-semibold border-b-2 border-[#C25E38] pb-0.5'
                      : 'text-[#5C5751] hover:text-[#191817] dark:text-[#A8A29A] dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions (Theme Toggle & CTA) */}
          <div className="hidden sm:flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm group"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Right Bar (Theme Toggle & Menu Toggle) */}
          <div className="flex sm:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#191817] dark:text-[#F5F2EB] hover:text-[#C25E38] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38] rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Tablet Hamburger (sm to lg) */}
          <div className="hidden sm:flex lg:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#191817] dark:text-[#F5F2EB] hover:text-[#C25E38] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38] rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] dark:bg-[#1A1917] border-b border-[#E6DFD5] dark:border-[#2C2926] px-4 pt-4 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {BRAND_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#C25E38]/10 text-[#C25E38] font-semibold'
                      : 'text-[#5C5751] dark:text-[#A8A29A] hover:text-[#191817] dark:hover:text-white hover:bg-[#F2EDE4] dark:hover:bg-[#242220]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#E6DFD5] dark:border-[#2C2926]">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C25E38] hover:bg-[#A34520] rounded-md transition-colors shadow-sm"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
