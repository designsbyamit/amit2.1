import { Suspense, lazy, useState, type ElementType } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { heroClass, heroStyle } from '../data/caseTheme'
import VideoModal from '../components/ui/VideoModal'
import { Spectrum } from '../components/story/Spectrum'
import { caseStudies } from '../data/work'
import { storyById, type Beat, type StoryVisual } from '../data/stories'
import { films } from '../data/films'

const Embed = lazy(() => import('../components/playback/Embeds'))
const Diagram = lazy(() => import('../components/story/StoryVisuals'))

const ease = [0.16, 1, 0.3, 1] as const

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** A statement that rises word by word, in rhythm, once. Reduced motion shows it set. */
function Words({ text, as: Tag = 'h2', className = '', style, id, delay = 0 }: { text: string; as?: ElementType; className?: string; style?: React.CSSProperties; id?: string; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <Tag id={id} className={className} style={style}>{text}</Tag>
  const words = text.split(' ')
  return (
    <Tag id={id} className={className} style={style} aria-label={text}>
      <motion.span className="block" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-8%' }}>
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
            <motion.span className="inline-block" variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 0.8, delay: delay + i * 0.035, ease } } }}>
              {w}
            </motion.span>
          </span>
        )).flatMap((el, i) => i ? [' ', el] : [el])}
      </motion.span>
    </Tag>
  )
}

const Fallback = () => <div className="rounded-3 bg-surface-2" style={{ aspectRatio: '16 / 7' }} />

function Visual({ v }: { v: StoryVisual }) {
  const body = v.kind === 'embed'
    ? <Suspense fallback={<Fallback />}><Embed name={v.name} /></Suspense>
    : v.kind === 'diagram'
      ? <Suspense fallback={<Fallback />}><Diagram name={v.name} /></Suspense>
      : <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-1)' }}><img src={v.src} alt={v.alt} loading="lazy" decoding="async" className="w-full h-auto block" /></div>
  return (
    <figure>
      {body}
      {v.caption && <figcaption className="text-body-sm text-ink-3 mt-3 max-w-2xl">{v.caption}</figcaption>}
    </figure>
  )
}

/**
 * The short story, v2. One highlight per case, argued in a few beats.
 * First screen: headline, one line, one still. Each beat: a statement, a short body, one visual. The nuance beat is set largest.
 */
export default function StoryPage() {
  const { id } = useParams<{ id: string }>()
  const cs = caseStudies.find(c => c.id === id)
  const st = id ? storyById(id) : undefined
  const [watching, setWatching] = useState(false)
  const reduce = useReducedMotion()
  if (!cs || !st) return <Navigate to="/craft" replace />

  const film = films[cs.id]
  const n = st.beats.length

  const beat = (b: Beat, i: number) => (
    <section key={b.statement} className={`hairline-top section-y md:min-h-screen flex flex-col justify-center ${b.nuance ? 'bg-surface-1' : ''}`} aria-labelledby={`beat-${i}`}>
      <div className="container-site w-full">
        <div className="flex items-center gap-4">
          <p className="text-label text-ink-3 tabular-nums"><span className="text-signal-ink">{String(i + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}</p>
          {b.nuance && <p className="text-label text-signal-ink">The nuance</p>}
        </div>
        {b.spectrum !== undefined && <div className="mt-6 max-w-md"><Spectrum at={b.spectrum} faintEnd={b.spectrum < 0.9} /></div>}
        <Words id={`beat-${i}`} text={b.statement} className="font-serif font-light text-ink mt-6 max-w-5xl"
          style={{ fontSize: b.nuance ? 'var(--fs-d-l)' : 'var(--fs-heading)', lineHeight: b.nuance ? 1.04 : 1.12, letterSpacing: 'var(--track-title)', textWrap: 'balance' }} />
        <p className="text-body-lg text-ink-2 mt-6 max-w-2xl">{b.body}</p>
        {b.link && <p className="mt-5"><Link to={b.link.to} className="link-arrow inline-flex items-center gap-2 text-body text-ink underline underline-offset-4">{b.link.label} <Arrow /></Link></p>}
        <div className="mt-10 md:mt-14"><Visual v={b.visual} /></div>
        {b.note && <p className="text-body-sm text-ink-3 mt-6 max-w-2xl">{b.note}</p>}
      </div>
    </section>
  )

  return (
    <article className="story-v">
      {/* ── first screen: the headline, one line, one still ── */}
      <header className={heroClass(cs.id)} style={{ paddingTop: 'var(--header-h)', ...heroStyle(cs.id) }}>
        <div className="container-site pt-12 md:pt-20 pb-14 md:pb-20">
          <Words as="h1" text={st.headline} className="font-serif font-light text-ink max-w-5xl"
            style={{ fontSize: 'var(--fs-page-title)', lineHeight: 1.06, letterSpacing: 'var(--track-title)', textWrap: 'balance' }} />
          <motion.p className="text-body-lg text-ink-2 mt-6 md:mt-8 max-w-2xl" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>{st.line}</motion.p>
          <div className="mt-10 md:mt-14">
            {st.still.diagram
              ? <div role="img" aria-label={st.still.alt}><Suspense fallback={<Fallback />}><Diagram name={st.still.diagram} /></Suspense></div>
              : <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-1)', aspectRatio: '1600 / 900' }}><img src={st.still.src} alt={st.still.alt} decoding="async" className="w-full h-full object-cover block" /></div>}
          </div>
        </div>
      </header>

      {st.beats.map(beat)}

      {/* ── the ending: where it stands, the role, where to go next ── */}
      <section className="hairline-top section-y" aria-labelledby="ending">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <p className="text-label text-signal-ink">{st.ending.label}</p>
            <Words id="ending" text={st.ending.stands} className="font-serif font-light text-ink mt-5" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.15, textWrap: 'balance' }} />
            {st.ending.delivered && <p className="text-body-lg text-ink-2 mt-6 max-w-xl">{st.ending.delivered}</p>}
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-9 md:pt-10">
            <p className="text-label text-ink-3">My role</p>
            <p className="text-body-lg text-ink mt-3">{st.ending.role}</p>
          </div>
          <div className="col-span-4 md:col-span-12 flex flex-wrap items-center gap-3 pt-4">
            {film && <button type="button" onClick={() => setWatching(true)} className="btn btn-secondary">Watch the film</button>}
            <Link to={`/craft/${cs.id}/details`} className="btn btn-primary">Read the full case <Arrow /></Link>
          </div>
        </div>
      </section>
      {watching && film && <VideoModal src={film.to} title={film.title} onClose={() => setWatching(false)} />}
    </article>
  )
}
