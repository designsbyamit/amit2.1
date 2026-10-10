import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ds/Button'
import Chip from '../ds/Chip'
import { TagList } from '../ds/Tag'
import ResourceCover from '../ds/ResourceCover'

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
  motif: 'loop' | 'phases' | 'conversation' | 'books' | 'checklist'
  tone: 'cobalt' | 'teal' | 'plum' | 'graphite'
  kind: string
  topics: string[]
}

const resources: Resource[] = [
  {
    id: 'dual-fluency',
    motif: 'loop',
    tone: 'cobalt',
    kind: 'Playbook',
    topics: ['framework', 'business fluency', 'workshop'],
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
    motif: 'phases',
    tone: 'teal',
    kind: 'Playbook',
    topics: ['AI-native', 'agentic', 'frameworks'],
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
    previewLabel: 'Explore the playbook',
    requestAccess: true,
    requestLabel: 'Request PDF playbook',
  },
  {
    id: 'conversation-experience',
    motif: 'conversation',
    tone: 'plum',
    kind: 'Playbook',
    topics: ['conversational UX', 'AI'],
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
    motif: 'books',
    tone: 'graphite',
    kind: 'Reading list',
    topics: ['leadership', 'books'],
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
    motif: 'checklist',
    tone: 'cobalt',
    kind: 'Worksheet',
    topics: ['discovery', 'research'],
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
      <p className="text-overline text-ink-3 mb-6">Articles</p>
      <div className="space-y-0 mb-10">
        {readingItems.articles.map((a, i) => (
          <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
            className="flex gap-6 py-5 border-b border-white border-opacity-[0.07] group hover:bg-surface-1 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-body text-white group-hover:opacity-80 transition-opacity" style={{ fontWeight: 400 }}>{a.title}</p>
              <p className="text-label text-ink-3 mt-1">{a.author} · {a.publication}</p>
            </div>
            <p className="text-body text-ink-3 flex-1 hidden md:block">{a.why}</p>
            <span className="text-ink-3 group-hover:text-white transition-colors self-start pt-1 flex-shrink-0">→</span>
          </a>
        ))}
      </div>
      <p className="text-overline text-ink-3 mb-6">Books</p>
      <div className="grid md:grid-cols-3 gap-4">
        {readingItems.books.map((b, i) => (
          <div key={i} className="card">
            <p className="text-body text-white mb-1" style={{ fontWeight: 400 }}>{b.title}</p>
            <p className="text-label text-ink-3 mb-4">{b.author}</p>
            <p className="text-body text-ink-3">{b.why}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Resource item: sheet cover + summary + actions ─────────────────────────

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const titleId = `res-${resource.id}`
  return (
    <motion.article aria-labelledby={titleId} className="hairline-top py-12 md:py-16 grid-site gap-y-8"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}>
      <div className="col-span-4 sm:col-span-2 md:col-span-3 max-w-[260px]">
        {resource.internalUrl
          ? <Link to={resource.internalUrl} tabIndex={-1} className="block transition-transform duration-300 hover:-translate-y-1"><ResourceCover title={resource.title.split(':')[0]} kind={resource.kind} motif={resource.motif} tone={resource.tone} index={index + 1} /></Link>
          : <ResourceCover title={resource.title.split(':')[0]} kind={resource.kind} motif={resource.motif} tone={resource.tone} index={index + 1} />}
      </div>
      <div className="col-span-4 md:col-span-8 md:col-start-5 flex flex-col gap-5">
        <TagList items={resource.topics} label="Topics" />
        <h2 id={titleId} className="text-heading text-ink max-w-[28ch]">{resource.title}</h2>
        <p className="text-body text-ink-2 max-w-[62ch]">{resource.description}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          {resource.readingList ? (
            <Button variant="secondary" onClick={() => setExpanded(e => !e)} aria-expanded={expanded}>{expanded ? 'Hide the reading list' : 'Show the reading list'}</Button>
          ) : (
            <>
              {resource.internalUrl && <Button to={resource.internalUrl} arrow>{resource.previewLabel || 'Explore'}</Button>}
              {!resource.internalUrl && resource.previewUrl && <Button href={resource.previewUrl} arrow>{resource.previewLabel || 'Preview'}</Button>}
              {resource.requestAccess && <Button variant="secondary" href={makeMailto(resource.title)}>{resource.requestLabel || 'Request access'}</Button>}
            </>
          )}
        </div>
        <AnimatePresence>
          {expanded && resource.readingList && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
              <ReadingListContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filtered = activeFilter === 'All' ? resources : resources.filter(r => r.filterTags.includes(activeFilter))
  return (
    <section className="relative pb-24 md:pb-32" id="resources">
      <div className="container-site">
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter resources">
          {allFilters.map(f => <Chip key={f} pressed={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</Chip>)}
        </div>
        <p className="sr-only" aria-live="polite">{filtered.length} resources shown</p>
        <div>{filtered.map((r, i) => <ResourceCard key={r.id} resource={r} index={i} />)}</div>
        <div className="hairline-top pt-16 mt-4 grid md:grid-cols-[2fr_1fr] gap-10 items-end">
          <div>
            <p className="text-overline text-ink-3 mb-4">Looking for something specific?</p>
            <p className="text-heading text-ink mb-3">Many of these came from real projects, workshops, mentoring conversations and community work.</p>
            <p className="text-body text-ink-2">If you need something particular, reach out.</p>
          </div>
          <div className="flex md:justify-end"><Button variant="secondary" href="mailto:uxbyamit@gmail.com">Get in touch</Button></div>
        </div>
      </div>
    </section>
  )
}
