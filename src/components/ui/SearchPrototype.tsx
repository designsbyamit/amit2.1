import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────

type SearchState = 'idle' | 'typing' | 'thinking' | 'results'

interface Suggestion {
  text: string
  type: 'semantic' | 'entity' | 'history'
  meta?: string
}

interface ResultCard {
  title: string
  product: string
  meta: string
  value?: string
  action?: string
  actionPath?: string
  badge?: string
}

interface SearchScenario {
  id: string
  label: string
  query: string
  suggestions: Suggestion[]
  overview: string
  sources: string[]
  confidence: 'high' | 'medium'
  tabs: { label: string; count: number }[]
  results: ResultCard[]
  handoff?: { product: string; description: string }
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

const SCENARIOS: SearchScenario[] = [
  {
    id: 'purchase',
    label: 'Purchase Orders',
    query: 'pending purchase orders over $50K',
    suggestions: [
      { text: 'pending purchase orders over $50K', type: 'semantic', meta: 'Procurement · S/4HANA' },
      { text: 'purchase orders awaiting approval', type: 'semantic', meta: '14 results' },
      { text: 'purchase orders this quarter', type: 'history', meta: 'Recent' },
    ],
    overview: '14 purchase orders match — 3 flagged for review. Total open value: $2.4M. Oldest pending: 18 days (vendor: Siemens AG).',
    sources: ['SAP S/4HANA · MM Module', 'Procurement Workflow · Live data'],
    confidence: 'high',
    tabs: [
      { label: 'Orders to review', count: 3 },
      { label: 'All pending', count: 14 },
      { label: 'Budget impact', count: 1 },
    ],
    results: [
      { title: 'PO-2024-8821 · Siemens AG', product: 'S/4HANA', meta: '18 days pending · $124,000', value: '$124K', action: 'Review', badge: 'Needs action' },
      { title: 'PO-2024-8799 · SAP SE', product: 'S/4HANA', meta: '12 days pending · $87,500', value: '$87.5K', action: 'Review' },
      { title: 'PO-2024-8756 · Bosch GmbH', product: 'S/4HANA', meta: '9 days pending · $63,200', value: '$63.2K', action: 'Review' },
    ],
    handoff: { product: 'SAP S/4HANA', description: 'Open in purchase order list — pre-filtered to your pending items above $50K.' },
  },
  {
    id: 'travel',
    label: 'Business Travel',
    query: 'book flight to Munich next week',
    suggestions: [
      { text: 'book flight to Munich next week', type: 'semantic', meta: 'Travel · Concur' },
      { text: 'Munich · SAP HQ · Oct 14–16', type: 'entity', meta: 'Upcoming event' },
      { text: 'travel policy for EMEA', type: 'semantic', meta: 'HR Knowledge' },
    ],
    overview: 'Flight options found for Munich (MUC), Oct 14–16. 2 options within travel policy. Project Alpha cost centre auto-resolved.',
    sources: ['Concur Travel · Corporate rates', 'SAP Event Calendar · Oct 2024'],
    confidence: 'high',
    tabs: [
      { label: 'Best rate', count: 2 },
      { label: 'All options', count: 7 },
      { label: 'Policy check', count: 1 },
    ],
    results: [
      { title: 'LH 772 · Frankfurt → Munich', product: 'Concur', meta: 'Oct 14 · 07:40 → 08:45 · €189', value: '€189', action: 'Book', badge: 'Best rate' },
      { title: 'LH 780 · Frankfurt → Munich', product: 'Concur', meta: 'Oct 14 · 11:20 → 12:30 · €210', value: '€210', action: 'Book' },
    ],
    handoff: { product: 'SAP Concur', description: 'Continue in Concur — Project Alpha cost centre and travel dates pre-populated.' },
  },
  {
    id: 'goals',
    label: 'Team Goals',
    query: 'Q3 goals status for my team',
    suggestions: [
      { text: 'Q3 goals status for my team', type: 'semantic', meta: 'HCM · SuccessFactors' },
      { text: 'at-risk goals this quarter', type: 'semantic', meta: '2 items' },
      { text: 'goal completion rates · Oct', type: 'history', meta: 'Recent' },
    ],
    overview: '8 team members · 3 goals on track · 2 at risk · 1 not started. Q3 closes in 23 days.',
    sources: ['SuccessFactors · Performance & Goals', 'Your org chart · 8 direct reports'],
    confidence: 'high',
    tabs: [
      { label: 'At risk', count: 2 },
      { label: 'On track', count: 3 },
      { label: 'All goals', count: 14 },
    ],
    results: [
      { title: 'Revenue Growth Target · Priya S.', product: 'SuccessFactors', meta: 'Q3 · 42% complete · At risk', badge: 'At risk', action: 'Review' },
      { title: 'Customer NPS Improvement · Raj K.', product: 'SuccessFactors', meta: 'Q3 · 28% complete · At risk', badge: 'At risk', action: 'Review' },
      { title: 'Platform Migration · Team Goal', product: 'SuccessFactors', meta: 'Q3 · 78% complete · On track', action: 'View' },
    ],
    handoff: { product: 'SAP SuccessFactors', description: 'Open team goals — filtered to Q3, manager view, at-risk items highlighted.' },
  },
]

// ── Streaming text hook ───────────────────────────────────────────────────────

function useStreamText(text: string, active: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return }
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); setDone(true) }
    }, speed)
    return () => clearInterval(interval)
  }, [text, active, speed])
  return { displayed, done }
}

// ── Main prototype component ──────────────────────────────────────────────────

interface Props {
  scenario?: string
  autoPlay?: boolean
}

export default function SearchPrototype({ scenario: scenarioId, autoPlay = false }: Props) {
  const [activeScenario, setActiveScenario] = useState<SearchScenario>(
    SCENARIOS.find(s => s.id === scenarioId) ?? SCENARIOS[0]
  )
  const [state, setState] = useState<SearchState>('idle')
  const [typedQuery, setTypedQuery] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [showHandoff, setShowHandoff] = useState(false)
  const [expandReasoning, setExpandReasoning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isThinking = state === 'thinking'
  const isResults = state === 'results'
  const { displayed: streamedOverview, done: overviewDone } = useStreamText(
    activeScenario.overview, isThinking || isResults, 22
  )

  const reset = () => {
    setState('idle')
    setTypedQuery('')
    setActiveTab(0)
    setShowHandoff(false)
    setExpandReasoning(false)
  }

  const runScenario = (sc: SearchScenario) => {
    setActiveScenario(sc)
    reset()
    setTimeout(() => {
      setState('typing')
      let i = 0
      const interval = setInterval(() => {
        i++
        setTypedQuery(sc.query.slice(0, i))
        if (i >= sc.query.length) {
          clearInterval(interval)
          setTimeout(() => { setState('thinking') }, 400)
          setTimeout(() => { setState('results') }, 1800)
        }
      }, 40)
    }, 300)
  }

  useEffect(() => {
    if (autoPlay) runScenario(SCENARIOS[0])
  }, [])

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedQuery(e.target.value)
    setState('typing')
  }

  const handleSearch = () => {
    if (!typedQuery) return
    setState('thinking')
    setTimeout(() => setState('results'), 1600)
  }

  return (
    <div className="border border-white border-opacity-[0.1] overflow-hidden" style={{ background: 'rgba(12,12,11,0.98)' }}>
      {/* Scenario selector */}
      <div className="flex items-center gap-0 border-b border-white border-opacity-[0.07] px-4 py-3">
        <span className="text-label text-white opacity-20 mr-4 flex-shrink-0">Try:</span>
        {SCENARIOS.map(sc => (
          <button
            key={sc.id}
            onClick={() => runScenario(sc)}
            className={`text-label text-white px-4 py-2 transition-all duration-200 flex-shrink-0 ${activeScenario.id === sc.id && state !== 'idle' ? 'opacity-90 border-b border-white' : 'opacity-30 hover:opacity-60'}`}
          >
            {sc.label}
          </button>
        ))}
        <div className="flex-1" />
        {state !== 'idle' && (
          <button onClick={reset} className="text-label text-white opacity-25 hover:opacity-60 transition-opacity px-3 py-1">
            Reset
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="px-6 pt-8 pb-6">
        <div
          className="relative border border-white transition-all duration-300"
          style={{ borderColor: state !== 'idle' ? 'rgba(245,242,237,0.3)' : 'rgba(245,242,237,0.12)' }}
        >
          {/* Search icon */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="rgba(245,242,237,0.4)" strokeWidth="1.2"/>
              <path d="M10.5 10.5L14 14" stroke="rgba(245,242,237,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={typedQuery}
            onChange={handleManualInput}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search SAP..."
            className="w-full bg-transparent text-white pl-12 pr-28 py-4 focus:outline-none"
            style={{ fontSize: '0.95rem', opacity: typedQuery ? 1 : 0.4, letterSpacing: '-0.01em' }}
          />

          {/* Right side of search bar */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {/* AI badge */}
            <span className="text-label text-white border border-white border-opacity-20 px-2 py-0.5 opacity-40" style={{ fontSize: '0.58rem' }}>AI</span>
            {/* Thinking spinner */}
            {state === 'thinking' && (
              <motion.div
                className="w-4 h-4 border border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{ borderColor: 'rgba(245,242,237,0.5)', borderTopColor: 'transparent' }}
              />
            )}
            {/* Search button */}
            {typedQuery && state === 'typing' && (
              <button onClick={handleSearch}
                className="text-label text-white border border-white border-opacity-25 px-3 py-1 hover:border-opacity-60 transition-all">
                ↵
              </button>
            )}
          </div>

          {/* Cursor blink when typing */}
          {state === 'typing' && (
            <motion.span
              className="absolute pointer-events-none text-white opacity-60"
              style={{ left: `${48 + typedQuery.length * 9.2}px`, top: '50%', transform: 'translateY(-50%)', fontSize: '0.95rem' }}
              animate={{ opacity: [0.6, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >|</motion.span>
          )}
        </div>

        {/* Suggestions dropdown */}
        <AnimatePresence>
          {state === 'typing' && typedQuery.length > 2 && (
            <motion.div
              className="border border-t-0 border-white border-opacity-[0.1]"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {activeScenario.suggestions.map((s, i) => (
                <motion.button
                  key={s.text}
                  className="w-full text-left px-5 py-3 flex items-center gap-4 hover:bg-white hover:bg-opacity-[0.04] transition-colors border-b border-white border-opacity-[0.05] last:border-0"
                  onClick={() => { setTypedQuery(s.text); setState('thinking'); setTimeout(() => setState('results'), 1400) }}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {/* Type icon */}
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {s.type === 'semantic' && <span className="text-white opacity-30" style={{ fontSize: '0.65rem' }}>◆</span>}
                    {s.type === 'entity' && <span className="text-white opacity-30" style={{ fontSize: '0.65rem' }}>●</span>}
                    {s.type === 'history' && <span className="text-white opacity-20" style={{ fontSize: '0.65rem' }}>↺</span>}
                  </span>
                  <span className="text-white opacity-65 flex-1 text-left" style={{ fontSize: '0.85rem' }}>{s.text}</span>
                  {s.meta && <span className="text-label text-white opacity-25 flex-shrink-0">{s.meta}</span>}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results area */}
      <AnimatePresence>
        {(state === 'thinking' || state === 'results') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* AI Overview */}
            <div className="mx-6 mb-4 border border-white border-opacity-[0.1] p-5"
              style={{ background: 'rgba(245,242,237,0.025)' }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                    <span className="text-label text-white opacity-35">AI Overview</span>
                  </div>
                  {/* Confidence badge */}
                  <AnimatePresence>
                    {overviewDone && (
                      <motion.span
                        className="text-label text-white border border-white border-opacity-15 px-2 py-0.5 opacity-50"
                        style={{ fontSize: '0.58rem' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.3 }}
                      >
                        {activeScenario.confidence === 'high' ? 'High confidence' : 'Medium confidence'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {/* Explainability toggle */}
                <button
                  onClick={() => setExpandReasoning(r => !r)}
                  className="text-label text-white opacity-20 hover:opacity-50 transition-opacity flex-shrink-0"
                  style={{ fontSize: '0.6rem' }}
                >
                  {expandReasoning ? 'Hide reasoning ↑' : 'Why this? →'}
                </button>
              </div>

              {/* Streamed text */}
              <p className="text-white mb-4" style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.6, opacity: 0.75 }}>
                {streamedOverview}
                {!overviewDone && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.45, repeat: Infinity }}>▌</motion.span>
                )}
              </p>

              {/* Sources */}
              <AnimatePresence>
                {overviewDone && (
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    {activeScenario.sources.map(src => (
                      <span key={src} className="text-label text-white border border-white border-opacity-[0.1] px-2.5 py-1 opacity-35"
                        style={{ fontSize: '0.62rem' }}>
                        {src}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reasoning panel */}
              <AnimatePresence>
                {expandReasoning && (
                  <motion.div
                    className="mt-4 pt-4 border-t border-white border-opacity-[0.08]"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-label text-white opacity-25 mb-2">Why this result</p>
                    <p className="text-white opacity-40" style={{ fontSize: '0.78rem', lineHeight: 1.55 }}>
                      Query matched procurement intent category · Role context: Procurement Manager ·
                      Filtered to items matching "{activeScenario.query}" · Permission-resolved to your accessible purchase orders ·
                      Ranked by pending duration + value threshold
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Generated tabs */}
            <AnimatePresence>
              {overviewDone && (
                <motion.div
                  className="mx-6 mb-0 flex gap-0 border-b border-white border-opacity-[0.08]"
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
                >
                  {activeScenario.tabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className="text-label text-white px-4 py-3 flex items-center gap-2 transition-all duration-200 border-b-2 flex-shrink-0"
                      style={{
                        opacity: activeTab === i ? 0.85 : 0.3,
                        borderColor: activeTab === i ? 'rgba(245,242,237,0.5)' : 'transparent',
                        fontSize: '0.7rem',
                      }}
                    >
                      {tab.label}
                      <span className="border border-white border-opacity-20 px-1.5 rounded-sm" style={{ fontSize: '0.58rem', opacity: 0.7 }}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result cards */}
            <AnimatePresence>
              {overviewDone && (
                <motion.div
                  className="mx-6 mt-0 space-y-px"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {activeScenario.results.map((result, i) => (
                    <motion.div
                      key={result.title}
                      className="border-b border-white border-opacity-[0.06] py-4 flex items-center gap-4 group cursor-pointer hover:bg-white hover:bg-opacity-[0.02] transition-colors -mx-6 px-6"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-white truncate" style={{ fontSize: '0.82rem', fontWeight: 400, opacity: 0.8 }}>
                            {result.title}
                          </p>
                          {result.badge && (
                            <span className="text-label text-white border border-white border-opacity-20 px-2 py-0.5 flex-shrink-0 opacity-60"
                              style={{ fontSize: '0.58rem' }}>
                              {result.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-label text-white opacity-20" style={{ fontSize: '0.62rem' }}>{result.product}</span>
                          <span className="text-label text-white opacity-30" style={{ fontSize: '0.62rem' }}>{result.meta}</span>
                        </div>
                      </div>
                      {result.value && (
                        <span className="text-white opacity-60 flex-shrink-0" style={{ fontSize: '0.82rem', fontWeight: 300 }}>
                          {result.value}
                        </span>
                      )}
                      {result.action && (
                        <button className="text-label text-white border border-white border-opacity-20 px-3 py-1.5 hover:border-opacity-50 hover:bg-white hover:bg-opacity-[0.04] transition-all flex-shrink-0 opacity-60 group-hover:opacity-90"
                          style={{ fontSize: '0.65rem' }}>
                          {result.action}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cross-product handoff */}
            <AnimatePresence>
              {overviewDone && activeScenario.handoff && (
                <motion.div
                  className="mx-6 mt-5 mb-6"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {!showHandoff ? (
                    <button
                      onClick={() => setShowHandoff(true)}
                      className="w-full flex items-center justify-between border border-white border-opacity-[0.1] px-5 py-4 hover:border-opacity-25 hover:bg-white hover:bg-opacity-[0.02] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
                        <span className="text-label text-white opacity-40 group-hover:opacity-65 transition-opacity">
                          Open in {activeScenario.handoff.product}
                        </span>
                      </div>
                      <span className="text-white opacity-25 group-hover:opacity-50 transition-opacity">→</span>
                    </button>
                  ) : (
                    <motion.div
                      className="border border-white border-opacity-[0.15] px-5 py-4"
                      style={{ background: 'rgba(245,242,237,0.04)' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                        <span className="text-label text-white opacity-50">Handing off to {activeScenario.handoff.product}</span>
                      </div>
                      <p className="text-white opacity-40 ml-5" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {activeScenario.handoff.description}
                      </p>
                      <div className="ml-5 mt-3 flex items-center gap-2">
                        {/* Context chips */}
                        {['Your role', 'Filters applied', 'Date context'].map(chip => (
                          <span key={chip} className="text-label text-white border border-white border-opacity-[0.12] px-2.5 py-1 opacity-40"
                            style={{ fontSize: '0.6rem' }}>
                            ✓ {chip}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle state CTA */}
      <AnimatePresence>
        {state === 'idle' && (
          <motion.div
            className="px-6 pb-10 pt-2 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <p className="text-label text-white opacity-20 mb-4">Choose a scenario above or type a query to explore</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {SCENARIOS.map(sc => (
                <button key={sc.id} onClick={() => runScenario(sc)}
                  className="text-label text-white border border-white border-opacity-15 px-4 py-2 hover:border-opacity-40 hover:bg-white hover:bg-opacity-[0.03] transition-all opacity-45 hover:opacity-80">
                  {sc.label} →
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
