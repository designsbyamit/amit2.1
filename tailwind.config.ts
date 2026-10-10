import type { Config } from 'tailwindcss'

/** Every colour is a semantic token from src/styles/tokens.css, so it flips with the theme.
 *  Legacy names kept for existing markup: `white` = primary ink, `black` = page ground. */
const c = (v: string) => `rgb(var(--${v}-rgb) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: ['btn', 'btn-primary', 'btn-secondary', 'btn-ghost', 'btn-sm', 'chip', 'tag', 'card', 'field', 'tap-target', 'container-site', 'section-y'],
  theme: {
    extend: {
      colors: {
        black: c('bg'),
        white: c('ink'),
        bg: c('bg'),
        ink: { DEFAULT: c('ink'), 2: c('ink-2'), 3: c('ink-3') },
        faint: c('faint'),
        surface: { 0: c('bg'), 1: c('surface-1'), 2: c('surface-2'), 3: c('surface-3') },
        signal: { DEFAULT: c('signal'), ink: c('signal-ink'), on: c('on-signal') },
        link: { DEFAULT: c('link'), hover: c('link-hover') },
        danger: c('danger'),
        field: { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)' },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', '"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.04em',
        tight: '-0.03em',
        overline: '0.08em',
        label: '0.06em',
      },
      borderRadius: {
        1: 'var(--radius-1)',
        2: 'var(--radius-2)',
        3: 'var(--radius-3)',
      },
    },
  },
  plugins: [],
} satisfies Config
