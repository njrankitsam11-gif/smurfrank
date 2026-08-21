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
          950: '#06070A',
          900: '#0A0C11',
          800: '#0F1219',
          700: '#151923',
          600: '#1C212E',
          500: '#262C3B',
          400: '#3A4054',
          300: '#565D74',
          200: '#8890A6',
          100: '#B8BECF',
          50: '#F4F5F8',
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
