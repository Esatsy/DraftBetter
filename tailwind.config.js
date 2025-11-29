/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#09090b',
        surface: '#121214',
        border: '#27272a',
        primary: '#06b6d4', // Cyan-500
        primaryDim: 'rgba(6, 182, 212, 0.1)',
        victory: '#eab308', // Yellow-500
        defeat: '#ef4444', // Red-500
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(5px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
