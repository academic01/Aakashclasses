/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg1: '#080808',
        darkBg2: '#111111',
        whiteAccent: '#FFFFFF',
        lightGrey: '#CCCCCC',
        midGrey: '#999999',
        darkGrey: '#555555',
        cardBorder: 'rgba(255, 255, 255, 0.12)',
        cardHover: 'rgba(255, 255, 255, 0.5)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'btn-primary': '#FFFFFF',
        'text-gradient': 'linear-gradient(135deg, #FFFFFF, #888888)',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'flicker': 'flicker 1.5s infinite alternate',
        'shimmer': 'shimmer 2s infinite linear',
        'float-icon': 'float-icon 4s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.5s infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        flicker: {
          '0%': { transform: 'scale(1)', opacity: '0.8', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))' },
          '50%': { transform: 'scale(1.1)', opacity: '1', filter: 'drop-shadow(0 0 15px rgba(255,255,255,1))' },
          '100%': { transform: 'scale(0.95)', opacity: '0.9', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        'float-icon': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
        }
      }
    },
  },
  plugins: [],
}
