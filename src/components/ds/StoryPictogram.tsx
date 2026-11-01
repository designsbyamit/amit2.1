import { createContext, useContext, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* Fine-line, animated pictograms for the moments inside each leadership story.
   Each one draws itself in when it scrolls into view, then settles into a slow, quiet loop.
   Colours come from the Signal tokens, so they read in dark and light mode.
   Reduced motion: drawn and still. Decorative: the caption carries the meaning. */

export type PictogramKind =
  | 'conflict' | 'understand' | 'converge' | 'seat'
  | 'blueprint' | 'enable' | 'zoom'
  | 'mindset' | 'pillars' | 'spread'
  | 'custodian' | 'expand' | 'between' | 'languages'
  | 'status' | 'disagree' | 'memory' | 'purpose'

const INK = 'rgb(var(--ink-rgb) / 0.82)'
const DIM = 'rgb(var(--ink-rgb) / 0.32)'
const SIG = 'rgb(var(--signal-ink-rgb))'
const W = 1.4
const centre = { transformBox: 'fill-box', transformOrigin: 'center' } as const

const Ctx = createContext({ go: false, rm: false })
const useCtx = () => useContext(Ctx)

/** A line that draws itself. With `dash`, it fades in instead (dashes and drawing do not mix). */
function Ln({ d, delay = 0, c = INK, dash }: { d: string; delay?: number; c?: string; dash?: string }) {
  const { go, rm } = useCtx()
  if (dash) return <motion.path d={d} fill="none" stroke={c} strokeWidth={W} strokeLinecap="round" strokeDasharray={dash} initial={{ opacity: rm ? 1 : 0 }} animate={go ? { opacity: 1 } : undefined} transition={{ duration: 0.6, delay }} />
  return <motion.path d={d} fill="none" stroke={c} strokeWidth={W} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: rm ? 1 : 0, opacity: rm ? 1 : 0 }} animate={go ? { pathLength: 1, opacity: 1 } : undefined} transition={{ duration: 0.9, delay, ease: 'easeOut' }} />
}

function Ring({ cx, cy, r, delay = 0, c = INK, dash }: { cx: number; cy: number; r: number; delay?: number; c?: string; dash?: string }) {
  const { go, rm } = useCtx()
  if (dash) return <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={W} strokeDasharray={dash} initial={{ opacity: rm ? 1 : 0 }} animate={go ? { opacity: 1 } : undefined} transition={{ duration: 0.6, delay }} />
  return <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={W} initial={{ pathLength: rm ? 1 : 0, opacity: rm ? 1 : 0 }} animate={go ? { pathLength: 1, opacity: 1 } : undefined} transition={{ duration: 0.9, delay, ease: 'easeOut' }} />
}

function Dot({ cx, cy, r = 4, delay = 0, c = INK }: { cx: number; cy: number; r?: number; delay?: number; c?: string }) {
  const { go, rm } = useCtx()
  return <motion.circle cx={cx} cy={cy} r={r} fill={c} style={centre} initial={{ scale: rm ? 1 : 0, opacity: rm ? 1 : 0 }} animate={go ? { scale: 1, opacity: 1 } : undefined} transition={{ duration: 0.5, delay, ease: 'backOut' }} />
}

/** A ring that keeps rippling outward from a point. */
function Pulse({ cx, cy, r = 6, delay = 0 }: { cx: number; cy: number; r?: number; delay?: number }) {
  const { go, rm } = useCtx()
  if (rm || !go) return null
  return <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={SIG} strokeWidth="1.2" style={centre} initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 2.6, opacity: 0 }} transition={{ duration: 2.4, delay: delay + 1, repeat: Infinity, ease: 'easeOut' }} />
}

/** A small signal dot travelling along a straight line. */
function Travel({ from, to, delay = 0 }: { from: [number, number]; to: [number, number]; delay?: number }) {
  const { go, rm } = useCtx()
  if (rm || !go) return null
  return <motion.circle r={2.5} fill={SIG} initial={{ cx: from[0], cy: from[1], opacity: 0 }} animate={{ cx: [from[0], to[0]], cy: [from[1], to[1]], opacity: [0, 1, 1, 0] }} transition={{ duration: 2, delay: delay + 1, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut' }} />
}

function Pop({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { go, rm } = useCtx()
  return <motion.g initial={{ opacity: rm ? 1 : 0 }} animate={go ? { opacity: 1 } : undefined} transition={{ duration: 0.5, delay }}>{children}</motion.g>
}

/** A simple person: head and shoulders. `y` is the shoulder baseline minus 9. */
function Person({ x, y, c = INK, delay = 0 }: { x: number; y: number; c?: string; delay?: number }) {
  return (
    <Pop delay={delay}>
      <circle cx={x} cy={y - 9} r={4.5} fill="none" stroke={c} strokeWidth={W} />
      <path d={`M${x - 8} ${y + 9} C${x - 8} ${y} ${x + 8} ${y} ${x + 8} ${y + 9}`} fill="none" stroke={c} strokeWidth={W} strokeLinecap="round" />
    </Pop>
  )
}

const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180
  return [Math.round((cx + Math.cos(a) * r) * 10) / 10, Math.round((cy + Math.sin(a) * r) * 10) / 10]
}

/* ── Story 1: the seat at the table ─────────────────────────────────────── */

/** Two solutions pulling apart, and a seat at stake in the gap. */
const Conflict = () => (<>
  <Ln d="M40 38 H88 V86 H40 Z" />
  <Ring cx={192} cy={62} r={26} delay={0.2} />
  <Ln d="M98 62 H154" dash="2 5" c={DIM} delay={0.8} />
  <Dot cx={126} cy={62} r={5} c={SIG} delay={1.2} />
  <Pulse cx={126} cy={62} r={5} delay={1.2} />
</>)

/** Listening for the why: three stakeholders, each reaching one shared centre. */
const Understand = () => (<>
  <Person x={44} y={26} delay={0} /><Person x={44} y={62} delay={0.2} /><Person x={44} y={98} delay={0.4} />
  <Ln d="M62 24 L170 58" c={DIM} delay={0.6} /><Ln d="M62 62 H170" c={DIM} delay={0.7} /><Ln d="M62 100 L170 66" c={DIM} delay={0.8} />
  <Ring cx={192} cy={62} r={17} delay={0.9} />
  <Dot cx={192} cy={62} r={6} c={SIG} delay={1.4} />
  <Pulse cx={192} cy={62} r={6} delay={1.4} />
  <Travel from={[62, 24]} to={[172, 58]} delay={0.4} /><Travel from={[62, 62]} to={[172, 62]} delay={0.9} /><Travel from={[62, 100]} to={[172, 66]} delay={1.4} />
</>)

/** Design, engineering and product: three views, one shared middle. */
const Converge = () => (<>
  <Ring cx={104} cy={50} r={32} /><Ring cx={140} cy={50} r={32} delay={0.2} /><Ring cx={122} cy={80} r={32} delay={0.4} />
  <Dot cx={122} cy={60} r={6} c={SIG} delay={1.2} />
  <Pulse cx={122} cy={60} r={6} delay={1.2} />
</>)

/** A table of seats, the last one earned. */
const Seat = () => (<>
  <Ln d="M65 50 H175 A10 10 0 0 1 175 70 H65 A10 10 0 0 1 65 50 Z" />
  {[75, 105, 135, 165].map((x, i) => <Ring key={x} cx={x} cy={34} r={8} delay={0.3 + i * 0.12} />)}
  {[75, 105, 165].map((x, i) => <Ring key={x} cx={x} cy={86} r={8} delay={0.8 + i * 0.12} />)}
  <Dot cx={135} cy={86} r={8} c={SIG} delay={1.5} />
  <Pulse cx={135} cy={86} r={8} delay={1.5} />
</>)

/* ── Story 2: the first design team ─────────────────────────────────────── */

/** Three people today, the team they need to become. */
const Blueprint = () => (<>
  <Person x={34} y={52} /><Person x={58} y={52} delay={0.15} /><Person x={82} y={52} delay={0.3} />
  <Ln d="M104 60 H140" delay={0.6} /><Ln d="M133 53 L140 60 L133 67" delay={1} />
  <Ln d="M152 24 H216 V96 H152 Z" dash="3 4" c={DIM} delay={1} />
  {[[164, 48], [184, 48], [204, 48], [164, 80], [184, 80], [204, 80]].map(([x, y], i) => <Person key={i} x={x} y={y} c={SIG} delay={1.3 + i * 0.15} />)}
  <Pulse cx={184} cy={60} r={6} delay={2.2} />
</>)

/** Leading is building the steps others climb. */
const Enable = () => (<>
  <Ln d="M20 100 H74 V80 H124 V60 H174 V40 H224" />
  <Person x={47} y={91} c={SIG} delay={0.8} />
  <Person x={99} y={71} delay={1} /><Person x={149} y={51} delay={1.2} /><Person x={199} y={31} delay={1.4} />
  <Pulse cx={47} cy={82} r={5} delay={1.6} />
</>)

/** Zoom out for the business, zoom in for the craft. */
const Zoom = () => {
  const { go, rm } = useCtx()
  const nodes: [number, number][] = [[40, 40], [90, 28], [70, 82], [130, 86], [172, 46], [204, 92]]
  const edges = ['M40 40 L90 28', 'M40 40 L70 82', 'M90 28 L70 82', 'M90 28 L172 46', 'M70 82 L130 86', 'M130 86 L172 46', 'M130 86 L204 92', 'M172 46 L204 92']
  return (<>
    {edges.map((e, i) => <Ln key={e} d={e} c={DIM} delay={0.1 + i * 0.08} />)}
    {nodes.map(([x, y], i) => <Dot key={i} cx={x} cy={y} r={3.5} delay={0.4 + i * 0.1} />)}
    <motion.g initial={{ opacity: rm ? 1 : 0 }} animate={go ? (rm ? { opacity: 1 } : { opacity: 1, x: [0, 60, 102, 0], y: [0, 4, -36, 0] }) : undefined}
      transition={rm ? { duration: 0.4 } : { opacity: { duration: 0.5, delay: 1.2 }, x: { duration: 9, delay: 1.6, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 9, delay: 1.6, repeat: Infinity, ease: 'easeInOut' } }}>
      <circle cx={70} cy={82} r={22} fill="rgb(var(--bg-rgb) / 0.6)" stroke={SIG} strokeWidth="1.6" />
      <path d="M86 98 L98 110" stroke={SIG} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx={70} cy={82} r={7} fill={SIG} />
    </motion.g>
  </>)
}

/* ── Story 3: influence without authority ───────────────────────────────── */

/** A designer's mindset: seeing the problem from the user's side. */
const Mindset = () => (<>
  <Ln d="M30 60 Q120 -4 210 60 Q120 124 30 60 Z" />
  <Ring cx={120} cy={60} r={20} delay={0.5} />
  <Dot cx={120} cy={60} r={8} c={SIG} delay={1.1} />
  <Pulse cx={120} cy={60} r={8} delay={1.1} />
</>)

/** Five foundations holding up trust. */
const Pillars = () => (<>
  <Ln d="M36 100 H204" c={DIM} />
  {[50, 85, 120, 155, 190].map((x, i) => <Ln key={x} d={`M${x} 100 V50`} delay={0.2 + i * 0.12} />)}
  <Ln d="M36 46 H204" delay={1} />
  <Dot cx={120} cy={36} r={6} c={SIG} delay={1.6} />
  <Pulse cx={120} cy={36} r={6} delay={1.6} />
</>)

/** Design carried by people across the organisation. */
const Spread = () => (<>
  <Ring cx={120} cy={62} r={24} c={DIM} delay={0.1} />
  <Person x={120} y={62} c={SIG} delay={0.5} />
  {[[176, 62], [64, 62], [154, 28], [86, 28], [154, 96], [86, 96]].map(([x, y], i) => (<g key={i}><Person x={x} y={y} delay={0.8 + i * 0.12} /><Dot cx={x} cy={y - 20} r={2.5} c={SIG} delay={1.6 + i * 0.2} /></g>))}
  <Pulse cx={120} cy={62} r={26} delay={1.5} />
</>)

/* ── Story 4: SAP Design Hub India ──────────────────────────────────────── */

/** A custodian: tending something that belongs to many. */
const Custodian = () => (<>
  <Ln d="M70 76 Q120 124 170 76" />
  <Ln d="M120 98 V46" delay={0.5} />
  <Ln d="M120 74 C100 74 92 62 92 50 C108 50 120 60 120 74" delay={0.9} />
  <Ln d="M120 60 C140 60 148 48 148 36 C132 36 120 46 120 60" c={SIG} delay={1.2} />
  <Pulse cx={148} cy={36} r={4} delay={2} />
</>)

/** Expanding the circle while keeping the grassroots core. */
const Expand = () => (<>
  <Ring cx={120} cy={60} r={20} delay={0.1} />
  {Array.from({ length: 6 }).map((_, i) => { const [x, y] = polar(120, 60, 20, i * 60 - 90); return <Dot key={i} cx={x} cy={y} r={2.8} delay={0.4 + i * 0.08} /> })}
  <Ring cx={120} cy={60} r={46} c={SIG} delay={0.9} />
  {Array.from({ length: 10 }).map((_, i) => { const [x, y] = polar(120, 60, 46, i * 36 - 90); return <Dot key={i} cx={x} cy={y} r={3} c={SIG} delay={1.4 + i * 0.1} /> })}
  <Dot cx={120} cy={60} r={5} delay={0.3} />
  <Pulse cx={120} cy={60} r={20} delay={2} />
</>)

/** Three big events, and the quiet moments in between. */
const Between = () => (<>
  <Ln d="M20 92 H220" c={DIM} />
  {[50, 120, 190].map((x, i) => (<g key={x}><Ln d={`M${x} 92 V32`} delay={0.2 + i * 0.2} /><Dot cx={x} cy={32} r={4.5} c={SIG} delay={0.9 + i * 0.2} /></g>))}
  <Ln d="M50 92 Q85 52 120 92" dash="2 5" c={DIM} delay={1.2} /><Ln d="M120 92 Q155 52 190 92" dash="2 5" c={DIM} delay={1.3} />
  {[[72, 84], [86, 78], [100, 84], [142, 84], [156, 78], [170, 84]].map(([x, y], i) => <Dot key={i} cx={x} cy={y} r={2.6} delay={1.5 + i * 0.12} />)}
  <Pulse cx={86} cy={78} r={3} delay={2} /><Pulse cx={156} cy={78} r={3} delay={2.8} />
</>)

/** Fluent in the languages of business, technology, product and people. */
const Languages = () => (<>
  <Ring cx={106} cy={46} r={26} /><Ring cx={134} cy={46} r={26} delay={0.15} /><Ring cx={106} cy={74} r={26} delay={0.3} /><Ring cx={134} cy={74} r={26} delay={0.45} />
  <Dot cx={120} cy={60} r={5} c={SIG} delay={1.2} />
  <Pulse cx={120} cy={60} r={5} delay={1.2} />
</>)

/* ── Story 5: design culture from the inside ────────────────────────────── */

/** The visible work is the tip; most of it sits below the line. */
const Status = () => (<>
  <Ln d="M24 52 H216" c={DIM} />
  <Ln d="M96 52 L120 20 L144 52" delay={0.2} />
  <Ln d="M72 52 L120 104 L168 52" dash="3 4" c={SIG} delay={0.9} />
  <Dot cx={106} cy={66} r={2.8} c={SIG} delay={1.4} /><Dot cx={134} cy={66} r={2.8} c={SIG} delay={1.6} /><Dot cx={120} cy={82} r={3.4} c={SIG} delay={1.8} />
  <Pulse cx={120} cy={82} r={3.4} delay={2.2} />
</>)

/** Two opposing views, worked through into one direction. */
const Disagree = () => (<>
  <Dot cx={24} cy={34} r={3} delay={0} /><Dot cx={24} cy={86} r={3} delay={0.1} />
  <Ln d="M24 34 C84 34 96 60 130 60" delay={0.3} /><Ln d="M24 86 C84 86 96 60 130 60" delay={0.4} />
  <Ln d="M130 60 H208" c={SIG} delay={1} /><Ln d="M200 52 L208 60 L200 68" c={SIG} delay={1.4} />
  <Dot cx={130} cy={60} r={5} c={SIG} delay={1} />
  <Pulse cx={130} cy={60} r={5} delay={1.6} />
</>)

/** A living archive: the reasoning stacked up, not only the deliverables. */
const Memory = () => (<>
  {[88, 66, 44].map((y, i) => (<g key={y}><Ln d={`M60 ${y} H180 V${y + 16} H60 Z`} delay={0.2 + i * 0.25} /><Ln d={`M72 ${y + 8} H118`} c={DIM} delay={0.5 + i * 0.25} /></g>))}
  <Ln d="M60 22 H180 V38 H60 Z" c={SIG} delay={1} /><Ln d="M72 30 H132" c={SIG} delay={1.2} />
  <Pulse cx={170} cy={30} r={3} delay={1.8} />
</>)

/** A shared purpose: one fixed point everything orients around. */
const Purpose = () => {
  const { go, rm } = useCtx()
  return (<>
    <motion.circle cx={120} cy={60} r={46} fill="none" stroke={DIM} strokeWidth={W} strokeDasharray="2 6" style={centre} initial={{ opacity: rm ? 1 : 0 }}
      animate={go ? (rm ? { opacity: 1 } : { opacity: 1, rotate: 360 }) : undefined}
      transition={rm ? { duration: 0.4 } : { opacity: { duration: 0.6 }, rotate: { duration: 60, repeat: Infinity, ease: 'linear' } }} />
    <Ln d="M120 22 L128 52 L158 60 L128 68 L120 98 L112 68 L82 60 L112 52 Z" delay={0.3} />
    <Dot cx={120} cy={60} r={4.5} c={SIG} delay={1.2} />
    <Pulse cx={120} cy={60} r={5} delay={1.2} />
  </>)
}

const ART: Record<PictogramKind, () => ReactNode> = {
  conflict: Conflict, understand: Understand, converge: Converge, seat: Seat,
  blueprint: Blueprint, enable: Enable, zoom: Zoom,
  mindset: Mindset, pillars: Pillars, spread: Spread,
  custodian: Custodian, expand: Expand, between: Between, languages: Languages,
  status: Status, disagree: Disagree, memory: Memory, purpose: Purpose,
}

export default function StoryPictogram({ kind, className = '' }: { kind: PictogramKind; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const go = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const rm = !!useReducedMotion()
  const Art = ART[kind]
  return (
    <Ctx.Provider value={{ go, rm }}>
      <svg ref={ref} viewBox="0 0 240 120" className={className} aria-hidden="true" focusable="false"><Art /></svg>
    </Ctx.Provider>
  )
}
