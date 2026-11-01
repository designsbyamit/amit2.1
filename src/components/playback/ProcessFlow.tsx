import type { Playback } from '../../data/playbacks'

type Stage = NonNullable<Playback['flow']>[number]


const W = 1200, LABEL = 104, CW = 164, GAP = 22
const colX = (i: number) => LABEL + i * (CW + GAP)
const LANES = { setup: { y: 18, h: 92, label: 'Admin' }, agent: { y: 142, h: 134, label: 'AI agent' }, people: { y: 308, h: 134, label: 'People' } }
const NODES: { i: number; lane: 'agent' | 'people'; title: string; lines: string[] }[] = [
  { i: 0, lane: 'agent', title: 'Document ingestion', lines: ['Confirmations, RFQs and', 'POs arrive in many', 'formats and languages'] },
  { i: 1, lane: 'agent', title: 'Extract and map', lines: ['Data and attributes are', 'read from every document', 'and mapped to the order'] },
  { i: 2, lane: 'agent', title: 'Compare, validate', lines: ['Checked against the', 'purchase order. Every', 'discrepancy is found'] },
  { i: 3, lane: 'agent', title: 'Decision support', lines: ['Pricing, terms, delivery', 'and logistics, each', 'with its reasoning'] },
  { i: 4, lane: 'people', title: 'People decide', lines: ['Approve, escalate or ask', 'for clarification, routed', 'to the right role'] },
  { i: 5, lane: 'people', title: 'Communicate, close', lines: ['Decisions go back to the', 'relevant parties and the', 'order is closed'] },
]
const NH = 96
const nodeY = (lane: 'agent' | 'people') => LANES[lane].y + (LANES[lane].h - NH) / 2

/** The whole process as a swim-lane flowchart: who sets it up, what the agent does, where people decide. */
function FlowChart() {
  const A = 'var(--signal-ink)', P = 'var(--color-ink)', M = 'var(--color-ink-3)'
  const arrow = (d: string, c = M, dash?: string) => <path d={d} fill="none" stroke={c} strokeWidth="1.5" strokeDasharray={dash} markerEnd={`url(#ah-${c === A ? 'a' : 'm'})`} />
  const cx = (i: number) => colX(i) + CW / 2
  const cy = (lane: 'agent' | 'people') => nodeY(lane) + NH / 2
  return (
    <svg viewBox={`0 0 ${W} 520`} className="w-full h-auto" role="img" aria-label="Flowchart. An administrator connects the mailbox and ERP once. The agent ingests documents, extracts and maps data, compares and validates against the purchase order, and prepares each decision with its reasoning. People then decide, approving, escalating or asking for clarification. Decisions go back to the relevant parties and the order is closed. If a revision is needed the supplier is asked and a new confirmation arrives. Every step is logged.">
      <defs>
        {[['a', A], ['m', M]].map(([id, c]) => (
          <marker key={id} id={`ah-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker>
        ))}
      </defs>
      {(Object.keys(LANES) as (keyof typeof LANES)[]).map(k => (
        <g key={k}>
          <rect x="0" y={LANES[k].y} width={W} height={LANES[k].h} rx="14" fill="var(--surface-2)" opacity="0.55" />
          <text x="22" y={LANES[k].y + LANES[k].h / 2 + 4} fontSize="13" letterSpacing="1.2" fill="var(--color-ink-3)" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{LANES[k].label}</text>
        </g>
      ))}
      {/* setup, done once */}
      <g>
        <rect x={colX(0)} y={LANES.setup.y + 14} width={CW * 2 + GAP} height="64" rx="12" fill="var(--bg)" stroke={M} strokeDasharray="5 4" />
        <text x={colX(0) + 16} y={LANES.setup.y + 40} fontSize="14" fontWeight="600" fill="var(--color-ink)">Set up once</text>
        <text x={colX(0) + 16} y={LANES.setup.y + 60} fontSize="12" fill="var(--color-ink-2)">Connects the mailbox and ERP, manages users</text>
      </g>
      {arrow(`M${cx(0)} ${LANES.setup.y + 78} V${nodeY('agent') - 2}`, M, '5 4')}
      {/* steps */}
      {NODES.map(nd => {
        const x = colX(nd.i), y = nodeY(nd.lane), c = nd.lane === 'agent' ? A : P
        return (
          <g key={nd.title}>
            <rect x={x} y={y} width={CW} height={NH} rx="12" fill="var(--bg)" stroke={c} strokeWidth="1.5" />
            <text x={x + 14} y={y + 24} fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-ink-3)">{String(nd.i + 1).padStart(2, '0')}</text>
            <text x={x + 14} y={y + 43} fontSize="13.5" fontWeight="600" fill="var(--color-ink)">{nd.title}</text>
            {nd.lines.map((l, k) => <text key={l} x={x + 14} y={y + 61 + k * 14} fontSize="10.5" fill="var(--color-ink-2)">{l}</text>)}
          </g>
        )
      })}
      {/* arrows between steps */}
      {[0, 1, 2].map(i => <g key={i}>{arrow(`M${colX(i) + CW + 2} ${cy('agent')} H${colX(i + 1) - 4}`, A)}</g>)}
      {arrow(`M${colX(3) + CW / 2} ${nodeY('agent') + NH + 2} V${cy('people') - 30} Q${colX(3) + CW / 2} ${cy('people')} ${colX(3) + CW / 2 + 30} ${cy('people')} H${colX(4) - 4}`, A)}
      {arrow(`M${colX(4) + CW + 2} ${cy('people')} H${colX(5) - 4}`, P)}
      <text x={colX(3) + CW / 2 - 10} y={nodeY('people') - 14} textAnchor="end" fontSize="11" fill="var(--color-ink-3)">each decision goes to its owner</text>
      {/* revision loop */}
      <path d={`M${colX(4) + CW / 2} ${nodeY('people') + NH + 2} V472 H${cx(0)} V${nodeY('agent') + NH + 6}`} fill="none" stroke={M} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#ah-m)" />
      <text x={(cx(0) + colX(4) + CW / 2) / 2} y="464" textAnchor="middle" fontSize="11.5" fill="var(--color-ink-2)">If a revision is needed: the buyer asks the supplier, and a new confirmation arrives</text>
      {/* audit */}
      <line x1={colX(0)} x2={colX(5) + CW} y1="500" y2="500" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
      <text x={colX(5) + CW} y="515" textAnchor="end" fontSize="11" fill="var(--color-ink-3)">Every step is logged in one activity timeline</text>
    </svg>
  )
}


/** The same flowchart for narrow screens: lanes stacked top to bottom, steps joined by arrows. */
function MobileFlow() {
  const Down = ({ dashed = false }: { dashed?: boolean }) => (
    <div className="flex justify-center" aria-hidden="true">
      <svg width="16" height="26" viewBox="0 0 16 26" fill="none" stroke="var(--color-ink-3)" strokeWidth="1.5" strokeDasharray={dashed ? '3 3' : undefined}>
        <path d="M8 0v22" /><path d="M3 17l5 6 5-6" strokeDasharray="none" />
      </svg>
    </div>
  )
  const Lane = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="rounded-3 p-3" style={{ background: 'var(--surface-2, rgb(255 255 255 / 0.04))' }}>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-3 mb-3">{label}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  )
  const Node = ({ n, title, lines, stroke }: { n: number; title: string; lines: string[]; stroke: string }) => (
    <div className="rounded-3 border px-4 py-3" style={{ borderColor: stroke, background: 'var(--bg)' }}>
      <p className="font-mono text-[0.7rem] text-ink-3">{String(n).padStart(2, '0')}</p>
      <p className="text-body font-medium text-ink">{title}</p>
      <p className="text-body-sm text-ink-2 mt-1">{lines.join(' ')}</p>
    </div>
  )
  const agent = NODES.filter(n => n.lane === 'agent'), people = NODES.filter(n => n.lane === 'people')
  return (
    <div className="md:hidden flex flex-col" aria-label="Process flow">
      <Lane label="Admin">
        <div className="rounded-3 border border-dashed px-4 py-3" style={{ borderColor: 'var(--line-2)', background: 'var(--bg)' }}>
          <p className="text-body font-medium text-ink">Set up once</p>
          <p className="text-body-sm text-ink-2 mt-1">Connects the mailbox and ERP, manages users</p>
        </div>
      </Lane>
      <Down dashed />
      <Lane label="AI agent">
        {agent.map((n, k) => (
          <div key={n.title}>{k > 0 && <Down />}<Node n={n.i + 1} title={n.title} lines={n.lines} stroke="var(--signal-ink)" /></div>
        ))}
      </Lane>
      <p className="text-label text-ink-3 text-center py-2">each decision goes to its owner</p>
      <Lane label="People">
        {people.map((n, k) => (
          <div key={n.title}>{k > 0 && <Down />}<Node n={n.i + 1} title={n.title} lines={n.lines} stroke="var(--color-ink)" /></div>
        ))}
      </Lane>
      <p className="text-label text-ink-3 mt-3">If a revision is needed: the buyer asks the supplier, and a new confirmation arrives. Every step is logged in one activity timeline.</p>
    </div>
  )
}

/** The end-to-end process as numbered stages, with who does each one. Three across on large screens, two or one on smaller ones. */
export default function ProcessFlow(_props: { stages: Stage[] }) {
  return (
    <section className="hairline-top section-y bg-surface-1" aria-labelledby="flow-h">
      <div className="container-site">
        <div className="grid-site gap-y-4 mb-10 md:mb-12">
          <h2 id="flow-h" className="col-span-4 md:col-span-3 text-overline text-ink-3">How it works</h2>
          <p className="col-span-4 md:col-span-8 text-body-lg text-ink-2 max-w-2xl">From a supplier’s document to a closed order, in six stages. An administrator connects the mailbox and ERP once. The agent does the reading and comparing, and people make the decisions.</p>
        </div>
        <div className="hidden md:block"><FlowChart /></div>
        <MobileFlow />
      </div>
    </section>
  )
}
