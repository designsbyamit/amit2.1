import { useState } from 'react'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import Tabs from '../components/ds/Tabs'
import { Tag } from '../components/ds/Tag'
import ResourceCover from '../components/ds/ResourceCover'

// ── Data ──────────────────────────────────────────────────────────────────────

const JOURNEY = [
  {
    id: 'why',
    time: '09:00',
    label: 'Opening',
    title: 'Why business language is the designer\'s unlock',
    summary: 'Most designers speak one language fluently. This session names the gap — and makes the cost of the gap visible.',
    learned: ['The difference between how designers describe impact vs how business leaders measure it', 'Why craft alone has never earned a seat at the strategy table', 'The specific moments where designers lose influence inside organisations'],
    framework: 'The Translation Gap',
    takeaway: 'Influence isn\'t earned through craft. It\'s earned through translation.',
    mistake: 'Believing that "speaking business" means abandoning design values. It means amplifying them.',
  },
  {
    id: 'metrics',
    time: '10:00',
    label: 'Framework',
    title: 'The three metric layers: business, user, design',
    summary: 'Every design decision sits at the intersection of three measurement systems. Most designers only know one of them.',
    learned: ['Business KPIs and why executives care about them', 'How user metrics bridge intent and outcome', 'Which design metrics actually predict business results'],
    framework: 'The Metric Stack',
    takeaway: 'Design metrics that don\'t connect to business outcomes are decoration.',
    mistake: 'Confusing activity metrics (screens designed, sprints completed) with outcome metrics (retention change, conversion lift).',
  },
  {
    id: 'translation',
    time: '11:30',
    label: 'Practice',
    title: 'The Dual Fluency Loop: connecting design work to business outcomes',
    summary: 'The core framework of the workshop. A repeatable system for mapping any design decision to a business metric.',
    learned: ['The four-step translation process', 'How to identify which business KPI your work most directly influences', 'How to quantify design impact before it ships'],
    framework: 'The Dual Fluency Loop',
    takeaway: 'Every design decision is a hypothesis about a business outcome. Make the hypothesis explicit.',
    mistake: 'Waiting until after launch to measure. Build the measurement into the brief.',
  },
  {
    id: 'stakeholders',
    time: '13:30',
    label: 'Application',
    title: 'Speaking to different stakeholders',
    summary: 'A CFO, a CPO, and an engineering lead all care about different things. Dual Fluency means knowing which language each room requires.',
    learned: ['What a CFO actually cares about (and it isn\'t your persona work)', 'How PMs translate user needs into roadmap — and how to use that', 'Why engineers push back on design and how business framing changes the conversation'],
    framework: 'The Stakeholder Translation Map',
    takeaway: 'The same design decision requires four different narratives depending on who is in the room.',
    mistake: 'Using the same pitch deck for every audience.',
  },
  {
    id: 'practice',
    time: '14:30',
    label: 'Workshop',
    title: 'Live practice: translate a real brief',
    summary: 'Participants work on an actual design challenge, applying Dual Fluency in real time with facilitated critique.',
    learned: ['How to apply the Dual Fluency Loop to a real brief in under 20 minutes', 'Common translation failures and how to catch them before the stakeholder meeting', 'How to give and receive Dual Fluency feedback'],
    framework: 'Applied Dual Fluency',
    takeaway: 'The first time you use a framework correctly, it feels uncomfortable. That discomfort is learning.',
    mistake: 'Optimising for impressing the facilitator instead of solving the actual translation problem.',
  },
  {
    id: 'close',
    time: '16:00',
    label: 'Synthesis',
    title: 'Building a personal Dual Fluency practice',
    summary: 'How to keep this alive after the workshop. Habits, tools, and the one question to ask yourself before every stakeholder meeting.',
    learned: ['The one question that triggers Dual Fluency thinking', 'How to build translation habit into your existing design process', 'What to read, study, and practise next'],
    framework: 'The Daily Translation Practice',
    takeaway: '"How does this create measurable business value?" — ask it before every design decision.',
    mistake: 'Treating Dual Fluency as a presentation skill rather than a thinking skill.',
  },
]

const KPI_CHAIN = [
  {
    id: 'business',
    label: 'Business KPIs',
    color: 'rgb(var(--ink-rgb) / 0.9)',
    items: [
      { name: 'Revenue', definition: 'Total income generated from products or services.', formula: 'Price × Volume', influences: ['Conversion Rate', 'Average Order Value', 'Customer Lifetime Value'] },
      { name: 'Retention', definition: 'Percentage of customers who continue using the product over time.', formula: '(End users − New users) / Start users × 100', influences: ['DAU/MAU Ratio', 'Churn Rate', 'Engagement Depth'] },
      { name: 'CAC', definition: 'Cost to acquire one new customer.', formula: 'Total acquisition spend / New customers', influences: ['Onboarding Completion', 'Time to First Value', 'Activation Rate'] },
      { name: 'NPS', definition: 'Net Promoter Score — likelihood of recommendation.', formula: '% Promoters − % Detractors', influences: ['Task Success Rate', 'Error Rate', 'Support Contact Rate'] },
    ],
  },
  {
    id: 'user',
    label: 'User Metrics',
    color: 'var(--color-ink-3)',
    items: [
      { name: 'Task Success Rate', definition: 'Percentage of users completing a defined task successfully.', formula: 'Successful completions / Attempts × 100', influences: ['Conversion Rate', 'Support Cost'] },
      { name: 'Time on Task', definition: 'How long it takes a user to complete a specific task.', formula: 'Measured in seconds/minutes per user', influences: ['Efficiency gains', 'Support Contact Rate'] },
      { name: 'DAU/MAU Ratio', definition: 'Daily active users divided by monthly active users — stickiness.', formula: 'DAU / MAU', influences: ['Retention', 'Revenue per user'] },
      { name: 'Error Rate', definition: 'Frequency of errors users encounter per session.', formula: 'Errors / Total interactions × 100', influences: ['NPS', 'Support CAC'] },
    ],
  },
  {
    id: 'design',
    label: 'Design Metrics',
    color: 'var(--color-ink-3)',
    items: [
      { name: 'System Usability Scale', definition: 'Standardised 10-item questionnaire measuring perceived usability.', formula: 'Score 0–100 (>68 = above average)', influences: ['Task Success Rate', 'NPS'] },
      { name: 'Findability', definition: 'How easily users locate information or features.', formula: 'Time to find / Success rate on wayfinding tasks', influences: ['Task Success Rate', 'DAU/MAU'] },
      { name: 'Cognitive Load', definition: 'Mental effort required to use the interface.', formula: 'NASA TLX scale or eye-tracking + think-aloud', influences: ['Error Rate', 'Time on Task'] },
      { name: 'Accessibility Score', definition: 'WCAG compliance level across the experience.', formula: 'WCAG AA/AAA automated + manual audit', influences: ['Legal risk', 'Market reach'] },
    ],
  },
]

const GLOSSARY = [
  { term: 'Business Case', simple: 'The argument for why something is worth doing — in numbers.', design: 'The document a designer should be able to write before any project begins. Not a brief. A justification.', example: '"This feature will reduce support contacts by 30%, saving £200K annually."', confusion: 'A business case is not a brief. A brief describes what to make. A business case explains why it\'s worth making.', related: ['ROI', 'KPI', 'OKR'] },
  { term: 'ROI', simple: 'Return on Investment — what you get back relative to what you put in.', design: 'For design: the measurable business outcome attributable to a design decision, relative to the cost of making it.', example: '"Redesigning the onboarding flow cost £40K and increased activation by 15% — a £200K annual revenue impact."', confusion: 'ROI is not the same as value. Value is broader. ROI is specifically financial return on a specific investment.', related: ['Business Case', 'Conversion Rate', 'CAC'] },
  { term: 'OKR', simple: 'Objectives and Key Results — a goal-setting framework used by most tech companies.', design: 'The system most product teams use to prioritise work. Understanding OKRs tells you exactly what your PM is being measured on — which tells you which design work will get resourced.', example: '"Objective: Grow revenue. KR: Increase trial conversion from 8% to 12% by Q3."', confusion: 'OKRs describe outcomes, not activities. "Redesign the dashboard" is not a KR. "Increase dashboard engagement by 40%" is.', related: ['KPI', 'Business Case', 'Product Strategy'] },
  { term: 'Conversion Rate', simple: 'Percentage of users who take a desired action.', design: 'The metric most directly influenced by design quality at the interaction layer. Signup conversion, checkout conversion, activation conversion — each maps to a specific design decision.', example: '"12% of trial users convert to paid — improving this by 2pp would be worth £1.2M annually at current volume."', confusion: 'Conversion rate measures the right action, not just any action. Define the action precisely before measuring.', related: ['Funnel', 'Activation', 'CAC'] },
  { term: 'ARPU', simple: 'Average Revenue Per User — how much each user generates on average.', design: 'The metric that explains why ancillary features matter. Improving ARPU often requires discovering and surfacing value users didn\'t know existed.', example: '"Moving ancillary services earlier in the booking flow increased ARPU from £42 to £63."', confusion: 'ARPU is an average — outliers distort it. High ARPU from a few power users can mask low monetisation of the majority.', related: ['Revenue', 'LTV', 'Upsell Rate'] },
  { term: 'Churn', simple: 'The rate at which customers stop using a product.', design: 'The metric that reveals where the product fails to deliver on its promise. High churn usually indicates a gap between what was promised and what was delivered — often a design and communication problem.', example: '"Monthly churn dropped from 8% to 5% after redesigning the empty state experience for new users."', confusion: 'Not all churn is equal. Involuntary churn (payment failure) is different from voluntary churn (chose to leave). Design can address both but in different ways.', related: ['Retention', 'LTV', 'Onboarding'] },
]

// ── Components ─────────────────────────────────────────────────────────────────

const LOOP = ['Identify the business KPI', 'Find the user metric that moves it', 'Find the design metric that moves that', 'Design the intervention', 'Measure both']
const ease = [0.16, 1, 0.3, 1] as const
const mail = (subject: string, body: string) => `mailto:uxbyamit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
const REQUEST_PLAYBOOK = mail('Request - Dual Fluency playbook', 'Hi Amit,\n\nI would like to request the Dual Fluency playbook.\n\nName:\nRole:\nOrganisation:')
const REQUEST_CANVAS = mail('Request - Dual Fluency Canvas', 'Hi Amit,\n\nI would like to request the Dual Fluency Canvas.\n\nName:\nRole:\nOrganisation:')
const REQUEST_WORKSHOP = mail('Request - Dual Fluency workshop', 'Hi Amit,\n\nI am interested in bringing the Dual Fluency workshop to my team.\n\nName:\nRole:\nOrganisation:\nTeam size:')

function Section({ id, label, title, intro, children }: { id: string; label: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section-y hairline-top scroll-mt-24" aria-labelledby={`${id}-h`}>
      <div className="container-site">
        <div className="grid-site gap-y-6 mb-12 md:mb-16">
          <div className="col-span-4 md:col-span-6">
            <p className="text-overline text-ink-3 mb-4">{label}</p>
            <h2 id={`${id}-h`} className="text-heading text-ink">{title}</h2>
          </div>
          {intro && <p className="col-span-4 md:col-span-5 md:col-start-8 self-end text-body text-ink-2">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

/** The Dual Fluency Loop as a circular diagram. */
function LoopDiagram() {
  const R = 150, C = 190
  const pts = LOOP.map((_, i) => { const a = -Math.PI / 2 + (i / LOOP.length) * Math.PI * 2; return [C + Math.cos(a) * R, C + Math.sin(a) * R] })
  return (
    <figure className="rounded-3 p-6 md:p-10" style={{ background: 'var(--field-cobalt)' }}>
      <div className="grid md:grid-cols-[minmax(0,380px)_1fr] gap-8 md:gap-12 items-center">
        <svg viewBox="0 0 380 380" className="w-full max-w-[380px] mx-auto" role="img" aria-label="The Dual Fluency Loop: five steps in a cycle">
          <circle cx={C} cy={C} r={R} fill="none" stroke="#ECEDEF" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" />
          <text x={C} y={C - 6} textAnchor="middle" fill="#ECEDEF" style={{ font: '300 18px var(--font-sans)' }}>Design decision</text>
          <text x={C} y={C + 18} textAnchor="middle" fill="#C8F55A" style={{ font: '400 11px var(--font-mono)', letterSpacing: '0.08em' }}>= A HYPOTHESIS</text>
          {pts.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="20" fill={i === 0 ? '#C8F55A' : '#1B2350'} stroke="#C8F55A" strokeWidth="1.5" />
              <text x={x} y={y + 4} textAnchor="middle" fill={i === 0 ? '#0F1013' : '#ECEDEF'} style={{ font: '500 12px var(--font-mono)' }}>{String(i + 1).padStart(2, '0')}</text>
            </g>
          ))}
        </svg>
        <figcaption>
          <p className="font-mono text-xs tracking-[0.08em] uppercase mb-4" style={{ color: '#C8F55A' }}>The Dual Fluency Loop</p>
          <ol className="flex flex-col gap-3">
            {LOOP.map((s, i) => <li key={s} className="flex gap-4 text-[1.0625rem] font-light" style={{ color: '#ECEDEF' }}><span className="font-mono text-xs pt-1.5" style={{ color: '#C8F55A' }}>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}
          </ol>
        </figcaption>
      </div>
    </figure>
  )
}

/** The canvas, drawn as the sheet people fill in, with one worked example row. */
function CanvasSheet() {
  const cols = ['Business KPI', 'User metric', 'Design metric', 'Intervention']
  const example = ['Retention', 'Task success rate', 'Findability', 'Make the core task reachable in one step from the home screen']
  return (
    <figure className="rounded-3 p-5 md:p-8 overflow-x-auto" style={{ background: 'var(--field-teal)' }}>
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between mb-5">
          <p className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: '#C8F55A' }}>Dual Fluency Canvas</p>
          <p className="font-mono text-xs" style={{ color: '#ECEDEF', opacity: 0.7 }}>Decision: ____________________</p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {cols.map((c, i) => (
            <div key={c} className="rounded-2 p-4 flex flex-col gap-3 min-h-[260px]" style={{ background: 'rgb(255 255 255 / 0.06)', border: '1px solid rgb(255 255 255 / 0.14)' }}>
              <div className="flex items-center justify-between"><span className="font-mono text-xs" style={{ color: '#C8F55A' }}>0{i + 1}</span>{i < 3 && <span aria-hidden="true" style={{ color: '#ECEDEF', opacity: 0.5 }}>←</span>}</div>
              <p className="text-[1.0625rem] font-light" style={{ color: '#ECEDEF' }}>{c}</p>
              <div className="rounded-1 p-3 text-sm" style={{ background: '#C8F55A', color: '#0F1013' }}>{example[i]}</div>
              {[0, 1].map(k => <div key={k} className="h-9 rounded-1" style={{ border: '1px dashed rgb(255 255 255 / 0.25)' }} />)}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm" style={{ color: '#ECEDEF', opacity: 0.8 }}>Read right to left: the intervention moves a design metric, which moves a user metric, which moves the business KPI. Measure both ends.</p>
      </div>
      <figcaption className="sr-only">The canvas has four columns: business KPI, user metric, design metric and intervention, with an example row.</figcaption>
    </figure>
  )
}

export default function DualFluencyPage() {
  const [layer, setLayer] = useState(KPI_CHAIN[0].id)
  const [q, setQ] = useState('')
  const glossary = GLOSSARY.filter(g => !q || (g.term + g.simple + g.design).toLowerCase().includes(q.toLowerCase()))
  const current = KPI_CHAIN.find(l => l.id === layer)!

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site pt-10 md:pt-14 pb-16 md:pb-20">
          <div className="mb-10"><Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Dual Fluency' }]} /></div>
          <div className="grid-site gap-y-10 items-end">
            <div className="col-span-4 md:col-span-8">
              <p className="text-overline text-ink-3 mb-5">Playbook · Design leadership</p>
              <motion.h1 className="text-display-xl text-ink" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>Dual Fluency</motion.h1>
              <motion.p className="text-body-lg text-ink-2 mt-6 max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
                Imagine a designer working on an amazing feature. It launches. Users love it. Then leadership asks: <em>“What business impact did it create?”</em>
              </motion.p>
              <p className="text-body text-ink-2 mt-4 max-w-2xl">Dual Fluency is the capacity to operate equally in the language of design and the language of business, and to translate fluently between them in any room.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button href={REQUEST_PLAYBOOK}>Request the playbook</Button>
                <Button variant="secondary" href={REQUEST_WORKSHOP}>Bring it to your team</Button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-10 max-w-[240px]">
              <ResourceCover title="Dual Fluency" kind="Playbook" motif="loop" tone="cobalt" />
            </div>
          </div>
          <nav aria-label="On this page" className="flex flex-wrap gap-2 mt-14">
            {[['stages', 'Six stages'], ['loop', 'The loop'], ['kpis', 'KPI library'], ['glossary', 'Glossary'], ['canvas', 'Canvas']].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
          </nav>
        </div>
      </section>

      {/* Six stages: no clock times, no agenda */}
      <Section id="stages" label="Six stages" title="From “why does business matter?” to speaking it fluently." intro="Each stage builds on the one before and leaves you with one framework. Open a stage to see what it covers, the takeaway and the mistake to avoid.">
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JOURNEY.map((m, i) => (
            <li key={m.id} className="card flex flex-col gap-4">
              <div className="flex items-center justify-between"><span className="text-label text-signal-ink">Stage {String(i + 1).padStart(2, '0')}</span><Tag>{m.framework.toLowerCase()}</Tag></div>
              <h3 className="text-title text-ink">{m.title}</h3>
              <p className="text-body-sm text-ink-2">{m.summary}</p>
              <details className="mt-auto pt-2">
                <summary className="cursor-pointer list-none text-body-sm text-ink underline underline-offset-4 decoration-[var(--line-control)] hover:decoration-current">What this stage covers</summary>
                <div className="mt-4 flex flex-col gap-4">
                  <ul className="flex flex-col gap-2">{m.learned.map(l => <li key={l} className="text-body-sm text-ink-2 flex gap-2"><span aria-hidden="true" className="text-faint">–</span>{l}</li>)}</ul>
                  <p className="text-body-sm text-ink"><span className="text-label text-signal-ink block mb-1">Takeaway</span>{m.takeaway}</p>
                  <p className="text-body-sm text-ink-2"><span className="text-label text-ink-3 block mb-1">Common mistake</span>{m.mistake}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Section>

      {/* Concepts + loop */}
      <Section id="loop" label="Core idea" title="Every design decision is a hypothesis about a business outcome." intro="Make the hypothesis explicit before you design, and you can measure it after you ship. The loop is how.">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="card"><p className="text-label text-ink-3 mb-3">Concept</p><p className="text-title text-ink mb-2">Design decision</p><p className="text-body-sm text-ink-2">A choice about what to build and how. On its own it is an opinion; connected to a metric it becomes a bet you can check.</p></div>
          <div className="card"><p className="text-label text-ink-3 mb-3">Concept</p><p className="text-title text-ink mb-2">Hypothesis about a business outcome</p><p className="text-body-sm text-ink-2">“If we change this, this user behaviour will change, and this business KPI will move.” Written down before the work starts.</p></div>
        </div>
        <LoopDiagram />
      </Section>

      {/* KPI library */}
      <Section id="kpis" label="KPI library" title="The metrics that matter, and what moves them." intro="Three layers: business KPIs, the user metrics that move them, and the design metrics that move those.">
        <Tabs label="Metric layers" value={layer} onChange={setLayer} tabs={KPI_CHAIN.map(l => ({ id: l.id, label: l.label }))}>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {current.items.map(k => (
              <li key={k.name} className="card flex flex-col gap-3">
                <h3 className="text-title text-ink">{k.name}</h3>
                <p className="text-body-sm text-ink-2">{k.definition}</p>
                <p className="font-mono text-xs text-ink-3 leading-relaxed">{k.formula}</p>
                <div className="mt-auto pt-3 hairline-top">
                  <p className="text-label text-ink-3 mb-2">Moved by</p>
                  <ul className="tag-list">{k.influences.map(x => <li key={x} className="tag">{x}</li>)}</ul>
                </div>
              </li>
            ))}
          </ul>
        </Tabs>
      </Section>

      {/* Glossary */}
      <Section id="glossary" label="Glossary" title="Business terms, defined for designers." intro="What each term means, why it matters to your work, and the confusion to avoid.">
        <div className="max-w-md mb-8">
          <label htmlFor="gl-search" className="field-label">Search the glossary</label>
          <input id="gl-search" type="search" className="field" placeholder="For example: churn" value={q} onChange={e => setQ(e.target.value)} />
          <p className="sr-only" aria-live="polite">{glossary.length} terms</p>
        </div>
        <div className="accordion">
          {glossary.map(g => (
            <details key={g.term}>
              <summary><span><span className="text-ink">{g.term}</span><span className="block text-body-sm text-ink-3 mt-1">{g.simple}</span></span></summary>
              <div className="accordion-body grid md:grid-cols-2 gap-6">
                <div><p className="text-label text-ink-3 mb-2">For designers</p><p className="text-body-sm text-ink-2">{g.design}</p></div>
                <div><p className="text-label text-ink-3 mb-2">Example</p><p className="text-body-sm text-ink-2">{g.example}</p></div>
                <div><p className="text-label text-ink-3 mb-2">Common confusion</p><p className="text-body-sm text-ink-2">{g.confusion}</p></div>
                <div><p className="text-label text-ink-3 mb-2">Related</p><ul className="tag-list">{g.related.map(r => <li key={r} className="tag">{r}</li>)}</ul></div>
              </div>
            </details>
          ))}
          {glossary.length === 0 && <p className="text-body text-ink-3 py-10">No terms match “{q}”.</p>}
        </div>
      </Section>

      {/* Canvas */}
      <Section id="canvas" label="Canvas" title="The Dual Fluency Canvas." intro="Map any design decision to a business outcome in about twenty minutes. Request the editable Figma or PDF version.">
        <CanvasSheet />
        <div className="flex flex-wrap gap-3 mt-8">
          <Button href={REQUEST_CANVAS}>Request the canvas</Button>
          <Button variant="secondary" href={REQUEST_WORKSHOP}>Bring the workshop to your team</Button>
        </div>
      </Section>

      <section className="hairline-top py-12">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <Button to="/resources" variant="tertiary">Back to Resources</Button>
          <Button to="/resources/ai-native-patterns" variant="tertiary" arrow>Next: AI-Native Frameworks</Button>
        </div>
      </section>
    </>
  )
}
