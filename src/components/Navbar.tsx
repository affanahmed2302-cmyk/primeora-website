'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BRAND_CONFIG } from '@/config/brand';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/90 backdrop-blur-md border-b border-border-subtle shadow-subtle py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            aria-label={`${BRAND_CONFIG.name} — Home`}
          >
            <div className="relative w-10 h-10 overflow-hidden flex-shrink-0">
              <Image
                src={BRAND_CONFIG.assets.emblem}
                alt=""
                width={40}
                height={40}
                className="object-contain w-full h-full transform transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-forest leading-none">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-charcoal-muted mt-0.5">
                Strategy & Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {BRAND_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-forest font-semibold border-b-2 border-forest pb-0.5'
                      : 'text-charcoal-muted hover:text-forest'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-ivory bg-forest rounded-md hover:bg-forest-light transition-all shadow-subtle hover:shadow-card group"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-forest hover:text-forest-light focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b border-border-medium px-4 pt-3 pb-6 shadow-dropdown transition-all animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {BRAND_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-base rounded-md font-medium ${
                    isActive
                      ? 'bg-forest/10 text-forest font-semibold'
                      : 'text-charcoal-muted hover:bg-forest/5 hover:text-forest'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-border-subtle mt-2">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-ivory bg-forest rounded-md hover:bg-forest-light transition-colors"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
