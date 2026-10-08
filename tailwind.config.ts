import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0C0C0B',
        white: '#F5F2ED',
        ink: { DEFAULT: '#F5F2ED', 2: '#C2BFBB', 3: '#A6A4A0' },
        faint: '#6E6D6A',
        surface: { 0: '#0C0C0B', 1: '#141413', 2: '#1C1C1A', 3: '#262624' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.04em',
        tight: '-0.03em',
        overline: '0.18em',
        label: '0.12em',
      },
    },
  },
  plugins: [],
} satisfies Config
