import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primeora Solutions Warm Editorial Palette (Day/Night Theme)
        canvas: {
          DEFAULT: '#FBF9F5',
          dark: '#121110',
          surface: '#FFFFFF',
          surfaceDark: '#1A1917',
          elevated: '#F2EDE4',
          elevatedDark: '#242220',
          subtle: '#F7F4EE',
          subtleDark: '#181716',
        },
        ink: {
          DEFAULT: '#191817',
          dark: '#F5F2EB',
          muted: '#5C5751',
          mutedDark: '#A8A29A',
          subtle: '#8C867E',
          subtleDark: '#736E67',
        },
        terracotta: {
          DEFAULT: '#C25E38',
          hover: '#A34520',
          light: '#FDF3EE',
          dark: '#D9774E',
          darkHover: '#E28862',
          glow: 'rgba(194, 94, 56, 0.2)',
        },
        copper: {
          DEFAULT: '#C25E38',
          dark: '#D9774E',
          hover: '#A34520',
          light: '#FDF3EE',
          subtle: 'rgba(194, 94, 56, 0.12)',
        },
        // Authentic brand blue (reserved for official logo emblem)
        'brand-blue': {
          DEFAULT: '#1065FF',
          dark: '#0C4ECE',
          light: '#3B82F6',
        },
        azure: {
          DEFAULT: '#1065FF',
          light: '#3B82F6',
          dark: '#0C4ECE',
        },
        border: {
          subtle: '#E8E2D8',
          subtleDark: '#2C2926',
          medium: '#DDD5C7',
          mediumDark: '#3D3935',
          strong: '#C4BAA9',
          strongDark: '#544F49',
        },
        ivory: {
          DEFAULT: '#FBF9F5',
          dark: '#121110',
          surface: '#FFFFFF',
          surfaceDark: '#1A1917',
        },
        charcoal: {
          DEFAULT: '#191817',
          dark: '#F5F2EB',
          muted: '#5C5751',
          mutedDark: '#A8A29A',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Space Grotesk', 'Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(28, 25, 23, 0.04), 0 1px 2px rgba(28, 25, 23, 0.02)',
        'card-hover': '0 12px 28px -4px rgba(28, 25, 23, 0.08), 0 4px 8px -2px rgba(28, 25, 23, 0.04)',
        terracotta: '0 4px 20px rgba(194, 94, 56, 0.25)',
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
