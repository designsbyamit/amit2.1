import type { CSSProperties, ReactNode } from 'react'
import { easeOut, seg, clamp } from './engine'

export const C = { bg: '#0F1013', panel: '#181A1F', panel2: '#20232A', line: '#2C3038', ink: '#ECEDEF', mute: '#A3A7B0', dim: '#6B7078', lime: '#C8F55A', red: '#FF6B5B', amber: '#FFC857', cobalt: '#6E8BFF', green: '#5BE3A0' }
export const mono = "'Geist Mono Variable','Geist Mono',ui-monospace,monospace"

/** Fade + rise in at `a`, optional fade out at `o`. */
export function In({ t, a, o, d = 0.7, y = 24, x = 0, s = 0, children, style }: { t: number; a: number; o?: number; d?: number; y?: number; x?: number; s?: number; children: ReactNode; style?: CSSProperties }) {
  const p = easeOut(seg(t, a, a + d))
  const q = o !== undefined ? 1 - easeOut(seg(t, o, o + 0.5)) : 1
  const op = p * q
  if (op <= 0.001) return null
  return <div style={{ position: 'absolute', opacity: op, transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px) scale(${1 - (1 - p) * s})`, ...style }}>{children}</div>
}

/** Word-by-word kinetic text. */
export function Words({ t, a, text, size = 96, weight = 200, color = C.ink, gap = 0.09, style, accent = [] }: { t: number; a: number; text: string; size?: number; weight?: number; color?: string; gap?: number; style?: CSSProperties; accent?: string[] }) {
  const ws = text.split(' ')
  return (
    <div style={{ position: 'absolute', fontSize: size, fontWeight: weight, color, letterSpacing: '-0.035em', lineHeight: 1.04, ...style }}>
      {ws.map((w, i) => {
        const p = easeOut(seg(t, a + i * gap, a + i * gap + 0.6))
        return <span key={i} style={{ display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 0.35 * size}px)`, marginRight: size * 0.26, color: accent.includes(w.replace(/[.,]/g, '')) ? C.lime : undefined }}>{w}</span>
      })}
    </div>
  )
}

export const Label = ({ children, color = C.lime, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => (
  <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.14em', textTransform: 'uppercase', color, ...style }}>{children}</div>
)

/** Scene wrapper: crossfades at the edges. */
export function Scene({ t, s, e, children }: { t: number; s: number; e: number; children: ReactNode }) {
  if (t < s - 0.01 || t > e + 0.6) return null
  const out = 1 - seg(t, e, e + 0.5)
  return <div style={{ position: 'absolute', inset: 0, opacity: out }}>{children}</div>
}

export const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
export const countTo = (t: number, a: number, b: number, from: number, to: number) => from + (to - from) * easeOut(clamp((t - a) / (b - a)))
