const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        blink: {
          '0%': { opacity: 0 },
          '49%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        'blink': 'blink 1.5s linear infinite'
      }
    },
  },
  plugins: [],
}

