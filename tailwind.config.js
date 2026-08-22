/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: 'var(--ink-950)',
          900: 'var(--ink-900)',
          800: 'var(--ink-800)',
          700: 'var(--ink-700)',
          600: 'var(--ink-600)',
          500: 'var(--ink-500)',
          400: 'var(--ink-400)',
          300: 'var(--ink-300)',
          200: 'var(--ink-200)',
          100: 'var(--ink-100)',
          50: 'var(--ink-50)',
        },
        gold: {
          50: '#FFF9EB',
          100: '#FFEFC2',
          200: '#FFE08A',
          300: '#FFCE4D',
          400: '#FFC531',
          500: '#F5B72E',
          600: '#DB9A1A',
          700: '#B3760F',
          800: '#805410',
          900: '#4D3308',
        },
        cs2: {
          DEFAULT: '#F5A623',
          soft: '#3A2A0F',
        },
        valorant: {
          DEFAULT: '#FF4655',
          soft: '#3A1418',
        },
        gtav: {
          DEFAULT: '#5FD068',
          soft: '#12321B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.04), 0 20px 40px -12px rgba(0,0,0,0.6)',
        gold: '0 8px 24px -6px rgba(255, 197, 49, 0.45)',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(180deg, transparent, rgba(6,7,10,1))',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
