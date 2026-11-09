import type { CSSProperties, ReactNode } from 'react'
import { C, mono } from './ui'

/** Small shared pieces for the short films. */
export const Over = ({ children, color = C.lime, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => (
  <div style={{ position: 'absolute', fontFamily: mono, fontSize: 24, letterSpacing: '0.14em', textTransform: 'uppercase', color, ...style }}>{children}</div>
)
export const Pill = ({ children, color = C.mute, bg = C.panel2, style }: { children: ReactNode; color?: string; bg?: string; style?: CSSProperties }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 22px', borderRadius: 40, background: bg, border: `1px solid ${C.line}`, fontSize: 28, color, ...style }}>{children}</span>
)
export const Panel = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 28, ...style }}>{children}</div>
)
export const Cursor = ({ x, y, show = true }: { x: number; y: number; show?: boolean }) => show ? <svg viewBox="0 0 24 24" style={{ position: 'absolute', left: x, top: y, width: 44, height: 44, zIndex: 20, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.5))' }}><path d="M5 3l14 8-6 1.5L10 19z" fill="#fff" stroke="#111" strokeWidth="1.2" strokeLinejoin="round" /></svg> : null
