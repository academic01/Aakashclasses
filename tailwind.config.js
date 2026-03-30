/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBeige: '#F9F6F2', // Light Beige Base
        lightBg1: '#F9F6F2', // Updated to Beige
        lightBg2: '#F3EFEA', // Slightly darker beige for contrast
        lightBg3: '#EAE5DF',
        brandNavy: '#0D2240', // Deep Midnight
        brandBlue: '#1a3a6b',
        brandYellow: '#F5A623', // Bright Yellow
        brandOrange: '#F5A623',
        textPrimary: '#0A0A0A',
        textSecondary: '#444444',
        textMuted: '#888888',
        cardBg: '#FFFFFF',
        cardBorder: '#E5E5E5',
        cardBorderHover: 'rgba(245, 166, 35, 0.4)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse-custom 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s infinite linear',
        'slide-in': 'slide-in 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-custom': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-15px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
