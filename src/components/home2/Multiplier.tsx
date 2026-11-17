import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useScene, prefersReduced } from './scene'

/**
 * The dot multiplies. One designer, then the teams I hired (200+), then the community I drive (252+),
 * laid out as a sunflower spiral that grows from the centre. Then it settles and hands over the tools I give away.
 */
const TEAM = 200, HUB = 252
const GOLD = Math.PI * (3 - Math.sqrt(5))
const DOTS = Array.from({ length: HUB }, (_, i) => {
  const r = 3 + 2.75 * Math.sqrt(i + 1), a = (i + 1) * GOLD
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) }
})

const BEATS = [
  { k: 'one', line: 'Good design does not scale on its own.' },
  { k: 'team', line: 'So I build teams.', stat: '200+', label: 'designers hired across organisations' },
  { k: 'hub', line: 'Then a community around them.', stat: '252+', label: 'members in Leading Design Hub India, 14 events this year', to: '/community/design-hub', cta: 'Read the story' },
  { k: 'give', line: 'And I give the tools away.' },
]

const TOOLS = [
  { t: 'Dual Fluency', d: 'A workshop for translating design quality into business outcomes', to: '/resources/dual-fluency' },
  { t: 'Leading Design', d: 'A guide for new and mid-level design managers, in four chapters', to: '/resources/leading-design' },
  { t: 'From AI experiments to a capability', d: 'Building a practice for AI, with ten interns and three months', to: '/leadership/cases/ai-experimentation-to-capability' },
]

export default function Multiplier() {
  const ref = useRef<HTMLElement>(null)
  const [still] = useState(prefersReduced)

  useScene(ref, root => {
    const q = gsap.utils.selector(root)
    const dots = q('.m-d')
    gsap.set(dots, { scale: 0, transformOrigin: '50% 50%' })
    gsap.set(q('.m-beat'), { autoAlpha: 0, y: 30 })
    gsap.set(q('.m-tools > *'), { autoAlpha: 0, y: 24 })

    const show = (k: string, at: number) => tl.to(q(`.m-beat[data-k="${k}"]`), { autoAlpha: 1, y: 0, duration: 0.4, ease: 'expo.out' }, at)
    const hide = (k: string, at: number) => tl.to(q(`.m-beat[data-k="${k}"]`), { autoAlpha: 0, y: -30, duration: 0.3, ease: 'power2.in' }, at)
    const count = (sel: string, to: number, at: number, dur: number) => {
      const el = q(sel)[0] as HTMLElement, o = { v: 0 }
      tl.to(o, { v: to, duration: dur, ease: 'power1.out', onUpdate: () => { el.textContent = `${Math.round(o.v)}+` } }, at)
    }

    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${window.innerHeight * 4}`, pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 } })

    show('one', 0.1)
    tl.from(q('.m-core'), { scale: 0, duration: 0.4, ease: 'back.out(3)' }, 0.1)
    hide('one', 1)
    // teams: the first 200 bloom out of the dot
    show('team', 1.3)
    tl.to(dots.slice(0, TEAM), { scale: 1, duration: 0.25, stagger: { each: 1.3 / TEAM }, ease: 'back.out(2)' }, 1.2)
    count('.m-n-team', 200, 1.2, 1.3)
    hide('team', 2.8)
    // community: the field turns and grows to 252
    show('hub', 3.15)
    tl.to(dots.slice(0, TEAM), { attr: { fill: 'rgb(var(--viz-lead))' }, duration: 0.6, stagger: { each: 0.002, from: 'end' } }, 3)
      .to(dots.slice(TEAM), { scale: 1, attr: { fill: 'rgb(var(--viz-lead))' }, duration: 0.25, stagger: { each: 0.6 / (HUB - TEAM) }, ease: 'back.out(2)' }, 3.1)
      .to(q('.m-field'), { rotate: 40, duration: 1.6, ease: 'none', transformOrigin: '50% 50%' }, 3)
    count('.m-n-hub', 252, 3, 1)
    hide('hub', 4.6)
    // give: the field calms down to a quiet ring and the tools arrive
    show('give', 4.95)
    tl.to(q('.m-field'), { scale: 0.62, opacity: 0.35, duration: 0.8, ease: 'power3.inOut', transformOrigin: '50% 50%' }, 4.8)
      .to(q('.m-tools > *'), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.4, ease: 'expo.out' }, 5.1)
      .to({}, { duration: 0.6 })
  })

  if (still) {
    return (
      <section data-chapter="Teams" className="section-y container-site">
        {BEATS.map(b => <p key={b.k} className="font-serif text-ink mt-6" style={{ fontSize: 'var(--fs-heading)' }}>{b.line} {b.stat && <span className="text-signal-ink">{b.stat} {b.label}</span>}</p>)}
        <ul className="mt-10 grid md:grid-cols-3 gap-6">{TOOLS.map(t => <li key={t.t}><Link to={t.to} className="text-ink underline">{t.t}</Link><p className="text-body-sm text-ink-3">{t.d}</p></li>)}</ul>
      </section>
    )
  }

  return (
    <section ref={ref} data-chapter="Teams" className="relative h-screen overflow-hidden" aria-labelledby="m-h">
      <h2 id="m-h" className="sr-only">Teams, community and tools</h2>
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 'var(--header-h)' }} aria-hidden="true">
        <svg viewBox="0 0 100 100" className="w-[min(96vw,78vh)] aspect-square overflow-visible">
          <g className="m-field">
            {DOTS.map((d, i) => <circle key={i} className="m-d" cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r="0.62" fill="rgb(var(--ink-rgb) / 0.85)" />)}
          </g>
          <circle className="m-core" cx="50" cy="50" r="1.6" fill="rgb(var(--signal-rgb))" />
        </svg>
      </div>

      {/* the words sit low on the screen, over a soft fade, so the field stays the picture */}
      <div className="absolute inset-x-0 bottom-0 pt-24 pb-10 md:pb-14 bg-gradient-to-t from-bg via-bg/90 to-transparent">
        <div className="container-site relative min-h-40 md:min-h-44">
          {BEATS.map(b => (
            <div key={b.k} className="m-beat absolute inset-x-0 bottom-0" data-k={b.k}>
              <p className="font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.05, textWrap: 'balance' }}>{b.line}</p>
              {b.stat && (
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-body-lg text-ink-2">
                  <span className={`font-serif text-signal-ink m-n-${b.k}`} style={{ fontSize: 'var(--fs-heading)' }}>{b.stat}</span>
                  {b.label}
                  {b.to && <Link to={b.to} className="text-label text-ink-2 hover:text-signal-ink underline underline-offset-4">{b.cta}</Link>}
                </p>
              )}
              {b.k === 'give' && (
                <ul className="m-tools mt-6 grid md:grid-cols-3 gap-4 md:gap-8">
                  {TOOLS.map(t => (
                    <li key={t.t}>
                      <Link to={t.to} className="group block border-t pt-3" style={{ borderColor: 'var(--line-2)' }}>
                        <span className="font-serif text-ink group-hover:text-signal-ink" style={{ fontSize: 'var(--fs-title)' }}>{t.t}</span>
                        <span className="block text-body-sm text-ink-3 mt-1">{t.d}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
