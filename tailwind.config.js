/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:  '#1C2B1D',
        accent:   '#C9A84C',
        warm:     '#F5EFE0',
        burgundy: '#6B1F2A',
        charcoal: '#1A1A1A',
        muted:    '#6B7280',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans:  ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}