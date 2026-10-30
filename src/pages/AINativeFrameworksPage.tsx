import { useContact } from '../components/contact/ContactProvider'
import Breadcrumb from '../components/ds/Breadcrumb'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
import DotsNav from '../components/ui/DotsNav'

// ── Data ──────────────────────────────────────────────────────────────────────

const PROCESS_PHASES = [
  {
    id: 'context',
    number: '01',
    title: 'Context Engineering',
    purpose: 'Build deep shared understanding before solutioning.',
    questions: [
      'What business are we in?',
      'How does work happen today?',
      'Who performs the work and where are decisions made?',
      'Where should intelligence exist in this system?',
    ],
    outputs: ['Industry Brief', 'Ecosystem Map', 'Personas', 'As-is Journey Map', 'Agent Ecosystem Map'],
    exercise: 'Create five discovery assets from a supplied enterprise brief.',
    color: 'var(--color-ink-3)',
  },
  {
    id: 'opportunity',
    number: '02',
    title: 'Intelligence Opportunity Discovery',
    purpose: 'Discover where intelligence creates measurable value.',
    questions: [
      'Where does work wait for human decision?',
      'Where does knowledge exist but not flow?',
      'Where does coordination fail at scale?',
      'What decisions are routine but high-volume?',
    ],
    outputs: ['Intelligence Opportunity Canvas', 'Prioritised Opportunity Map', 'Capability Heatmap'],
    exercise: 'Map intelligence opportunities across an enterprise workflow using the Observe → Understand → Reason → Decide → Execute → Coordinate model.',
    color: 'var(--color-ink-3)',
  },
  {
    id: 'blueprint',
    number: '03',
    title: 'Agent Mission Blueprint',
    purpose: 'Define what the agent is, knows, can do, and must not do.',
    questions: [
      'What is the agent\'s mission in one sentence?',
      'What knowledge and memory does it need?',
      'Where does human authority begin?',
      'How does the agent escalate?',
    ],
    outputs: ['Agent Mission Blueprint', 'Capability Wheel', 'Collaboration Graph', 'Escalation Model'],
    exercise: 'Complete an Agent Mission Blueprint for a procurement or HCM use case.',
    color: 'var(--color-ink-3)',
  },
  {
    id: 'experience',
    number: '04',
    title: 'AI-native Experience Blueprint',
    purpose: 'Design the human-agent collaboration layer.',
    questions: [
      'Where are the human checkpoints?',
      'How does the system communicate uncertainty?',
      'What does recovery look like when the agent is wrong?',
      'How is escalation designed as a first-class interaction?',
    ],
    outputs: ['Experience Blueprint', 'Trust Ladder Diagram', 'Collaboration Swimlanes', 'Interaction Sequence'],
    exercise: 'Map the human-agent collaboration model for one enterprise workflow end-to-end.',
    color: 'var(--color-ink-2)',
  },
  {
    id: 'prototype',
    number: '05',
    title: 'Prototype & Validation',
    purpose: 'Turn architecture into a testable, arguable experience.',
    questions: [
      'Does the prototype communicate the agent\'s reasoning?',
      'Can a user understand what the agent did without explanation?',
      'Is the override mechanism discoverable without prompting?',
      'Does the failure state maintain trust?',
    ],
    outputs: ['Interactive Prototype', 'Review Checklist', 'Usability Report', 'Improvements Backlog'],
    exercise: 'Prototype one human-agent interaction end-to-end and run a 5-person usability test.',
    color: 'rgb(var(--ink-rgb) / 0.95)',
  },
]

const FRAMEWORKS = [
  {
    id: 'context-engineering',
    number: '01',
    title: 'Context Engineering',
    tagline: 'Know before you design.',
    challenge: 'Design teams jump into solutioning before building genuine understanding of the business, the work, and the people. The result: technically correct solutions that don\'t fit the actual system they\'re designed for.',
    whyBreaks: 'Traditional UX research focuses on user tasks and pain points. In AI-native design, you need to understand the entire intelligence ecosystem, where data flows, where decisions are made, where automation already exists, and where it fails. Task-level research misses system-level opportunities.',
    mentalModel: [
      { step: 'Industry', description: 'What sector, competitive dynamics, and regulatory constraints shape this business?' },
      { step: 'Business', description: 'What are the company\'s goals, metrics, and constraints? What does success look like?' },
      { step: 'Ecosystem', description: 'What systems, tools, and workflows exist? How does data move between them?' },
      { step: 'Users & Work', description: 'Who does the work? What decisions do they make? What consumes their time?' },
      { step: 'Intelligence', description: 'Where should AI observe, understand, reason, decide, execute, or coordinate?' },
    ],
    decisions: [
      'Depth of industry research before stakeholder interviews',
      'Which workflows to prioritise for intelligence mapping',
      'How to validate context assumptions before moving to opportunity discovery',
    ],
    pitfalls: [
      'Treating context engineering as a one-time activity: it should be ongoing',
      'Focusing only on user pain points and missing system-level intelligence opportunities',
      'Skipping the business model layer: agents that don\'t create business value don\'t get resourced',
    ],
    related: ['Intelligence Opportunity Discovery', 'Agent Mission Blueprint'],
  },
  {
    id: 'intelligence-opportunity',
    number: '02',
    title: 'Intelligence Opportunity Discovery',
    tagline: 'Find where AI creates value, not where it\'s impressive.',
    challenge: 'Organizations want to add AI everywhere. The result is a set of AI features that are technically sophisticated but don\'t meaningfully reduce work or improve decisions. Intelligence opportunity discovery applies a rigorous filter.',
    whyBreaks: 'Traditional feature prioritisation uses user stories and impact/effort matrices. These don\'t capture the specific types of value AI creates: the value of automation, prediction, synthesis, and coordination at scale. A different model is needed.',
    mentalModel: [
      { step: 'Observe', description: 'What data does the system need to perceive? What currently requires human observation?' },
      { step: 'Understand', description: 'What patterns, meanings, or contexts need to be interpreted?' },
      { step: 'Reason', description: 'What multi-step reasoning or inference currently relies on expert judgment?' },
      { step: 'Decide', description: 'What decisions are high-volume, rule-bounded, or time-sensitive?' },
      { step: 'Execute', description: 'What actions could be automated once a decision is made?' },
      { step: 'Coordinate', description: 'What orchestration between systems, agents, or people could be automated?' },
    ],
    decisions: [
      'Which cognitive tasks are genuinely automatable vs. which require irreducible human judgment',
      'How to score opportunities: value × feasibility × risk',
      'Which opportunities to pursue first vs. defer',
    ],
    pitfalls: [
      'Prioritising impressive AI over valuable AI: automation that saves 30 seconds per day is better than AI that\'s technically impressive but rarely used',
      'Ignoring risk: high-value opportunities with high error costs need more trust design, not less',
      'Missing coordination opportunities: often the biggest value in enterprise AI is orchestration, not individual task automation',
    ],
    related: ['Context Engineering', 'Agent Mission Blueprint'],
  },
  {
    id: 'agent-mission',
    number: '03',
    title: 'Agent Mission Blueprint',
    tagline: 'Define the agent before designing the interface.',
    challenge: 'Teams design agent interfaces before defining what the agent actually is: its mission, its knowledge, its constraints, and its relationship to human authority. The interface becomes the specification. This always produces the wrong thing.',
    whyBreaks: 'UI-first design for agents creates interfaces that make the agent\'s internal complexity visible rather than useful. Without a mission blueprint, the interface reflects how the system works rather than how humans should relate to it.',
    mentalModel: [
      { step: 'Mission', description: 'One sentence that captures what the agent does and why it matters.' },
      { step: 'Capabilities', description: 'What the agent can do. What tools, data, and actions are available to it.' },
      { step: 'Knowledge', description: 'What the agent knows. Domain knowledge, company data, user context.' },
      { step: 'Memory', description: 'What the agent remembers. Session, user, workflow, and institutional memory.' },
      { step: 'Constraints', description: 'What the agent cannot do. Hard limits, compliance boundaries, escalation triggers.' },
      { step: 'Autonomy', description: 'The spectrum from full autonomy to full human control, and where this agent sits.' },
      { step: 'Escalation', description: 'The specific conditions that require human intervention and how they are surfaced.' },
      { step: 'Success Metrics', description: 'How the agent\'s performance is measured. Not just technical metrics: trust and oversight metrics too.' },
    ],
    decisions: [
      'Autonomy level: where on the automation/oversight spectrum should this agent operate?',
      'Escalation design: what are the specific triggers and what does handoff look like?',
      'Memory architecture: what should persist across sessions and what should be scoped to session only?',
    ],
    pitfalls: [
      'Designing for maximum autonomy instead of appropriate autonomy: more autonomy requires more trust design investment',
      'Vague escalation triggers - "when uncertain" is not a trigger, it\'s a placeholder',
      'Missing the collaborating agents dimension: most enterprise agents work in systems, not isolation',
    ],
    related: ['Intelligence Opportunity Discovery', 'AI-native Experience Blueprint'],
  },
  {
    id: 'experience-blueprint',
    number: '04',
    title: 'AI-native Experience Blueprint',
    tagline: 'Design the relationship between human judgment and AI autonomy.',
    challenge: 'Most AI product design treats the interface as the product. In AI-native design, the interface is the mechanism for human-agent collaboration. Designing the screens without designing the collaboration model produces an interface that works technically but fails at trust.',
    whyBreaks: 'Traditional interaction design assumes a user who initiates every action and receives feedback. In agentic systems, the agent initiates, acts, and completes, and the user\'s role is oversight. This requires a completely different design vocabulary: oversight, escalation, transparency, and recovery.',
    mentalModel: [
      { step: 'Human Checkpoints', description: 'The specific moments where human judgment is required. Designed, not defaulted.' },
      { step: 'Trust Ladder', description: 'How trust is built progressively as the agent demonstrates reliability in low-stakes situations.' },
      { step: 'Transparency', description: 'What the agent surfaces about its reasoning, and when. Progressive disclosure by default.' },
      { step: 'Escalation', description: 'How exceptions are communicated and acted on. A first-class interaction pattern, not a fallback.' },
      { step: 'Recovery', description: 'What happens when the agent is wrong. Recovery design determines whether trust is maintained.' },
      { step: 'Feedback Loop', description: 'How user corrections are acknowledged and inform future agent behaviour.' },
    ],
    decisions: [
      'Communication hierarchy: what tier does each agent action fall into: log, visible reasoning, or interrupt?',
      'Trust design: how is trust built incrementally vs. assumed from day one?',
      'Recovery design: is error recovery faster and clearer than the error itself?',
    ],
    pitfalls: [
      'Designing oversight as a modal or settings page: oversight must be inline and effortless',
      'Information overload: surfacing all reasoning by default defeats the purpose of automation',
      'Treating recovery as an edge case: recovery interactions have disproportionate impact on long-term trust',
    ],
    related: ['Agent Mission Blueprint', 'Prototype & Validation'],
  },
  {
    id: 'prototype-validation',
    number: '05',
    title: 'Prototype & Validation',
    tagline: 'At this level of maturity, the prototype is the argument.',
    challenge: 'AI-native experiences are hard to specify in static documents. Stakeholders can\'t evaluate an architecture diagram the way they can evaluate an interactive experience. Prototyping is not the end of design: it is the medium of design argument.',
    whyBreaks: 'Traditional UX prototyping validates task flows and information architecture. AI-native prototyping must also validate the trust model, the communication hierarchy, the escalation experience, and the recovery experience. These can only be evaluated interactively.',
    mentalModel: [
      { step: 'Figma', description: 'Static screens, flows, and the visual design system. The reference for all other prototype tools.' },
      { step: 'Figma AI', description: 'Rapid UI generation from prompts. Accelerates iteration on visual treatments.' },
      { step: 'Lovable', description: 'Full interactive prototypes with working data. Best for trust and oversight interaction validation.' },
      { step: 'v0', description: 'Component-level prototyping. Best for validating individual interaction patterns.' },
      { step: 'Cursor', description: 'Production-quality code prototypes. Best when the prototype is the MVP.' },
    ],
    decisions: [
      'Fidelity level for each prototype stage: higher fidelity for trust-critical interactions, lower for structural validation',
      'Which tool is appropriate for the specific validation question being answered',
      'When the prototype is ready for stakeholder review vs. more iteration',
    ],
    pitfalls: [
      'Prototyping the happy path only: prototype the failure states and escalation paths with equal care',
      'Using the wrong tool for the validation question: static Figma can\'t validate dynamic agentic behaviour',
      'Skipping the review against the Experience Blueprint: the prototype should answer the blueprint\'s questions',
    ],
    related: ['AI-native Experience Blueprint', 'Context Engineering'],
  },
]

const TOOL_ORCHESTRATION = [
  { phase: 'context-engineering', task: 'Industry Research', primary: 'Perplexity', alt: 'ChatGPT Deep Research', why: 'Real-time web synthesis with cited sources', output: 'Industry Brief' },
  { phase: 'context-engineering', task: 'Document Grounding', primary: 'NotebookLM', alt: 'Claude', why: 'Deep analysis of internal documents and policies', output: 'Research Summary' },
  { phase: 'context-engineering', task: 'Systems Reasoning', primary: 'Claude', alt: 'ChatGPT', why: 'Multi-step reasoning across complex enterprise systems', output: 'Ecosystem Map' },
  { phase: 'context-engineering', task: 'Workflow Mapping', primary: 'Miro / FigJam', alt: 'Whimsical', why: 'Visual collaboration for swimlane and journey work', output: 'As-is Journey Map' },
  { phase: 'agent-mission', task: 'Agent Blueprint', primary: 'Claude + Figma', alt: 'Notion + FigJam', why: 'Reasoning for structure, Figma for visual blueprint', output: 'Agent Mission Blueprint' },
  { phase: 'experience-blueprint', task: 'UX Copy & Dialog', primary: 'ChatGPT', alt: 'Claude', why: 'Tone calibration and response architecture design', output: 'Conversation Content' },
  { phase: 'prototype-validation', task: 'Rapid UI Prototyping', primary: 'Figma AI / v0', alt: 'Lovable', why: 'Fastest path from blueprint to testable screens', output: 'Interactive Prototype' },
  { phase: 'prototype-validation', task: 'Production Prototype', primary: 'Lovable', alt: 'Cursor', why: 'Working data, realistic agent behaviour simulation', output: 'Testable Experience' },
]


// Templates that exist today live in /templates/ai-native-frameworks.html (each tab opens via #hash).
// Agent Mission Blueprint and the Intelligence Opportunity Canvas are public Figma files.
const KIT = '/templates/ai-native-frameworks.html'
const TEMPLATES: Record<string, { name: string; format: string; href: string }[]> = {
  'context-engineering': [{ name: 'Context Engineering Canvas', format: 'FigJam board', href: `${KIT}#context` }],
  'intelligence-opportunity': [
    { name: 'Intelligence Opportunity Board', format: 'FigJam board', href: `${KIT}#opportunity` },
    { name: 'Intelligence Opportunity Canvas', format: 'Figma file', href: 'https://www.figma.com/design/c19zDukqz5VI341boIVf7O' },
  ],
  'agent-mission': [{ name: 'Agent Mission Blueprint', format: 'Figma file', href: 'https://www.figma.com/design/1rT6bOv4dbNKXOTWW4D4p5' }],
  'experience-blueprint': [{ name: 'Experience Blueprint Kit', format: 'Figma file', href: `${KIT}#experience` }],
  'prototype-validation': [{ name: 'Prototype Review Kit', format: 'Figma file', href: `${KIT}#review` }],
}

// FigJam versions of the templates. The URLs are NOT in the source: they come from VITE_FIGJAM_LINKS
// (JSON keyed by framework id), set only on the staging Vercel project. Where it is unset (production),
// the same slot shows a request button instead, so the links never ship in the production bundle.
const FIGJAM_NAMES: Record<string, string> = {
  'context-engineering': 'Context Engineering Canvas',
  'intelligence-opportunity': 'Intelligence Opportunity Board',
  'experience-blueprint': 'Experience Blueprint Kit',
  'prototype-validation': 'Prototype Review Kit',
}
const FIGJAM_LINKS: Record<string, string> = (() => {
  try { return JSON.parse(import.meta.env.VITE_FIGJAM_LINKS || '{}') } catch { return {} }
})()

const ON_REQUEST = [
  { name: 'AI-native Design Playbook', type: 'PDF', description: 'Complete methodology guide: all five frameworks, enterprise examples, and evaluation criteria.' },
  { name: 'Prompt Library', type: 'Notion / PDF', description: 'Curated prompt pack for each phase: research, synthesis, blueprint creation, and validation.' },
  { name: 'Framework Poster Pack', type: 'PDF', description: 'A3/A1 poster for each framework, for studio walls and workshop rooms.' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function ProcessRoadmap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div>
      {/* SVG Connection diagram */}
      <div className="hidden md:flex items-center gap-0 mb-12 relative">
        {PROCESS_PHASES.map((phase, i) => (
          <div key={phase.id} className="flex items-center flex-1">
            <motion.button
              className="flex flex-col items-center group w-full"
              onClick={() => setActive(active === phase.id ? null : phase.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Node circle */}
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-300 relative z-10"
                style={{
                  borderColor: active === phase.id ? phase.color : 'rgb(var(--ink-rgb) / 0.18)',
                  background: active === phase.id ? 'rgb(var(--ink-rgb) / 0.08)' : 'var(--bg)',
                }}
              >
                <span className="text-label text-white" style={{ opacity: active === phase.id ? 1 : 0.7 }}>{phase.number}</span>
              </div>
              <p className="text-center text-white" style={{ fontSize: '0.7rem', fontWeight: 400, opacity: active === phase.id ? 1 : 0.7, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {phase.title}
              </p>
            </motion.button>

            {/* Arrow connector */}
            {i < PROCESS_PHASES.length - 1 && (
              <motion.div className="w-8 flex-shrink-0 flex items-center justify-center -mt-8"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6 L18 6 M14 2 L20 6 L14 10" stroke="rgb(var(--ink-rgb) / 0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Expanded detail */}
      <AnimatePresence mode="wait">
        {active && (() => {
          const phase = PROCESS_PHASES.find(p => p.id === active)!
          return (
            <motion.div
              key={active}
              className="border border-white border-opacity-[0.1] mb-12"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid md:grid-cols-4 gap-px grid-hairline">
                <div className="bg-black p-8 md:col-span-1">
                  <p className="text-overline text-ink-3 mb-3">Purpose</p>
                  <p className="text-body text-ink-3 mb-8">{phase.purpose}</p>
                  <p className="text-overline text-ink-3 mb-3">Practice exercise</p>
                  <p className="text-body text-ink-3 italic">{phase.exercise}</p>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-ink-3 mb-4">Core questions</p>
                  <ul className="space-y-3">
                    {phase.questions.map((q, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-faint flex-shrink-0 mt-1.5" style={{ fontSize: '0.4rem' }}>◆</span>
                        <p className="text-body text-ink-3">{q}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-ink-3 mb-4">Outputs</p>
                  <ul className="space-y-2 mb-8">
                    {phase.outputs.map(o => (
                      <li key={o} className="flex gap-3">
                        <span className="text-faint flex-shrink-0 mt-1.5" style={{ fontSize: '0.4rem' }}>◆</span>
                        <p className="text-label text-ink-3">{o}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-ink-3 mb-4">Template</p>
                  <ul className="space-y-2 mb-8">
                    {(TEMPLATES[FRAMEWORKS[PROCESS_PHASES.findIndex(p => p.id === active)].id] ?? []).map(t => (
                      <li key={t.name} className="flex items-center gap-3">
                        <span className="text-ink-3 text-xs">↗</span>
                        <a href={t.href} target="_blank" rel="noopener noreferrer"
                          className="text-label text-ink-3 hover:text-white transition-colors">{t.name}</a>
                      </li>
                    ))}
                  </ul>
                  <a href="#frameworks" className="text-label text-ink-3 hover:text-white transition-colors">See the framework ↓</a>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Mobile list */}
      <div className="md:hidden">
        {PROCESS_PHASES.map((phase, i) => (
          <motion.div key={phase.id} className="border-t border-white" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
            <button className="w-full text-left py-6 flex items-center justify-between gap-4"
              onClick={() => setActive(active === phase.id ? null : phase.id)}>
              <div className="flex items-center gap-4">
                <span className="text-label text-ink-3 w-6">{phase.number}</span>
                <div>
                  <p className="text-body text-ink-2">{phase.title}</p>
                  <p className="text-label text-ink-3 mt-0.5">{phase.purpose}</p>
                </div>
              </div>
              <span className="text-ink-3 transition-transform duration-300"
                style={{ transform: active === phase.id ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            <AnimatePresence>
              {active === phase.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                  <div className="pb-6 space-y-4">
                    <p className="text-body text-ink-3">{phase.purpose}</p>
                    <p className="text-body text-ink-3 italic text-sm">{phase.exercise}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FrameworkCard({ fw, index }: { fw: typeof FRAMEWORKS[0], index: number }) {
  const { ask } = useContact()
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('mentalModel')
  const templates = TEMPLATES[fw.id] ?? []
  const tools = TOOL_ORCHESTRATION.filter(t => t.phase === fw.id)
  const figjamName = FIGJAM_NAMES[fw.id]
  const figjamUrl = FIGJAM_LINKS[fw.id]

  const sections = [
    { id: 'mentalModel', label: 'Mental Model' },
    { id: 'decisions', label: 'Design Decisions' },
    { id: 'pitfalls', label: 'Common Pitfalls' },
    { id: 'toolkit', label: 'Tools & Templates' },
  ]

  return (
    <motion.article
      className="border-t border-white"
      style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      {/* Header: always visible */}
      <div className="flex items-start gap-6 py-12">
        <button className="flex-1 text-left group flex items-start justify-between gap-8"
          onClick={() => setOpen(o => !o)} aria-expanded={open}>
          <div className="flex items-start gap-8 flex-1">
            <span className="text-label text-ink-3 flex-shrink-0 mt-1">{fw.number}</span>
            <div className="flex-1">
              <h3 className="text-white mb-2 group-hover:opacity-80 transition-opacity"
                style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                {fw.title}
              </h3>
              <p className="text-body text-ink-3">{fw.tagline}</p>

              {/* Challenge preview */}
              {!open && (
                <p className="text-body text-ink-3 mt-4 max-w-2xl line-clamp-2" style={{ fontSize: '0.9rem' }}>
                  {fw.challenge}
                </p>
              )}
            </div>
          </div>
          <span className="text-ink-3 flex-shrink-0 mt-1 transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.4rem' }}>+</span>
        </button>
        {templates[0] && (
          <a href={templates[0].href} target="_blank" rel="noopener noreferrer"
            className="hidden md:block flex-shrink-0 mt-2 text-label text-ink-3 hover:text-white transition-colors whitespace-nowrap">
            Open template ↗
          </a>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-16">
              {/* Challenge + Why existing UX breaks */}
              <div className="grid md:grid-cols-2 gap-px grid-hairline mb-px">
                <div className="bg-black p-8 md:p-10">
                  <p className="text-overline text-ink-3 mb-4">The challenge</p>
                  <p className="text-body text-ink-3">{fw.challenge}</p>
                </div>
                <div className="bg-black p-8 md:p-10">
                  <p className="text-overline text-ink-3 mb-4">Why traditional UX breaks here</p>
                  <p className="text-body text-ink-3">{fw.whyBreaks}</p>
                </div>
              </div>

              {/* Section tabs */}
              <div className="flex gap-0 border-b border-white border-opacity-[0.08] mb-0 overflow-x-auto">
                {sections.map(sec => (
                  <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                    className="text-label text-white px-6 py-4 transition-all duration-200 border-b-2 whitespace-nowrap"
                    style={{
                      opacity: activeSection === sec.id ? 1 : 0.7,
                      borderColor: activeSection === sec.id ? 'rgb(var(--ink-rgb) / 0.6)' : 'transparent',
                    }}>
                    {sec.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeSection === 'mentalModel' && (
                  <motion.div key="mm" className="bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className="grid md:grid-cols-2 gap-px grid-hairline">
                      <div className="bg-black p-8 md:p-10">
                        <p className="text-overline text-ink-3 mb-6">Mental model</p>
                        <div className="space-y-0">
                          {fw.mentalModel.map((step, j) => (
                            <div key={j} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <motion.div
                                  className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0"
                                  style={{ borderColor: 'rgb(var(--ink-rgb) / 0.25)', background: 'rgb(var(--ink-rgb) / 0.04)' }}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: j * 0.05 }}
                                >
                                  <span className="text-ink-3" style={{ fontSize: '0.75rem' }}>{j + 1}</span>
                                </motion.div>
                                {j < fw.mentalModel.length - 1 && (
                                  <div className="w-px flex-1 my-1" style={{ background: 'rgb(var(--ink-rgb) / 0.1)', minHeight: '24px' }} />
                                )}
                              </div>
                              <div className="pb-4">
                                <p className="text-ink-2 mb-1" style={{ fontSize: '0.85rem', fontWeight: 400 }}>{step.step}</p>
                                <p className="text-body text-ink-3" style={{ fontSize: '0.8rem' }}>{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-black p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          <p className="text-overline text-ink-3 mb-4">Related frameworks</p>
                          <div className="flex flex-wrap gap-2 mb-10">
                            {fw.related.map(r => (
                              <span key={r} className="tag">{r}</span>
                            ))}
                          </div>
                        </div>
                        {templates[0] && (
                          <div className="border-l-2 border-white border-opacity-15 pl-6">
                            <p className="text-overline text-ink-3 mb-2">Template</p>
                            <a href={templates[0].href} target="_blank" rel="noopener noreferrer"
                              className="text-label text-ink-3 hover:text-white transition-colors">
                              {templates[0].name} ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'decisions' && (
                  <motion.div key="decisions" className="bg-black p-8 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="text-overline text-ink-3 mb-6">Key design decisions</p>
                    <div className="space-y-5 max-w-2xl">
                      {fw.decisions.map((d, j) => (
                        <motion.div key={j} className="flex gap-5"
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}>
                          <span className="text-label text-ink-3 flex-shrink-0 mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                          <p className="text-body text-ink-3">{d}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'pitfalls' && (
                  <motion.div key="pitfalls" className="bg-black p-8 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="text-overline text-ink-3 mb-6">Common pitfalls</p>
                    <div className="space-y-5 max-w-2xl">
                      {fw.pitfalls.map((p, j) => (
                        <motion.div key={j} className="flex gap-5"
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}>
                          <span className="text-faint flex-shrink-0 mt-1" style={{ fontSize: '0.7rem' }}>⚠</span>
                          <p className="text-body text-ink-3">{p}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'toolkit' && (
                  <motion.div key="toolkit" className="bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className={`grid gap-px grid-hairline ${tools.length ? 'md:grid-cols-2' : ''}`}>
                      <div className="bg-black p-8 md:p-10">
                        <p className="text-overline text-ink-3 mb-6">Templates</p>
                        <div className="space-y-4">
                          {templates.map(t => (
                            <a key={t.name} href={t.href} target="_blank" rel="noopener noreferrer"
                              className="block border border-white border-opacity-10 p-5 hover:border-opacity-25 hover:bg-white hover:bg-opacity-[0.02] transition-all duration-200 group">
                              <div className="flex items-center justify-between mb-2">
                                <span className="tag">{t.format}</span>
                                <span className="text-label text-ink-3 group-hover:text-ink-2 transition-colors">Open ↗</span>
                              </div>
                              <p className="text-body text-ink-3">{t.name}</p>
                            </a>
                          ))}
                          {figjamName && (figjamUrl ? (
                            <a href={figjamUrl} target="_blank" rel="noopener noreferrer"
                              className="block border border-white border-opacity-10 p-5 hover:border-opacity-25 hover:bg-white hover:bg-opacity-[0.02] transition-all duration-200 group">
                              <div className="flex items-center justify-between mb-2">
                                <span className="tag">FigJam board</span>
                                <span className="text-label text-ink-3 group-hover:text-ink-2 transition-colors">Open ↗</span>
                              </div>
                              <p className="text-body text-ink-3">{figjamName}</p>
                            </a>
                          ) : (
                            <a href="/contact"
                              onClick={ask({ topic: 'resource', subject: `Request - ${figjamName} (FigJam)`, message: `I would like to request the FigJam board for the ${figjamName}.` })}
                              className="block border border-white border-opacity-10 p-5 hover:border-opacity-25 hover:bg-white hover:bg-opacity-[0.02] transition-all duration-200 group">
                              <div className="flex items-center justify-between mb-2">
                                <span className="tag">FigJam board</span>
                                <span className="text-label text-ink-3 group-hover:text-ink-2 transition-colors">Request</span>
                              </div>
                              <p className="text-body text-ink-3">{figjamName}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                      {tools.length > 0 && (
                        <div className="bg-black p-8 md:p-10">
                          <p className="text-overline text-ink-3 mb-6">Tools for this phase</p>
                          <div className="space-y-6">
                            {tools.map(t => (
                              <div key={t.task}>
                                <p className="text-label text-ink-3 mb-1">{t.task}</p>
                                <p className="text-body text-ink-2" style={{ fontWeight: 400 }}>
                                  {t.primary} <span className="text-ink-3" style={{ fontWeight: 300 }}>· or {t.alt}</span>
                                </p>
                                <p className="text-body text-ink-3 mt-1" style={{ fontSize: '0.85rem' }}>{t.why}</p>
                                <span className="tag mt-2 inline-block">{t.output}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'frameworks', label: 'Frameworks & Toolkit' },
]

export default function AINativeFrameworksPage() {
  const { ask } = useContact()
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { threshold: 0.25 }
    )
    NAV_SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-black min-h-screen">
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
        style={{ scaleX, background: 'rgb(var(--ink-rgb) / 0.3)' }} />

      <DotsNav sections={NAV_SECTIONS} active={activeSection} />

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-20 pt-40 px-6 md:px-12 overflow-hidden">
        <GrainOverlay opacity={0.05} />

        {/* Technical grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="fg" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fg)" />
          </svg>
        </div>

        {/* Back link */}
        <div className="relative z-10 mb-12">
          <Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'AI-Native Frameworks' }]} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p className="text-overline text-ink-3 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            Interactive Playbook · AI-native Experience Design
          </motion.p>

          <motion.h1 className="text-white mb-10"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)', fontWeight: 200, letterSpacing: '-0.045em', lineHeight: 0.98 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            AI-native<br />Frameworks
          </motion.h1>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-ink-3 mb-6"
                style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', fontWeight: 300, lineHeight: 1.65, letterSpacing: '-0.01em' }}>
                The definitive visual playbook for designing intelligent, agentic enterprise experiences. Five frameworks. One connected methodology. Every framework produces a tangible artifact.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#frameworks"
                  className="btn btn-secondary">
                  Explore Frameworks
                </a>
                <a href="/contact" onClick={ask({ topic: 'resource', subject: 'Request - AI-native Design PDF Playbook', message: 'I would like to request the AI-native Design PDF Playbook.' })}
                  className="text-label text-ink-3 hover:text-white transition-colors px-6 py-3">
                  Request PDF Playbook →
                </a>
              </div>
            </motion.div>

            <motion.div className="space-y-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
              {[['5', 'Frameworks in the methodology'], ['3', 'Design principles per framework'], ['4', 'Interactive templates']].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-3">
                  <span className="text-white" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>{v}</span>
                  <span className="text-label text-ink-3">{l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Methodology strip */}
          <motion.div className="mt-16 pt-10 border-t border-white border-opacity-[0.08]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}>
            <p className="text-overline text-ink-3 mb-5">The methodology</p>
            <div className="flex flex-wrap gap-3 items-center">
              {PROCESS_PHASES.map((p, i, arr) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-label text-ink-3">{p.number}</span>
                  <span className="text-body text-ink-3" style={{ fontSize: '0.85rem' }}>{p.title}</span>
                  {i < arr.length - 1 && <span className="text-faint">→</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why AI-native ── */}
      <section className="relative bg-black section-y px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-ink-3 mb-4">AI-native Mindset</p>
              <h2 className="text-heading text-white">The shift that changes everything.</h2>
            </div>
            <p className="text-body text-ink-3 self-end">
              AI-native design is not about adding AI features to existing products. It requires rethinking what the product fundamentally is: what the user's role is, what the system's role is, and how trust is designed rather than assumed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px grid-hairline">
            {[
              {
                era: 'Traditional UX',
                tone: 'text-ink-3',
                primary: 'Interface',
                role: 'User operates',
                challenge: 'Usability',
                metric: 'Task completion',
                design: 'Information architecture',
              },
              {
                era: 'AI-native UX',
                tone: 'text-ink-2',
                primary: 'Intent + Response',
                role: 'User collaborates',
                challenge: 'Trust + Interpretability',
                metric: 'Resolution quality',
                design: 'Intent mapping + Trust design',
              },
              {
                era: 'Agentic UX',
                tone: 'text-white',
                primary: 'Oversight mechanism',
                role: 'User oversees',
                challenge: 'Control + Escalation',
                metric: 'Oversight efficiency',
                design: 'Escalation + Recovery design',
              },
            ].map((col, i) => (
              <motion.div key={col.era} className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-overline text-ink-3 mb-6">{col.era}</p>
                {[
                  ['Primary design object', col.primary],
                  ['User\'s role', col.role],
                  ['Core challenge', col.challenge],
                  ['Key metric', col.metric],
                  ['Core skill', col.design],
                ].map(([label, value]) => (
                  <div key={label} className="mb-4">
                    <p className="text-overline text-ink-3 mb-1">{label}</p>
                    <p className={`text-body ${col.tone}`}>{value}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section id="methodology" className="relative bg-black section-y px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-ink-3 mb-4">The Process</p>
              <h2 className="text-heading text-white">Five phases. One connected journey.</h2>
            </div>
            <p className="text-body text-ink-3 self-end">
              Each phase builds on the previous. Click any phase to expand its outputs, core questions, and template. The phases are always practiced together: never in isolation.
            </p>
          </div>
          <ProcessRoadmap />
        </div>
      </section>

      {/* ── Frameworks ── */}
      <section id="frameworks" className="relative bg-black section-y px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-8">
            <div>
              <p className="text-overline text-ink-3 mb-4">Frameworks &amp; Toolkit</p>
              <h2 className="text-heading text-white">Five frameworks. Five artifacts.</h2>
            </div>
            <p className="text-body text-ink-3 self-end">
              Each framework pairs its thinking with the tools to run it and a template to start from. Open any framework for the mental model, decisions, pitfalls, and toolkit. New to a term? See the <Link to="/resources/ai-native-patterns/glossary" className="text-ink-2 hover:text-white transition-colors underline underline-offset-4">glossary</Link>.
            </p>
          </div>

          {FRAMEWORKS.map((fw, i) => <FrameworkCard key={fw.id} fw={fw} index={i} />)}
          <div className="border-t border-white" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }} />

          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mt-20">
            <div>
              <p className="text-overline text-ink-3 mb-4">Also available</p>
              <p className="text-body text-ink-3">On request. Sent within 48 hours.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-px grid-hairline">
              {ON_REQUEST.map(item => (
                <a key={item.name}
                  href="/contact" onClick={ask({ topic: 'resource', subject: `Request - ${item.name}`, message: `I would like to request ${item.name}.` })}
                  className="bg-black p-6 group hover:bg-white hover:bg-opacity-[0.025] transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <span className="tag">{item.type}</span>
                    <span className="text-label text-ink-3 group-hover:text-white transition-colors">Request</span>
                  </div>
                  <h3 className="text-white mb-2" style={{ fontSize: '1rem', fontWeight: 300, letterSpacing: '-0.01em' }}>{item.name}</h3>
                  <p className="text-body text-ink-3" style={{ fontSize: '0.85rem' }}>{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="relative bg-black py-20 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="text-overline text-ink-3 mb-3">Bring this to your team</p>
            <h2 className="text-heading text-white mb-4">Workshop. Certification. Enterprise course.</h2>
            <p className="text-body text-ink-3 max-w-xl">
              This methodology is available as a full-day workshop, a leadership programme, or an enterprise design capability build. Reach out to discuss.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <a href="/contact" onClick={ask({ topic: 'speaking', subject: 'AI-native Design Workshop enquiry' })}
              className="btn btn-secondary">
              Get in touch →
            </a>
            <Link to="/resources/ai-native-patterns/glossary" className="text-label text-ink-3 hover:text-ink-2 transition-colors text-center py-2">
              AI-native glossary →
            </Link>
            <Link to="/resources" className="text-label text-ink-3 hover:text-ink-2 transition-colors text-center py-2">
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
