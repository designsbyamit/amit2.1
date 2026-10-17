import type { ReactNode } from 'react'

/* Flat line illustration kit. Three colour roles only: ink (outline), signal (the one thing that matters), paper (hides what is behind).
   One stroke weight (3), round caps, faceless figures, no ornament. See the flat-line-illustration skill. */
export const INK = 'var(--color-ink)'
export const SIGNAL = 'var(--signal)'
export const PAPER = 'var(--bg)'
export const TINT = 'rgb(var(--signal-rgb) / 0.3)'
export const SW = 3

type Pt = [number, number]
/** Arm: hand position and elbow control point, in figure space (feet at 0,0; forward is +x). */
type Arm = { to: Pt; c: Pt }
type Hair = 'short' | 'bun' | 'long' | 'cap' | 'none'
type Top = 'signal' | 'paper' | 'ink'
type Pose = 'stand' | 'point' | 'hold' | 'wave' | 'sit' | 'think'

const ARMS: Record<Pose, { f: Arm; b: Arm }> = {
  stand: { f: { to: [18, -66], c: [26, -94] }, b: { to: [-18, -66], c: [-26, -94] } },
  point: { f: { to: [66, -134], c: [46, -122] }, b: { to: [-18, -66], c: [-26, -94] } },
  hold: { f: { to: [30, -92], c: [26, -104] }, b: { to: [30, -88], c: [10, -80] } },
  wave: { f: { to: [34, -158], c: [40, -128] }, b: { to: [-18, -66], c: [-26, -94] } },
  sit: { f: { to: [44, -56], c: [30, -78] }, b: { to: [40, -50], c: [14, -66] } },
  think: { f: { to: [8, -128], c: [30, -106] }, b: { to: [-18, -66], c: [-26, -94] } },
}

/** A faceless figure. x is the centre, y is the floor, s the scale, dir 1 faces right and -1 faces left. */
export function Figure({ x, y, s = 1, dir = 1, hair = 'short', top = 'signal', pose = 'stand', armF, armB, chair = false }: {
  x: number; y: number; s?: number; dir?: 1 | -1; hair?: Hair; top?: Top; pose?: Pose; armF?: Arm; armB?: Arm; chair?: boolean
}) {
  const seated = pose === 'sit'
  const f = armF ?? ARMS[pose].f, b = armB ?? ARMS[pose].b
  const L = seated ? 24 : 0 // a seated upper body sits lower
  const fill = top === 'signal' ? SIGNAL : top === 'ink' ? INK : PAPER
  const sh = -112 + L // shoulder height
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`} strokeLinecap="round" strokeLinejoin="round">
      {chair && <path d="M-26 -40 V-92 M-26 -40 H14 M-18 -40 V0" stroke={INK} strokeWidth={SW} fill="none" />}
      <path d={seated ? 'M-6 -38 H30 V-3' : 'M-8 -62 V-3 M8 -62 V-3'} stroke={INK} strokeWidth={8} fill="none" />
      <path d={`M-18 ${sh} Q${b.c[0]} ${b.c[1]} ${b.to[0]} ${b.to[1]}`} stroke={INK} strokeWidth={SW} fill="none" />
      <path d={`M-22 ${-106 + L} Q-22 ${-118 + L} -14 ${-118 + L} H14 Q22 ${-118 + L} 22 ${-106 + L} L19 ${-66 + L} Q19 ${-62 + L} 15 ${-62 + L} H-15 Q-19 ${-62 + L} -19 ${-66 + L} Z`} fill={fill} stroke={INK} strokeWidth={SW} />
      <path d={`M18 ${sh} Q${f.c[0]} ${f.c[1]} ${f.to[0]} ${f.to[1]}`} stroke={INK} strokeWidth={SW} fill="none" />
      <circle cx={0} cy={-138 + L} r={14} fill={PAPER} stroke={INK} strokeWidth={SW} />
      {hair !== 'none' && <path d={`M-14 ${-141 + L} A14 14 0 0 1 14 ${-141 + L} Q6 ${-150 + L} -3 ${-148 + L} Q-10 ${-148 + L} -14 ${-141 + L} Z`} fill={INK} stroke={INK} strokeWidth={2} />}
      {hair === 'bun' && <circle cx={-3} cy={-158 + L} r={7} fill={INK} />}
      {hair === 'long' && <path d={`M-14 ${-141 + L} V${-122 + L} M14 ${-141 + L} V${-122 + L}`} stroke={INK} strokeWidth={5} fill="none" />}
      {hair === 'cap' && <path d={`M-15 ${-142 + L} H19`} stroke={INK} strokeWidth={5} fill="none" />}
    </g>
  )
}

export const Ground = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => <path d={`M${x1} ${y} H${x2}`} stroke={INK} strokeWidth={1.5} />

export function Desk({ x, y, w = 140 }: { x: number; y: number; w?: number }) {
  return <g stroke={INK} strokeWidth={SW} fill="none" strokeLinecap="round"><path d={`M${x} ${y} H${x + w}`} /><path d={`M${x + 8} ${y} V${y + 52} M${x + w - 8} ${y} V${y + 52}`} /></g>
}

export function Sheet({ x, y, w = 70, h = 90, lines = 3, accent = false }: { x: number; y: number; w?: number; h?: number; lines?: number; accent?: boolean }) {
  return (
    <g strokeLinecap="round">
      <rect x={x} y={y} width={w} height={h} rx={6} fill={PAPER} stroke={INK} strokeWidth={SW} />
      {Array.from({ length: lines }, (_, i) => <path key={i} d={`M${x + 12} ${y + 20 + i * 16} H${x + w - 12 - (i === lines - 1 ? 18 : 0)}`} stroke={accent && i === 0 ? SIGNAL : INK} strokeWidth={accent && i === 0 ? 6 : 1.5} />)}
    </g>
  )
}

export function Screen({ x, y, w = 150, h = 96, children, stand = true }: { x: number; y: number; w?: number; h?: number; children?: ReactNode; stand?: boolean }) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x={x} y={y} width={w} height={h} rx={8} fill={PAPER} stroke={INK} strokeWidth={SW} />
      {stand && <path d={`M${x + w / 2} ${y + h} V${y + h + 16} M${x + w / 2 - 22} ${y + h + 16} H${x + w / 2 + 22}`} stroke={INK} strokeWidth={SW} fill="none" />}
      {children}
    </g>
  )
}

/** Four-point star: the symbol of an AI agent. */
export function Spark({ x, y, r = 16, fill = SIGNAL }: { x: number; y: number; r?: number; fill?: string }) {
  const k = r * 0.28
  return <path d={`M${x} ${y - r} Q${x + k} ${y - k} ${x + r} ${y} Q${x + k} ${y + k} ${x} ${y + r} Q${x - k} ${y + k} ${x - r} ${y} Q${x - k} ${y - k} ${x} ${y - r}Z`} fill={fill} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
}

export function Arrow({ x1, y1, x2, y2, dashed = false, head = 9 }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean; head?: number }) {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const hx = (d: number) => x2 - head * Math.cos(ang + d), hy = (d: number) => y2 - head * Math.sin(ang + d)
  return (
    <g stroke={INK} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${x1} ${y1} L${x2} ${y2}`} strokeDasharray={dashed ? '2 8' : undefined} />
      <path d={`M${hx(0.5)} ${hy(0.5)} L${x2} ${y2} L${hx(-0.5)} ${hy(-0.5)}`} />
    </g>
  )
}

export function Bubble({ x, y, w = 70, h = 46, dots = 3, flip = false, fill = PAPER }: { x: number; y: number; w?: number; h?: number; dots?: number; flip?: boolean; fill?: string }) {
  const tx = flip ? x + w - 20 : x + 14
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x + 12} ${y} H${x + w - 12} Q${x + w} ${y} ${x + w} ${y + 12} V${y + h - 12} Q${x + w} ${y + h} ${x + w - 12} ${y + h} H${flip ? x + w - 28 : x + 30} L${tx} ${y + h + 14} L${flip ? x + w - 38 : x + 20} ${y + h} H${x + 12} Q${x} ${y + h} ${x} ${y + h - 12} V${y + 12} Q${x} ${y} ${x + 12} ${y}Z`} fill={fill} stroke={INK} strokeWidth={SW} />
      {Array.from({ length: dots }, (_, i) => <circle key={i} cx={x + w / 2 + (i - (dots - 1) / 2) * 14} cy={y + h / 2} r={2.6} fill={INK} />)}
    </g>
  )
}

export function Envelope({ x, y, w = 90, h = 60, fill = PAPER }: { x: number; y: number; w?: number; h?: number; fill?: string }) {
  return <g strokeLinecap="round" strokeLinejoin="round"><rect x={x} y={y} width={w} height={h} rx={8} fill={fill} stroke={INK} strokeWidth={SW} /><path d={`M${x + 4} ${y + 8} L${x + w / 2} ${y + h * 0.58} L${x + w - 4} ${y + 8}`} fill="none" stroke={INK} strokeWidth={SW} /></g>
}

export function Check({ x, y, r = 13 }: { x: number; y: number; r?: number }) {
  return <g strokeLinecap="round" strokeLinejoin="round"><circle cx={x} cy={y} r={r} fill={SIGNAL} stroke={INK} strokeWidth={SW} /><path d={`M${x - r * 0.42} ${y + r * 0.02} L${x - r * 0.08} ${y + r * 0.38} L${x + r * 0.5} ${y - r * 0.32}`} fill="none" stroke={INK} strokeWidth={SW} /></g>
}

export function Books({ x, y, w = 110, n = 3, signal = false }: { x: number; y: number; w?: number; n?: number; signal?: boolean }) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: n }, (_, i) => <rect key={i} x={x + (i % 2 ? 8 : 0)} y={y - (i + 1) * 22} width={w - (i % 2 ? 8 : 0)} height={22} rx={4} fill={signal && i === n - 1 ? SIGNAL : PAPER} stroke={INK} strokeWidth={SW} />)}
    </g>
  )
}

export function Magnifier({ x, y, r = 30 }: { x: number; y: number; r?: number }) {
  return <g strokeLinecap="round"><circle cx={x} cy={y} r={r} fill={PAPER} stroke={INK} strokeWidth={SW} /><path d={`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.7} ${y + r * 1.7}`} stroke={INK} strokeWidth={9} /></g>
}

export function Pill({ x, y, w = 80, h = 26, filled = false }: { x: number; y: number; w?: number; h?: number; filled?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={filled ? SIGNAL : PAPER} stroke={INK} strokeWidth={SW} />
}

export function Node({ x, y, w = 74, h = 40, signal = false, dashed = false, r = 10 }: { x: number; y: number; w?: number; h?: number; signal?: boolean; dashed?: boolean; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={signal ? SIGNAL : PAPER} stroke={INK} strokeWidth={SW} strokeDasharray={dashed ? '3 7' : undefined} strokeLinecap="round" />
}
