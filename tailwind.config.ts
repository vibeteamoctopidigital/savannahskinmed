import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#13285C',
          deep: '#0C1D45',
          soft: '#2B4179',
        },
        /* Sampled from the site's own rose panel artwork (contact-bg.jpg) */
        rose: {
          DEFAULT: '#BE8596',
          light: '#E3A7B7',
          pale: '#F3DDE3',
          deep: '#B0798A',
        },
        cream: '#F6F4EC',
        mist: '#F1F3EC',
        haze: '#EAECE6',
        sand: '#D3A277',
        mint: '#F1F6F2',
        aqua: '#EFF6F6',
        sage: '#6E9A94',
        teal: { DEFAULT: '#4E9A97', dark: '#41827F' },
        ink: '#2A2F3A',
        muted: '#5C6474',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.3em',
      },
      maxWidth: {
        shell: '1240px',
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(19, 40, 92, 0.35)',
        menu: '0 26px 60px -20px rgba(12, 29, 69, 0.35)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        menuIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        menuIn: 'menuIn 0.22s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
