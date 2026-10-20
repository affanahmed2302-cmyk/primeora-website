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
        forest: {
          DEFAULT: '#183B35',
          dark: '#0F2420',
          light: '#23524A',
          subtle: 'rgba(24, 59, 53, 0.05)',
        },
        teal: {
          DEFAULT: '#0F827A',
          dark: '#0A5D57',
          light: '#14A399',
          subtle: 'rgba(15, 130, 122, 0.1)',
        },
        ivory: {
          DEFAULT: '#F4EFE3',
          light: '#FAF7F0',
          dark: '#E8E1D1',
          pure: '#FFFFFF',
        },
        copper: {
          DEFAULT: '#B77B4B',
          dark: '#936139',
          light: '#CD8F5D',
          subtle: 'rgba(183, 123, 75, 0.12)',
        },
        charcoal: {
          DEFAULT: '#24252B',
          muted: '#5C6068',
          subtle: '#8C919E',
          deep: '#141518',
        },
        border: {
          subtle: 'rgba(24, 59, 53, 0.10)',
          medium: 'rgba(24, 59, 53, 0.20)',
          strong: 'rgba(24, 59, 53, 0.40)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(24, 59, 53, 0.05), 0 10px 30px -5px rgba(24, 59, 53, 0.07)',
        'card-hover': '0 10px 25px -4px rgba(24, 59, 53, 0.12), 0 20px 48px -8px rgba(24, 59, 53, 0.14)',
        dropdown: '0 16px 40px -10px rgba(24, 59, 53, 0.18)',
        subtle: '0 1px 3px rgba(24, 59, 53, 0.06)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
