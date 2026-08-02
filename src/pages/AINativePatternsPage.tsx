import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
import DotsNav from '../components/ui/DotsNav'

// ── Data ──────────────────────────────────────────────────────────────────────

const METHODOLOGY = [
  {
    id: 'context',
    number: '01',
    title: 'Context Engineering',
    tagline: 'Know before you design',
    objective: 'Build deep understanding of the industry, business, users, and existing workflows before touching any design artifact.',
    artifacts: ['Industry Intelligence Brief', 'Business Discovery Map', 'Ecosystem Map', 'User & Work Intelligence Report'],
    tools: ['Perplexity', 'ChatGPT Deep Research', 'Miro', 'Notion'],
    activities: ['Industry research', 'Stakeholder interviews', 'Workflow observation', 'Ecosystem mapping'],
  },
  {
    id: 'opportunity',
    number: '02',
    title: 'Intelligence Opportunity Discovery',
    tagline: 'Find where intelligence creates value',
    objective: 'Map where AI can Observe, Understand, Reason, Decide, Execute, or Coordinate — and identify the highest-value intervention points.',
    artifacts: ['Intelligence Opportunity Canvas', 'Agent Opportunity Map', 'Priority Matrix'],
    tools: ['FigJam', 'Miro', 'Claude'],
    activities: ['Workflow analysis', 'Opportunity scoring', 'Feasibility assessment', 'Value mapping'],
  },
  {
    id: 'blueprint',
    number: '03',
    title: 'Agent Mission Blueprint',
    tagline: 'Define what the agent is and is not',
    objective: 'Design the agent\'s mission, capabilities, knowledge, memory, constraints, escalation model, and success metrics — before any UI.',
    artifacts: ['Agent Mission Blueprint', 'Capability Map', 'Guardrails Definition', 'Escalation Model'],
    tools: ['Figma', 'FigJam', 'Notion'],
    activities: ['Mission definition', 'Capability scoping', 'Constraint design', 'Success metric definition'],
  },
  {
    id: 'experience',
    number: '04',
    title: 'AI-native Experience Blueprint',
    tagline: 'Design the human-agent relationship',
    objective: 'Design how humans and agents collaborate — trust mechanisms, transparency, decision handoffs, exceptions, recovery, and feedback loops.',
    artifacts: ['Human-Agent Collaboration Map', 'Trust Design Spec', 'Exception Handling Flows', 'Notification Architecture'],
    tools: ['Figma', 'FigJam', 'Principle'],
    activities: ['Collaboration mapping', 'Trust pattern selection', 'Exception design', 'Conversation flow design'],
  },
  {
    id: 'prototype',
    number: '05',
    title: 'Prototype',
    tagline: 'Build the argument fast',
    objective: 'Use AI-accelerated tools to build interactive prototypes that demonstrate the human-agent experience — not wireframes, working prototypes.',
    artifacts: ['Interactive Prototype', 'Conversation Prototype', 'Agent Dashboard Prototype'],
    tools: ['Figma', 'Lovable', 'Cursor', 'v0'],
    activities: ['Rapid prototyping', 'Conversation testing', 'Stakeholder validation', 'Usability testing'],
  },
  {
    id: 'evaluate',
    number: '06',
    title: 'Evaluate',
    tagline: 'Measure what actually matters',
    objective: 'Evaluate against AI-native metrics — not traditional UX metrics. Task completion, containment, trust scores, exception handling quality.',
    artifacts: ['AI-native Evaluation Report', 'Trust Score Baseline', 'Iteration Plan'],
    tools: ['Maze', 'UserTesting', 'Fullstory'],
    activities: ['Usability testing', 'Trust evaluation', 'Metric baselining', 'Failure analysis'],
  },
]

const FOUNDATIONS = [
  {
    dimension: 'Primary design object',
    traditional: 'Screen / Interface',
    aiNative: 'Decision / Action',
    agentic: 'Autonomous workflow',
  },
  {
    dimension: 'User\'s role',
    traditional: 'Operator',
    aiNative: 'Collaborator',
    agentic: 'Overseer',
  },
  {
    dimension: 'System behaviour',
    traditional: 'Responds to input',
    aiNative: 'Understands intent',
    agentic: 'Acts independently',
  },
  {
    dimension: 'Key design challenge',
    traditional: 'Usability',
    aiNative: 'Trust + interpretability',
    agentic: 'Oversight + control',
  },
  {
    dimension: 'Failure mode',
    traditional: 'Confusing UI',
    aiNative: 'Wrong inference',
    agentic: 'Undetected wrong action',
  },
  {
    dimension: 'Success metric',
    traditional: 'Task completion rate',
    aiNative: 'Resolution quality',
    agentic: 'Oversight efficiency',
  },
  {
    dimension: 'Core design skill',
    traditional: 'Information architecture',
    aiNative: 'Intent mapping',
    agentic: 'Escalation design',
  },
]

const PATTERNS = [
  {
    id: 'intent-recognition',
    name: 'Intent Recognition',
    category: 'Conversation',
    origin: 'Engaze',
    problem: 'Users phrase the same need in dozens of different ways. Systems that match keywords fail. Systems that understand intent succeed.',
    when: 'Any conversational interface where users ask questions in natural language',
    whenNot: 'Simple command-based interfaces where users select from fixed options',
    principle: 'Design for what users mean, not what they say.',
    anatomy: [
      { part: 'Intent taxonomy', description: 'A defined map of all user intent categories — not individual utterances, categories of meaning.' },
      { part: 'Intent indicators', description: 'The contextual signals that disambiguate similar intents: prior session, user role, current workflow state.' },
      { part: 'Confidence threshold', description: 'The minimum confidence level before the system acts. Below threshold: ask for clarification. Above: proceed.' },
    ],
    enterprise: 'Engaze: "How many days off do I have?" → intent mapped to leave balance query, not generic FAQ lookup.',
    accessibility: 'Provide explicit intent confirmation for low-confidence matches. Never silently assume.',
  },
  {
    id: 'graceful-uncertainty',
    name: 'Graceful Uncertainty',
    category: 'Trust',
    origin: 'SAP AI Search',
    problem: 'AI systems present low-confidence results with the same visual weight as high-confidence results. Users act on uncertain information.',
    when: 'Any AI-surfaced result, recommendation, or answer that has variable confidence',
    whenNot: 'Binary operations where the system is certain (confirmed actions, error states)',
    principle: 'Honest uncertainty builds more trust than false confidence.',
    anatomy: [
      { part: 'Confidence indicator', description: 'Visual signal of result confidence — not percentages, but clear high/medium/low distinction.' },
      { part: 'Reasoning surface', description: 'On-demand explanation of why this result was surfaced. Available but not default.' },
      { part: 'Correction affordance', description: 'One-tap path to correct or refine the result. Always visible on uncertain results.' },
    ],
    enterprise: 'SAP AI Search: high-confidence results appear with full visual weight; low-confidence with a "Based on limited context" label and refine option.',
    accessibility: 'Confidence indicators must work without color. Use iconography and text labels, not color alone.',
  },
  {
    id: 'progressive-reasoning',
    name: 'Progressive Reasoning Disclosure',
    category: 'Transparency',
    origin: 'SAP Agentic AI',
    problem: 'Showing all AI reasoning by default creates information overload. Hiding all reasoning destroys trust. The calibration is the design problem.',
    when: 'Agentic systems where users oversee autonomous actions',
    whenNot: 'Simple one-shot responses where the reasoning is self-evident',
    principle: 'Show the outcome. Surface the reasoning only when it matters.',
    anatomy: [
      { part: 'Default state', description: 'Outcome only. What did the agent do / decide? Clean, scannable.' },
      { part: 'Reasoning layer', description: 'Available on demand via expand/tap. Why did the agent do this?' },
      { part: 'Audit layer', description: 'Full trace for compliance and debugging. Available but not surfaced in normal use.' },
    ],
    enterprise: 'SAP Order Confirmation Agent: completed orders shown as log entries. Unusual orders surface reasoning inline. Escalations interrupt with full context.',
    accessibility: 'All reasoning layers must be keyboard accessible. Expansion should not trap focus.',
  },
  {
    id: 'human-override',
    name: 'Human Override as First-Class Interaction',
    category: 'Autonomy',
    origin: 'SAP Agentic AI',
    problem: 'Override mechanisms are treated as edge cases — buried in settings or available only through undo. This makes users distrust autonomous systems.',
    when: 'Any agentic or autonomous system where the AI acts on behalf of users',
    whenNot: 'Fully manual systems where the user controls every step',
    principle: 'Override is not failure. Override is the trust mechanism.',
    anatomy: [
      { part: 'Inline override', description: 'Present on every agent action. Not hidden in a menu. One action to review, modify, or reject.' },
      { part: 'Override confirmation', description: 'A lightweight confirmation that the human change has been recorded — not a warning dialog.' },
      { part: 'Learning signal', description: 'Optional: notify that this override will improve future agent behaviour. Builds trust in the system\'s growth.' },
    ],
    enterprise: 'SAP Order Confirmation: every matched order has a visible "Modify" action. No hunting. No drilling into settings.',
    accessibility: 'Override actions must be reachable via keyboard shortcut. Critical for power users managing high volumes.',
  },
  {
    id: 'communication-hierarchy',
    name: 'Agent Communication Hierarchy',
    category: 'Agent Collaboration',
    origin: 'SAP Agentic AI',
    problem: 'Agents that communicate everything create alert fatigue. Agents that communicate nothing create distrust. The hierarchy is the design.',
    when: 'Any system where an agent takes multiple autonomous actions and the user oversees them',
    whenNot: 'Single-action systems where every action requires explicit approval',
    principle: 'Not all agent actions deserve the same attention. Design for the appropriate attention level.',
    anatomy: [
      { part: 'Tier 1 — Log', description: 'High-confidence completed actions. Scannable log format. No attention required.' },
      { part: 'Tier 2 — Visible reasoning', description: 'Boundary decisions. Inline reasoning. Action available but not required.' },
      { part: 'Tier 3 — Interrupt', description: 'Escalations requiring human judgment. Full context upfront. Action required to continue.' },
    ],
    enterprise: 'SAP Order Confirmation: 94% of orders flow through Tier 1. 5% surface as Tier 2 with reasoning. 1% escalate as Tier 3 interrupts.',
    accessibility: 'Tier 3 interrupts must use ARIA live regions. They are genuinely urgent and must not be missable.',
  },
  {
    id: 'failure-grammar',
    name: 'Failure Grammar',
    category: 'Conversation',
    origin: 'Engaze',
    problem: 'Most conversational AI designs failure states as dead ends — "I can\'t help with that." These are the moments that break trust permanently.',
    when: 'Any conversational system where the AI might not have an answer or misunderstands intent',
    whenNot: 'Deterministic systems where every input maps to a known output',
    principle: 'How a system handles not knowing is what users remember.',
    anatomy: [
      { part: 'Acknowledgment', description: 'Explicit acknowledgment that the system doesn\'t know or couldn\'t complete the task.' },
      { part: 'Path forward', description: 'A concrete next step. Who to contact, what to try, or how to rephrase.' },
      { part: 'Graceful exit', description: 'A clean way to leave the conversation without frustration. No trapped states.' },
    ],
    enterprise: 'Engaze: "I don\'t have that information — but [Name] in HR does. Here\'s how to reach them directly." Never a dead end.',
    accessibility: 'Failure states must be announced to screen readers. Ensure error messages describe both the problem and the solution.',
  },
  {
    id: 'continuity-memory',
    name: 'Continuity Memory',
    category: 'Memory',
    origin: 'Engaze',
    problem: 'Returning users are treated as strangers. The system forgets context, progress, and prior interactions — adding friction on every return.',
    when: 'Any conversational or agentic system with repeat users and multi-session workflows',
    whenNot: 'Anonymous or one-off interactions where identity cannot be established',
    principle: 'Memory is trust. Amnesia is friction.',
    anatomy: [
      { part: 'Session context', description: 'What was established in the current session. Always available to the response layer.' },
      { part: 'User preferences', description: 'Inferred and explicit preferences that persist across sessions.' },
      { part: 'Progress state', description: 'For multi-step workflows: where the user was when they left. Resume, don\'t restart.' },
    ],
    enterprise: 'Engaze: returning to an incomplete approval flow — "Welcome back — you were reviewing step 3 of 5 for [Request Name]."',
    accessibility: 'Memory state should be surfaced in text, not just visual state. Screen reader users need to know what was remembered.',
  },
  {
    id: 'source-attribution',
    name: 'Source Attribution',
    category: 'Trust',
    origin: 'SAP AI Search',
    problem: 'AI-surfaced information has no source. Users in enterprise contexts cannot act on unverifiable information.',
    when: 'Any system where the AI surfaces factual information, policy, or data from underlying systems',
    whenNot: 'Creative or generative outputs where source attribution is not meaningful',
    principle: 'Anonymous information is unverifiable information.',
    anatomy: [
      { part: 'Source label', description: 'What system or document the information came from. Visible on the result.' },
      { part: 'Freshness signal', description: 'When was this information last updated? Critical for policy and compliance contexts.' },
      { part: 'Source link', description: 'Where possible, a direct link to the source for verification.' },
    ],
    enterprise: 'SAP AI Search: "Based on your HR policy document (last updated March 2024)" — shown below every policy answer.',
    accessibility: 'Source attribution must not be color-only. Use text labels that are readable by screen readers.',
  },
  {
    id: 'exception-design',
    name: 'Exception Design',
    category: 'Agent Collaboration',
    origin: 'SAP Agentic AI',
    problem: 'Exception handling is an afterthought in most agentic systems. The moments when AI reaches its limits are the moments that define user trust.',
    when: 'Any agentic system where the AI will encounter situations outside its confidence threshold',
    whenNot: 'Fully manual systems where every step is human-controlled',
    principle: 'The exception is where the relationship between human and AI is decided.',
    anatomy: [
      { part: 'Exception detection', description: 'Clear criteria for what constitutes an exception. Defined before deployment, not discovered in production.' },
      { part: 'Exception presentation', description: 'How the exception is surfaced to the human overseer. Specific enough to act on immediately.' },
      { part: 'Exception resolution', description: 'The action the human takes. Approve, modify, reject — always available, always clear.' },
    ],
    enterprise: 'SAP Order Confirmation: exception card shows the specific mismatch reason, the agent\'s tentative recommendation, and three clear actions.',
    accessibility: 'Exceptions that require action must be surfaced via multiple channels — visual, screen reader announcement, and ideally notification.',
  },
  {
    id: 'response-architecture',
    name: 'Response Architecture by Type',
    category: 'Conversation',
    origin: 'Engaze',
    problem: 'All responses look the same regardless of whether they are answering a question, completing a transaction, or asking for clarification.',
    when: 'Any conversational system that handles multiple types of interactions',
    whenNot: 'Single-purpose bots where all responses are the same type',
    principle: 'Consistency at the response-type level reduces cognitive load without feeling robotic.',
    anatomy: [
      { part: 'Informational structure', description: 'Lead with the answer. Supporting detail available on expand. Source on demand.' },
      { part: 'Transactional structure', description: 'State, action, confirmation. Three steps, always in that order.' },
      { part: 'Clarifying structure', description: 'Acknowledge the ambiguity, offer 2–3 interpretations, let the user choose.' },
      { part: 'Escalation structure', description: 'Who, why, and how. Never just "contact support."' },
    ],
    enterprise: 'Engaze: leave balance query uses informational structure. Approval request uses transactional. Ambiguous query uses clarifying.',
    accessibility: 'Structure should be perceivable to screen readers. Use appropriate heading hierarchy and landmark regions per response type.',
  },
  {
    id: 'trust-recovery',
    name: 'Error Recovery Design',
    category: 'Trust',
    origin: 'SAP AI Search',
    problem: 'When AI makes errors, recovery is harder than the error. Users lose trust not because the AI was wrong, but because fixing it was painful.',
    when: 'Any AI system where the output can be incorrect and users need to correct it',
    whenNot: 'Read-only systems where incorrect outputs don\'t trigger user actions',
    principle: 'Trust survives errors. Trust doesn\'t survive bad recovery.',
    anatomy: [
      { part: 'Error acknowledgment', description: 'The system acknowledges it was wrong. Not a generic "an error occurred" — a specific acknowledgment.' },
      { part: 'Correction affordance', description: 'One-tap correction path. No forms, no support tickets, no menus.' },
      { part: 'Learning signal', description: 'Optional notification that the correction has been noted and will improve future results.' },
    ],
    enterprise: 'SAP AI Search: wrong auto-categorisation — single-tap correction, instant visual confirmation, "We\'ve noted this for future results."',
    accessibility: 'Error states must be communicated to screen readers immediately. Use ARIA live regions for dynamic error updates.',
  },
]

const GLOSSARY = [
  { term: 'AI-native UX', definition: 'Design methodology for products where AI is the primary interaction mechanism, not a feature layered onto a traditional UI.', visual: 'Interface → Intelligence → Outcome', related: ['Agentic UX', 'Intent Recognition', 'Human-Agent Collaboration'] },
  { term: 'Agentic UX', definition: 'Design for systems where AI agents take autonomous actions on behalf of users. The human\'s role shifts from operator to overseer.', visual: 'Human → Instruction → Agent → Action → Oversight', related: ['Human Override', 'Communication Hierarchy', 'Exception Design'] },
  { term: 'Intent Engineering', definition: 'The discipline of designing systems to understand what users mean, not just what they say. Precedes all dialog design.', visual: 'Utterance → Intent Model → Response', related: ['Intent Recognition', 'Failure Grammar', 'Conversation Design'] },
  { term: 'Human-Agent Collaboration', definition: 'The designed relationship between human judgment and AI autonomy. Neither fully manual nor fully automatic — a calibrated partnership.', visual: 'Autonomous Zone ↔ Collaboration Zone ↔ Human Zone', related: ['Communication Hierarchy', 'Human Override', 'Exception Design'] },
  { term: 'Trust Design', definition: 'The intentional design of mechanisms that build, maintain, and restore user confidence in AI systems. A first-class design discipline, not a feature.', visual: 'Transparency + Predictability + Control = Trust', related: ['Graceful Uncertainty', 'Source Attribution', 'Error Recovery'] },
  { term: 'Context Engineering', definition: 'The phase of AI-native design methodology focused on building deep contextual understanding before any design work begins.', visual: 'Industry → Business → Users → Workflows → Intelligence', related: ['Intelligence Opportunity Canvas', 'Agent Mission Blueprint'] },
  { term: 'Agent Mission Blueprint', definition: 'A design artifact that defines what an agent does, knows, remembers, can decide, must escalate, and how to measure its success — before any UI design.', visual: 'Mission + Capabilities + Constraints + Escalation = Blueprint', related: ['Communication Hierarchy', 'Exception Design', 'Agentic UX'] },
  { term: 'Containment Rate', definition: 'Percentage of conversations handled entirely by the AI without human escalation. Key metric for agentic and conversational systems.', visual: 'AI-only / Total × 100', related: ['Task Completion Rate', 'Escalation Design'] },
  { term: 'Confidence Surfacing', definition: 'The design practice of communicating AI certainty levels to users — enabling informed trust rather than blind trust or distrust.', visual: 'High → Act · Medium → Review · Low → Verify', related: ['Graceful Uncertainty', 'Progressive Reasoning Disclosure'] },
]

const CATEGORIES = ['All', 'Conversation', 'Trust', 'Transparency', 'Autonomy', 'Agent Collaboration', 'Memory']

// ── Animated Methodology Roadmap ──────────────────────────────────────────────

function MethodologyRoadmap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Desktop horizontal roadmap */}
      <div className="hidden md:block">
        <div className="flex items-start gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-10 right-10 h-px" style={{ background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
          <motion.div
            className="absolute top-10 left-10 h-px origin-left"
            style={{ background: 'rgba(255,255,255,0.4)', zIndex: 1 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />

          {METHODOLOGY.map((phase, i) => (
            <div key={phase.id} className="flex-1 relative" style={{ zIndex: 2 }}>
              <div className="flex flex-col items-center">
                {/* Node */}
                <motion.button
                  className="w-20 h-20 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 relative"
                  style={{
                    background: active === phase.id ? 'rgba(245,242,237,0.12)' : 'rgba(12,12,11,1)',
                    borderColor: active === phase.id ? 'rgba(245,242,237,0.6)' : 'rgba(245,242,237,0.2)',
                  }}
                  onClick={() => setActive(active === phase.id ? null : phase.id)}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: 'rgba(245,242,237,0.5)' }}
                >
                  <span className="text-label text-white" style={{ opacity: active === phase.id ? 0.9 : 0.5 }}>{phase.number}</span>
                </motion.button>

                {/* Label */}
                <motion.div
                  className="text-center mt-4 px-2"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
                >
                  <p className="text-white mb-1" style={{ fontSize: '0.75rem', fontWeight: 400, letterSpacing: '-0.01em', opacity: 0.8 }}>{phase.title}</p>
                  <p className="text-white" style={{ fontSize: '0.6rem', opacity: 0.3, letterSpacing: '0.01em' }}>{phase.tagline}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded panel */}
        <AnimatePresence mode="wait">
          {active && (() => {
            const phase = METHODOLOGY.find(p => p.id === active)!
            return (
              <motion.div
                key={active}
                className="mt-12 grid md:grid-cols-4 gap-px bg-white bg-opacity-[0.06]"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Objective</p>
                  <p className="text-body text-white opacity-55">{phase.objective}</p>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Artifacts</p>
                  <ul className="space-y-2">
                    {phase.artifacts.map(a => (
                      <li key={a} className="flex gap-2">
                        <span className="text-white opacity-20 flex-shrink-0 mt-1" style={{ fontSize: '0.4rem' }}>◆</span>
                        <p className="text-label text-white opacity-55">{a}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Activities</p>
                  <ul className="space-y-2">
                    {phase.activities.map(a => (
                      <li key={a} className="flex gap-2">
                        <span className="text-white opacity-20 flex-shrink-0 mt-1" style={{ fontSize: '0.4rem' }}>◆</span>
                        <p className="text-label text-white opacity-55">{a}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Recommended tools</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.tools.map(t => (
                      <span key={t} className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-60">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })()}
        </AnimatePresence>
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden space-y-0">
        {METHODOLOGY.map((phase, i) => (
          <motion.div
            key={phase.id}
            className="border-t border-white"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <button className="w-full text-left py-6 flex items-center justify-between gap-4"
              onClick={() => setActive(active === phase.id ? null : phase.id)}>
              <div className="flex items-center gap-4">
                <span className="text-label text-white opacity-25 w-8">{phase.number}</span>
                <div>
                  <p className="text-body text-white">{phase.title}</p>
                  <p className="text-label text-white opacity-30 mt-0.5">{phase.tagline}</p>
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
                    <p className="text-body text-white opacity-50">{phase.objective}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.tools.map(t => <span key={t} className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-50">{t}</span>)}
                    </div>
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

// ── Foundations Comparison Table ──────────────────────────────────────────────

function FoundationsTable() {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div className="overflow-x-auto -mx-6 md:mx-0">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-white border-opacity-10">
            <th className="text-left text-overline text-white opacity-25 pb-5 pr-8 font-normal" style={{ width: '22%' }}>Dimension</th>
            <th className="text-left pb-5 pr-8 font-normal" style={{ width: '26%' }}>
              <p className="text-overline text-white opacity-40">Traditional UX</p>
            </th>
            <th className="text-left pb-5 pr-8 font-normal" style={{ width: '26%' }}>
              <p className="text-overline text-white" style={{ opacity: 0.65 }}>AI-native UX</p>
            </th>
            <th className="text-left pb-5 font-normal" style={{ width: '26%' }}>
              <p className="text-overline text-white opacity-85">Agentic UX</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {FOUNDATIONS.map((row, i) => (
            <motion.tr
              key={row.dimension}
              className="border-b border-white transition-colors duration-150 cursor-default"
              style={{
                borderColor: 'rgba(255,255,255,0.07)',
                background: hover === row.dimension ? 'rgba(245,242,237,0.025)' : 'transparent',
              }}
              onMouseEnter={() => setHover(row.dimension)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <td className="py-5 pr-8">
                <p className="text-label text-white opacity-30">{row.dimension}</p>
              </td>
              <td className="py-5 pr-8">
                <p className="text-body text-white opacity-35">{row.traditional}</p>
              </td>
              <td className="py-5 pr-8">
                <p className="text-body text-white opacity-60">{row.aiNative}</p>
              </td>
              <td className="py-5">
                <p className="text-body text-white opacity-85">{row.agentic}</p>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Pattern Card ──────────────────────────────────────────────────────────────

function PatternCard({ pattern, index }: { pattern: typeof PATTERNS[0], index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border border-white"
      style={{ borderColor: open ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)', background: open ? 'rgba(245,242,237,0.02)' : 'transparent' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      layout
    >
      <button className="w-full text-left p-8" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-50">{pattern.category}</span>
            <span className="text-label text-white opacity-20">{pattern.origin}</span>
          </div>
          <span className="text-white opacity-25 flex-shrink-0 transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.1rem' }}>+</span>
        </div>
        <h3 className="text-white mb-3" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {pattern.name}
        </h3>
        <p className="text-body text-white opacity-40">{pattern.problem}</p>
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
            <div className="border-t border-white border-opacity-[0.08]">
              {/* Principle callout */}
              <div className="px-8 py-6 border-b border-white border-opacity-[0.06]" style={{ background: 'rgba(245,242,237,0.02)' }}>
                <p className="text-white opacity-70 italic" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                  "{pattern.principle}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05]">
                {/* When to use */}
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-3">When to use</p>
                  <p className="text-body text-white opacity-55">{pattern.when}</p>
                  <p className="text-overline text-white opacity-20 mb-3 mt-5">When not to use</p>
                  <p className="text-body text-white opacity-40">{pattern.whenNot}</p>
                </div>

                {/* Anatomy */}
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-4">Pattern anatomy</p>
                  <div className="space-y-4">
                    {pattern.anatomy.map((part, j) => (
                      <div key={j} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1 h-1 rounded-full bg-white opacity-30 mt-1.5" />
                        </div>
                        <div>
                          <p className="text-label text-white opacity-60 mb-1">{part.part}</p>
                          <p className="text-body text-white opacity-40">{part.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enterprise example */}
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-3">Enterprise example</p>
                  <p className="text-body text-white opacity-55 italic">{pattern.enterprise}</p>
                </div>

                {/* Accessibility */}
                <div className="bg-black p-8">
                  <p className="text-overline text-white opacity-25 mb-3">Accessibility note</p>
                  <p className="text-body text-white opacity-45">{pattern.accessibility}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Glossary Entry ─────────────────────────────────────────────────────────────

function GlossaryEntry({ entry, index }: { entry: typeof GLOSSARY[0], index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border-b border-white"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <button className="w-full text-left py-7 flex items-start justify-between gap-6 group" onClick={() => setOpen(o => !o)}>
        <div>
          <span className="text-white group-hover:opacity-80 transition-opacity"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
            {entry.term}
          </span>
          {!open && <p className="text-label text-white opacity-30 mt-2 line-clamp-1">{entry.definition}</p>}
        </div>
        <span className="text-white opacity-25 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.1rem' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div className="pb-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-overline text-white opacity-25 mb-2">Definition</p>
                <p className="text-body text-white opacity-60 mb-5">{entry.definition}</p>
                <p className="text-overline text-white opacity-25 mb-2">Mental model</p>
                <p className="text-body text-white opacity-45 font-mono" style={{ fontSize: '0.85rem' }}>{entry.visual}</p>
              </div>
              <div>
                <p className="text-overline text-white opacity-25 mb-3">Related concepts</p>
                <div className="flex flex-wrap gap-2">
                  {entry.related.map(r => (
                    <span key={r} className="text-label text-white border border-white border-opacity-15 px-2.5 py-1 opacity-50">{r}</span>
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

// ── Page ──────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'get', label: 'Get access' },
]

export default function AINativePatternsPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [patternSearch, setPatternSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [glossarySearch, setGlossarySearch] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const filteredPatterns = PATTERNS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = !patternSearch || p.name.toLowerCase().includes(patternSearch.toLowerCase()) || p.problem.toLowerCase().includes(patternSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredGlossary = GLOSSARY.filter(e =>
    !glossarySearch || e.term.toLowerCase().includes(glossarySearch.toLowerCase()) || e.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  )

  // Scroll progress line
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    NAV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      {/* Progress line */}
      <motion.div className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
        style={{ scaleX, background: 'rgba(245,242,237,0.35)' }} />

      <DotsNav sections={NAV_SECTIONS} active={activeSection} />

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-end pb-20 pt-40 px-6 md:px-12 overflow-hidden">
        <GrainOverlay opacity={0.05} />

        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mb-12">
          <Link to="/resources" className="text-label text-white opacity-30 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
            ← Resources
          </Link>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p className="text-overline text-white opacity-35 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ duration: 0.6 }}>
            Pattern Library · AI-native Experience Design
          </motion.p>

          <motion.h1 className="text-white mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)', fontWeight: 200, letterSpacing: '-0.045em', lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            Designing Experiences<br />for Intelligence,<br />not Interfaces.
          </motion.h1>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-end">
            <motion.p className="text-white opacity-50"
              style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', fontWeight: 300, lineHeight: 1.7, letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.5, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
              A practical handbook for designing AI-native and agentic enterprise experiences. Production-proven patterns from Engaze, SAP AI Search, and SAP Agentic AI — not theoretical frameworks.
            </motion.p>

            <motion.div className="flex flex-wrap md:flex-col gap-4 md:gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }}>
              {[['11', 'Production patterns'], ['6', 'Methodology phases'], ['3', 'Live enterprise systems']].map(([val, label]) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="text-white" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>{val}</span>
                  <span className="text-label text-white opacity-30">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Learning journey strip */}
          <motion.div className="mt-16 pt-10 border-t border-white border-opacity-[0.08]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-overline text-white opacity-20 mb-6">Learning journey</p>
            <div className="flex flex-wrap gap-3 items-center">
              {['Understand', 'Think', 'Practice', 'Build', 'Apply', 'Master'].map((stage, i, arr) => (
                <div key={stage} className="flex items-center gap-3">
                  <span className="text-body text-white opacity-35" style={{ fontSize: '0.85rem' }}>{stage}</span>
                  {i < arr.length - 1 && <span className="text-white opacity-15">→</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section id="methodology" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">The Methodology</p>
              <h2 className="text-heading text-white">End-to-end AI-native design process.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Six phases from context through evaluation. Click each phase to expand artifacts, activities, and tools. Every phase builds on the previous one.
            </p>
          </div>
          <MethodologyRoadmap />
        </div>
      </section>

      {/* ── Foundations ── */}
      <section id="foundations" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Foundations</p>
              <h2 className="text-heading text-white">What changes when software can reason.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              The shift from traditional UX to AI-native to agentic design is not cosmetic. It changes what you design, how you measure it, and what can go wrong. This table maps the shift across seven dimensions.
            </p>
          </div>

          <FoundationsTable />

          {/* Key concept: the shift */}
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-white bg-opacity-[0.06]">
            {[
              { label: 'Traditional UX', summary: 'The designer\'s job is to make the system easy to use. The primary artifact is the interface. The user is always in control.', opacity: '0.4' },
              { label: 'AI-native UX', summary: 'The designer\'s job is to make the system trustworthy and interpretable. The primary artifact is the interaction model. Control is shared.', opacity: '0.65' },
              { label: 'Agentic UX', summary: 'The designer\'s job is to design the oversight mechanism. The primary artifact is the supervision experience. The AI acts; the human oversees.', opacity: '0.85' },
            ].map((col, i) => (
              <motion.div key={col.label} className="bg-black p-10"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-overline text-white mb-4" style={{ opacity: parseFloat(col.opacity) * 0.6 }}>{col.label}</p>
                <p className="text-body text-white" style={{ opacity: parseFloat(col.opacity) * 0.65 }}>{col.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Patterns ── */}
      <section id="patterns" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-12">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Pattern Library</p>
              <h2 className="text-heading text-white">{PATTERNS.length} production-proven patterns.</h2>
            </div>
            <div className="self-end">
              <p className="text-body text-white opacity-45 mb-6">
                Every pattern here shipped in a real enterprise system. Click any pattern to expand anatomy, when-to-use guidance, an enterprise example, and accessibility notes.
              </p>
              <input
                type="text"
                placeholder="Search patterns..."
                value={patternSearch}
                onChange={e => setPatternSearch(e.target.value)}
                className="w-full bg-transparent border border-white border-opacity-20 px-5 py-3 text-body text-white placeholder-white focus:border-opacity-50 focus:outline-none transition-all duration-200"
                style={{ opacity: patternSearch ? 1 : 0.6 }}
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`text-label px-4 py-2 border transition-all duration-200 ${activeCategory === cat ? 'border-white text-white' : 'border-white border-opacity-20 text-white opacity-40 hover:opacity-70'}`}>
                {cat}
              </button>
            ))}
          </div>

          {filteredPatterns.length > 0 ? (
            <div className="grid md:grid-cols-1 gap-px bg-white bg-opacity-[0.04]">
              {filteredPatterns.map((pattern, i) => (
                <PatternCard key={pattern.id} pattern={pattern} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-body text-white opacity-30 py-16 text-center">No patterns matching "{patternSearch}"</p>
          )}

          {/* Pattern relationships diagram */}
          <motion.div className="mt-20 p-10 md:p-14 border border-white border-opacity-[0.08]"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-overline text-white opacity-30 mb-8">Pattern relationships</p>
            <div className="overflow-x-auto">
              <div className="flex gap-8 min-w-[640px]">
                {[
                  { cluster: 'Conversation', patterns: ['Intent Recognition', 'Failure Grammar', 'Response Architecture', 'Continuity Memory'] },
                  { cluster: 'Trust & Transparency', patterns: ['Graceful Uncertainty', 'Source Attribution', 'Error Recovery', 'Progressive Reasoning'] },
                  { cluster: 'Agentic Control', patterns: ['Human Override', 'Communication Hierarchy', 'Exception Design'] },
                ].map((cluster) => (
                  <div key={cluster.cluster} className="flex-1 border-t-2 border-white border-opacity-15 pt-4">
                    <p className="text-overline text-white opacity-40 mb-4">{cluster.cluster}</p>
                    <div className="space-y-2">
                      {cluster.patterns.map(p => (
                        <div key={p} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-white opacity-25 flex-shrink-0" />
                          <p className="text-label text-white opacity-40">{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Glossary ── */}
      <section id="glossary" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-12">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Glossary</p>
              <h2 className="text-heading text-white">Terms defined for practitioners, not theorists.</h2>
            </div>
            <div className="self-end">
              <p className="text-body text-white opacity-45 mb-6">
                Every entry includes a definition, a mental model for visualising the concept, and related patterns you can apply.
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
              <p className="text-body text-white opacity-30 py-12 text-center">No terms matching "{glossarySearch}"</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Get access ── */}
      <section id="get" className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr] gap-12 items-end">
          <div>
            <p className="text-overline text-white opacity-30 mb-4">Full Library</p>
            <h2 className="text-heading text-white mb-6">The complete library — Figma files, FigJam templates, decision trees, and the full 18-area pattern set.</h2>
            <p className="text-body text-white opacity-45">
              The patterns above are a curated selection. The full library covers 18 architecture areas — foundations through governance, agentic UX, multimodal experiences, and enterprise-specific patterns.
              Includes editable Figma components and FigJam workshop canvases.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <a href="mailto:uxbyamit@gmail.com?subject=Request - AI-Native UX Pattern Library&body=Hi Amit,%0A%0AI'd like to request the full AI-Native UX Pattern Library.%0A%0AName:%0ARole:%0AOrganisation:%0AWhat I'm building:"
              className="text-label text-white border border-white border-opacity-30 px-6 py-4 hover:border-opacity-70 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200 text-center">
              Request full library →
            </a>
            <a href="mailto:uxbyamit@gmail.com?subject=AI-Native Design Workshop"
              className="text-label text-white opacity-35 hover:opacity-70 transition-opacity px-6 py-3 text-center">
              Bring this to your team
            </a>
            <Link to="/resources" className="text-label text-white opacity-25 hover:opacity-50 transition-opacity text-center py-2">
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
