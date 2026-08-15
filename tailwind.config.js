/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2638',
          light: '#17365D',
          dark: '#061622',
        },
        gold: {
          DEFAULT: '#CDAE72',
          light: '#E5CD9B',
          dark: '#B8975A',
        },
        ink: '#24313A',
        canvas: '#F4F2EE',
        accentBlue: '#2D68B2'
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      }
    },
  },
  plugins: [],
}
