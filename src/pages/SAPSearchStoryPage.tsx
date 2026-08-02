import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
import SearchPrototype from '../components/ui/SearchPrototype'

// ── Chapter data ──────────────────────────────────────────────────────────────

const CHAPTERS = [
  { id: 'hero',      number: '',   title: 'Opening' },
  { id: 'ch1',       number: '01', title: 'The Problem' },
  { id: 'ch2',       number: '02', title: 'Beneath the UI' },
  { id: 'ch3',       number: '03', title: 'Research' },
  { id: 'ch4',       number: '04', title: 'How Search Works' },
  { id: 'ch5',       number: '05', title: 'The Search Journey' },
  { id: 'ch6',       number: '06', title: 'AI Patterns' },
  { id: 'ch7',       number: '07', title: 'Cross-Product' },
  { id: 'ch8',       number: '08', title: 'Prototype' },
  { id: 'ch9',       number: '09', title: 'Validation' },
  { id: 'ch10',      number: '10', title: 'Engineering' },
  { id: 'ch11',      number: '11', title: 'Design System' },
  { id: 'ch12',      number: '12', title: 'Forward' },
]

const PERSONAS = [
  { role: 'Procurement Manager', query: '"Show pending purchase orders over $50K"', product: 'SAP S/4HANA', color: 'rgba(245,242,237,0.9)' },
  { role: 'Sales Executive', query: '"Q3 pipeline by region"', product: 'SAP CRM', color: 'rgba(245,242,237,0.7)' },
  { role: 'HR Manager', query: '"Open headcount approvals"', product: 'SuccessFactors', color: 'rgba(245,242,237,0.5)' },
  { role: 'Business Traveler', query: '"Book flight to Munich next week"', product: 'Concur', color: 'rgba(245,242,237,0.35)' },
]

const SEARCH_PIPELINE = [
  { step: 'Input', label: 'User types', description: 'Raw text input. Intent is unknown. The word "purchase" means different things to a procurement manager and a sales executive.' },
  { step: 'Intent', label: 'Intent detection', description: 'Is this a navigation intent (go somewhere), informational (understand something), or transactional (do something)? Each requires a different response model.' },
  { step: 'Entity', label: 'Entity recognition', description: 'What are the named entities? "Q3", "Munich", "pending" — each is a signal that scopes the result space dramatically.' },
  { step: 'Context', label: 'Context enrichment', description: 'Who is asking? What product are they in? What did they search for in the last session? Context transforms a query into a meaning.' },
  { step: 'Permissions', label: 'Security filtering', description: 'Enterprise search must resolve permissions before ranking. A result a user cannot access is not a result — it is a frustration.' },
  { step: 'Ranking', label: 'AI ranking', description: 'Semantic similarity, recency, role relevance, and behavioural signals are combined. The model does not match keywords — it matches meaning.' },
  { step: 'Response', label: 'AI response', description: 'For high-confidence queries: an AI Overview. For navigational: a direct link. For ambiguous: clarifying suggestions. Each type has a different trust model.' },
]

const AI_PATTERNS = [
  {
    name: 'AI Overview',
    purpose: 'Surface a synthesised answer directly in search results — not a list of documents to navigate.',
    problem: 'Enterprise users spend 20% of their time reformulating searches and opening documents to find the specific piece of information they needed. The answer existed. Access to it was designed wrong.',
    principle: 'The best search result is one that ends the search.',
    doThis: 'Show the synthesised answer with sources inline. Allow immediate action from the overview.',
    notThis: 'Generate answers without attribution. The enterprise user must be able to verify every claim.',
    trust: 'Source every claim. Confidence-weight the overview. Allow users to expand the full source set.',
  },
  {
    name: 'Semantic Suggestions',
    purpose: 'Predict user intent before they finish typing — not by matching characters, but by matching meaning.',
    problem: 'Typeahead based on prefix matching surfaces the wrong things. "Pur" shows "Purchase Order", "Purple Team", and "Purge Archive" with equal weight. Semantic prediction surfaces intent.',
    principle: 'Show what the user is likely to mean, not everything that starts with what they typed.',
    doThis: 'Group suggestions by intent type. Explain briefly why each suggestion is shown.',
    notThis: 'Present an unsorted list of keyword matches.',
    trust: 'Never hallucinate suggestions. Only surface paths that exist and are accessible to this user.',
  },
  {
    name: 'Context Chips',
    purpose: 'Carry context from one product to the next — preserving the user\'s intent across the SAP ecosystem.',
    problem: 'When a user navigates from S/4HANA to Concur to book travel for a project, they restart from zero. The context that shaped their search ("project Alpha", "Q3", "budget remaining") disappears.',
    principle: 'Work context should travel with the user, not wait at the border of each product.',
    doThis: 'Surface transferable context as persistent chips that the user can accept, modify, or dismiss.',
    notThis: 'Silently carry context without surfacing it. The user must always be aware of what is being inferred.',
    trust: 'Always make context chips visible and removable. Invisible context is not context — it is assumption.',
  },
  {
    name: 'Confidence Surfacing',
    purpose: 'Communicate the AI\'s certainty level — enabling informed trust rather than blind trust or distrust.',
    problem: 'Enterprise users in finance, procurement, and HR are accountable for the accuracy of information they act on. A system that presents uncertain results with the same visual weight as certain ones is unsafe.',
    principle: 'An AI system that cannot express uncertainty is not trustworthy in enterprise contexts.',
    doThis: 'Vary visual weight by confidence level. Surface the basis for confidence on demand.',
    notThis: 'Show all results at equal visual weight. Hide the difference between high and low confidence.',
    trust: 'Low confidence must never be invisible. It must be communicated before the user acts.',
  },
  {
    name: 'Generated Tabs',
    purpose: 'Organise results by intent type — not by product or data source — so users see a coherent view of their question, not a list of systems.',
    problem: 'Searching "purchase" in a fragmented suite returns a list from each product in isolation. The user must mentally synthesise. Generated tabs do that synthesis for them.',
    principle: 'Organise by what the user is trying to do, not by what system has the data.',
    doThis: 'Generate tab labels that describe intent ("Orders to review", "Budget status", "Pending approvals").',
    notThis: 'Label tabs by system name ("S/4HANA", "Ariba", "MDG"). The user should not need to know which system to find their answer.',
    trust: 'Always show source attribution within tabs. Transparency about data origin enables verification.',
  },
  {
    name: 'Explainability',
    purpose: 'Surface why a result appeared — so users can calibrate trust and find better results when needed.',
    problem: 'When AI surfaces a result the user did not expect, they need to understand why — to decide whether to trust it. "Why did you show me this?" is not a failure state, it is a first-class interaction.',
    principle: 'Every AI-surfaced result deserves a rationale the user can inspect, challenge, and act on.',
    doThis: 'Provide a one-line explanation of relevance on every AI-ranked result. Expand on demand.',
    notThis: 'Present AI results as facts with no reasoning surface. Magic is not a trust model.',
    trust: 'Explainability is not a feature — it is the foundation of enterprise AI trust.',
  },
]

const CROSS_PRODUCT_FLOWS = [
  {
    id: 'purchase',
    label: 'Purchase → S/4HANA',
    query: '"pending purchase orders over $50K"',
    steps: [
      { product: 'Global Search', action: 'User types query', detail: 'AI detects procurement intent, filters by role and permissions' },
      { product: 'AI Overview', action: 'Summary generated', detail: '14 orders match · 3 flagged for review · Total: $2.4M' },
      { product: 'S/4HANA', action: 'Deep link with context', detail: 'User lands in PO list pre-filtered — no restart, no re-search' },
    ],
  },
  {
    id: 'travel',
    label: 'Travel → Concur',
    query: '"book flight to Munich, project Alpha"',
    steps: [
      { product: 'Global Search', action: 'Travel intent detected', detail: 'Project context extracted: "Alpha", budget codes resolved' },
      { product: 'AI Overview', action: 'Booking options surfaced', detail: 'Best-rate options shown inline with project policy compliance' },
      { product: 'Concur', action: 'Handoff with context', detail: 'Project Alpha cost centre, travel dates, and policy pre-populated' },
    ],
  },
  {
    id: 'procurement',
    label: 'Procurement → Ariba',
    query: '"compare suppliers for office equipment"',
    steps: [
      { product: 'Global Search', action: 'Comparison intent detected', detail: 'Ariba supplier database queried with permission check' },
      { product: 'AI Overview', action: 'Comparison generated', detail: 'Supplier table with pricing, lead time, quality score, preferred status' },
      { product: 'Ariba', action: 'Handoff with selection', detail: 'Pre-selected supplier and category carry into Ariba sourcing' },
    ],
  },
  {
    id: 'goals',
    label: 'Goals → SuccessFactors',
    query: '"review Q3 goals for my team"',
    steps: [
      { product: 'Global Search', action: 'HR intent detected', detail: 'Role context: manager, team ID resolved from org chart' },
      { product: 'AI Overview', action: 'Goal summary generated', detail: '8 team members · 3 goals on track · 2 at risk · 1 not started' },
      { product: 'SuccessFactors', action: 'Deep link with context', detail: 'Team goal dashboard filtered to Q3, manager view, at-risk flagged' },
    ],
  },
]

const ENGINEERING_CONSTRAINTS = [
  { constraint: 'Latency', reality: 'LLM inference adds 800ms–2s to search. Enterprise users expect results in <300ms. The solution: pre-compute AI overviews for high-frequency queries, stream for long-tail.', tradeoff: 'Streaming results feel faster but require careful loading state design. Empty states must be designed as carefully as full states.' },
  { constraint: 'Permissions', reality: 'Enterprise security requires result filtering at query time — not at display time. A result that appears then gets hidden breaks trust. Permission resolution must happen before ranking.', tradeoff: 'Pre-computing permission graphs for every user at every product is expensive. The design must gracefully handle partial results while permissions are resolving.' },
  { constraint: 'Hybrid Search', reality: 'Keyword search is fast and precise. Semantic search is slower but understands intent. Neither alone is sufficient for enterprise. Hybrid architectures are complex and require continuous tuning.', tradeoff: 'Semantic weight vs. keyword weight is a product decision, not just an engineering one. The design must surface when each mode is dominant.' },
  { constraint: 'Context Preservation', reality: 'Carrying context across SAP products requires cross-product session management, shared identity resolution, and API contracts between product teams. These are organisational problems as much as technical ones.', tradeoff: 'Context that can\'t be preserved in v1 must be designed for gracefully. The user experience of "context was available" vs "context wasn\'t available" must be visually distinct.' },
]

// ── Utility components ────────────────────────────────────────────────────────

function PrototypeSlot({ label, height = 600 }: { label: string; height?: number }) {
  return (
    <div
      className="relative border border-white border-dashed flex items-center justify-center"
      style={{ height, borderColor: 'rgba(245,242,237,0.12)', background: 'rgba(245,242,237,0.02)' }}
    >
      <div className="text-center">
        <p className="text-overline text-white opacity-30 mb-2">Interactive Prototype</p>
        <p className="text-body text-white opacity-20">{label}</p>
        <p className="text-label text-white opacity-15 mt-3">Add Figma / Lovable embed URL to activate</p>
      </div>
      {/* Animated corner accents */}
      {[['top-0 left-0', 'border-t border-l'], ['top-0 right-0', 'border-t border-r'], ['bottom-0 left-0', 'border-b border-l'], ['bottom-0 right-0', 'border-b border-r']].map(([pos, borders], i) => (
        <div key={i} className={`absolute w-6 h-6 ${pos} ${borders} border-white`} style={{ borderColor: 'rgba(245,242,237,0.35)' }} />
      ))}
    </div>
  )
}

function BehindDesign({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white border-opacity-[0.08] mt-8">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-8 py-5 flex items-center justify-between gap-4 hover:bg-white hover:bg-opacity-[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-overline text-white opacity-25">Behind the Design</span>
        </div>
        <span className="text-white opacity-25 transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-8 pb-8 pt-2 border-t border-white border-opacity-[0.06]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ChapterTransition({ question }: { question: string }) {
  return (
    <motion.div
      className="py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-px h-16 bg-white opacity-10 mx-auto mb-10" />
      <p className="text-white opacity-25 italic max-w-xl mx-auto"
        style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.6 }}>
        {question}
      </p>
      <div className="w-px h-16 bg-white opacity-10 mx-auto mt-10" />
    </motion.div>
  )
}

function Quote({ text, attribution }: { text: string; attribution?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div
      ref={ref}
      className="my-16 border-l-2 border-white pl-8 py-2 max-w-3xl"
      style={{ borderColor: 'rgba(245,242,237,0.2)' }}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-white opacity-75 italic"
        style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.65 }}>
        "{text}"
      </p>
      {attribution && <p className="text-label text-white opacity-35 mt-4">{attribution}</p>}
    </motion.div>
  )
}

// ── Chapter nav ───────────────────────────────────────────────────────────────

function ChapterNav({ active }: { active: string }) {
  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{ top: '64px', background: 'rgba(12,12,11,0.94)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(245,242,237,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-10 flex items-center gap-1 overflow-x-auto hide-scrollbar">
        {CHAPTERS.filter(c => c.id !== 'hero').map(ch => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className="flex items-center gap-2 flex-shrink-0 px-3 py-1 rounded transition-all duration-200"
            style={{ opacity: active === ch.id ? 1 : 0.3 }}
          >
            <span className="text-white" style={{ fontSize: '0.6rem', opacity: 0.5 }}>{ch.number}</span>
            <span className="text-label text-white">{ch.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Animated search pipeline ──────────────────────────────────────────────────

function SearchPipeline({ query }: { query: string }) {
  const [activeStep, setActiveStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [typed, setTyped] = useState('')

  const play = () => {
    if (isPlaying) return
    setIsPlaying(true)
    setTyped('')
    setActiveStep(-1)

    // Type the query character by character
    let i = 0
    const typeInterval = setInterval(() => {
      setTyped(query.slice(0, i + 1))
      i++
      if (i >= query.length) {
        clearInterval(typeInterval)
        // Animate through pipeline steps
        SEARCH_PIPELINE.forEach((_, idx) => {
          setTimeout(() => {
            setActiveStep(idx)
            if (idx === SEARCH_PIPELINE.length - 1) {
              setTimeout(() => setIsPlaying(false), 800)
            }
          }, 600 + idx * 500)
        })
      }
    }, 60)
  }

  return (
    <div className="border border-white border-opacity-[0.08]">
      {/* Search input simulation */}
      <div className="p-6 border-b border-white border-opacity-[0.06] flex items-center gap-4">
        <div className="flex-1 bg-white bg-opacity-[0.04] border border-white border-opacity-10 px-5 py-3 flex items-center gap-3">
          <span className="text-white opacity-25 text-sm">🔍</span>
          <span className="text-body text-white opacity-70 font-mono" style={{ fontSize: '0.9rem' }}>
            {typed}
            {isPlaying && typed.length < query.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
            )}
          </span>
        </div>
        <button
          onClick={play}
          className="text-label text-white border border-white border-opacity-25 px-5 py-2.5 hover:border-opacity-60 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200 flex-shrink-0"
        >
          {isPlaying ? 'Running...' : 'Watch AI think →'}
        </button>
      </div>

      {/* Pipeline steps */}
      <div className="grid md:grid-cols-7 gap-px bg-white bg-opacity-[0.04]">
        {SEARCH_PIPELINE.map((step, i) => (
          <motion.div
            key={step.step}
            className="bg-black p-5"
            animate={{
              background: activeStep >= i ? 'rgba(245,242,237,0.05)' : 'rgba(12,12,11,1)',
              borderBottom: activeStep === i ? '2px solid rgba(245,242,237,0.5)' : '2px solid transparent',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{ background: activeStep >= i ? 'rgba(245,242,237,0.7)' : 'rgba(245,242,237,0.15)' }}
                transition={{ duration: 0.3 }}
              />
              <span className="text-overline text-white opacity-30">{step.step}</span>
            </div>
            <p className="text-white mb-2" style={{ fontSize: '0.72rem', fontWeight: 400, opacity: activeStep >= i ? 0.8 : 0.35 }}>
              {step.label}
            </p>
            <AnimatePresence>
              {activeStep === i && (
                <motion.p
                  className="text-white opacity-45"
                  style={{ fontSize: '0.68rem', lineHeight: 1.5 }}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 0.45, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.description}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── AI Pattern card ───────────────────────────────────────────────────────────

function AIPatternCard({ pattern, index }: { pattern: typeof AI_PATTERNS[0], index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border border-white"
      style={{ borderColor: open ? 'rgba(245,242,237,0.2)' : 'rgba(245,242,237,0.07)', background: open ? 'rgba(245,242,237,0.02)' : 'transparent' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <button className="w-full text-left p-8 flex items-start justify-between gap-6" onClick={() => setOpen(o => !o)}>
        <div>
          <p className="text-overline text-white opacity-25 mb-3">Pattern {String(index + 1).padStart(2, '0')}</p>
          <h3 className="text-white mb-2" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
            {pattern.name}
          </h3>
          <p className="text-body text-white opacity-35">{pattern.purpose}</p>
        </div>
        <span className="text-white opacity-20 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.2rem' }}>+</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}>
            <div className="border-t border-white border-opacity-[0.07]">
              <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.04]">
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-3">The problem</p>
                  <p className="text-body text-white opacity-55 mb-6">{pattern.problem}</p>
                  <div className="border-l-2 border-white border-opacity-20 pl-5">
                    <p className="text-white opacity-65 italic" style={{ fontSize: '0.95rem', fontWeight: 300 }}>
                      "{pattern.principle}"
                    </p>
                  </div>
                </div>
                <div className="bg-black p-8 space-y-6">
                  <div>
                    <p className="text-overline text-white opacity-25 mb-2">Do this</p>
                    <p className="text-body text-white opacity-55">{pattern.doThis}</p>
                  </div>
                  <div>
                    <p className="text-overline text-white opacity-25 mb-2">Not this</p>
                    <p className="text-body text-white opacity-40">{pattern.notThis}</p>
                  </div>
                  <div>
                    <p className="text-overline text-white opacity-25 mb-2">Trust design</p>
                    <p className="text-body text-white opacity-45">{pattern.trust}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SAPSearchStoryPage() {
  const [activeChapter, setActiveChapter] = useState('hero')
  const [activeFlow, setActiveFlow] = useState('purchase')
  const { scrollYProgress } = useScroll()
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveChapter(e.target.id) }) },
      { threshold: 0.2 }
    )
    CHAPTERS.forEach(ch => { const el = document.getElementById(ch.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const activeFlowData = CROSS_PRODUCT_FLOWS.find(f => f.id === activeFlow)!

  return (
    <div className="bg-black min-h-screen">
      {/* Global progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
        style={{ scaleX: progressScaleX, background: 'rgba(245,242,237,0.3)' }} />

      <ChapterNav active={activeChapter} />

      {/* ── HERO ── */}
      <section id="hero" className="relative h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12">
        <GrainOverlay opacity={0.06} />

        {/* Technical grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.022 }}>
          <svg width="100%" height="100%">
            <defs><pattern id="sg" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#sg)" />
          </svg>
        </div>

        {/* Floating search orb */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ y: heroY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <div className="relative w-80 h-80">
            {/* Rings */}
            {[1, 2, 3].map(i => (
              <motion.div key={i}
                className="absolute rounded-full border border-white"
                style={{
                  inset: `-${i * 32}px`,
                  borderColor: `rgba(245,242,237,${0.06 / i})`,
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
              />
            ))}
            {/* Core */}
            <div className="w-full h-full rounded-full border border-white flex items-center justify-center"
              style={{ borderColor: 'rgba(245,242,237,0.12)', background: 'rgba(245,242,237,0.02)' }}>
              <p className="text-white" style={{ fontSize: '2rem', opacity: 0.15 }}>🔍</p>
            </div>
            {/* Orbiting labels */}
            {['Intent', 'Context', 'Rank', 'Trust'].map((label, i) => (
              <motion.div key={label}
                className="absolute text-label text-white opacity-30"
                style={{
                  top: `${50 + 48 * Math.sin(i * Math.PI / 2)}%`,
                  left: `${50 + 48 * Math.cos(i * Math.PI / 2)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, delay: i * 0.75, repeat: Infinity }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Link to="/craft" className="text-label text-white opacity-25 hover:opacity-60 transition-opacity inline-flex items-center gap-2 mb-12">
              ← Craft
            </Link>
          </motion.div>

          <motion.p className="text-overline text-white opacity-30 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Product Story · SAP · AI-Powered Search · 300M+ Users
          </motion.p>

          <motion.h1 className="text-white mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 200, letterSpacing: '-0.05em', lineHeight: 0.95 }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
            The Future of<br />Enterprise Search
          </motion.h1>

          <motion.p className="text-white opacity-45 max-w-2xl"
            style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 300, lineHeight: 1.65, letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}>
            Reimagining search as an intelligent orchestration layer across the SAP ecosystem.
          </motion.p>

          {/* Stats */}
          <motion.div className="flex flex-wrap gap-12 mt-14"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}>
            {[['300M+', 'Users across the SAP suite'], ['SAP', 'Suite-wide deployment'], ['AI-First', 'Intent over keywords'], ['Design Lead', 'Role']].map(([v, l]) => (
              <div key={l}>
                <p className="text-white mb-1" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.9rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>{v}</p>
                <p className="text-label text-white opacity-30">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Prototype teaser slot */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="flex flex-col items-center gap-2">
            <p className="text-label text-white opacity-20">Scroll to begin</p>
            <div className="w-px h-12 bg-white opacity-10" />
          </div>
        </motion.div>
      </section>

      {/* ── CHAPTER 1: THE PROBLEM ── */}
      <section id="ch1" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 01</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Why Search Needed Reinvention
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Four people. Four products. One question each. The problem wasn't that search didn't work — it's that it worked differently everywhere.
            </p>
          </motion.div>

          {/* Persona split screen */}
          <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05] mb-12">
            {PERSONAS.map((p, i) => (
              <motion.div key={p.role} className="bg-black p-10"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <p className="text-overline text-white opacity-30 mb-4">{p.product}</p>
                <p className="text-white mb-4" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', opacity: 0.5, fontFamily: 'monospace' }}>
                  {p.query}
                </p>
                <p className="text-body text-white" style={{ color: p.color, opacity: 0.75 }}>{p.role}</p>
                {/* Simulated search UI */}
                <div className="mt-6 border border-white border-opacity-[0.08] p-4">
                  <div className="h-2 bg-white opacity-[0.06] rounded mb-3 w-3/4" />
                  <div className="space-y-2">
                    {[0.6, 0.4, 0.3].map((op, j) => (
                      <div key={j} className="h-1.5 bg-white rounded" style={{ opacity: op * 0.15, width: `${65 + j * 10}%` }} />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    {['All', 'Recent', 'My items'].map((tab, j) => (
                      <div key={tab} className="text-label text-white border border-white border-opacity-[0.08] px-3 py-1"
                        style={{ opacity: j === 0 ? 0.5 : 0.2, fontSize: '0.6rem' }}>{tab}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Quote text="Search looked unified. But it never behaved as one." />

          <SearchPrototype autoPlay={false} />

          <BehindDesign>
            <p className="text-body text-white opacity-55 max-w-2xl">
              The brief started as a component alignment task. After the first round of stakeholder interviews, it became clear the inconsistency wasn't visual — it was behavioural. Different products had different search engines, different ranking models, different result formats, and different assumptions about what the user was trying to do. A component library would have changed the look. It wouldn't have changed the experience.
            </p>
          </BehindDesign>
        </div>

        <ChapterTransition question="If the problem isn't the interface — what is it?" />
      </section>

      {/* ── CHAPTER 2: BENEATH THE UI ── */}
      <section id="ch2" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 02</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Looking Beneath the UI
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Every search box hides a different system. Understanding the architecture wasn't optional — it was the design problem.
            </p>
          </motion.div>

          {/* Architecture layers */}
          <div className="space-y-px mb-12">
            {[
              { layer: 'Products', count: '80+', description: 'SAP products across ERP, HCM, SCM, Finance — each with its own UI, logic, and search implementation', opacity: 0.9 },
              { layer: 'Search Engines', count: '6+', description: 'Elasticsearch, SAP HANA Search, custom implementations — different capabilities, different APIs, different ranking models', opacity: 0.75 },
              { layer: 'Permission Systems', count: '3', description: 'Role-based access, attribute-based access, and product-specific entitlement models — all must be resolved before a result is shown', opacity: 0.6 },
              { layer: 'Metadata Schemas', count: 'Fragmented', description: 'Different products describe the same objects differently. A "vendor" in Ariba is a "business partner" in S/4HANA. Search must understand both.', opacity: 0.45 },
              { layer: 'API Contracts', count: 'None unified', description: 'No standard contract for how products expose searchable content. Every integration was bespoke.', opacity: 0.3 },
            ].map((row, i) => (
              <motion.div key={row.layer} className="grid md:grid-cols-[120px_100px_1fr] gap-0 bg-black border border-white border-opacity-[0.06] p-6"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}>
                <p className="text-label text-white opacity-30 self-center">{row.layer}</p>
                <p className="text-white self-center" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 300, opacity: row.opacity }}>{row.count}</p>
                <p className="text-body text-white opacity-40">{row.description}</p>
              </motion.div>
            ))}
          </div>

          <PrototypeSlot label="Interactive architecture map: hover any SAP product to reveal its search technology stack, capabilities, and limitations." height={520} />

          <BehindDesign>
            <p className="text-body text-white opacity-55 max-w-2xl">
              The architecture discovery phase took four weeks and required deep collaboration with engineering leads across six product areas. The decision to map this before touching any UI was not obvious to stakeholders initially. The diagram that emerged from this phase became the single most persuasive artefact in the programme — it made the problem undeniable.
            </p>
          </BehindDesign>
        </div>

        <ChapterTransition question="What did the users actually experience — and what did the research reveal?" />
      </section>

      {/* ── CHAPTER 3: RESEARCH ── */}
      <section id="ch3" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 03</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Research
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Seven weeks. Forty stakeholders. Three user cohorts. And a literature review that spanned Google, Microsoft, Elastic, and the latest AI search research.
            </p>
          </motion.div>

          {/* Research sources */}
          <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.05] mb-12">
            {[
              { type: 'Stakeholder Workshops', description: '12 workshops across product management, engineering, UX, AI, architecture, and enterprise customers', output: 'Problem framing + opportunity space' },
              { type: 'User Interviews', description: '28 interviews across procurement managers, sales executives, HR managers, and business travelers — across 6 regions', output: 'Search patterns + failure modes + trust signals' },
              { type: 'Technical Research', description: 'Microsoft Bing, Google Search, Elastic, Algolia, Perplexity, OpenAI — and academic literature on enterprise search, semantic ranking, and AI transparency', output: 'Pattern library + technical feasibility + trust research' },
            ].map((r, i) => (
              <motion.div key={r.type} className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-overline text-white opacity-25 mb-4">{r.type}</p>
                <p className="text-body text-white opacity-55 mb-6">{r.description}</p>
                <div className="border-t border-white border-opacity-[0.07] pt-4">
                  <p className="text-label text-white opacity-30 mb-1">Output</p>
                  <p className="text-body text-white opacity-45">{r.output}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key findings */}
          <div className="mb-12">
            <p className="text-overline text-white opacity-25 mb-8">What we learned</p>
            <div className="space-y-px">
              {[
                { finding: '67% of users reformulate their search at least once per session', implication: 'The first result is often not the last attempt. Reformulation UX matters as much as initial results.' },
                { finding: 'Enterprise users abandon search after 3 failed attempts — and don\'t return for that session', implication: 'Failure states are exit points. Recovery design is retention design.' },
                { finding: 'Users in regulated industries require source attribution before acting on AI results', implication: 'Trust is not assumed. It must be designed, verified, and maintained per interaction.' },
                { finding: 'Context switching between products resets mental load — users restart cognitively, not just technically', implication: 'Cross-product continuity is a cognitive load problem, not just a navigation problem.' },
              ].map((f, i) => (
                <motion.div key={i} className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.04]"
                  initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}>
                  <div className="bg-black p-8">
                    <p className="text-white opacity-65 italic" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: 300 }}>"{f.finding}"</p>
                  </div>
                  <div className="bg-black p-8">
                    <p className="text-overline text-white opacity-20 mb-2">Implication</p>
                    <p className="text-body text-white opacity-45">{f.implication}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <PrototypeSlot label="Interactive research board: explore findings, expand evidence, read insights." height={440} />
        </div>

        <ChapterTransition question="Before designing for search — do we understand how search actually works?" />
      </section>

      {/* ── CHAPTER 4: HOW SEARCH WORKS ── */}
      <section id="ch4" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 04</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              How AI Search Actually Works
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Not as documentation. As an animation. Type "purchase orders" — and watch the AI think, step by step.
            </p>
          </motion.div>

          <SearchPipeline query="pending purchase orders over $50K" />

          <div className="mt-12 grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.05]">
            {[
              { principle: 'Intent over keywords', description: 'The AI does not match the word "purchase" — it infers the user means "show me actionable purchase order data relevant to my role." Two users typing the same word get different results.' },
              { principle: 'Context over completeness', description: 'The best result for a procurement manager is not the most comprehensive result — it\'s the most relevant one for their current context: role, open tasks, recent sessions, and urgency signals.' },
              { principle: 'Transparent reasoning', description: 'When the AI surfaces a result, users in enterprise contexts need to understand why. Transparency is not a feature on top of the design — it is the foundation of enterprise AI trust.' },
            ].map((p, i) => (
              <motion.div key={p.principle} className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-white mb-3" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: 400, opacity: 0.8 }}>{p.principle}</p>
                <p className="text-body text-white opacity-45">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <ChapterTransition question="Understanding the system — now, how do we design the experience?" />
      </section>

      {/* ── CHAPTER 5: SEARCH JOURNEY ── */}
      <section id="ch5" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 05</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Designing the Search Journey
            </h2>
          </motion.div>

          <div className="space-y-24">
            {[
              { stage: 'Stage 1', title: 'Before Search', description: 'The search entry point must communicate what\'s possible before the user types. A blank box with a flashing cursor says nothing. An intelligent entry point says everything.', decisions: ['Search placement in the navigation hierarchy — global vs contextual', 'Proactive surface: what to show before the user types based on role and context', 'Keyboard shortcut discoverability for power users'] },
              { stage: 'Stage 2', title: 'During Search', description: 'The typing experience is where trust is built or broken in the first 200ms. Suggestions must feel intelligent — not just fast.', decisions: ['Semantic suggestions vs. prefix matching — balancing precision and recall', 'History: what to remember and what to forget', 'Entity detection: when to surface structured cards vs. text suggestions'] },
              { stage: 'Stage 3', title: 'Search Execution', description: 'The moment between enter and results. Loading is not a failure state — it is a trust-building opportunity.', decisions: ['Streaming vs. batch results — which feels faster and which is actually more useful', 'AI thinking state: progress communication without false precision', 'Latency threshold: when to surface partial results vs. wait for complete response'] },
              { stage: 'Stage 4', title: 'Search Results', description: 'The result page is not a list. It is an intelligent answer surface — with AI overview, sources, actions, and contextual navigation.', decisions: ['AI Overview placement and visual weight relative to result list', 'Source attribution: how much to surface by default vs. on demand', 'Actions: what the user can do directly from search without navigating away'] },
            ].map((s) => (
              <motion.div key={s.stage}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-8">
                  <div>
                    <p className="text-overline text-white opacity-25 mb-3">{s.stage}</p>
                    <h3 className="text-white mb-4"
                      style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.03em' }}>
                      {s.title}
                    </h3>
                    <p className="text-body text-white opacity-45">{s.description}</p>
                  </div>
                  <div>
                    <p className="text-overline text-white opacity-20 mb-4">Key design decisions</p>
                    <ul className="space-y-3">
                      {s.decisions.map((d, j) => (
                        <li key={j} className="flex gap-4">
                          <span className="text-white opacity-20 flex-shrink-0 mt-1.5" style={{ fontSize: '0.4rem' }}>◆</span>
                          <p className="text-body text-white opacity-50">{d}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <PrototypeSlot label={`Working prototype: ${s.title} — click through, interact, and explore the decisions.`} height={400} />
              </motion.div>
            ))}
          </div>
        </div>

        <ChapterTransition question="The journey is designed. Now what are the patterns that make AI trustworthy?" />
      </section>

      {/* ── CHAPTER 6: AI PATTERNS ── */}
      <section id="ch6" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 06</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              The AI Pattern Library
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Six patterns. Each addresses a specific trust failure in enterprise AI search. Each is live in production across the SAP suite.
            </p>
          </motion.div>

          <div className="space-y-px">
            {AI_PATTERNS.map((p, i) => <AIPatternCard key={p.name} pattern={p} index={i} />)}
          </div>
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        </div>

        <ChapterTransition question="Individual patterns build trust within a product. But what about across products?" />
      </section>

      {/* ── CHAPTER 7: CROSS-PRODUCT INTELLIGENCE ── */}
      <section id="ch7" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 07</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Cross-Product Intelligence
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Enterprise users shouldn't restart their work simply because they crossed into another product. Work context should travel with the user.
            </p>
          </motion.div>

          {/* Flow selector */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CROSS_PRODUCT_FLOWS.map(f => (
              <button key={f.id} onClick={() => setActiveFlow(f.id)}
                className={`text-label text-white border px-4 py-2 transition-all duration-200 ${activeFlow === f.id ? 'border-white opacity-90' : 'border-white border-opacity-20 opacity-35 hover:opacity-60'}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Active flow */}
          <AnimatePresence mode="wait">
            <motion.div key={activeFlow}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mb-8 flex items-center gap-4">
                <p className="text-overline text-white opacity-30">Query</p>
                <p className="text-white opacity-60 font-mono" style={{ fontSize: '0.9rem' }}>{activeFlowData.query}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.05] mb-10">
                {activeFlowData.steps.map((step, i) => (
                  <motion.div key={step.product} className="bg-black p-8"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <p className="text-overline text-white opacity-25 mb-3">{step.product}</p>
                    <p className="text-white mb-3" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: 300, opacity: 0.75 }}>
                      {step.action}
                    </p>
                    <p className="text-body text-white opacity-40">{step.detail}</p>
                    {i < activeFlowData.steps.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-15">→</div>
                    )}
                  </motion.div>
                ))}
              </div>
              <SearchPrototype scenario={activeFlow} />
            </motion.div>
          </AnimatePresence>

          <Quote
            text="Enterprise users don't think in products. They think in tasks. The search experience should mirror that — not the org chart that created the software."
          />
        </div>

        <ChapterTransition question="The design is complete. Let's walk through every flow." />
      </section>

      {/* ── CHAPTER 8: PROTOTYPE WALKTHROUGH ── */}
      <section id="ch8" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 08</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Prototype Walkthrough
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Five flows. Every interaction explained. Every design decision surfaced.
            </p>
          </motion.div>

          <div className="space-y-24">
            {[
              { flow: 'Flow 01', title: 'Purchase Search', description: 'A procurement manager searches for pending purchase orders above a threshold. AI Overview surfaces the summary. The user can act without navigating away.', slot: 'Purchase Search — Full interactive prototype' },
              { flow: 'Flow 02', title: 'Pending Purchase Orders', description: 'AI-generated tabs organise results by intent: "Orders to review", "Budget impact", "Vendor context". The user never sees a list of systems — they see a list of tasks.', slot: 'Pending POs — Generated tabs + entity cards + smart actions' },
              { flow: 'Flow 03', title: 'Business Travel', description: 'Search → AI results → Concur transition with context preserved. The project code, travel dates, and budget are carried automatically.', slot: 'Business Travel — Context-preserving handoff to Concur' },
              { flow: 'Flow 04', title: 'Procurement Comparison', description: 'Supplier comparison generated inline. AI recommendation with confidence score and reasoning. Ariba handoff with selected supplier pre-loaded.', slot: 'Procurement Comparison — AI-generated comparison → Ariba handoff' },
              { flow: 'Flow 05', title: 'SuccessFactors Goals', description: 'A manager searches their team\'s Q3 goals. Goal overview generated. At-risk goals flagged. Deep link to SuccessFactors with manager view and filter pre-applied.', slot: 'SuccessFactors Goals — Team overview → deep link with context' },
            ].map((f) => (
              <motion.div key={f.flow}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7 }}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-8">
                  <div>
                    <p className="text-overline text-white opacity-25 mb-3">{f.flow}</p>
                    <h3 className="text-white mb-4"
                      style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.03em' }}>
                      {f.title}
                    </h3>
                    <p className="text-body text-white opacity-45">{f.description}</p>
                  </div>
                </div>
                <PrototypeSlot label={f.slot} height={560} />
              </motion.div>
            ))}
          </div>
        </div>

        <ChapterTransition question="Prototypes built. Now — what did testing teach us?" />
      </section>

      {/* ── CHAPTER 9: VALIDATION ── */}
      <section id="ch9" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 09</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Validation
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              Three rounds of testing. Each one changed something important.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.05] mb-12">
            {[
              { round: 'Round 1', focus: 'Navigation + entry point', finding: 'Users didn\'t discover the global search entry point. It was too subtle. Every user started in product-level search.', change: 'Entry point elevated in global navigation. Keyboard shortcut added and onboarded proactively.' },
              { round: 'Round 2', focus: 'AI Overview trust', finding: 'Users in finance and HR wouldn\'t act on AI overviews without source attribution visible. 8/10 users wanted to see "where did this come from" before acting.', change: 'Source attribution surfaced inline on every AI overview. Confidence level added as a visual signal.' },
              { round: 'Round 3', focus: 'Cross-product handoff', finding: 'Users loved the context preservation concept but felt the context chips were "appearing without explanation." They felt surveilled, not helped.', change: 'Context chips made explicit with a one-line explanation. Users can dismiss or modify before handoff.' },
            ].map((r, i) => (
              <motion.div key={r.round} className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-overline text-white opacity-25 mb-2">{r.round}</p>
                <p className="text-body text-white opacity-55 mb-2" style={{ fontWeight: 400 }}>{r.focus}</p>
                <p className="text-body text-white opacity-40 mb-5 italic">"{r.finding}"</p>
                <div className="border-t border-white border-opacity-[0.07] pt-4">
                  <p className="text-overline text-white opacity-20 mb-2">What changed</p>
                  <p className="text-body text-white opacity-50">{r.change}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <PrototypeSlot label="Version comparison: toggle between V1, V2, and V3 to see how each round changed the design." height={480} />
        </div>

        <ChapterTransition question="Testing validated the design. But what did engineering have to say?" />
      </section>

      {/* ── CHAPTER 10: ENGINEERING REALITY ── */}
      <section id="ch10" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 10</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Engineering Reality
            </h2>
            <p className="text-body text-white opacity-50 max-w-2xl">
              What couldn't be built in v1 — and what the design did about it.
            </p>
          </motion.div>

          <div className="space-y-px mb-12">
            {ENGINEERING_CONSTRAINTS.map((c, i) => (
              <motion.div key={c.constraint} className="grid md:grid-cols-[160px_1fr_1fr] gap-px bg-white bg-opacity-[0.04]"
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="bg-black p-8 flex items-center">
                  <p className="text-overline text-white opacity-40">{c.constraint}</p>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-20 mb-3">Reality</p>
                  <p className="text-body text-white opacity-55">{c.reality}</p>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-20 mb-3">Design response</p>
                  <p className="text-body text-white opacity-45">{c.tradeoff}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Quote text="The best designs are not the ones that pretend engineering constraints don't exist. They are the ones that make the constraints invisible to the user." />
        </div>

        <ChapterTransition question="One chapter left. What does the system look like at full specification?" />
      </section>

      {/* ── CHAPTER 11: DESIGN SYSTEM ── */}
      <section id="ch11" className="relative bg-black py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 11</p>
            <h2 className="text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              The Design System
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.05] mb-12">
            {[
              { spec: 'Search States', items: ['Empty', 'Typing', 'Suggesting', 'Loading', 'Streaming', 'Results', 'No results', 'Error', 'Partial results'] },
              { spec: 'AI Components', items: ['AI Overview', 'Source attribution', 'Confidence indicator', 'Reasoning expand', 'Context chips', 'Generated tabs', 'Entity cards', 'Follow-up suggestions'] },
              { spec: 'Motion System', items: ['Entry: 280ms ease-out', 'Streaming: 60fps continuous', 'Tab switch: 180ms', 'Suggestion reveal: stagger 40ms', 'Cross-product handoff: 350ms'] },
            ].map((s, i) => (
              <motion.div key={s.spec} className="bg-black p-8"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-overline text-white opacity-30 mb-5">{s.spec}</p>
                <ul className="space-y-2">
                  {s.items.map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="text-white opacity-15 flex-shrink-0 mt-1" style={{ fontSize: '0.4rem' }}>◆</span>
                      <p className="text-label text-white opacity-45">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <PrototypeSlot label="Component library: search states, AI components, interaction specs — all interactive." height={520} />
        </div>

        <ChapterTransition question="The system is designed, tested, and specified. What comes next?" />
      </section>

      {/* ── CHAPTER 12: FORWARD ── */}
      <section id="ch12" className="relative bg-black py-32 md:py-40 px-6 md:px-12 border-t border-white border-opacity-[0.07] overflow-hidden">
        <GrainOverlay opacity={0.05} />

        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ opacity: 0.015 }}>
          <p className="text-white" style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 200, letterSpacing: '-0.06em', lineHeight: 1 }}>
            Search
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-20"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-overline text-white opacity-25 mb-4">Chapter 12</p>
            <h2 className="text-white mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Looking Forward
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05] mb-16">
            {[
              { horizon: 'Near term', title: 'Agentic Search', description: 'Search that doesn\'t just find — it acts. A user searches "book travel for the Munich meeting" and search completes the booking, not just surfaces the options.' },
              { horizon: 'Near term', title: 'Proactive Intelligence', description: 'Search that anticipates. Before the procurement manager opens the search box, the system surfaces "3 purchase orders require your review today" based on context awareness.' },
              { horizon: 'Long term', title: 'Multimodal Enterprise Search', description: 'Voice, document, image, and data — all as equal search modalities. A contract clause, a chart anomaly, a spoken question in a meeting — all searchable.' },
              { horizon: 'Long term', title: 'Personal Enterprise AI', description: 'An AI layer that knows your role, your responsibilities, your open tasks, and your work context — and orchestrates search responses accordingly across the entire SAP ecosystem.' },
            ].map((h, i) => (
              <motion.div key={h.title} className="bg-black p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <p className="text-overline text-white opacity-20 mb-4">{h.horizon}</p>
                <h3 className="text-white mb-4"
                  style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                  {h.title}
                </h3>
                <p className="text-body text-white opacity-45">{h.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Final statement */}
          <motion.div className="max-w-4xl mx-auto text-center py-20"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="w-px h-20 bg-white opacity-10 mx-auto mb-12" />
            <p className="text-white mb-6"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.35, opacity: 0.85 }}>
              We didn't redesign search.
            </p>
            <p className="text-white"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.55, opacity: 0.5 }}>
              We redefined how enterprise users discover, understand, and act on information. Search became more than a feature — it became the intelligent entry point into the entire SAP ecosystem.
            </p>
            <div className="w-px h-20 bg-white opacity-10 mx-auto mt-12" />
          </motion.div>
        </div>
      </section>

      {/* ── Footer nav ── */}
      <section className="relative bg-black py-16 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-overline text-white opacity-25 mb-2">Next case study</p>
            <Link to="/craft/sap-agentic" className="text-body text-white opacity-50 hover:opacity-80 transition-opacity">
              Agentic AI for Order Confirmation →
            </Link>
          </div>
          <div className="flex gap-8">
            <Link to="/craft" className="text-label text-white opacity-25 hover:opacity-60 transition-opacity">← All work</Link>
            <a href="mailto:uxbyamit@gmail.com?subject=SAP Search — Let's talk"
              className="text-label text-white opacity-25 hover:opacity-60 transition-opacity">Get in touch</a>
          </div>
        </div>
      </section>
    </div>
  )
}
