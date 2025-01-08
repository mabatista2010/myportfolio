const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#00E5FF',
          500: '#00B8D4',
          600: '#0088A3',
        },
        neon: {
          blue: '#00E5FF',
          purple: '#7B61FF',
          pink: '#FF61B6',
        },
        dark: {
          900: '#0A0A0F',
          800: '#121218',
          700: '#1A1A23',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF' },
          '100%': { textShadow: '0 0 10px #00E5FF, 0 0 15px #00E5FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 