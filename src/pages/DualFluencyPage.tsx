import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
import DotsNav from '../components/ui/DotsNav'

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
    color: 'rgba(245,242,237,0.9)',
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
    color: 'rgba(245,242,237,0.65)',
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
    color: 'rgba(245,242,237,0.4)',
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

function JourneyMilestone({ milestone, index }: { milestone: typeof JOURNEY[0], index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border-t border-white"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <button
        className="w-full text-left py-10 group"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-start justify-between gap-8">
          <div className="flex items-start gap-8">
            <span className="text-label text-white opacity-20 flex-shrink-0 mt-1">{milestone.time}</span>
            <div>
              <span className="text-overline text-white opacity-35 block mb-3">{milestone.label}</span>
              <h3
                className="text-white group-hover:opacity-80 transition-opacity"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.3 }}
              >
                {milestone.title}
              </h3>
              <p className="text-body text-white opacity-40 mt-3 max-w-2xl">{milestone.summary}</p>
            </div>
          </div>
          <span
            className="text-white opacity-30 flex-shrink-0 mt-1 transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: '1.25rem' }}
          >
            +
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-12 pl-0 md:pl-24 grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.06]">
              <div className="bg-black p-8">
                <p className="text-overline text-white opacity-30 mb-5">What you learn</p>
                <ul className="space-y-3">
                  {milestone.learned.map((l, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-white opacity-20 flex-shrink-0 mt-1" style={{ fontSize: '0.5rem' }}>●</span>
                      <p className="text-body text-white opacity-55">{l}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black p-8">
                <p className="text-overline text-white opacity-30 mb-5">Framework introduced</p>
                <p className="text-body text-white opacity-80 font-medium mb-6">{milestone.framework}</p>
                <p className="text-overline text-white opacity-30 mb-3">Common mistake</p>
                <p className="text-body text-white opacity-45 italic">{milestone.mistake}</p>
              </div>
              <div className="bg-black p-8 flex flex-col justify-between">
                <div>
                  <p className="text-overline text-white opacity-30 mb-5">Key takeaway</p>
                  <div className="border-l-2 border-white border-opacity-20 pl-5">
                    <p className="text-white opacity-70" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6 }}>
                      "{milestone.takeaway}"
                    </p>
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

function KPICard({ item, layerColor }: { item: typeof KPI_CHAIN[0]['items'][0], layerColor: string }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border border-white cursor-pointer"
      style={{ borderColor: open ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)', background: open ? 'rgba(245,242,237,0.03)' : 'transparent' }}
      onClick={() => setOpen(o => !o)}
      whileHover={{ borderColor: 'rgba(255,255,255,0.18)' }}
      layout
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-body text-white" style={{ fontWeight: 400, color: layerColor }}>{item.name}</span>
          <span className="text-white opacity-25 text-sm">{open ? '−' : '+'}</span>
        </div>
        <p className="text-label text-white opacity-35">{item.definition}</p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6 border-t border-white border-opacity-10 pt-4 space-y-4">
              <div>
                <p className="text-overline text-white opacity-25 mb-1">Formula</p>
                <p className="text-body text-white opacity-50 font-mono" style={{ fontSize: '0.8rem' }}>{item.formula}</p>
              </div>
              <div>
                <p className="text-overline text-white opacity-25 mb-2">Influences</p>
                <div className="flex flex-wrap gap-2">
                  {item.influences.map(inf => (
                    <span key={inf} className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-60">{inf}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function GlossaryEntry({ entry, index }: { entry: typeof GLOSSARY[0], index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border-b border-white"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button className="w-full text-left py-8 flex items-start justify-between gap-6 group" onClick={() => setOpen(o => !o)}>
        <div>
          <span className="text-white group-hover:opacity-80 transition-opacity"
            style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
            {entry.term}
          </span>
          {!open && <p className="text-body text-white opacity-35 mt-2">{entry.simple}</p>}
        </div>
        <span className="text-white opacity-25 flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.2rem' }}>+</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-8 grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <p className="text-overline text-white opacity-25 mb-2">Plain English</p>
                  <p className="text-body text-white opacity-60">{entry.simple}</p>
                </div>
                <div>
                  <p className="text-overline text-white opacity-25 mb-2">For designers</p>
                  <p className="text-body text-white opacity-60">{entry.design}</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-overline text-white opacity-25 mb-2">Example</p>
                  <p className="text-body text-white opacity-55 italic">{entry.example}</p>
                </div>
                <div>
                  <p className="text-overline text-white opacity-25 mb-2">Common confusion</p>
                  <p className="text-body text-white opacity-50">{entry.confusion}</p>
                </div>
                <div>
                  <p className="text-overline text-white opacity-25 mb-2">Related</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {entry.related.map(r => (
                      <span key={r} className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-50">{r}</span>
                    ))}
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

// ── Page ───────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'journey', label: 'Journey' },
  { id: 'framework', label: 'Framework' },
  { id: 'kpis', label: 'KPIs' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'canvas', label: 'Canvas' },
]

export default function DualFluencyPage() {
  const [activeSection] = useState('hero')
  const [glossarySearch, setGlossarySearch] = useState('')

  const filteredGlossary = GLOSSARY.filter(e =>
    e.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    e.simple.toLowerCase().includes(glossarySearch.toLowerCase())
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <DotsNav sections={SECTIONS} active={activeSection} />

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-20 px-6 md:px-12">
        <GrainOverlay opacity={0.05} />

        {/* Animated concept loop — subtle background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: heroY }}
        >
          <div className="relative w-[600px] h-[600px] opacity-[0.04]">
            {['Business', 'Users', 'Design', 'Business'].map((label, i) => (
              <motion.div
                key={i}
                className="absolute text-white font-light"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  letterSpacing: '-0.03em',
                  top: `${[10, 40, 70, 10][i]}%`,
                  left: `${[40, 80, 40, 40][i]}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, delay: i * 0.75, repeat: Infinity, ease: 'easeInOut' }}
              >
                {label}
              </motion.div>
            ))}
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 300 60 Q 480 240 300 420 Q 120 240 300 60"
                stroke="rgba(245,242,237,0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="600"
                animate={{ strokeDashoffset: [600, 0, -600] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="relative z-10 mb-12">
          <Link to="/resources" className="text-label text-white opacity-30 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
            ← Resources
          </Link>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            className="text-overline text-white opacity-35 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ duration: 0.6 }}
          >
            Framework · Workshop Toolkit · Design Leadership
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Dual Fluency
          </motion.h1>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-white opacity-65 mb-6"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 300, lineHeight: 1.65, letterSpacing: '-0.01em' }}>
                Imagine a designer working on an amazing feature. It launches. Users love it.
                Then leadership asks: <em>"What business impact did it create?"</em>
              </p>
              <p className="text-body text-white opacity-45">
                Dual Fluency is the capacity to operate equally in the language of design and the language of business —
                and to translate fluently between them in any room.
                This page is your everyday reference after the workshop.
              </p>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                ['Sold out', 'DesignUp 2023'],
                ['6 hrs', 'Full-day workshop'],
                ['250+', 'Designers trained'],
              ].map(([val, label]) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="text-white" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>{val}</span>
                  <span className="text-label text-white opacity-30">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Story arc strip */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full mt-16 pt-10 border-t border-white border-opacity-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-overline text-white opacity-25 mb-6">The learning journey</p>
          <div className="flex flex-wrap gap-3 items-center">
            {[
              "I don't know why business matters",
              "I understand the metrics",
              "I can connect them",
              "I can create strategy",
              "I can speak business",
            ].map((stage, i, arr) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-body text-white opacity-40" style={{ fontSize: '0.85rem' }}>{stage}</span>
                {i < arr.length - 1 && <span className="text-white opacity-20">↓</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Workshop Journey ── */}
      <section id="journey" className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Workshop Journey</p>
              <h2 className="text-heading text-white">Six sessions. One coherent story.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Every session builds on the previous. Click any session to expand what was covered,
              which framework was introduced, and what the key takeaway was.
            </p>
          </div>

          {JOURNEY.map((milestone, i) => (
            <JourneyMilestone key={milestone.id} milestone={milestone} index={i} />
          ))}
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ── Framework: KPI Chain ── */}
      <section id="framework" className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">The Dual Fluency Loop</p>
              <h2 className="text-heading text-white">Every design decision is a hypothesis about a business outcome.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              The three metric layers and how they connect. A design metric that doesn't trace back to a business KPI
              is a measure of activity, not impact. Click any KPI to see its formula and downstream influences.
            </p>
          </div>

          <div className="space-y-12">
            {KPI_CHAIN.map((layer, li) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: li * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: layer.color }} />
                  <p className="text-overline text-white" style={{ opacity: 0.5 }}>{layer.label}</p>
                  {li < KPI_CHAIN.length - 1 && (
                    <div className="ml-auto flex items-center gap-2 text-label text-white opacity-20">
                      <span>influences</span>
                      <span>↓</span>
                    </div>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-white bg-opacity-[0.06]">
                  {layer.items.map(item => (
                    <KPICard key={item.name} item={item} layerColor={layer.color} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* The loop callout */}
          <motion.div
            className="mt-16 p-10 md:p-14 border border-white border-opacity-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-overline text-white opacity-30 mb-6">The Dual Fluency Loop</p>
            <div className="flex flex-wrap gap-4 items-center">
              {['Identify the business KPI', 'Find the user metric that moves it', 'Find the design metric that moves that', 'Design the intervention', 'Measure both'].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-label text-white opacity-20">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-body text-white opacity-60">{step}</span>
                  </div>
                  {i < arr.length - 1 && <span className="text-white opacity-20">→</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KPI Library ── */}
      <section id="kpis" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">KPI Library</p>
              <h2 className="text-heading text-white">The metrics that matter — and what influences them.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Every KPI is a knowledge card. Click to expand the formula, benchmarks, and the design decisions
              that most directly move it.
            </p>
          </div>

          {KPI_CHAIN.map((layer) => (
            <div key={layer.id} className="mb-16">
              <p className="text-overline text-white mb-6" style={{ opacity: 0.35 }}>{layer.label}</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-white bg-opacity-[0.06]">
                {layer.items.map(item => (
                  <KPICard key={item.name} item={item} layerColor={layer.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Glossary ── */}
      <section id="glossary" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Glossary</p>
              <h2 className="text-heading text-white">The dictionary every designer wishes existed.</h2>
            </div>
            <div className="self-end">
              <p className="text-body text-white opacity-45 mb-6">
                Business terms defined for designers — not just what they mean, but why they matter and how your work connects to them.
              </p>
              <input
                type="text"
                placeholder="Search terms..."
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                className="w-full bg-transparent border border-white border-opacity-20 px-5 py-3 text-body text-white placeholder-white focus:border-opacity-50 focus:outline-none transition-all duration-200"
                style={{ opacity: glossarySearch ? 1 : 0.6 }}
              />
            </div>
          </div>

          <div>
            {filteredGlossary.map((entry, i) => (
              <GlossaryEntry key={entry.term} entry={entry} index={i} />
            ))}
            {filteredGlossary.length === 0 && (
              <p className="text-body text-white opacity-30 py-12 text-center">No terms matching "{glossarySearch}"</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Canvas ── */}
      <section id="canvas" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-12">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">The Canvas</p>
              <h2 className="text-heading text-white">The Dual Fluency Canvas — your translation tool.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              The workshop canvas for mapping any design decision to a business outcome in under 20 minutes.
              Request the editable Figma or PDF version.
            </p>
          </div>

          {/* Canvas placeholder */}
          <motion.div
            className="relative overflow-hidden"
            style={{ aspectRatio: '16/9', background: 'rgba(245,242,237,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 grid grid-cols-4 gap-px p-8 md:p-14">
              {['Business KPI', 'User Metric', 'Design Metric', 'Intervention'].map((col, i) => (
                <div key={col} className="border border-white border-opacity-10 p-6 flex flex-col gap-4">
                  <p className="text-overline text-white opacity-25">{`0${i + 1}`}</p>
                  <p className="text-body text-white opacity-40">{col}</p>
                  <div className="flex-1 border-b border-white border-opacity-10" />
                  <div className="h-6 border-b border-white border-opacity-10" />
                  <div className="h-6 border-b border-white border-opacity-10" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-label text-white opacity-20">Canvas preview</p>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="mailto:uxbyamit@gmail.com?subject=Request - Dual Fluency Canvas&body=Hi Amit,%0A%0AI'd like to request the Dual Fluency Canvas.%0A%0AName:%0ARole:%0AOrganisation:"
              className="text-label text-white border border-white border-opacity-30 px-6 py-3 hover:border-opacity-70 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200 inline-flex items-center gap-3"
            >
              Request Figma canvas →
            </a>
            <a
              href="mailto:uxbyamit@gmail.com?subject=Request - Dual Fluency Workshop&body=Hi Amit,%0A%0AI'm interested in bringing the Dual Fluency workshop to my team.%0A%0AName:%0ARole:%0AOrganisation:%0ATeam size:"
              className="text-label text-white opacity-40 hover:opacity-80 transition-opacity px-6 py-3"
            >
              Bring the workshop to your team
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer nav ── */}
      <section className="relative bg-black py-16 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/resources" className="text-label text-white opacity-35 hover:opacity-70 transition-opacity">
            ← Back to Resources
          </Link>
          <a
            href="mailto:uxbyamit@gmail.com?subject=Dual Fluency Workshop"
            className="text-label text-white opacity-35 hover:opacity-70 transition-opacity"
          >
            Get in touch about the workshop →
          </a>
        </div>
      </section>
    </div>
  )
}
