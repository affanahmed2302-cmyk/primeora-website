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
        // Authentic Primeora Solutions Palette (Derived strictly from Logo_assets)
        canvas: {
          DEFAULT: '#040D1A',
          pure: '#02070E',
          surface: '#08152B',
          card: '#0B172E',
          elevated: '#0E1F3D',
        },
        obsidian: {
          DEFAULT: '#040D1A',
          pure: '#02070E',
          surface: '#08152B',
          card: '#0B172E',
          elevated: '#0E1F3D',
        },
        azure: {
          DEFAULT: '#166CFF',
          light: '#3B82F6',
          bright: '#2563EB',
          dark: '#1055CC',
          subtle: 'rgba(22, 108, 255, 0.12)',
        },
        blue: {
          DEFAULT: '#166CFF',
          light: '#3B82F6',
          dark: '#1055CC',
          subtle: 'rgba(22, 108, 255, 0.12)',
        },
        violet: {
          DEFAULT: '#166CFF', // Replaced purple with authentic brand blue
          light: '#3B82F6',
          dark: '#1055CC',
          subtle: 'rgba(22, 108, 255, 0.12)',
        },
        platinum: {
          DEFAULT: '#F8FAFC',
          pure: '#FFFFFF',
          muted: '#CBD5E1',
        },
        slate: {
          DEFAULT: '#94A3B8',
          light: '#CBD5E1',
          dark: '#64748B',
          deep: '#1E293B',
        },
        // Semantic border system
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.14)',
          strong: 'rgba(255, 255, 255, 0.22)',
          glow: 'rgba(22, 108, 255, 0.25)',
        },
        // Backward-compatible mapping for existing component styling
        forest: {
          DEFAULT: '#08152B',
          dark: '#040D1A',
          light: '#0E1F3D',
          subtle: 'rgba(22, 108, 255, 0.08)',
        },
        teal: {
          DEFAULT: '#166CFF',
          dark: '#1055CC',
          light: '#3B82F6',
          subtle: 'rgba(22, 108, 255, 0.12)',
        },
        ivory: {
          DEFAULT: '#040D1A',
          light: '#08152B',
          dark: '#02070E',
          pure: '#0B172E',
        },
        copper: {
          DEFAULT: '#166CFF',
          dark: '#1055CC',
          light: '#3B82F6',
          subtle: 'rgba(22, 108, 255, 0.12)',
        },
        charcoal: {
          DEFAULT: '#F8FAFC',
          muted: '#94A3B8',
          subtle: '#64748B',
          deep: '#040D1A',
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
