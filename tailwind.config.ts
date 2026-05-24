import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f8fafc',
        ink: '#0a0a0f',
        brand: {
          blue: '#3b82f6',
          glow: '#60a5fa',
          purple: '#6366f1',
          green: '#10b981',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        heading: ['"Libre Caslon Display"', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'orb-drift': 'orb-drift 18s ease-in-out infinite',
        'orb-drift-slow': 'orb-drift 24s ease-in-out infinite reverse',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
