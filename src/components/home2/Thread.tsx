import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReduced } from './scene'

/** Must match the data-chapter names on the page's sections, in order. */
const CHAPTERS = ['Hello', 'Work', 'Practice', 'Scale', 'Atlas', 'Brands', 'Next']
const find = (name: string) => document.querySelector<HTMLElement>(`[data-chapter="${name}"]`)

/** The thread that holds the story together: a quiet rail on the left with the chapters and a line that fills as you read.
 *  Click a chapter to go to it. Desktop only; on phones the site's own progress line does this job. */
export default function Thread() {
  const [active, setActive] = useState(0)
  const fill = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const els = CHAPTERS.map(find).filter((el): el is HTMLElement => !!el)
    const triggers = els.map((el, i) => ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && setActive(i) }))
    const line = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => fill.current && gsap.set(fill.current, { scaleY: s.progress }) })
    return () => { triggers.forEach(t => t.kill()); line.kill() }
  }, [])

  const go = (name: string) => { const el = find(name); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: prefersReduced() ? 'auto' : 'smooth' }) }

  return (
    <nav aria-label="Chapters" className="hidden lg:flex fixed left-3 xl:left-5 top-1/2 -translate-y-1/2 z-30 items-stretch">
      <span className="absolute left-1 top-1 bottom-1 w-px bg-[var(--line-2)]" aria-hidden="true">
        <span ref={fill} className="absolute inset-0 origin-top bg-signal" style={{ transform: 'scaleY(0)' }} />
      </span>
      <ol className="relative flex flex-col gap-4">
        {CHAPTERS.map((c, i) => (
          <li key={c}>
            <button type="button" onClick={() => go(c)} aria-current={i === active ? 'step' : undefined} aria-label={`Go to ${c}`}
              className="group relative flex items-center w-2.5 h-2.5 justify-center">
              <span className={`block w-1.5 h-1.5 rounded-full transition-transform ${i === active ? 'bg-signal scale-150' : 'bg-ink-3 group-hover:bg-ink'}`} aria-hidden="true" />
              <span className="absolute left-5 whitespace-nowrap rounded-full bg-surface-2 px-2.5 py-1 text-label text-ink opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 pointer-events-none shadow-2">{c}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
