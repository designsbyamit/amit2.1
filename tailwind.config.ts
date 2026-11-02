import type { Config } from 'tailwindcss'

/** Every colour is a semantic token from src/styles/tokens.css, so it flips with the theme.
 *  Legacy names kept for existing markup: `white` = primary ink, `black` = page ground. */
const c = (v: string) => `rgb(var(--${v}-rgb) / <alpha-value>)`

/** Spacing is a 10-point scale (tokens.css). Tailwind's own numeric keys (p-4, gap-6, mt-12 ...)
 *  are re-pointed at the nearest step, so every padding, margin and gap lands on the scale. */
const STEPS = [0, 1, 2, 4, 8, 10, 20, 30, 40, 60, 80, 120, 160, 240, 320]
const snap = (px: number) => STEPS.reduce((best, s) => (Math.abs(s - px) < Math.abs(best - px) || (Math.abs(s - px) === Math.abs(best - px) && s > best) ? s : best), 0)
const KEYS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]
const token = (px: number) => (px === 0 ? '0px' : px === 320 ? '320px' : `var(--space-${px})`)
const space: Record<string, string> = { px: 'var(--space-1)' }
for (const k of KEYS) space[String(k)] = token(snap(k * 4))
for (const k of [10, 20, 30, 40, 60, 80, 120, 160, 240]) space[`s${k}`] = `var(--space-${k})`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: ['btn', 'btn-primary', 'btn-secondary', 'btn-ghost', 'btn-sm', 'chip', 'tag', 'card', 'field', 'tap-target', 'container-site', 'section-y'],
  theme: {
    padding: space,
    margin: { auto: 'auto', ...space },
    gap: space,
    space: space,
    scrollPadding: space,
    scrollMargin: space,
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
        serif: ['"Bodoni 72"', '"Bodoni Moda Variable"', '"Bodoni Moda"', 'Didot', 'Georgia', 'serif'],
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
        none: '0',
        1: 'var(--radius-1)',
        2: 'var(--radius-2)',
        3: 'var(--radius-3)',
        sm: 'var(--radius-1)',
        DEFAULT: 'var(--radius-2)',
        md: 'var(--radius-2)',
        lg: 'var(--radius-3)',
        xl: 'var(--radius-3)',
        '2xl': 'var(--radius-3)',
        full: 'var(--radius-pill)',
      },
      boxShadow: {
        none: 'none',
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        glow: 'var(--shadow-glow)',
        sm: 'var(--shadow-1)',
        DEFAULT: 'var(--shadow-1)',
        md: 'var(--shadow-2)',
        lg: 'var(--shadow-3)',
        xl: 'var(--shadow-4)',
        '2xl': 'var(--shadow-4)',
      },
      maxWidth: {
        'measure-s': 'var(--measure-s)',
        'measure-m': 'var(--measure-m)',
        'measure-l': 'var(--measure-l)',
        'measure-xl': 'var(--measure-xl)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
      zIndex: {
        nav: 'var(--z-nav)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
      },
    },
  },
  plugins: [],
} satisfies Config
