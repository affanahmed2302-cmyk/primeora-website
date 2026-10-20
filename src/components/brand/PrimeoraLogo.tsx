import React from 'react';

interface PrimeoraLogoProps {
  variant?: 'full' | 'emblem' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export default function PrimeoraLogo({
  variant = 'full',
  size = 'md',
  className = '',
  showSubtitle = true,
}: PrimeoraLogoProps) {
  const sizeMap = {
    sm: { emblem: 28, text: 'text-base', sub: 'text-[9px]' },
    md: { emblem: 36, text: 'text-lg', sub: 'text-[10px]' },
    lg: { emblem: 46, text: 'text-2xl', sub: 'text-xs' },
    xl: { emblem: 56, text: 'text-3xl', sub: 'text-sm' },
  };

  const { emblem: emblemSize, text: textSize, sub: subSize } = sizeMap[size];

  const EmblemSvg = (
    <svg
      width={emblemSize}
      height={emblemSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="p-stem" x1="20" y1="15" x2="45" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4D7CFF" />
          <stop offset="100%" stopColor="#2E54D4" />
        </linearGradient>
        <linearGradient id="p-loop" x1="38" y1="15" x2="88" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C92FF" />
          <stop offset="50%" stopColor="#5B73FA" />
          <stop offset="100%" stopColor="#7C5CFF" />
        </linearGradient>
        <linearGradient id="p-facet" x1="42" y1="20" x2="80" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9EBAFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5B73FA" stopOpacity="0.2" />
        </linearGradient>
        <filter id="p-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3D6EF5" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Background soft tech ambient circle */}
      <rect x="2" y="2" width="96" height="96" rx="22" fill="#0D1222" stroke="rgba(77, 124, 255, 0.25)" strokeWidth="1.5" />
      
      <g filter="url(#p-glow)">
        {/* Left vertical stem of the P */}
        <path
          d="M26 24C26 20.6863 28.6863 18 32 18H40C43.3137 18 46 20.6863 46 24V76C46 79.3137 43.3137 82 40 82H32C28.6863 82 26 79.3137 26 76V24Z"
          fill="url(#p-stem)"
        />

        {/* Dynamic faceted upper loop of the P */}
        <path
          d="M44 18H64C74.4934 18 83 26.5066 83 37C83 47.4934 74.4934 56 64 56H44V18Z"
          fill="url(#p-loop)"
        />

        {/* Negative space inside the loop */}
        <path
          d="M46 30H62C65.866 30 69 33.134 69 37C69 40.866 65.866 44 62 44H46V30Z"
          fill="#0D1222"
        />

        {/* Angular prism facet reflecting light */}
        <path
          d="M46 18L76 48L64 56L44 36V18H46Z"
          fill="url(#p-facet)"
        />

        {/* Futuristic tech accent notch */}
        <circle cx="75" cy="74" r="4.5" fill="#7C5CFF" />
        <line x1="58" y1="74" x2="68" y2="74" stroke="#4D7CFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {EmblemSvg}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      {variant !== 'wordmark' && EmblemSvg}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight font-black leading-none font-['Space_Grotesk',sans-serif]">
          <span className={`text-white font-bold tracking-wider ${textSize}`}>
            PRIMEORA
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-semibold uppercase tracking-[0.25em] text-[#8EA2CD] mt-1 ${subSize}`}
          >
            SOLUTIONS
          </span>
        )}
      </div>
    </div>
  );
}
