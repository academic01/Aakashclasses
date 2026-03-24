/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg1: '#FFFFFF',
        lightBg2: '#F5F5F5',
        lightBg3: '#F7F7F7',
        textPrimary: '#0A0A0A',
        textSecondary: '#444444',
        textMuted: '#888888',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(0, 0, 0, 0.08)',
        cardBorderHover: 'rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'btn-primary': '#0A0A0A',
        'text-gradient': 'linear-gradient(135deg, #000000, #555555)',
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
