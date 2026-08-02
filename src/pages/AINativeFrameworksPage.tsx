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
    artifacts: ['FigJam Canvas', 'PDF Worksheet', 'Prompt Pack'],
    exercise: 'Create five discovery assets from a supplied enterprise brief.',
    color: 'rgba(245,242,237,0.35)',
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
    artifacts: ['Opportunity Matrix', 'Decision Map', 'FigJam Board'],
    exercise: 'Map intelligence opportunities across an enterprise workflow using the Observe → Understand → Reason → Decide → Execute → Coordinate model.',
    color: 'rgba(245,242,237,0.5)',
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
    artifacts: ['Blueprint Template', 'Figma Component', 'PDF Worksheet'],
    exercise: 'Complete an Agent Mission Blueprint for a procurement or HCM use case.',
    color: 'rgba(245,242,237,0.65)',
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
    artifacts: ['Figma Blueprint Template', 'FigJam Swimlane', 'Interaction Spec'],
    exercise: 'Map the human-agent collaboration model for one enterprise workflow end-to-end.',
    color: 'rgba(245,242,237,0.8)',
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
    artifacts: ['Prototype (Figma/Lovable/v0)', 'Review Board', 'Before/After Comparison'],
    exercise: 'Prototype one human-agent interaction end-to-end and run a 5-person usability test.',
    color: 'rgba(245,242,237,0.95)',
  },
]

const FRAMEWORKS = [
  {
    id: 'context-engineering',
    number: '01',
    title: 'Context Engineering',
    tagline: 'Know before you design.',
    challenge: 'Design teams jump into solutioning before building genuine understanding of the business, the work, and the people. The result: technically correct solutions that don\'t fit the actual system they\'re designed for.',
    whyBreaks: 'Traditional UX research focuses on user tasks and pain points. In AI-native design, you need to understand the entire intelligence ecosystem — where data flows, where decisions are made, where automation already exists, and where it fails. Task-level research misses system-level opportunities.',
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
      'Treating context engineering as a one-time activity — it should be ongoing',
      'Focusing only on user pain points and missing system-level intelligence opportunities',
      'Skipping the business model layer — agents that don\'t create business value don\'t get resourced',
    ],
    downloads: ['Industry Brief Template', 'Ecosystem Map Canvas', 'Context Validation Worksheet', 'Discovery Prompt Pack'],
    related: ['Intelligence Opportunity Discovery', 'Agent Mission Blueprint'],
  },
  {
    id: 'intelligence-opportunity',
    number: '02',
    title: 'Intelligence Opportunity Discovery',
    tagline: 'Find where AI creates value, not where it\'s impressive.',
    challenge: 'Organizations want to add AI everywhere. The result is a set of AI features that are technically sophisticated but don\'t meaningfully reduce work or improve decisions. Intelligence opportunity discovery applies a rigorous filter.',
    whyBreaks: 'Traditional feature prioritisation uses user stories and impact/effort matrices. These don\'t capture the specific types of value AI creates — the value of automation, prediction, synthesis, and coordination at scale. A different model is needed.',
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
      'Prioritising impressive AI over valuable AI — automation that saves 30 seconds per day is better than AI that\'s technically impressive but rarely used',
      'Ignoring risk: high-value opportunities with high error costs need more trust design, not less',
      'Missing coordination opportunities — often the biggest value in enterprise AI is orchestration, not individual task automation',
    ],
    downloads: ['Intelligence Opportunity Canvas', 'Prioritisation Matrix', 'Cognitive Task Audit Worksheet', 'Opportunity Scoring Template'],
    related: ['Context Engineering', 'Agent Mission Blueprint'],
  },
  {
    id: 'agent-mission',
    number: '03',
    title: 'Agent Mission Blueprint',
    tagline: 'Define the agent before designing the interface.',
    challenge: 'Teams design agent interfaces before defining what the agent actually is — its mission, its knowledge, its constraints, and its relationship to human authority. The interface becomes the specification. This always produces the wrong thing.',
    whyBreaks: 'UI-first design for agents creates interfaces that make the agent\'s internal complexity visible rather than useful. Without a mission blueprint, the interface reflects how the system works rather than how humans should relate to it.',
    mentalModel: [
      { step: 'Mission', description: 'One sentence that captures what the agent does and why it matters.' },
      { step: 'Capabilities', description: 'What the agent can do. What tools, data, and actions are available to it.' },
      { step: 'Knowledge', description: 'What the agent knows. Domain knowledge, company data, user context.' },
      { step: 'Memory', description: 'What the agent remembers. Session, user, workflow, and institutional memory.' },
      { step: 'Constraints', description: 'What the agent cannot do. Hard limits, compliance boundaries, escalation triggers.' },
      { step: 'Autonomy', description: 'The spectrum from full autonomy to full human control, and where this agent sits.' },
      { step: 'Escalation', description: 'The specific conditions that require human intervention and how they are surfaced.' },
      { step: 'Success Metrics', description: 'How the agent\'s performance is measured. Not just technical metrics — trust and oversight metrics too.' },
    ],
    decisions: [
      'Autonomy level: where on the automation/oversight spectrum should this agent operate?',
      'Escalation design: what are the specific triggers and what does handoff look like?',
      'Memory architecture: what should persist across sessions and what should be scoped to session only?',
    ],
    pitfalls: [
      'Designing for maximum autonomy instead of appropriate autonomy — more autonomy requires more trust design investment',
      'Vague escalation triggers — "when uncertain" is not a trigger, it\'s a placeholder',
      'Missing the collaborating agents dimension — most enterprise agents work in systems, not isolation',
    ],
    downloads: ['Agent Mission Blueprint Template', 'Capability Wheel Template', 'Autonomy Spectrum Worksheet', 'Escalation Design Guide'],
    related: ['Intelligence Opportunity Discovery', 'AI-native Experience Blueprint'],
  },
  {
    id: 'experience-blueprint',
    number: '04',
    title: 'AI-native Experience Blueprint',
    tagline: 'Design the relationship between human judgment and AI autonomy.',
    challenge: 'Most AI product design treats the interface as the product. In AI-native design, the interface is the mechanism for human-agent collaboration. Designing the screens without designing the collaboration model produces an interface that works technically but fails at trust.',
    whyBreaks: 'Traditional interaction design assumes a user who initiates every action and receives feedback. In agentic systems, the agent initiates, acts, and completes — and the user\'s role is oversight. This requires a completely different design vocabulary: oversight, escalation, transparency, and recovery.',
    mentalModel: [
      { step: 'Human Checkpoints', description: 'The specific moments where human judgment is required. Designed, not defaulted.' },
      { step: 'Trust Ladder', description: 'How trust is built progressively as the agent demonstrates reliability in low-stakes situations.' },
      { step: 'Transparency', description: 'What the agent surfaces about its reasoning, and when. Progressive disclosure by default.' },
      { step: 'Escalation', description: 'How exceptions are communicated and acted on. A first-class interaction pattern, not a fallback.' },
      { step: 'Recovery', description: 'What happens when the agent is wrong. Recovery design determines whether trust is maintained.' },
      { step: 'Feedback Loop', description: 'How user corrections are acknowledged and inform future agent behaviour.' },
    ],
    decisions: [
      'Communication hierarchy: what tier does each agent action fall into — log, visible reasoning, or interrupt?',
      'Trust design: how is trust built incrementally vs. assumed from day one?',
      'Recovery design: is error recovery faster and clearer than the error itself?',
    ],
    pitfalls: [
      'Designing oversight as a modal or settings page — oversight must be inline and effortless',
      'Information overload: surfacing all reasoning by default defeats the purpose of automation',
      'Treating recovery as an edge case — recovery interactions have disproportionate impact on long-term trust',
    ],
    downloads: ['Experience Blueprint Template', 'Trust Ladder Diagram', 'Collaboration Swimlane Template', 'Interaction Sequence Kit'],
    related: ['Agent Mission Blueprint', 'Prototype & Validation'],
  },
  {
    id: 'prototype-validation',
    number: '05',
    title: 'Prototype & Validation',
    tagline: 'At this level of maturity, the prototype is the argument.',
    challenge: 'AI-native experiences are hard to specify in static documents. Stakeholders can\'t evaluate an architecture diagram the way they can evaluate an interactive experience. Prototyping is not the end of design — it is the medium of design argument.',
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
      'Prototyping the happy path only — prototype the failure states and escalation paths with equal care',
      'Using the wrong tool for the validation question — static Figma can\'t validate dynamic agentic behaviour',
      'Skipping the review against the Experience Blueprint — the prototype should answer the blueprint\'s questions',
    ],
    downloads: ['Prototype Review Checklist', 'Validation Criteria Template', 'Before/After Comparison Kit', 'Usability Test Script'],
    related: ['AI-native Experience Blueprint', 'Context Engineering'],
  },
]

const TOOL_ORCHESTRATION = [
  { task: 'Industry Research', primary: 'Perplexity', alt: 'ChatGPT Deep Research', why: 'Real-time web synthesis with cited sources', output: 'Industry Brief' },
  { task: 'Document Grounding', primary: 'NotebookLM', alt: 'Claude', why: 'Deep analysis of internal documents and policies', output: 'Research Summary' },
  { task: 'Systems Reasoning', primary: 'Claude', alt: 'ChatGPT', why: 'Multi-step reasoning across complex enterprise systems', output: 'Ecosystem Map' },
  { task: 'Workflow Mapping', primary: 'Miro / FigJam', alt: 'Whimsical', why: 'Visual collaboration for swimlane and journey work', output: 'As-is Journey Map' },
  { task: 'Agent Blueprint', primary: 'Claude + Figma', alt: 'Notion + FigJam', why: 'Reasoning for structure, Figma for visual blueprint', output: 'Agent Mission Blueprint' },
  { task: 'UX Copy & Dialog', primary: 'ChatGPT', alt: 'Claude', why: 'Tone calibration and response architecture design', output: 'Conversation Content' },
  { task: 'Rapid UI Prototyping', primary: 'Figma AI / v0', alt: 'Lovable', why: 'Fastest path from blueprint to testable screens', output: 'Interactive Prototype' },
  { task: 'Production Prototype', primary: 'Lovable', alt: 'Cursor', why: 'Working data, realistic agent behaviour simulation', output: 'Testable Experience' },
]

const DOWNLOADS = [
  { name: 'AI-native Design Playbook', type: 'PDF', description: 'Complete methodology guide — all five frameworks, enterprise examples, and evaluation criteria.' },
  { name: 'Context Engineering Canvas', type: 'FigJam', description: 'Full canvas for the five discovery artifacts: Industry Brief, Ecosystem Map, Personas, Journey, Agent Map.' },
  { name: 'Intelligence Opportunity Canvas', type: 'Figma + FigJam', description: 'The Observe → Decide → Execute model with scoring matrix and prioritisation framework.' },
  { name: 'Agent Mission Blueprint', type: 'Figma', description: 'Complete agent definition template: Mission, Capabilities, Knowledge, Memory, Constraints, Escalation.' },
  { name: 'Experience Blueprint Kit', type: 'Figma', description: 'Trust ladder, collaboration swimlanes, escalation design patterns, and interaction sequence template.' },
  { name: 'Prompt Library', type: 'Notion / PDF', description: 'Curated prompt pack for each phase: research, synthesis, blueprint creation, and validation.' },
  { name: 'Prototype Review Kit', type: 'PDF + Figma', description: 'Checklist, validation criteria, before/after comparison template, and usability test script.' },
  { name: 'Framework Poster Pack', type: 'PDF', description: 'A3/A1 poster for each framework — for studio walls and workshop rooms.' },
]

const GLOSSARY = [
  { term: 'Context Engineering', definition: 'The discipline of building shared understanding of industry, business, users, and workflows before any design work begins. The foundation of AI-native methodology.', model: 'Industry → Business → Ecosystem → Users → Intelligence Opportunities', related: ['Intelligence Mapping', 'Ecosystem Design'] },
  { term: 'Intelligence Opportunity', definition: 'A specific point in a workflow where AI can create measurable value by observing, understanding, reasoning, deciding, executing, or coordinating — and where the cost/risk of AI involvement is justified.', model: 'Value × Feasibility × Trust Cost = Priority Score', related: ['Agent Mission', 'Cognitive Automation'] },
  { term: 'Agent Mission Blueprint', definition: 'A design artifact that fully specifies an enterprise AI agent before any interface design: mission, capabilities, knowledge, memory, constraints, autonomy level, escalation model, and success metrics.', model: 'Mission + Capabilities + Constraints + Escalation = Blueprint', related: ['Experience Blueprint', 'Agentic UX'] },
  { term: 'Human Checkpoint', definition: 'A designed moment in an agentic workflow where human judgment is required before the agent proceeds. Not a fallback — a first-class interaction pattern that must be designed with the same care as any primary flow.', model: 'Agent Action → Checkpoint → Human Review → Proceed/Modify/Reject', related: ['Escalation Design', 'Trust Design'] },
  { term: 'Trust Ladder', definition: 'A framework for building user trust in AI systems progressively — starting with low-stakes, observable actions and expanding autonomy as the system demonstrates reliability.', model: 'Low stakes + Visible → Medium stakes + Explained → High stakes + Autonomous', related: ['Graceful Uncertainty', 'Confidence Surfacing'] },
  { term: 'Communication Hierarchy', definition: 'The designed system for categorising agent communications by the attention they require: Tier 1 (log — no action needed), Tier 2 (reasoning visible — action available), Tier 3 (escalation — action required).', model: 'Log → Visible reasoning → Interrupt', related: ['Agent Mission Blueprint', 'Escalation Design'] },
  { term: 'AI-native Experience Blueprint', definition: 'A design document that specifies the human-agent collaboration model: human checkpoints, trust mechanisms, transparency approach, escalation design, recovery experience, and feedback loops.', model: 'Collaboration + Trust + Transparency + Recovery = Experience Blueprint', related: ['Agent Mission Blueprint', 'Prototype'] },
  { term: 'Cognitive Automation', definition: 'Automation that replaces human cognitive work — not just mechanical repetition but judgment, synthesis, and decision-making within defined parameters.', model: 'Defined boundaries + Sufficient data + Clear escalation = Automatable cognitive task', related: ['Intelligence Opportunity', 'Agent Mission'] },
  { term: 'Graceful Uncertainty', definition: 'The design principle that AI systems should surface their confidence levels explicitly rather than presenting uncertain results with the same weight as certain ones. Honest uncertainty builds more trust than false confidence.', model: 'High confidence → Act · Medium → Surface reasoning · Low → Escalate', related: ['Trust Design', 'Communication Hierarchy'] },
  { term: 'Recovery Design', definition: 'The intentional design of what happens when an AI system makes an error. Recovery design is a primary trust mechanism — users forgive errors; they do not forgive bad recovery.', model: 'Error → Acknowledge → Correct → Learn → Signal', related: ['Trust Ladder', 'Escalation Design'] },
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
                  borderColor: active === phase.id ? phase.color : 'rgba(245,242,237,0.18)',
                  background: active === phase.id ? 'rgba(245,242,237,0.08)' : '#0C0C0B',
                }}
              >
                <span className="text-label text-white" style={{ opacity: active === phase.id ? 0.9 : 0.4 }}>{phase.number}</span>
              </div>
              <p className="text-center text-white" style={{ fontSize: '0.7rem', fontWeight: 400, opacity: active === phase.id ? 0.85 : 0.4, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {phase.title}
              </p>
            </motion.button>

            {/* Arrow connector */}
            {i < PROCESS_PHASES.length - 1 && (
              <motion.div className="w-8 flex-shrink-0 flex items-center justify-center -mt-8"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6 L18 6 M14 2 L20 6 L14 10" stroke="rgba(245,242,237,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
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
              <div className="grid md:grid-cols-4 gap-px bg-white bg-opacity-[0.06]">
                <div className="bg-black p-8 md:col-span-1">
                  <p className="text-overline text-white opacity-25 mb-3">Purpose</p>
                  <p className="text-body text-white opacity-65 mb-8">{phase.purpose}</p>
                  <p className="text-overline text-white opacity-25 mb-3">Practice exercise</p>
                  <p className="text-body text-white opacity-45 italic">{phase.exercise}</p>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Core questions</p>
                  <ul className="space-y-3">
                    {phase.questions.map((q, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-white opacity-20 flex-shrink-0 mt-1.5" style={{ fontSize: '0.4rem' }}>◆</span>
                        <p className="text-body text-white opacity-50">{q}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Outputs</p>
                  <ul className="space-y-2 mb-8">
                    {phase.outputs.map(o => (
                      <li key={o} className="flex gap-3">
                        <span className="text-white opacity-20 flex-shrink-0 mt-1.5" style={{ fontSize: '0.4rem' }}>◆</span>
                        <p className="text-label text-white opacity-55">{o}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Downloads</p>
                  <ul className="space-y-2">
                    {phase.artifacts.map(a => (
                      <li key={a} className="flex items-center gap-3">
                        <span className="text-white opacity-15 text-xs">↓</span>
                        <a href={`mailto:uxbyamit@gmail.com?subject=Request - ${a}`}
                          className="text-label text-white opacity-40 hover:opacity-80 transition-opacity">{a}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Mobile list */}
      <div className="md:hidden">
        {PROCESS_PHASES.map((phase, i) => (
          <motion.div key={phase.id} className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
            <button className="w-full text-left py-6 flex items-center justify-between gap-4"
              onClick={() => setActive(active === phase.id ? null : phase.id)}>
              <div className="flex items-center gap-4">
                <span className="text-label text-white opacity-25 w-6">{phase.number}</span>
                <div>
                  <p className="text-body text-white opacity-70">{phase.title}</p>
                  <p className="text-label text-white opacity-30 mt-0.5">{phase.purpose}</p>
                </div>
              </div>
              <span className="text-white opacity-25 transition-transform duration-300"
                style={{ transform: active === phase.id ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            <AnimatePresence>
              {active === phase.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                  <div className="pb-6 space-y-4">
                    <p className="text-body text-white opacity-50">{phase.purpose}</p>
                    <p className="text-body text-white opacity-40 italic text-sm">{phase.exercise}</p>
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
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('mentalModel')

  const sections = [
    { id: 'mentalModel', label: 'Mental Model' },
    { id: 'decisions', label: 'Design Decisions' },
    { id: 'pitfalls', label: 'Common Pitfalls' },
    { id: 'downloads', label: 'Downloads' },
  ]

  return (
    <motion.article
      className="border-t border-white"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      {/* Header — always visible */}
      <button className="w-full text-left py-12 group flex items-start justify-between gap-8"
        onClick={() => setOpen(o => !o)}>
        <div className="flex items-start gap-8 flex-1">
          <span className="text-label text-white opacity-20 flex-shrink-0 mt-1">{fw.number}</span>
          <div className="flex-1">
            <h3 className="text-white mb-2 group-hover:opacity-80 transition-opacity"
              style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              {fw.title}
            </h3>
            <p className="text-body text-white opacity-35">{fw.tagline}</p>

            {/* Challenge preview */}
            {!open && (
              <p className="text-body text-white opacity-30 mt-4 max-w-2xl line-clamp-2" style={{ fontSize: '0.9rem' }}>
                {fw.challenge}
              </p>
            )}
          </div>
        </div>
        <span className="text-white opacity-30 flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.4rem' }}>+</span>
      </button>

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
              <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05] mb-px">
                <div className="bg-black p-8 md:p-10">
                  <p className="text-overline text-white opacity-25 mb-4">The challenge</p>
                  <p className="text-body text-white opacity-60">{fw.challenge}</p>
                </div>
                <div className="bg-black p-8 md:p-10">
                  <p className="text-overline text-white opacity-25 mb-4">Why traditional UX breaks here</p>
                  <p className="text-body text-white opacity-55">{fw.whyBreaks}</p>
                </div>
              </div>

              {/* Section tabs */}
              <div className="flex gap-0 border-b border-white border-opacity-[0.08] mb-0">
                {sections.map(s => (
                  <button key={s.id} onClick={() => setActiveSection(s.id)}
                    className="text-label text-white px-6 py-4 transition-all duration-200 border-b-2"
                    style={{
                      opacity: activeSection === s.id ? 0.85 : 0.3,
                      borderColor: activeSection === s.id ? 'rgba(245,242,237,0.6)' : 'transparent',
                    }}>
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Mental Model */}
              <AnimatePresence mode="wait">
                {activeSection === 'mentalModel' && (
                  <motion.div key="mm" className="bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05]">
                      {/* Left: visual flow */}
                      <div className="bg-black p-8 md:p-10">
                        <p className="text-overline text-white opacity-25 mb-6">Mental model</p>
                        <div className="space-y-0">
                          {fw.mentalModel.map((step, j) => (
                            <div key={j} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <motion.div
                                  className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0"
                                  style={{ borderColor: 'rgba(245,242,237,0.25)', background: 'rgba(245,242,237,0.04)' }}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: j * 0.05 }}
                                >
                                  <span className="text-white opacity-50" style={{ fontSize: '0.55rem' }}>{j + 1}</span>
                                </motion.div>
                                {j < fw.mentalModel.length - 1 && (
                                  <div className="w-px flex-1 my-1" style={{ background: 'rgba(245,242,237,0.1)', minHeight: '24px' }} />
                                )}
                              </div>
                              <div className="pb-4">
                                <p className="text-white mb-1" style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.75 }}>{step.step}</p>
                                <p className="text-body text-white opacity-40" style={{ fontSize: '0.8rem' }}>{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Right: exercise */}
                      <div className="bg-black p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          <p className="text-overline text-white opacity-25 mb-4">Related frameworks</p>
                          <div className="flex flex-wrap gap-2 mb-10">
                            {fw.related.map(r => (
                              <span key={r} className="text-label text-white border border-white border-opacity-15 px-3 py-1.5 opacity-50">{r}</span>
                            ))}
                          </div>
                        </div>
                        <div className="border-l-2 border-white border-opacity-15 pl-6">
                          <p className="text-overline text-white opacity-25 mb-2">Visual artifacts</p>
                          {fw.downloads.slice(0, 2).map(d => (
                            <p key={d} className="text-label text-white opacity-35 mb-1">{d}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'decisions' && (
                  <motion.div key="decisions" className="bg-black p-8 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="text-overline text-white opacity-25 mb-6">Key design decisions</p>
                    <div className="space-y-5 max-w-2xl">
                      {fw.decisions.map((d, j) => (
                        <motion.div key={j} className="flex gap-5"
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}>
                          <span className="text-label text-white opacity-20 flex-shrink-0 mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                          <p className="text-body text-white opacity-60">{d}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'pitfalls' && (
                  <motion.div key="pitfalls" className="bg-black p-8 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="text-overline text-white opacity-25 mb-6">Common pitfalls</p>
                    <div className="space-y-5 max-w-2xl">
                      {fw.pitfalls.map((p, j) => (
                        <motion.div key={j} className="flex gap-5"
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}>
                          <span className="text-white opacity-30 flex-shrink-0 mt-1" style={{ fontSize: '0.7rem' }}>⚠</span>
                          <p className="text-body text-white opacity-55">{p}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'downloads' && (
                  <motion.div key="downloads" className="bg-black p-8 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="text-overline text-white opacity-25 mb-6">Downloads for this framework</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {fw.downloads.map((d, j) => (
                        <motion.a key={j}
                          href={`mailto:uxbyamit@gmail.com?subject=Request - ${d}&body=Hi Amit,%0A%0AI'd like to request the ${d}.%0A%0AName:%0ARole:%0AOrganisation:`}
                          className="border border-white border-opacity-10 p-5 hover:border-opacity-25 hover:bg-white hover:bg-opacity-[0.02] transition-all duration-200 group"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.06 }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white opacity-25 text-xs">↓</span>
                            <span className="text-label text-white opacity-20 group-hover:opacity-40 transition-opacity">Request</span>
                          </div>
                          <p className="text-body text-white opacity-55">{d}</p>
                        </motion.a>
                      ))}
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

function GlossaryEntry({ entry, index }: { entry: typeof GLOSSARY[0], index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div className="border-b border-white" style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}>
      <button className="w-full text-left py-7 flex items-start justify-between gap-6 group" onClick={() => setOpen(o => !o)}>
        <div>
          <span className="text-white group-hover:opacity-75 transition-opacity"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>{entry.term}</span>
          {!open && <p className="text-label text-white opacity-25 mt-1.5 line-clamp-1">{entry.definition}</p>}
        </div>
        <span className="text-white opacity-20 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.1rem' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div className="pb-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-5">
                <div>
                  <p className="text-overline text-white opacity-20 mb-2">Definition</p>
                  <p className="text-body text-white opacity-60">{entry.definition}</p>
                </div>
                <div>
                  <p className="text-overline text-white opacity-20 mb-2">Mental model</p>
                  <p className="text-white opacity-40 font-mono" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>{entry.model}</p>
                </div>
              </div>
              <div>
                <p className="text-overline text-white opacity-20 mb-3">Related concepts</p>
                <div className="flex flex-wrap gap-2">
                  {entry.related.map(r => (
                    <span key={r} className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-45">{r}</span>
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

// ── Main page ─────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'tools', label: 'Tool Orchestration' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'glossary', label: 'Glossary' },
]

export default function AINativeFrameworksPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [glossarySearch, setGlossarySearch] = useState('')
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

  const filteredGlossary = GLOSSARY.filter(e =>
    !glossarySearch || e.term.toLowerCase().includes(glossarySearch.toLowerCase()) || e.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  )

  return (
    <div className="bg-black min-h-screen">
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
        style={{ scaleX, background: 'rgba(245,242,237,0.3)' }} />

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
          <Link to="/resources" className="text-label text-white opacity-25 hover:opacity-60 transition-opacity inline-flex items-center gap-2">← Resources</Link>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p className="text-overline text-white opacity-30 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 0.6 }}>
            Interactive Playbook · AI-native Experience Design
          </motion.p>

          <motion.h1 className="text-white mb-10"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)', fontWeight: 200, letterSpacing: '-0.045em', lineHeight: 0.98 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            AI-native<br />Frameworks
          </motion.h1>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-white opacity-55 mb-6"
                style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', fontWeight: 300, lineHeight: 1.65, letterSpacing: '-0.01em' }}>
                The definitive visual playbook for designing intelligent, agentic enterprise experiences. Five frameworks. One connected methodology. Every framework produces a tangible artifact.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#frameworks"
                  className="text-label text-white border border-white border-opacity-35 px-6 py-3 hover:border-opacity-70 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200">
                  Explore Frameworks
                </a>
                <a href={`mailto:uxbyamit@gmail.com?subject=Request - AI-native Design PDF Playbook`}
                  className="text-label text-white opacity-40 hover:opacity-80 transition-opacity px-6 py-3">
                  Request PDF Playbook →
                </a>
              </div>
            </motion.div>

            <motion.div className="space-y-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
              {[['5', 'Frameworks in the methodology'], ['3', 'Design principles per framework'], ['10+', 'Downloads available']].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-3">
                  <span className="text-white" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>{v}</span>
                  <span className="text-label text-white opacity-28">{l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Methodology strip */}
          <motion.div className="mt-16 pt-10 border-t border-white border-opacity-[0.08]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}>
            <p className="text-overline text-white opacity-20 mb-5">The methodology</p>
            <div className="flex flex-wrap gap-3 items-center">
              {PROCESS_PHASES.map((p, i, arr) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-label text-white opacity-30">{p.number}</span>
                  <span className="text-body text-white opacity-40" style={{ fontSize: '0.85rem' }}>{p.title}</span>
                  {i < arr.length - 1 && <span className="text-white opacity-15">→</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why AI-native ── */}
      <section className="relative bg-black py-24 md:py-28 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">AI-native Mindset</p>
              <h2 className="text-heading text-white">The shift that changes everything.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              AI-native design is not about adding AI features to existing products. It requires rethinking what the product fundamentally is — what the user's role is, what the system's role is, and how trust is designed rather than assumed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.06]">
            {[
              {
                era: 'Traditional UX',
                opacity: '0.35',
                primary: 'Interface',
                role: 'User operates',
                challenge: 'Usability',
                metric: 'Task completion',
                design: 'Information architecture',
              },
              {
                era: 'AI-native UX',
                opacity: '0.60',
                primary: 'Intent + Response',
                role: 'User collaborates',
                challenge: 'Trust + Interpretability',
                metric: 'Resolution quality',
                design: 'Intent mapping + Trust design',
              },
              {
                era: 'Agentic UX',
                opacity: '0.90',
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
                <p className="text-overline text-white mb-6" style={{ opacity: parseFloat(col.opacity) * 0.55 }}>{col.era}</p>
                {[
                  ['Primary design object', col.primary],
                  ['User\'s role', col.role],
                  ['Core challenge', col.challenge],
                  ['Key metric', col.metric],
                  ['Core skill', col.design],
                ].map(([label, value]) => (
                  <div key={label} className="mb-4">
                    <p className="text-overline text-white opacity-20 mb-1">{label}</p>
                    <p className="text-body text-white" style={{ opacity: parseFloat(col.opacity) * 0.65 }}>{value}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section id="methodology" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">The Process</p>
              <h2 className="text-heading text-white">Five phases. One connected journey.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Each phase builds on the previous. Click any phase to expand outputs, core questions, and downloads. The phases are always practiced together — never in isolation.
            </p>
          </div>
          <ProcessRoadmap />
        </div>
      </section>

      {/* ── Frameworks ── */}
      <section id="frameworks" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-8">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Framework Library</p>
              <h2 className="text-heading text-white">Five frameworks. Five artifacts.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Every framework follows the same structure: Challenge → Why existing UX breaks → Mental model → Design decisions → Common pitfalls → Downloads. Click to expand any framework.
            </p>
          </div>

          {FRAMEWORKS.map((fw, i) => <FrameworkCard key={fw.id} fw={fw} index={i} />)}
          <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ── Tool Orchestration ── */}
      <section id="tools" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Tool Orchestration</p>
              <h2 className="text-heading text-white">The right tool for each thinking task.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Not a directory of AI tools. A map of cognitive tasks — and which tools are best suited to each one. The choice of tool is a design decision, not a personal preference.
            </p>
          </div>

          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b border-white border-opacity-[0.08]">
                  {['Thinking Task', 'Primary Tool', 'Alternative', 'Why', 'Output'].map(h => (
                    <th key={h} className="text-left text-overline text-white opacity-25 pb-5 pr-8 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOOL_ORCHESTRATION.map((row, i) => (
                  <motion.tr key={row.task} className="border-b border-white"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}>
                    <td className="py-5 pr-8"><p className="text-body text-white opacity-60">{row.task}</p></td>
                    <td className="py-5 pr-8"><p className="text-body text-white opacity-80" style={{ fontWeight: 400 }}>{row.primary}</p></td>
                    <td className="py-5 pr-8"><p className="text-body text-white opacity-40">{row.alt}</p></td>
                    <td className="py-5 pr-8"><p className="text-body text-white opacity-35" style={{ fontSize: '0.85rem' }}>{row.why}</p></td>
                    <td className="py-5">
                      <span className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-50">{row.output}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Downloads ── */}
      <section id="downloads" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Downloads</p>
              <h2 className="text-heading text-white">Everything downloadable.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Frameworks, canvases, templates, and prompt packs — all designed to be used immediately on real enterprise projects. Request any asset and it will be sent within 48 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05]">
            {DOWNLOADS.map((dl, i) => (
              <motion.a key={dl.name}
                href={`mailto:uxbyamit@gmail.com?subject=Request - ${dl.name}&body=Hi Amit,%0A%0AI'd like to request: ${dl.name}.%0A%0AName:%0ARole:%0AOrganisation:`}
                className="bg-black p-8 md:p-10 group hover:bg-white hover:bg-opacity-[0.025] transition-colors duration-200"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-45">{dl.type}</span>
                  <span className="text-white opacity-20 group-hover:opacity-50 transition-opacity">↓</span>
                </div>
                <h3 className="text-white mb-3" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                  {dl.name}
                </h3>
                <p className="text-body text-white opacity-40">{dl.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glossary ── */}
      <section id="glossary" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-12">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Glossary</p>
              <h2 className="text-heading text-white">Terms for practitioners, not academics.</h2>
            </div>
            <div className="self-end">
              <p className="text-body text-white opacity-45 mb-6">
                Every entry includes a definition, a visual mental model, and related concepts. Click to expand.
              </p>
              <input
                type="text"
                placeholder="Search glossary..."
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                className="w-full bg-transparent border border-white border-opacity-20 px-5 py-3 text-body text-white placeholder-white focus:border-opacity-50 focus:outline-none transition-all duration-200"
                style={{ opacity: glossarySearch ? 1 : 0.6 }}
              />
            </div>
          </div>

          <div>
            {filteredGlossary.map((entry, i) => <GlossaryEntry key={entry.term} entry={entry} index={i} />)}
            {filteredGlossary.length === 0 && (
              <p className="text-body text-white opacity-25 py-12 text-center">No terms matching "{glossarySearch}"</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="relative bg-black py-20 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="text-overline text-white opacity-25 mb-3">Bring this to your team</p>
            <h2 className="text-heading text-white mb-4">Workshop. Certification. Enterprise course.</h2>
            <p className="text-body text-white opacity-40 max-w-xl">
              This methodology is available as a full-day workshop, a leadership programme, or an enterprise design capability build. Reach out to discuss.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <a href="mailto:uxbyamit@gmail.com?subject=AI-native Design Workshop Enquiry"
              className="text-label text-white border border-white border-opacity-30 px-8 py-4 hover:border-opacity-70 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200">
              Get in touch →
            </a>
            <Link to="/resources" className="text-label text-white opacity-25 hover:opacity-55 transition-opacity text-center py-2">
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
