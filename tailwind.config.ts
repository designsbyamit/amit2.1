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
        'on-field': { DEFAULT: 'var(--on-field)', strong: 'var(--on-field-strong)', accent: 'var(--on-field-accent)', muted: 'var(--on-field-muted)' },
        field: { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)', ink: 'var(--field-ink)' },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Bodoni 72"', '"Bodoni Moda Variable"', '"Bodoni Moda"', 'Didot', 'Georgia', 'serif'],
        mono: ['"Geist Mono Variable"', '"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: 'var(--track-tightest)',
        tighter: 'var(--track-tighter)',
        tight: 'var(--track-tight)',
        overline: 'var(--track-overline)',
        widest: 'var(--track-wide)',
        label: 'var(--track-label)',
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
      fontSize: {
        't-glyph': 'var(--text-glyph)', 't-2xs': 'var(--text-2xs)', 't-tiny': 'var(--text-tiny)', 't-xs': 'var(--text-xs)',
        't-caption': 'var(--text-caption)', 't-sm': 'var(--text-sm)', 't-ui': 'var(--text-ui)', 't-base': 'var(--text-base)',
        't-md': 'var(--text-md)', 't-lead': 'var(--text-lead)', 't-lg': 'var(--text-lg)', 't-2xl': 'var(--text-2xl)',
        't-numeral-s': 'var(--text-numeral-s)', 't-numeral-l': 'var(--text-numeral-l)',
        'f-case-title': 'var(--fs-case-title)',
      },
      width: { 'card-s': 'var(--size-card-s)', 'card-m': 'var(--size-card-m)', 'card-l': 'var(--size-card-l)', check: 'var(--size-check)', 'label-col': 'var(--size-label-col)' },
      height: { check: 'var(--size-check)', rail: 'var(--size-rail)', 'icon-m': 'var(--icon-m)' },
      minWidth: { 'scroll-s': 'var(--size-scroll-s)', 'scroll-m': 'var(--size-scroll-m)', 'scroll-l': 'var(--size-scroll-l)', cell: 'var(--size-cell)', lane: 'var(--size-lane)', tile: 'var(--size-tile)' },
      minHeight: { panel: 'var(--size-panel)', 'panel-l': 'var(--size-panel-l)', lane: 'var(--size-lane)', 'card-s': 'var(--size-card-h-s)', 'card-l': 'var(--size-card-h-l)', tile: 'var(--size-tile)' },
      maxHeight: { stage: 'var(--size-stage)' },
      maxWidth: {
        'note-s': 'var(--size-note-s)',
        note: 'var(--size-note)',
        'note-l': 'var(--size-note-l)',
        quote: 'var(--size-quote-w)',
        lede: 'var(--size-lede-w)',
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
        dialog: 'var(--z-dialog)',
        progress: 'var(--z-progress)',
        cursor: 'var(--z-cursor)',
      },
    },
  },
  plugins: [],
} satisfies Config
