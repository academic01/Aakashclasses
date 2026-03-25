/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg1: '#FAF7F2', // Warm Beige
        lightBg2: '#F3EFE9', 
        lightBg3: '#EFEAE3',
        brandNavy: '#0F172A', // Deep Midnight
        brandBlue: '#2C5282',
        brandYellow: '#C5A47E', // Warm Gold
        textPrimary: '#0F172A',
        textSecondary: '#5C524F',
        textMuted: '#9E9491',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(15, 23, 42, 0.05)',
        cardBorderHover: 'rgba(197, 164, 126, 0.4)', /* brandGold */
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'btn-primary': '#0D2240',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 1.5s infinite alternate',
        'shimmer': 'shimmer 2s infinite linear',
        'float-icon': 'float-icon 4s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0.9' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        'float-icon': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
