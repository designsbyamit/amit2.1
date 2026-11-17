import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../../data/work'
import { playbackById } from '../../data/playbacks'
import CaseThumb from '../ds/CaseThumb'
import { gsap, useScene, prefersReduced } from './scene'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const ITEMS = caseStudies.map(cs => {
  const pb = playbackById(cs.id)
  return { id: cs.id, title: cs.shortTitle, line: pb?.headline ?? cs.title, metric: pb?.metric, category: cs.category.split(' · ').slice(0, 2).join(' · ') }
})
const N = ITEMS.length
const OPEN = 'circle(75% at 50% 50%)', SHUT = 'circle(0% at 50% 50%)'

/**
 * The work, seen through the dot. The lime dot is a lens: it opens into a project, closes back to a dot, and opens into the next.
 * The headline changes word by word with it. The scroll snaps to each project so it always lands clean.
 */
export default function Proof() {
  const ref = useRef<HTMLElement>(null)
  const [cur, setCur] = useState(0)
  const [still] = useState(prefersReduced)
  // Phones show the still covers, cropped taller; the animated loops are composed for the wide frame.
  const [wide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)

  useScene(ref, root => {
    const q = gsap.utils.selector(root)
    const frames = q('.pf-frame'), texts = q('.pf-text')
    gsap.set(frames, { clipPath: SHUT })
    gsap.set(q('.pf-text .w'), { yPercent: 110, opacity: 0 })
    gsap.set(q('.pf-meta'), { opacity: 0, y: 12 })

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      scrollTrigger: {
        trigger: root, start: 'top top', end: () => `+=${window.innerHeight * N * 0.85}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
        snap: { snapTo: 'labelsDirectional', duration: { min: 0.25, max: 0.7 }, delay: 0.05, ease: 'power2.inOut' },
        onUpdate: s => setCur(Math.min(N - 1, Math.floor(s.progress * N * 0.999))),
      },
    })
    // Intro: the dot arrives and the counter appears.
    tl.from(q('.pf-dot'), { scale: 0, duration: 0.25, ease: 'back.out(3)' }, 0)
    for (let i = 0; i < N; i++) {
      const at = i + 0.05
      const words = texts[i].querySelectorAll('.w'), meta = texts[i].querySelectorAll('.pf-meta')
      tl.to(q('.pf-dot'), { scale: 0, duration: 0.15 }, at)
        .to(frames[i], { clipPath: OPEN, duration: 0.4 }, at)
        .to(words, { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.02, ease: 'expo.out' }, at + 0.1)
        .to(meta, { opacity: 1, y: 0, duration: 0.25 }, at + 0.25)
        .addLabel(`p${i}`, at + 0.45)
      if (i < N - 1) {
        tl.to(words, { yPercent: -110, opacity: 0, duration: 0.25, stagger: 0.01, ease: 'power2.in' }, i + 0.72)
          .to(meta, { opacity: 0, y: -10, duration: 0.15 }, i + 0.72)
          .to(frames[i], { clipPath: SHUT, duration: 0.25, ease: 'power3.in' }, i + 0.75)
          .to(q('.pf-dot'), { scale: 1, duration: 0.12 }, i + 0.92)
      }
    }
    tl.to({}, { duration: 0.3 })
  })

  if (still) {
    return (
      <section data-chapter="Work" className="section-y container-site" aria-labelledby="pf-h">
        <h2 id="pf-h" className="font-serif text-ink" style={{ fontSize: 'var(--fs-d-l)' }}>The work</h2>
        <ul className="mt-10 grid md:grid-cols-2 gap-10">
          {ITEMS.map(it => (
            <li key={it.id}><Link to={`/craft/${it.id}`} className="block"><CaseThumb id={it.id} /><p className="font-serif text-ink mt-4" style={{ fontSize: 'var(--fs-title)' }}>{it.line}</p></Link></li>
          ))}
        </ul>
      </section>
    )
  }

  const it = ITEMS[cur]
  return (
    <section ref={ref} data-chapter="Work" className="relative h-screen overflow-hidden" aria-labelledby="pf-h">
      <div className="container-site h-full grid-site items-center gap-y-6" style={{ paddingTop: 'var(--header-h)' }}>
        {/* the words */}
        <div className="col-span-4 md:col-span-4 lg:col-span-3 order-2 md:order-1 relative self-center">
          <div className="flex items-center gap-4">
            <h2 id="pf-h" className="text-label text-ink-3">The work</h2>
            <span className="text-label text-ink-3 tabular-nums" aria-live="polite"><span className="text-signal-ink">{String(cur + 1).padStart(2, '0')}</span> / {String(N).padStart(2, '0')}</span>
          </div>
          <div className="relative mt-4 md:mt-6 min-h-[26vh] md:min-h-[40vh]">
            {ITEMS.map((x, i) => (
              <div key={x.id} className="pf-text absolute inset-0" aria-hidden={i !== cur}>
                <p className="font-serif text-ink font-light" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.1, textWrap: 'balance' }}>
                  {x.line.split(' ').map((w, k) => <span key={k} className="inline-block overflow-hidden align-bottom pb-[0.1em]"><span className="w inline-block">{w}&nbsp;</span></span>)}
                </p>
                <div className="pf-meta mt-4 md:mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  {x.metric && <p className="text-ink"><span className="font-serif text-signal-ink" style={{ fontSize: 'var(--fs-heading)' }}>{x.metric.value}</span> <span className="text-body-sm text-ink-3">{x.metric.label}</span></p>}
                  <p className="text-label text-ink-3">{x.title} · {x.category}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to={`/craft/${it.id}`} className="pf-cta mt-2 inline-flex items-center gap-2 text-label text-ink-2 hover:text-signal-ink">Open the case <Arrow /></Link>
        </div>

        {/* the lens */}
        <Link to={`/craft/${it.id}`} aria-label={`Open ${it.title}`} className="col-span-4 md:col-span-8 lg:col-span-9 order-1 md:order-2 relative block aspect-[5/4] md:aspect-[18/10] -mx-[var(--gutter)] md:mx-0 md:-mr-[var(--gutter)] md:rounded-l-3 overflow-hidden">
          {ITEMS.map((x, i) => (
            <div key={x.id} className="pf-frame absolute inset-0">
              <CaseThumb id={x.id} live={wide && i === cur} flush className="w-full h-full" />
            </div>
          ))}
          <span className="pf-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-6 h-6 rounded-full bg-signal pointer-events-none" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
