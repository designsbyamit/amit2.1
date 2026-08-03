import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import GrainOverlay from '../ui/GrainOverlay'

// ── Data ────────────────────────────────────────────────────────────────────

const allFilters = ['All', 'AI', 'UX', 'Leadership', 'Research', 'Workshops', 'Strategy', 'Career Growth', 'Community']

interface Resource {
  id: string
  title: string
  type: string[]
  description: string
  outcomes: string[]
  tags: string[]
  filterTags: string[]
  // Unsplash image ID — meaning mapped per resource
  imageId: string
  imageAlt: string
  internalUrl?: string
  previewUrl?: string
  previewLabel?: string
  requestAccess?: boolean
  requestLabel?: string
  readingList?: boolean
}

const resources: Resource[] = [
  {
    id: 'dual-fluency',
    title: 'Dual Fluency',
    type: ['Framework', 'Workshop Toolkit'],
    description: 'A practical framework for helping designers become fluent in both the language of design and the language of business. Covers the translation gap, metric mapping, maturity model, and the Dual Fluency Loop.',
    outcomes: ['Business fluency', 'Strategic influence', 'Better stakeholder communication', 'Enterprise design maturity'],
    tags: ['Business', 'Strategy', 'Leadership', 'Design'],
    filterTags: ['Leadership', 'Strategy', 'Workshops'],
    // Soft glass gradients — intelligence and explainability
    imageId: 'photo-1518531933037-91b2f5f229cc',
    imageAlt: 'Abstract light geometry',
    internalUrl: '/resources/dual-fluency',
    previewLabel: 'Explore the framework',
    requestAccess: true,
    requestLabel: 'Request workshop toolkit',
  },
  {
    id: 'ai-native-patterns',
    title: 'AI-Native Frameworks',
    type: ['Interactive Playbook', 'Framework Library'],
    description: 'The definitive visual playbook for designing intelligent, agentic enterprise experiences. Five frameworks — Context Engineering through Prototype & Validation — each producing a tangible artifact.',
    outcomes: ['End-to-end AI-native methodology', 'Five reusable frameworks', 'Tool orchestration guide', 'Downloadable canvases & templates'],
    tags: ['AI', 'UX', 'Frameworks', 'Agentic Design'],
    filterTags: ['AI', 'UX'],
    // Particle flows and semantic clusters — AI reasoning and retrieval
    imageId: 'photo-1639322537504-6427a16b0a28',
    imageAlt: 'Abstract particle network',
    internalUrl: '/resources/ai-native-patterns',
    previewLabel: 'Explore the handbook',
    requestAccess: true,
    requestLabel: 'Request PDF playbook',
  },
  {
    id: 'conversation-experience',
    title: 'Conversation Experience: The New Frontier of UX',
    type: ['Playbook'],
    description: 'A practical guide for designing conversational, assistant-driven, and agentic experiences. Covers intent design, prompt and response systems, multi-turn flows, trust and safety, and the future of conversational UX.',
    outcomes: ['Conversation design', 'Prompt design', 'Interaction flows', 'Trust and transparency'],
    tags: ['Conversational UX', 'AI', 'Interaction Design'],
    filterTags: ['AI', 'UX'],
    // Nebula of connected nodes — enterprise knowledge universe
    imageId: 'photo-1451187580459-43490279c0fa',
    imageAlt: 'Abstract node network nebula',
    internalUrl: '/resources/conversation-experience',
    previewLabel: 'Read the playbook',
    requestAccess: true,
    requestLabel: 'Request full playbook',
  },
  {
    id: 'reading-list',
    title: 'Design Leadership Reading List',
    type: ['Curated Reading Collection'],
    description: 'A carefully curated collection of books, articles, essays, talks, and resources that have influenced thinking on leadership, systems, creativity, and design.',
    outcomes: ['Leadership growth', 'Systems thinking', 'Decision-making', 'Design maturity'],
    tags: ['Leadership', 'Books', 'Growth'],
    filterTags: ['Leadership', 'Career Growth'],
    // Blueprint grids — investigation and systems thinking
    imageId: 'photo-1558618666-fcd25c85cd64',
    imageAlt: 'Blueprint geometric grid',
    readingList: true,
  },
  {
    id: 'kickoff-questionnaire',
    title: 'Kick-Off Questionnaire for UX Rockstars',
    type: ['Worksheet'],
    description: 'A practical project kick-off worksheet designed to uncover context, assumptions, constraints, stakeholders, risks, and opportunities before design work begins.',
    outcomes: ['Better project discovery', 'Faster alignment', 'Improved stakeholder conversations'],
    tags: ['Discovery', 'Research', 'Workshops', 'UX'],
    filterTags: ['Research', 'Workshops', 'UX'],
    // Minimal dark gradient — keep focus on the content
    imageId: 'photo-1554147090-e1221a04a025',
    imageAlt: 'Minimal dark abstract',
    previewUrl: 'https://forms.gle/FHJ1qEvRRsXzmkvu8',
    previewLabel: 'Preview worksheet',
    requestAccess: true,
    requestLabel: 'Request editable worksheet',
  },
]

const readingItems = {
  articles: [
    { title: 'The Looking Glass: On Feedback', author: 'Julie Zhuo', publication: 'Medium', why: 'The clearest writing on how design leaders give and receive feedback without crushing the people or the work.', url: 'https://medium.com/the-year-of-the-looking-glass/how-to-give-feedback-without-being-a-dick-b9e87ee018e8' },
    { title: 'How to Be a Design Leader (Not Just a Senior Designer)', author: 'Julie Zhuo', publication: 'Medium', why: 'The most precise articulation of the shift from individual contributor to leader — what changes, and what must change about you.', url: 'https://medium.com/the-year-of-the-looking-glass/how-to-be-a-design-leader-not-just-a-senior-designer-24db8fc278d7' },
    { title: "The Designer's Dilemma", author: 'John Maeda', publication: 'KPCB Design in Tech Report', why: 'A systems-level view of where design sits in tech organisations — and the structural reasons it struggles for influence.', url: 'https://designintech.report' },
    { title: 'Why Design Thinking is Not Enough', author: 'Natasha Jen', publication: 'Fast Company', why: 'Design thinking without rigour and depth of craft produces mediocre outcomes. The counterargument every design leader should internalise.', url: 'https://www.fastcompany.com/90147798/why-design-thinking-is-not-enough' },
    { title: 'Managing Design at Scale', author: 'Jean-Marc Denis', publication: 'Medium', why: 'The practical mechanics of running a design organisation — hiring bars, critique culture, and how to keep quality high as the team grows.', url: 'https://medium.com/@jmd' },
  ],
  books: [
    { title: 'The Making of a Manager', author: 'Julie Zhuo', why: 'The most honest and practical book on design management. Required reading before you manage your first designer.' },
    { title: 'The Design of Everyday Things', author: 'Don Norman', why: 'The foundational text. Every design leader must have internalised its vocabulary — affordances, feedback, mental models.' },
    { title: 'Inspired: How to Create Tech Products Customers Love', author: 'Marty Cagan', why: 'The business context design leaders operate in. Understanding product discovery separates designers who advise from designers who influence.' },
  ],
}

function makeMailto(resourceTitle: string) {
  const subject = encodeURIComponent(`Requesting Access - ${resourceTitle}`)
  const body = encodeURIComponent(`Hello Amit,\n\nI came across your resource "${resourceTitle}" and would love to request access.\n\nA little about me:\n\nName:\nRole:\nOrganization:\n\nThank you.\n\nRegards`)
  return `mailto:uxbyamit@gmail.com?subject=${subject}&body=${body}`
}

function ReadingListContent() {
  return (
    <div className="mt-8 border-t border-white border-opacity-10 pt-8">
      <p className="text-overline text-white opacity-30 mb-6">Articles</p>
      <div className="space-y-0 mb-10">
        {readingItems.articles.map((a, i) => (
          <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
            className="flex gap-6 py-5 border-b border-white border-opacity-[0.07] group hover:bg-white hover:bg-opacity-[0.02] transition-colors -mx-10 px-10">
            <div className="flex-1 min-w-0">
              <p className="text-body text-white group-hover:opacity-80 transition-opacity" style={{ fontWeight: 400 }}>{a.title}</p>
              <p className="text-label text-white opacity-35 mt-1">{a.author} · {a.publication}</p>
            </div>
            <p className="text-body text-white opacity-40 flex-1 hidden md:block">{a.why}</p>
            <span className="text-white opacity-25 group-hover:opacity-70 transition-opacity self-start pt-1 flex-shrink-0">→</span>
          </a>
        ))}
      </div>
      <p className="text-overline text-white opacity-30 mb-6">Books</p>
      <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-10">
        {readingItems.books.map((b, i) => (
          <div key={i} className="bg-black p-8">
            <p className="text-body text-white mb-1" style={{ fontWeight: 400 }}>{b.title}</p>
            <p className="text-label text-white opacity-35 mb-4">{b.author}</p>
            <p className="text-body text-white opacity-50">{b.why}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Full-width resource card ──────────────────────────────────────────────────

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const [expanded, setExpanded] = useState(false)

  const imgUrl = `https://images.unsplash.com/${resource.imageId}?auto=format&fit=crop&w=1600&q=80`

  return (
    <motion.div
      className="relative overflow-hidden border-t border-white group"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background image — desaturated, darkened, mysterious */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgUrl}
          alt={resource.imageAlt}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          style={{
            filter: 'saturate(0.12) contrast(1.1) brightness(0.28)',
          }}
        />
        {/* Bottom gradient — text legibility */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(12,12,11,0.98) 0%, rgba(12,12,11,0.82) 40%, rgba(12,12,11,0.45) 70%, rgba(12,12,11,0.2) 100%)'
        }} />
        {/* Left gradient — type anchor */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(12,12,11,0.6) 0%, transparent 60%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-10 md:p-14">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {resource.type.map(t => (
              <span key={t} className="text-label text-white border border-white border-opacity-20 px-3 py-1.5" style={{ opacity: 0.55 }}>{t}</span>
            ))}
          </div>
          <span className="text-label text-white opacity-15 flex-shrink-0" style={{ fontSize: '0.65rem' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white mb-5" style={{
          fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
          fontWeight: 200,
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          maxWidth: '28ch',
        }}>
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-white mb-8" style={{
          fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
          fontWeight: 300,
          lineHeight: 1.72,
          opacity: 0.52,
          maxWidth: '62ch',
        }}>
          {resource.description}
        </p>

        {/* Outcomes */}
        <div className="flex flex-wrap gap-2 mb-8">
          {resource.outcomes.map(o => (
            <span key={o} className="text-label text-white bg-white bg-opacity-[0.06] border border-white border-opacity-[0.08] px-3 py-1.5" style={{ opacity: 0.65 }}>
              {o}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-white border-opacity-[0.07]">
          {resource.tags.map(tag => (
            <span key={tag} className="text-label text-white opacity-22">#{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {resource.readingList ? (
            <button onClick={() => setExpanded(e => !e)}
              className="text-label text-white border border-white border-opacity-25 px-6 py-3 hover:border-opacity-65 hover:bg-white hover:bg-opacity-[0.05] transition-all duration-300">
              {expanded ? 'Collapse list ↑' : 'View reading list →'}
            </button>
          ) : (
            <>
              {resource.internalUrl ? (
                <Link to={resource.internalUrl}
                  className="text-label text-white border border-white border-opacity-25 px-6 py-3 hover:border-opacity-65 hover:bg-white hover:bg-opacity-[0.05] transition-all duration-300 inline-flex items-center gap-2">
                  {resource.previewLabel || 'Explore'} →
                </Link>
              ) : resource.previewUrl ? (
                <a href={resource.previewUrl} target="_blank" rel="noopener noreferrer"
                  className="text-label text-white border border-white border-opacity-25 px-6 py-3 hover:border-opacity-65 hover:bg-white hover:bg-opacity-[0.05] transition-all duration-300 inline-flex items-center gap-2">
                  {resource.previewLabel || 'Preview'} ↗
                </a>
              ) : null}
              {resource.requestAccess && (
                <a href={makeMailto(resource.title)}
                  className="text-label text-white bg-white bg-opacity-[0.07] px-6 py-3 hover:bg-opacity-[0.13] transition-all duration-300 inline-flex items-center gap-2">
                  {resource.requestLabel || 'Request access'} →
                </a>
              )}
            </>
          )}
        </div>

        {/* Reading list expansion */}
        <AnimatePresence>
          {expanded && resource.readingList && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ReadingListContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? resources
    : resources.filter(r => r.filterTags.includes(activeFilter))

  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12" id="resources">
      <GrainOverlay opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-16">
          {allFilters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`text-label px-4 py-2 border transition-all duration-200 ${
                activeFilter === f
                  ? 'border-white text-white'
                  : 'border-white border-opacity-20 text-white opacity-40 hover:opacity-70'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Resource list — full width, stacked */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-0"
          >
            {filtered.map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Closing CTA */}
        <motion.div
          className="mt-24 border-t border-white border-opacity-[0.08] pt-16 grid md:grid-cols-[2fr_1fr] gap-12 items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-overline text-white opacity-30 mb-4">Looking for something specific?</p>
            <p className="text-white mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Many of these resources originated from real projects, workshops, mentoring conversations, and community initiatives.
            </p>
            <p className="text-body text-white opacity-50">
              If you're looking for something particular, feel free to reach out.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <a href="mailto:uxbyamit@gmail.com"
              className="text-label text-white border border-white border-opacity-30 px-8 py-4 hover:border-opacity-70 hover:bg-white hover:bg-opacity-[0.04] transition-all duration-200 inline-flex items-center gap-3">
              Get in touch →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
