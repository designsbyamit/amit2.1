import { motion, useReducedMotion } from 'framer-motion'

type Kind = 'agent' | 'person' | 'gate' | 'source'
interface N { id: string; c: number; r: number; kind: Kind; tag: string; t: string; s?: string }

const W = 160, H = 72
const CX = [20, 240, 460, 680, 900, 1120]
const RY = [90, 190, 290]

/** Backbone follows the Figma system flow; the parse and routing detail sits beneath each step. */
const NODES: N[] = [
  { id: 'mail', c: 0, r: 0, kind: 'source', tag: 'Mailbox', t: 'Order confirmation received via email', s: 'Email with a PDF' },
  { id: 'admin', c: 0, r: 2, kind: 'source', tag: 'Administrator', t: 'Connects the mailbox and the ERP', s: 'Once, in set-up' },
  { id: 'read', c: 1, r: 0, kind: 'agent', tag: 'Agent', t: 'Reads the email and PDF', s: 'Any layout, often German' },
  { id: 'extract', c: 1, r: 1, kind: 'agent', tag: 'Agent', t: 'Extracts the data', s: 'Header and line items' },
  { id: 'score', c: 1, r: 2, kind: 'agent', tag: 'Agent', t: 'Scores confidence', s: 'Shown beside the PDF' },
  { id: 'correct', c: 2, r: 0, kind: 'person', tag: 'Operations', t: 'Data corrected if required', s: 'Every change is logged' },
  { id: 'validate', c: 2, r: 1, kind: 'gate', tag: 'Operations · gate', t: 'Validation marked complete', s: 'Starts the routing' },
  { id: 'compare', c: 3, r: 0, kind: 'agent', tag: 'Agent', t: 'Compares with the purchase order', s: 'From the ERP' },
  { id: 'rate', c: 3, r: 1, kind: 'agent', tag: 'Agent', t: 'Rates severity and order risk', s: 'With plain-language reasoning' },
  { id: 'route', c: 3, r: 2, kind: 'agent', tag: 'Agent', t: 'Discrepancy view generated and routed', s: 'Each difference to its owner' },
  { id: 'buyer', c: 4, r: 0, kind: 'gate', tag: 'Buyer · gate', t: 'Reviews discrepancies, accepts or rejects', s: 'Commercial deviations' },
  { id: 'gr', c: 4, r: 1, kind: 'gate', tag: 'Goods recipient · gate', t: 'Reviews discrepancies, accepts or rejects', s: 'Quantity and delivery' },
  { id: 'draft', c: 5, r: 0, kind: 'agent', tag: 'Agent', t: 'Drafts the supplier email', s: 'With the discrepancy list' },
  { id: 'send', c: 5, r: 1, kind: 'gate', tag: 'Buyer · gate', t: 'Send back to supplier if revision required', s: 'Reviewed, then sent' },
  { id: 'close', c: 5, r: 2, kind: 'agent', tag: 'Agent', t: 'Approve and close', s: 'When nothing is left' },
]
const POS = (n: N) => ({ x: CX[n.c], y: RY[n.r] })

/** A rounded elbow from the right edge of one box to the left edge of the next: straight in, straight out, so every head sits square. */
const R = 14
function elbow(x1: number, y1: number, x2: number, y2: number, mx: number) {
  if (y1 === y2) return `M${x1} ${y1} H${x2}`
  const up = y2 < y1
  const s1 = up ? 0 : 1, s2 = up ? 1 : 0, d = up ? -R : R
  return `M${x1} ${y1} H${mx - R} A${R} ${R} 0 0 ${s1} ${mx} ${y1 + d} V${y2 - d} A${R} ${R} 0 0 ${s2} ${mx + R} ${y2} H${x2}`
}
const E = (c: number, r1: number, r2: number, mx = 40) => elbow(CX[c] + W, RY[r1] + 36, CX[c + 1], RY[r2] + 36, CX[c] + W + mx)
const MID = (c: number) => CX[c] + W / 2
const PATHS: { d: string; dash?: boolean; dots?: boolean; noHead?: boolean }[] = [
  { d: E(0, 0, 0), dots: true },
  { d: `M${MID(1)} 162 V188` }, { d: `M${MID(1)} 262 V288` },
  { d: E(1, 2, 0), dots: true },
  { d: `M${MID(2)} 162 V188` },
  { d: E(2, 1, 0), dots: true },
  { d: `M${MID(3)} 162 V188` }, { d: `M${MID(3)} 262 V288` },
  { d: E(3, 2, 0, 34), dots: true },
  { d: E(3, 2, 1, 50) },
  { d: E(4, 0, 0) },
  { d: E(4, 1, 0) },
  { d: `M${MID(5)} 162 V188` }, { d: `M${MID(5)} 262 V288` },
  { d: `M${MID(0)} 162 V288`, dash: true, noHead: true },
  { d: `M${CX[5] + W} 226 H${CX[5] + W + 12} A12 12 0 0 0 ${CX[5] + W + 24} 214 V66 A12 12 0 0 0 ${CX[5] + W + 12} 54 H${MID(0) + 12} A12 12 0 0 0 ${MID(0)} 66 V88`, dash: true },
]
const STAGES = ['Ingest', 'Parse', 'Validate', 'Compare and route', 'Decide', 'Reply and close']

/** End-to-end system flow: where the document enters, how it is parsed, and where each role joins. Animated on scroll. */
export default function FlowDiagram() {
  const reduce = useReducedMotion()
  const ink = 'rgb(var(--ink-rgb))'
  const soft = 'rgb(var(--ink-rgb) / 0.45)'
  return (
    <div>
      <div className="overflow-x-auto pb-2" tabIndex={0} aria-label="Flow diagram, scrolls sideways on small screens">
        <svg viewBox="0 0 1330 470" className="min-w-scroll-l w-full h-auto" role="img" aria-label="Supplier order confirmation flow: the email arrives, the agent reads, extracts and scores it, operations validates, the agent compares and routes, the buyer and goods recipient decide, the buyer sends a reply if a revision is needed, and the order closes. A revised confirmation returns as a new version.">
          <defs>
            <marker id="fd-arrow" viewBox="0 0 12 12" refX="10.5" refY="6" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M2 2 L10 6 L2 10" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker>
            <marker id="fd-arrow-soft" viewBox="0 0 12 12" refX="10.5" refY="6" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M2 2 L10 6 L2 10" fill="none" stroke={soft} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker>
          </defs>

          {STAGES.map((s, i) => (
            <text key={s} x={CX[i] + W / 2} y="22" textAnchor="middle" fill="rgb(var(--ink-rgb) / 0.55)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.2">{`0${i + 1} ${s.toUpperCase()}`}</text>
          ))}
          {CX.map((x, i) => <line key={i} x1={x + W / 2} x2={x + W / 2} y1="34" y2="378" stroke="rgb(var(--ink-rgb) / 0.06)" strokeDasharray="2 5" />)}

          {PATHS.map((p, i) => (
            <motion.path key={i} d={p.d} fill="none" stroke={p.dash ? soft : ink} strokeWidth="1.6" strokeLinecap="round" strokeDasharray={p.dash ? '5 5' : undefined} markerEnd={p.noHead ? undefined : `url(#${p.dash ? 'fd-arrow-soft' : 'fd-arrow'})`}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: 'easeOut' }} />
          ))}
          <text x="680" y="49" textAnchor="middle" fontSize="12" fill="rgb(var(--ink-rgb) / 0.75)" fontFamily="var(--font-sans)" style={{ paintOrder: 'stroke' }} stroke="var(--surface-1)" strokeWidth="8">A revised confirmation returns as a new version of the same order</text>

          {!reduce && PATHS.filter(p => p.dots).map((p, i) => (
            <circle key={i} r="3.5" fill="var(--signal)" stroke="var(--signal-edge)" strokeWidth="1"><animateMotion dur="2.6s" begin={`${1.6 + i * 0.5}s`} repeatCount="indefinite" path={p.d} /></circle>
          ))}

          {NODES.map(n => {
            const { x, y } = POS(n)
            const agent = n.kind === 'agent'
            const gate = n.kind === 'gate'
            const src = n.kind === 'source'
            const fg = agent ? 'var(--surface-0)' : ink
            return (
              <motion.g key={n.id} initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.5, delay: 0.1 + (n.c * 3 + n.r) * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                <rect x={x} y={y} width={W} height={H} rx="10" fill={agent ? ink : gate ? 'rgb(var(--signal-rgb) / 0.28)' : 'transparent'} stroke={gate ? 'var(--signal)' : agent ? 'none' : soft} strokeWidth={gate ? 2 : 1.4} strokeDasharray={src ? '5 4' : undefined} />
                <text x={x + 12} y={y + 18} fill={agent ? 'rgb(var(--bg-rgb) / 0.62)' : 'rgb(var(--ink-rgb) / 0.62)'} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.9">{n.tag.toUpperCase()}</text>
                <foreignObject x={x + 10} y={y + 22} width={W - 18} height={H - 24}>
                  <div style={{ color: fg, fontFamily: 'var(--font-sans)', lineHeight: 1.22 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{n.t}</div>
                    {n.s && <div style={{ fontSize: 11, marginTop: 2, opacity: 0.68 }}>{n.s}</div>}
                  </div>
                </foreignObject>
              </motion.g>
            )
          })}

          <motion.g initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6, duration: 0.6 }}>
            <rect x="20" y="404" width="1290" height="46" rx="10" fill="none" stroke={soft} strokeDasharray="5 4" />
            <text x="40" y="432" fill={ink} fontFamily="var(--font-sans)" fontSize="13" fontWeight="500">Activity log</text>
            <text x="130" y="432" fill="rgb(var(--ink-rgb) / 0.7)" fontFamily="var(--font-sans)" fontSize="13">Every step above is recorded as the AI Agent, operations, buyer, goods recipient or the system.</text>
          </motion.g>
        </svg>
      </div>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-label text-ink-3" aria-label="Legend">
        <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-1" style={{ background: 'rgb(var(--ink-rgb))' }} />Agent acts</li>
        <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-1 border-2" style={{ borderColor: 'var(--signal)', background: 'rgb(var(--signal-rgb) / 0.28)' }} />Person decides: a gate</li>
        <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-1 border" style={{ borderColor: 'var(--line-control)' }} />Person checks</li>
        <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-1 border border-dashed" style={{ borderColor: 'var(--line-control)' }} />Source or set-up</li>
      </ul>
    </div>
  )
}
