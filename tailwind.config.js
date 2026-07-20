/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FBF7F0',
        surface: '#F7E4DF',
        'accent-butter': '#FFE26E',
        'accent-peach': '#FFCBA4',
        'accent-mint': '#B8D4C2',
        ink: '#3A2E2A',
        'ink-muted': '#6B5852',
        hairline: '#E8DCC9',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['144px', { lineHeight: '0.95', fontWeight: '400' }],
        'hero-mobile': ['56px', { lineHeight: '1', fontWeight: '400' }],
        'h2': ['64px', { lineHeight: '1.05', fontWeight: '400' }],
        'h2-mobile': ['36px', { lineHeight: '1.1', fontWeight: '400' }],
        'h3': ['40px', { lineHeight: '1.15', fontWeight: '500' }],
        'h3-mobile': ['28px', { lineHeight: '1.2', fontWeight: '500' }],
        'body-lg': ['20px', { lineHeight: '1.4' }],
        'body': ['17px', { lineHeight: '1.5' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'eyebrow': ['12px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.14em' }],
      },
      animation: {
        'marquee': 'marquee var(--duration, 40s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration, 40s) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap, 1rem)))' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
