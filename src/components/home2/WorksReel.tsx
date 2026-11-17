import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../../data/work'
import CaseThumb from '../ds/CaseThumb'
import { gsap, ScrollTrigger, useScene, prefersReduced } from './scene'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** One card: the live cover moves against the scroll inside its frame, and leans toward the pointer. */
function Card({ id, n }: { id: string; n: number }) {
  const cs = caseStudies.find(c => c.id === id)!
  const lean = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (prefersReduced() || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(e.currentTarget, { rotateY: x * 6, rotateX: -y * 6, duration: 0.6, ease: 'expo.out', transformPerspective: 1200 })
  }
  const rest = (e: React.PointerEvent<HTMLAnchorElement>) => gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'expo.out' })
  return (
    <li className="w-reel-card shrink-0 w-[80vw] md:w-[46vw] lg:w-[36vw]">
      <Link to={`/craft/${cs.id}`} onPointerMove={lean} onPointerLeave={rest} className="group block will-change-transform">
        <div className="relative overflow-hidden rounded-3 bg-surface-1">
          <div className="w-par scale-[1.14]"><CaseThumb id={cs.id} live flush /></div>
        </div>
        <div className="mt-5 flex items-baseline gap-4">
          <span className="text-label text-signal-ink tabular-nums">{String(n).padStart(2, '0')}</span>
          <div className="min-w-0">
            <h3 className="font-serif text-ink group-hover:text-signal-ink transition-colors" style={{ fontSize: 'var(--fs-title)', lineHeight: 1.2 }}>{cs.shortTitle}</h3>
            <p className="text-body-sm text-ink-3 mt-1">{cs.category}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

/** The work, as a reel that slides sideways while you scroll down. */
export default function WorksReel() {
  const ref = useRef<HTMLElement>(null)
  const [still] = useState(prefersReduced)

  useScene(ref, root => {
    const track = root.querySelector<HTMLElement>('.w-track')!
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
    })
    // Counter-motion: each cover drifts the other way inside its frame, which reads as depth.
    root.querySelectorAll<HTMLElement>('.w-par').forEach(el => {
      gsap.fromTo(el, { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: el, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true } })
    })
    // Cards rise into place as they enter from the right.
    root.querySelectorAll<HTMLElement>('.w-reel-card').forEach(el => {
      gsap.from(el, { y: 60, opacity: 0.2, ease: 'power2.out', scrollTrigger: { trigger: el, containerAnimation: slide, start: 'left 100%', end: 'left 70%', scrub: true } })
    })
    gsap.from(root.querySelectorAll('.w-intro > *'), { y: 40, opacity: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root, start: 'top 70%' } })
    ScrollTrigger.refresh()
  })

  return (
    <section ref={ref} data-chapter="Work" className="relative overflow-hidden" aria-labelledby="w-h">
      <div className="h-screen flex flex-col justify-center" style={{ paddingTop: 'var(--header-h)' }}>
        <ul className={`w-track flex items-start gap-6 md:gap-10 pl-[var(--gutter)] md:pl-[12vw] pr-[12vw] ${still ? 'overflow-x-auto snap-x pb-6' : ''}`}>
          <li className="w-intro shrink-0 w-[80vw] md:w-[34vw] self-center pr-4">
            <p className="text-label text-ink-3">Selected work</p>
            <h2 id="w-h" className="font-serif text-ink mt-4 font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.05, textWrap: 'balance' }}>Nine stories from where they meet.</h2>
            <p className="text-body-lg text-ink-2 mt-5 max-w-md">Search, agents, design systems and services for people in supply chains, finance, HR, telecom and travel.</p>
          </li>
          {caseStudies.map((c, i) => <Card key={c.id} id={c.id} n={i + 1} />)}
          <li className="shrink-0 w-[60vw] md:w-[26vw] self-center">
            <Link to="/craft" className="group flex flex-col gap-4 rounded-3 border p-8 hover:bg-surface-1 transition-colors" style={{ borderColor: 'var(--line-2)' }}>
              <span className="font-serif text-ink" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.1 }}>See all the work</span>
              <span className="inline-flex items-center gap-2 text-label text-ink-2 group-hover:text-signal-ink">Open Works <Arrow /></span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
