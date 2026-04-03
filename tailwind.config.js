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
        mint: {
          50: '#F0FFF0',
          100: '#E0FFE0',
          200: '#D1E8D1',
          300: '#B8E5B8',
          400: '#90EE90',
          500: '#7AC0B4',
          600: '#5A9B90', // darker complimentary shade for contrast
          700: '#43766D', // darker complimentary shade for contrast
          800: '#2F544D', // darker complimentary shade for contrast
          900: '#1D3631', // darker complimentary shade for contrast
        }
      }
    },
  },
  plugins: [],
}
