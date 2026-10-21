'use client';

import React from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Natural Native Scroll Provider
 * Uses native browser scrolling for 100% reliability, zero wheel-hijacking,
 * full touch/trackpad fidelity, and seamless GSAP ScrollTrigger compatibility.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return <>{children}</>;
}
