import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Authentic Primeora Solutions Deep Tech Palette
        obsidian: {
          DEFAULT: '#07090F',
          pure: '#040509',
          surface: '#0B0F1A',
          card: '#101524',
          elevated: '#171E33',
        },
        azure: {
          DEFAULT: '#3D6EF5',
          light: '#5B8CFF',
          bright: '#4D7CFF',
          dark: '#2B4FC7',
          subtle: 'rgba(61, 110, 245, 0.12)',
        },
        violet: {
          DEFAULT: '#7C5CFF',
          light: '#9E85FF',
          dark: '#5836DB',
          subtle: 'rgba(124, 92, 255, 0.12)',
        },
        platinum: {
          DEFAULT: '#F0F2F7',
          pure: '#FFFFFF',
          muted: '#C5C9D6',
        },
        slate: {
          DEFAULT: '#94A3B8',
          light: '#B2BDD1',
          dark: '#64748B',
          deep: '#1E293B',
        },
        // Semantic border system
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.15)',
          strong: 'rgba(255, 255, 255, 0.25)',
          glow: 'rgba(77, 124, 255, 0.35)',
        },
        // Backward-compatible mapping for existing component styling
        forest: {
          DEFAULT: '#0B0F1A',
          dark: '#07090F',
          light: '#171E33',
          subtle: 'rgba(61, 110, 245, 0.08)',
        },
        teal: {
          DEFAULT: '#3D6EF5',
          dark: '#2B4FC7',
          light: '#5B8CFF',
          subtle: 'rgba(61, 110, 245, 0.15)',
        },
        ivory: {
          DEFAULT: '#07090F',
          light: '#0B0F1A',
          dark: '#040509',
          pure: '#101524',
        },
        copper: {
          DEFAULT: '#7C5CFF',
          dark: '#5836DB',
          light: '#9E85FF',
          subtle: 'rgba(124, 92, 255, 0.15)',
        },
        charcoal: {
          DEFAULT: '#F0F2F7',
          muted: '#94A3B8',
          subtle: '#64748B',
          deep: '#07090F',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Space Grotesk', 'Inter', 'sans-serif'],
        serif: ['var(--font-heading)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'card-hover': '0 12px 35px -4px rgba(61, 110, 245, 0.2), 0 0 0 1px rgba(77, 124, 255, 0.35)',
        glow: '0 0 30px rgba(61, 110, 245, 0.35)',
        'glow-violet': '0 0 30px rgba(124, 92, 255, 0.35)',
        dropdown: '0 16px 40px -10px rgba(0, 0, 0, 0.7)',
        subtle: '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
