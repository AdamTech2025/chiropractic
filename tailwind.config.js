/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: { 
      sans: ['Inter', 'sans-serif'] 
    },
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#38bdf8',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
      },
    },
  },
  plugins: [],
} 