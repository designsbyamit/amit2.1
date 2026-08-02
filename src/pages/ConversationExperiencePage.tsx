import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'

const CHAPTERS = [
  {
    id: 'intent',
    number: '01',
    title: 'Intent Design',
    summary: 'Designing for what users mean, not what they say. The foundation of every conversational experience.',
    body: 'Intent design precedes interface design. Before you design a single message, you need to map the full universe of what users are trying to accomplish — not just the task, but the context, the emotional state, and the constraints they\'re operating within. Most conversational AI fails because it was designed to respond to inputs, not to understand intentions.',
    principles: [
      'Define intent categories before designing dialog flows',
      'Map the gap between what users say and what they mean — this gap is your design opportunity',
      'Build intent models collaboratively with the engineers training the AI model',
      'Test with real utterances from real users, not hypothetical ones from a workshop',
    ],
  },
  {
    id: 'response',
    number: '02',
    title: 'Prompt & Response Systems',
    summary: 'The language layer. Response architecture, tone calibration, and content strategy for conversational products.',
    body: 'Most conversational AI fails on language before it fails on capability. The model can answer the question — but the response is formatted like a database output, not a conversation. Response systems design is the discipline of defining how information is structured, sequenced, and voiced — across every interaction type, at every emotional register.',
    principles: [
      'Define response architecture by interaction type, not by topic',
      'Informational, transactional, clarifying, and escalating responses each have a different optimal structure',
      'Failure states deserve as much design attention as success states — more, actually',
      'Tone calibration is a design decision, not a copywriting afterthought',
    ],
  },
  {
    id: 'multiturm',
    number: '03',
    title: 'Multi-Turn Flows',
    summary: 'Conversations that span multiple exchanges. Context retention, repair strategies, and flow recovery.',
    body: 'A single-turn chatbot is a FAQ engine. A conversational AI product is something that can hold context, remember what was established earlier in the session, and recover gracefully when the conversation goes off-track. Multi-turn design is fundamentally about memory and repair — knowing what to carry forward and knowing what to do when things break.',
    principles: [
      'Context window design: what does the system remember and for how long?',
      'Design explicit repair strategies — what happens when the system misunderstands?',
      'Progressive disclosure applies to conversations too: don\'t surface all capabilities at once',
      'Session continuity across return visits is a retention decision, not just a UX convenience',
    ],
  },
  {
    id: 'trust',
    number: '04',
    title: 'Trust & Safety',
    summary: 'The hardest problem in conversational AI design. How to make systems trustworthy without making them useless.',
    body: 'Trust in conversational AI is not built by getting everything right. It\'s built by being honest about uncertainty, recovering gracefully from errors, and never pretending to know more than the system knows. Safety is not a constraint on top of the design — it\'s a design material. Every trust decision is a design decision.',
    principles: [
      'Confidence surfacing: high-confidence and low-confidence responses should look different',
      'Design the "I don\'t know" response with as much care as the answer',
      'Source attribution builds trust — anonymous information is unverifiable information',
      'Safety guardrails should be designed to be invisible when not triggered, and clear when they are',
    ],
  },
  {
    id: 'future',
    number: '05',
    title: 'The Future of Conversational UX',
    summary: 'Where the discipline is going. Agentic systems, multimodal conversations, and the disappearing interface.',
    body: 'Conversational UX is not a feature category — it\'s becoming the primary interaction model for intelligent software. The next frontier is agentic: systems that don\'t just respond to requests but proactively act, escalate, and operate on behalf of users. The interface is disappearing. The relationship between human intent and system action is becoming the product.',
    principles: [
      'Agentic systems require oversight design, not just interaction design',
      'Multimodal conversations (voice, text, image) require consistent intent models across modalities',
      'The collapse of the screen as primary canvas is not a threat to UX designers — it\'s the biggest opportunity',
      'Measure conversational experiences differently: task completion, containment rate, and trust signals — not page views',
    ],
  },
]

const METRICS = [
  { name: 'Task Completion Rate', definition: 'Percentage of user intents successfully resolved without human escalation.', target: '>75% for primary flows', formula: 'Resolved intents / Total intents × 100' },
  { name: 'Containment Rate', definition: 'Percentage of conversations handled entirely by the AI without escalation to a human agent.', target: '>60% is strong for enterprise', formula: 'AI-only conversations / Total conversations × 100' },
  { name: 'Resolution Quality Score', definition: 'User-rated quality of responses — combining accuracy, tone, and helpfulness.', target: '>4.0/5.0 in usability testing', formula: 'Post-conversation survey (5-point scale)' },
  { name: 'Escalation Rate', definition: 'Percentage of conversations that require human handoff — a signal of AI capability gaps.', target: '<25% for mature systems', formula: 'Human-escalated conversations / Total × 100' },
  { name: 'Repair Success Rate', definition: 'When the system misunderstands, how often does the repair strategy work?', target: '>80% recovery on first repair', formula: 'Successful repairs / Triggered repairs × 100' },
  { name: 'Trust Score', definition: 'Composite measure of user confidence in system accuracy, honesty, and reliability.', target: '>7/10 after 3 sessions', formula: 'Multi-item trust scale (post-session)' },
]

export default function ConversationExperiencePage() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null)

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
        <GrainOverlay opacity={0.05} />
        <div className="relative z-10 mb-12">
          <Link to="/resources" className="text-label text-white opacity-30 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
            ← Resources
          </Link>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p className="text-overline text-white opacity-35 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ duration: 0.6 }}>
            Playbook · Conversational AI · Interaction Design
          </motion.p>
          <motion.h1 className="text-white mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            Conversation Experience:<br />The New Frontier of UX
          </motion.h1>
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-end">
            <motion.p className="text-white opacity-55"
              style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 300, lineHeight: 1.65, letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.55, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              A practical guide for designing conversational, assistant-driven, and agentic experiences.
              Built from three years of production conversational AI work — not from conference slides.
            </motion.p>
            <motion.div className="space-y-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
              {[['5', 'Chapters'], ['6', 'Key metrics'], ['90%', 'CSAT achieved']].map(([val, label]) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="text-white" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>{val}</span>
                  <span className="text-label text-white opacity-30">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="relative bg-black py-20 md:py-28 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">The Playbook</p>
              <h2 className="text-heading text-white">Five chapters. One discipline.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Each chapter covers a distinct domain of conversational design — from intent through to the future of agentic systems.
              Click to expand principles, tools, and guidance.
            </p>
          </div>

          <div>
            {CHAPTERS.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                className="border-t border-white"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <button
                  className="w-full text-left py-10 group flex items-start justify-between gap-8"
                  onClick={() => setActiveChapter(activeChapter === chapter.id ? null : chapter.id)}
                >
                  <div className="flex items-start gap-8">
                    <span className="text-label text-white opacity-20 flex-shrink-0 mt-1">{chapter.number}</span>
                    <div>
                      <h3 className="text-white mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        {chapter.title}
                      </h3>
                      <p className="text-body text-white opacity-40 max-w-2xl">{chapter.summary}</p>
                    </div>
                  </div>
                  <span className="text-white opacity-25 flex-shrink-0 mt-1 transition-transform duration-300"
                    style={{ transform: activeChapter === chapter.id ? 'rotate(45deg)' : 'none', fontSize: '1.25rem' }}>
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {activeChapter === chapter.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pb-12 pl-0 md:pl-20 grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.05]">
                        <div className="bg-black p-8 md:p-10">
                          <p className="text-overline text-white opacity-25 mb-5">Overview</p>
                          <p className="text-body text-white opacity-55 leading-relaxed">{chapter.body}</p>
                        </div>
                        <div className="bg-black p-8 md:p-10">
                          <p className="text-overline text-white opacity-25 mb-5">Key principles</p>
                          <ul className="space-y-4">
                            {chapter.principles.map((p, j) => (
                              <li key={j} className="flex gap-4">
                                <span className="text-white opacity-20 flex-shrink-0 mt-0.5" style={{ fontSize: '0.5rem' }}>●</span>
                                <p className="text-body text-white opacity-55">{p}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-white" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative bg-black py-20 md:py-28 px-6 md:px-12 border-t border-white border-opacity-[0.07]">
        <GrainOverlay opacity={0.03} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-white opacity-35 mb-4">Measuring CX</p>
              <h2 className="text-heading text-white">Metrics that actually measure conversational quality.</h2>
            </div>
            <p className="text-body text-white opacity-45 self-end">
              Traditional UX metrics don't map to conversational experiences. These six metrics are what actually matter — drawn from the Engaze engagement that achieved 90% CSAT.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.06]">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.name}
                className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <p className="text-label text-white opacity-20 mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-white mb-3" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                  {metric.name}
                </h3>
                <p className="text-body text-white opacity-45 mb-5">{metric.definition}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white border-opacity-[0.08]">
                  <div>
                    <p className="text-overline text-white opacity-20 mb-1">Target</p>
                    <p className="text-label text-white opacity-50">{metric.target}</p>
                  </div>
                  <div>
                    <p className="text-overline text-white opacity-20 mb-1">Formula</p>
                    <p className="text-label text-white opacity-40" style={{ fontFamily: 'monospace', fontSize: '0.65rem' }}>{metric.formula}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request */}
      <section className="relative bg-black py-20 px-6 md:px-12 border-t border-white border-opacity-[0.08]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr] gap-12 items-end">
          <div>
            <p className="text-overline text-white opacity-30 mb-4">Full Playbook</p>
            <h2 className="text-heading text-white mb-4">The complete guide — including templates, measurement frameworks, and case study breakdowns.</h2>
            <p className="text-body text-white opacity-45">Covers intent design, prompt and response systems, multi-turn flows, trust and safety, and agentic UX. Includes the full Engaze design methodology.</p>
          </div>
          <div className="flex flex-col gap-4">
            <a href="mailto:uxbyamit@gmail.com?subject=Request - Conversation Experience Playbook"
              className="text-label text-white border border-white border-opacity-30 px-6 py-3 hover:border-opacity-70 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200 text-center">
              Request full playbook →
            </a>
            <Link to="/resources" className="text-label text-white opacity-30 hover:opacity-70 transition-opacity text-center py-2">
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
