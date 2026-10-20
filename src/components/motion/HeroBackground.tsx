'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // 1. Accessibility: strictly respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setUseFallback(true);
        return;
      }
    }

    // 2. Initialize Vanta FOG with authentic Primeora palette
    let isMounted = true;

    async function initVanta() {
      try {
        const THREE = await import('three');
        // @ts-ignore
        const FOGModule = await import('vanta/dist/vanta.fog.min');
        const FOG = FOGModule.default || FOGModule;

        if (!isMounted || !containerRef.current) return;

        // Ensure THREE is globally available if vanta checks window.THREE
        if (typeof window !== 'undefined') {
          // @ts-ignore
          window.THREE = THREE;
        }

        vantaRef.current = FOG({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x166cff, // Authentic cobalt royal blue
          midtoneColor: 0x08152b,   // Architectural deep navy
          lowlightColor: 0x02070e,  // Ink midnight
          baseColor: 0x040d1a,      // Midnight navy canvas
          blurFactor: 0.7,
          speed: 0.6,
          zoom: 0.8,
        });
      } catch (err) {
        console.warn('Vanta initialization fell back to architectural gradient:', err);
        if (isMounted) setUseFallback(true);
      }
    }

    initVanta();

    // 3. Strict lifecycle cleanup
    return () => {
      isMounted = false;
      if (vantaRef.current && typeof vantaRef.current.destroy === 'function') {
        try {
          vantaRef.current.destroy();
        } catch {
          // ignore cleanup error
        }
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    >
      {/* Editorial subtle grid overlay to integrate smoothly with the studio aesthetic */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, #000 70%, transparent 100%)',
        }}
      />

      {/* Static gradient fallback (active on reduced motion, mobile, or if WebGL is unavailable) */}
      {useFallback && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_10%,rgba(22,108,255,0.12),transparent_70%)]" />
      )}

      {/* Subtle bottom vignette to ensure razor-sharp transition into content */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040D1A] to-transparent" />
    </div>
  );
}
