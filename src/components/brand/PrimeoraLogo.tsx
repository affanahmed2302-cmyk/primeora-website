'use client';

import React from 'react';
import Image from 'next/image';

interface PrimeoraLogoProps {
  variant?: 'full' | 'emblem' | 'wordmark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: number;
  height?: number;
  className?: string;
  showSubtitle?: boolean;
}

export default function PrimeoraLogo({
  variant = 'full',
  size = 'md',
  width: customW,
  height: customH,
  className = '',
  showSubtitle = true,
}: PrimeoraLogoProps) {
  // Height definitions for crisp proportional scaling
  const heightMap = {
    sm: { fullH: 28, emblemSize: 28, text: 'text-sm', sub: 'text-[9px]' },
    md: { fullH: 36, emblemSize: 36, text: 'text-base', sub: 'text-[10px]' },
    lg: { fullH: 46, emblemSize: 46, text: 'text-xl', sub: 'text-xs' },
    xl: { fullH: 58, emblemSize: 58, text: 'text-2xl', sub: 'text-sm' },
  };

  const { fullH: defaultH, emblemSize, text: textSize, sub: subSize } = heightMap[size];
  const targetH = customH || defaultH;
  const targetW = customW || Math.round(targetH * 3.32);

  // Standalone Emblem variant using authentic Logo_SA asset
  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Image
          src="/brand/primeora-emblem.png"
          alt="Primeora Solutions Emblem"
          width={emblemSize * 2}
          height={emblemSize * 2}
          priority
          className="object-contain transition-transform duration-200 group-hover:scale-105"
          style={{ width: emblemSize, height: emblemSize }}
        />
      </div>
    );
  }

  // Wordmark only variant
  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <span className={`font-bold tracking-wider uppercase font-sans text-[#191817] dark:text-[#F5F2EB] ${textSize}`}>
          PRIMEORA
        </span>
        {showSubtitle && (
          <span className={`font-medium tracking-[0.22em] uppercase text-[#6E6862] dark:text-[#A8A29A] ${subSize}`}>
            SOLUTIONS
          </span>
        )}
      </div>
    );
  }

  // Full / Horizontal Lockup variant (CSS-driven Day/Night switcher to eliminate hydration mismatch)
  return (
    <div className={`inline-flex items-center group ${className}`}>
      {/* Light Mode Lockup: Dark Navy Text with Cobalt Emblem */}
      <Image
        src="/brand/primeora-logo-light.png"
        alt="PRIMEORA SOLUTIONS"
        width={targetW}
        height={targetH}
        priority
        className="object-contain block dark:hidden"
        style={{ height: targetH, width: 'auto' }}
      />
      {/* Dark Mode Lockup: White Text with Cobalt Emblem */}
      <Image
        src="/brand/primeora-logo-dark.png"
        alt="PRIMEORA SOLUTIONS"
        width={targetW}
        height={targetH}
        priority
        className="object-contain hidden dark:block"
        style={{ height: targetH, width: 'auto' }}
      />
    </div>
  );
}
