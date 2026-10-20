import React from 'react';
import Image from 'next/image';

interface PrimeoraLogoProps {
  variant?: 'full' | 'emblem' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  className?: string;
  showSubtitle?: boolean;
}

export default function PrimeoraLogo({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  className = '',
  showSubtitle = true,
}: PrimeoraLogoProps) {
  // Height definitions for crisp proportional scaling
  const heightMap = {
    sm: { fullH: 28, emblemSize: 28, text: 'text-sm', sub: 'text-[9px]' },
    md: { fullH: 36, emblemSize: 36, text: 'text-base', sub: 'text-[10px]' },
    lg: { fullH: 48, emblemSize: 48, text: 'text-xl', sub: 'text-xs' },
    xl: { fullH: 60, emblemSize: 60, text: 'text-2xl', sub: 'text-sm' },
  };

  const { fullH, emblemSize, text: textSize, sub: subSize } = heightMap[size];

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
        <span
          className={`font-bold tracking-wider uppercase font-sans ${
            theme === 'light' ? 'text-[#031A44]' : 'text-white'
          } ${textSize}`}
        >
          PRIMEORA
        </span>
        {showSubtitle && (
          <span
            className={`font-medium tracking-[0.22em] uppercase ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            } ${subSize}`}
          >
            SOLUTIONS
          </span>
        )}
      </div>
    );
  }

  // Full Lockup variant using authentic horizontal brand asset
  const logoSrc = theme === 'light' ? '/brand/primeora-logo-light.png' : '/brand/primeora-logo-dark.png';
  // Aspect ratio of the authentic horizontal logo is ~1030 / 310 = ~3.32
  const logoWidth = Math.round(fullH * 3.32);

  return (
    <div className={`inline-flex items-center group ${className}`}>
      <Image
        src={logoSrc}
        alt="PRIMEORA SOLUTIONS"
        width={logoWidth * 2}
        height={fullH * 2}
        priority
        className="object-contain transition-opacity duration-200"
        style={{ height: fullH, width: 'auto' }}
      />
    </div>
  );
}
