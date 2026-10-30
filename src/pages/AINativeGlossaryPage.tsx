import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/ds/Breadcrumb'
import GrainOverlay from '../components/ui/GrainOverlay'
import { GLOSSARY } from '../data/aiNativeGlossary'

function GlossaryEntry({ entry, index }: { entry: typeof GLOSSARY[0], index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div className="border-b border-white" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.07)' }}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}>
      <button className="w-full text-left py-7 flex items-start justify-between gap-6 group" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <div>
          <span className="text-white group-hover:opacity-75 transition-opacity"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>{entry.term}</span>
          {!open && <p className="text-label text-ink-3 mt-1.5 line-clamp-1">{entry.definition}</p>}
        </div>
        <span className="text-ink-3 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none', fontSize: '1.1rem' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div className="pb-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-5">
                <div>
                  <p className="text-overline text-ink-3 mb-2">Definition</p>
                  <p className="text-body text-ink-3">{entry.definition}</p>
                </div>
                <div>
                  <p className="text-overline text-ink-3 mb-2">Mental model</p>
                  <p className="text-ink-3 font-mono" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>{entry.model}</p>
                </div>
              </div>
              <div>
                <p className="text-overline text-ink-3 mb-3">Related concepts</p>
                <div className="flex flex-wrap gap-2">
                  {entry.related.map(r => (
                    <span key={r} className="tag">{r}</span>
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

export default function AINativeGlossaryPage() {
  const [search, setSearch] = useState('')
  const q = search.trim().toLowerCase()
  const entries = GLOSSARY.filter(e => !q || e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q))

  return (
    <div className="bg-black min-h-screen">
      <section className="relative px-6 md:px-12 pt-40 pb-24 overflow-hidden">
        <GrainOverlay opacity={0.04} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-12">
            <Breadcrumb items={[
              { label: 'Resources', to: '/resources' },
              { label: 'AI-Native Frameworks', to: '/resources/ai-native-patterns' },
              { label: 'Glossary' },
            ]} />
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16">
            <div>
              <p className="text-overline text-ink-3 mb-4">Glossary</p>
              <h1 className="text-heading text-white">Terms for practitioners, not academics.</h1>
            </div>
            <div className="self-end">
              <p className="text-body text-ink-3 mb-6">
                Every entry has a definition, a mental model, and related concepts. Click a term to expand it.
              </p>
              <input
                type="text"
                placeholder="Search glossary..."
                aria-label="Search glossary"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="field"
              />
            </div>
          </div>

          <div>
            {entries.map((entry, i) => <GlossaryEntry key={entry.term} entry={entry} index={i} />)}
            {entries.length === 0 && (
              <p className="text-body text-ink-3 py-12 text-center">No terms matching "{search}"</p>
            )}
          </div>

          <div className="mt-16">
            <Link to="/resources/ai-native-patterns" className="text-label text-ink-3 hover:text-ink-2 transition-colors">
              ← Back to AI-native Frameworks
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
