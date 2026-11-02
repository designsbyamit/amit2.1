/**
 * The design system pages read their colour values from tokens.css itself, so the documentation
 * can never drift from what the site uses. Change a value in tokens.css and the docs follow.
 */
import css from './tokens.css?raw'

const split = css.indexOf("html[data-theme='light']")
const blocks = { dark: css.slice(0, split), light: css.slice(split, css.indexOf('\n}', split)) }
const hex = (r: string, g: string, b: string) => '#' + [r, g, b].map(n => Number(n).toString(16).padStart(2, '0')).join('').toUpperCase()

/** A colour channel token such as "bg" or "ink-2", as a hex string for the given mode. */
export function tokenHex(name: string, mode: 'dark' | 'light'): string {
  const m = blocks[mode].match(new RegExp(`--${name}-rgb:\\s*(\\d+) (\\d+) (\\d+)`))
  return m ? hex(m[1], m[2], m[3]) : ''
}

/** A mode-independent colour token such as "field-teal" or "on-field". */
export function fieldHex(name: string): string {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))
  return m ? m[1].toUpperCase() : ''
}
