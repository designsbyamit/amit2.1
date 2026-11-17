import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import StoryCover from '../ds/StoryCover'
import ResourceCover from '../ds/ResourceCover'
import { gsap, useScene } from './scene'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const practice = cases.find(c => c.slug === 'ai-experimentation-to-capability') ?? cases[0]
const img = (src: string) => <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />

const ITEMS = [
  { kind: 'Community', title: 'Leading Design Hub India', text: '14 events this year, 252+ members and volunteers who own their spaces.', cta: 'Read the story', to: '/community/design-hub',
    visual: img(`${import.meta.env.BASE_URL}images/design-hub/film-poster.webp`) },
  { kind: 'Practice', title: practice.title, text: practice.subtitle, cta: 'Read the case', to: `/leadership/cases/${practice.slug}`,
    visual: <StoryCover motif="culture" tone="teal" className="!rounded-none absolute inset-0 w-full h-full" ratio="16 / 10" /> },
  { kind: 'Workshop', title: 'Build Dual Fluency', text: 'A framework, a vocabulary and a set of tools for translating design quality into business outcomes.', cta: 'View the toolkit', to: '/resources/dual-fluency',
    visual: <div className="absolute inset-0"><ResourceCover bleed title="Dual Fluency" kind="Playbook" motif="loop" tone="cobalt" index={3} /></div> },
  { kind: 'Guide', title: 'Leading Design', text: 'Stories, points and worksheets for new and mid-level design managers, in four chapters.', cta: 'Read the guide', to: '/resources/leading-design',
    visual: <div className="absolute inset-0"><ResourceCover bleed title="Leading Design" kind="Guide" motif="phases" tone="plum" index={1} /></div> },
]

/** Practice, community and teaching as a deck: each card pins and the next one slides over it, the one beneath settling back. */
export default function PracticeStack() {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, root => {
    const cards = gsap.utils.toArray<HTMLElement>('.s-card', root)
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      gsap.to(card.querySelector('.s-inner'), {
        scale: 0.9 + i * 0.02, filter: 'brightness(0.45)', ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 30%', scrub: true },
      })
    })
    gsap.from(root.querySelectorAll('.s-head > *'), { y: 40, opacity: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root, start: 'top 75%' } })
  })

  return (
    <section ref={ref} data-chapter="Practice" className="section-y" aria-labelledby="s-h">
      <div className="container-site">
        <div className="s-head max-w-3xl mb-12 md:mb-20">
          <p className="text-label text-ink-3">Beyond the work</p>
          <h2 id="s-h" className="font-serif text-ink mt-4 font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.05, textWrap: 'balance' }}>What I learn there, I give back.</h2>
          <p className="text-body-lg text-ink-2 mt-5 max-w-xl">A practice for teams, a community for designers in India, and tools anyone can pick up.</p>
        </div>
        <ul className="flex flex-col gap-8">
          {ITEMS.map((it, i) => (
            <li key={it.title} className="s-card sticky" style={{ top: `calc(var(--header-h) + var(--space-20) + ${i} * var(--space-20))` }}>
              <Link to={it.to} className="s-inner group origin-top flex flex-col md:flex-row overflow-hidden rounded-3 border bg-surface-1 shadow-3 will-change-transform" style={{ borderColor: 'var(--line-2)' }}>
                <div className="relative aspect-[16/10] md:aspect-auto md:w-5/12 md:min-h-96 overflow-hidden bg-surface-2">
                  <div className="absolute inset-0 transition-transform group-hover:scale-[1.04]" style={{ transitionDuration: 'var(--dur-slow)' }}>{it.visual}</div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-4 p-6 md:p-12">
                  <p className="text-label text-ink-3"><span className="text-signal-ink">{String(i + 1).padStart(2, '0')}</span> &nbsp;{it.kind}</p>
                  <h3 className="font-serif text-ink" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.12, textWrap: 'balance' }}>{it.title}</h3>
                  <p className="text-body-lg text-ink-2 max-w-lg">{it.text}</p>
                  <span className="inline-flex items-center gap-2 text-label text-ink-2 group-hover:text-signal-ink mt-2">{it.cta} <Arrow /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
