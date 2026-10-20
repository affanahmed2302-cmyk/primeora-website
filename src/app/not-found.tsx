import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-xl border border-border-medium p-8 sm:p-10 shadow-card text-center space-y-6">
        <div className="w-16 h-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-copper font-semibold block mb-1">
            Status Code 404
          </span>
          <h1 className="font-serif text-3xl font-bold text-forest">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed">
            The requested destination does not exist, has moved, or the URL was mistyped.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-ivory bg-forest rounded-md hover:bg-forest-light transition-colors shadow-subtle"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-charcoal bg-ivory border border-border-medium rounded-md hover:bg-ivory-dark transition-colors"
          >
            <span>Explore Six Service Pillars</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
