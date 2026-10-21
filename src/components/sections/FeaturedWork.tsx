import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../../data/work'
import { playbacks } from '../../data/playbacks'
import ProjectCard from '../playback/ProjectCard'

const EDGE = 'max(var(--gutter), calc((100% - var(--container)) / 2))'

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}><path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** Selected work as a swipeable carousel: large covers, impact-led headlines. Swipe on a phone, arrows or arrow keys on a computer. */
export default function FeaturedWork() {
  const items = playbacks
    .filter(p => p.featured)
    .map(p => ({ pb: p, cs: caseStudies.find(c => c.id === p.id)! }))
    .filter(x => x.cs)
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = useCallback(() => {
    const el = track.current
    if (!el) return
    const kids = Array.from(el.children) as HTMLElement[]
    const left = el.scrollLeft
    let best = 0
    let dist = Infinity
    kids.forEach((k, i) => { const d = Math.abs(k.offsetLeft - el.offsetLeft - left); if (d < dist) { dist = d; best = i } })
    setActive(best)
  }, [])
  useEffect(() => { onScroll() }, [onScroll])

  const to = (i: number) => {
    const el = track.current
    if (!el) return
    const k = el.children[Math.max(0, Math.min(items.length - 1, i))] as HTMLElement | undefined
    if (k) el.scrollTo({ left: k.offsetLeft - el.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <section className="section-y hairline-top" id="selected-work" aria-roledescription="carousel" aria-label="Selected work">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <h2 className="text-display-l text-ink">Selected work</h2>
          <div className="hidden sm:flex items-center gap-3">
            <button type="button" className="btn btn-ghost !px-3" onClick={() => to(active - 1)} disabled={active === 0} aria-label="Previous project"><Chevron flip /></button>
            <button type="button" className="btn btn-ghost !px-3" onClick={() => to(active + 1)} disabled={active === items.length - 1} aria-label="Next project"><Chevron /></button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={onScroll}
        onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); to(active + 1) } else if (e.key === 'ArrowLeft') { e.preventDefault(); to(active - 1) } }}
        className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: EDGE, scrollPaddingInline: EDGE }}
      >
        {items.map(({ pb, cs }, i) => (
          <li key={cs.id} className="snap-start shrink-0 basis-[88%] md:basis-[62%] list-none" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
            <ProjectCard cs={cs} pb={pb} />
          </li>
        ))}
      </ul>

      <div className="container-site mt-8 flex items-center justify-between gap-6">
        <div className="flex gap-2" role="tablist" aria-label="Choose a project">
          {items.map(({ cs }, i) => (
            <button key={cs.id} type="button" role="tab" aria-selected={i === active} aria-label={`Project ${i + 1}`} onClick={() => to(i)}
              className="h-1.5 rounded-full transition-all" style={{ width: i === active ? 28 : 10, background: i === active ? 'var(--signal)' : 'var(--line-2)' }} />
          ))}
        </div>
        <Link to="/craft" className="btn btn-ghost">See all work</Link>
      </div>
    </section>
  )
}
