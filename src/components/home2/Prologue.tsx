import { useRef, useState } from 'react'
import { gsap, useScene, prefersReduced } from './scene'

/**
 * The opening, one continuous scene pinned while you scroll.
 * A single lime dot is the protagonist: it is the full stop of "Hello", it carries the line about what I do,
 * the three forces grow out of it, and they meet in it again.
 *
 *  Act 1  Hello.                      the greeting
 *  Act 2  What I do                   two lines, the dot between them
 *  Act 3  Three forces                human behaviour, business systems, AI grow out of the dot
 *  Act 4  They meet                   the shapes converge on the dot
 *  Act 5  What it shapes              three outcomes radiate from the meeting point
 */

const HELLO = 'Hello'
const LEAD = 'Software is learning to think.'
const LEAD2 = 'It still has to learn people.'
const SUB = 'That gap is my work. Design leader at SAP Labs, 16+ years in.'

const FORCES = [
  { k: 'c', n: '01', name: 'People', gloss: 'How we think, decide and work.', hue: '--viz-des', pos: 'left-0 top-0 text-left', off: [-23, -15] },
  { k: 's', n: '02', name: 'Systems', gloss: 'How a business actually runs.', hue: '--viz-lead', pos: 'right-0 top-0 text-right', off: [23, -15] },
  { k: 't', n: '03', name: 'Intelligence', gloss: 'What machines can now do.', hue: '--viz-res', pos: 'left-1/2 -translate-x-1/2 bottom-0 text-center', off: [0, 19] },
] as const

const OUTCOMES = [
  { t: 'Work gets simpler.', end: [10, 88], pos: 'left-0 bottom-0 text-left' },
  { t: 'Products get smarter.', end: [90, 88], pos: 'right-0 bottom-0 text-right' },
  { t: 'Value lasts.', end: [50, 4], pos: 'left-1/2 -translate-x-1/2 top-0 text-center' },
] as const

const stroke = (hue: string) => `rgb(var(${hue}))`

function Shapes() {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
      {/* rays to the outcomes, drawn last */}
      {OUTCOMES.map((o, i) => (
        <line key={i} className="p-ray" x1="50" y1="50" x2={o.end[0]} y2={o.end[1]} pathLength={1} strokeDasharray="1" strokeDashoffset="1"
          stroke="rgb(var(--signal-rgb) / 0.5)" strokeWidth="0.2" />
      ))}
      <g className="p-shape" data-k="c">
        <circle className="p-draw" cx="50" cy="50" r="16" fill={stroke('--viz-des')} fillOpacity={0} stroke={stroke('--viz-des')} strokeWidth="0.32" pathLength={1} />
      </g>
      <g className="p-shape" data-k="s">
        <rect className="p-draw" x="36" y="36" width="28" height="28" fill={stroke('--viz-lead')} fillOpacity={0} stroke={stroke('--viz-lead')} strokeWidth="0.32" pathLength={1} />
      </g>
      <g className="p-shape" data-k="t">
        <polygon className="p-draw" points="50,30.4 67,59.8 33,59.8" fill={stroke('--viz-res')} fillOpacity={0} stroke={stroke('--viz-res')} strokeWidth="0.32" strokeLinejoin="round" pathLength={1} />
      </g>
      {/* ripples off the dot */}
      {[0, 1, 2].map(i => <circle key={i} className="p-ring" cx="50" cy="50" r="4" fill="none" stroke="rgb(var(--signal-rgb) / 0.6)" strokeWidth="0.18" opacity="0" />)}
      {/* the meeting point */}
      <circle className="p-halo" cx="50" cy="50" r="4" fill="rgb(var(--signal-rgb) / 0.09)" />
      <circle className="p-core" cx="50" cy="50" r="1.6" fill="rgb(var(--signal-rgb))" />
    </svg>
  )
}

export default function Prologue() {
  const ref = useRef<HTMLElement>(null)
  const [still] = useState(prefersReduced)

  useScene(ref, root => {
    const q = gsap.utils.selector(root)
    const stage = q('.p-stage')[0] as HTMLElement
    const field = q('.p-field')[0] as HTMLElement
    const anchor = q('.p-anchor')[0] as HTMLElement
    const mover = q('.p-mover')[0] as HTMLElement
    const shapes = q('.p-shape') as unknown as SVGGElement[]
    const draws = q('.p-draw')

    // Where the full stop has to travel: from its place after "Hello" to the centre of the field, shrinking to the core's size.
    const toCentre = () => {
      const d = anchor.getBoundingClientRect(), f = field.getBoundingClientRect()
      return { x: f.left + f.width / 2 - (d.left + d.width / 2), y: f.top + f.height / 2 - (d.top + d.height / 2), s: (f.width * 0.032) / d.width }
    }

    // Resting state before the scroll starts.
    gsap.set(q('.p-lead .w, .p-lead2 .w'), { opacity: 0.06, yPercent: 30 })
    gsap.set(q('.p-sub'), { opacity: 0 })
    gsap.set(q('.p-what'), { autoAlpha: 0 })
    gsap.set(q('.p-core, .p-halo'), { autoAlpha: 0, transformOrigin: '50% 50%' })
    gsap.set(draws, { strokeDasharray: 1, strokeDashoffset: 1 })
    shapes.forEach((g, i) => gsap.set(g, { x: FORCES[i].off[0], y: FORCES[i].off[1], scale: 0.2, transformOrigin: '50% 50%', autoAlpha: 0 }))
    gsap.set(q('.p-label, .p-meet, .p-out, .p-caption'), { autoAlpha: 0, y: 16 })
    gsap.set(q('.p-beam'), { scaleX: 0, rotate: 0, transformOrigin: '0% 50%' })

    // The greeting arrives on its own, before any scroll.
    gsap.from(q('.p-ch'), { yPercent: 110, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.07, delay: 0.15 })
    gsap.from(q('.p-dot'), { scale: 0, duration: 1.1, ease: 'back.out(3)', delay: 0.75 })
    gsap.from(q('.p-hi-sub'), { opacity: 0, y: 14, duration: 1, ease: 'expo.out', delay: 1 })
    gsap.to(q('.p-cue'), { opacity: 1, duration: 1, delay: 1.6 })

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
    })

    // Act 1 → 2: the letters lift away; the full stop glides to the centre and becomes the dot.
    tl.addLabel('hello')
      .to(q('.p-cuew'), { autoAlpha: 0, duration: 0.3 }, 0)
      .to(q('.p-chw'), { yPercent: -120, opacity: 0, filter: 'blur(8px)', stagger: 0.06, duration: 0.9, ease: 'power2.in' }, 0)
      .to(q('.p-hi-subw'), { opacity: 0, y: -20, duration: 0.6 }, 0)
      .to(mover, { x: () => toCentre().x, y: () => toCentre().y, scale: () => toCentre().s, duration: 1.3, ease: 'power3.inOut' }, 0.15)
      .set(mover, { autoAlpha: 0 }, 1.45)
      .set(q('.p-core'), { autoAlpha: 1 }, 1.45)

    // Act 2: what I do, written in around the dot, word by word.
      .addLabel('what', 1.5)
      .set(q('.p-what'), { autoAlpha: 1 }, 'what')
      .to(q('.p-lead .w'), { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.4, ease: 'power2.out' }, 'what')
      .to(q('.p-lead2 .w'), { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.4, ease: 'power2.out' }, 'what+=0.9')
      .to(q('.p-sub'), { opacity: 1, duration: 0.5, ease: 'none' }, 'what+=1.7')
      .to(q('.p-core'), { scale: 1.5, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 'what+=0.4')
      .fromTo(q('.p-ring'), { scale: 0.4, opacity: 0.9, transformOrigin: '50% 50%' }, { scale: 7, opacity: 0, duration: 1.4, stagger: 0.35, ease: 'power2.out' }, 'what+=0.1')
      .to(q('.p-what'), { autoAlpha: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 'what+=2.6')

    // Act 3: three forces grow out of the dot, each drawn as it arrives.
      .addLabel('forces', 4.4)
    shapes.forEach((g, i) => {
      const at = 4.4 + i * 0.7
      tl.to(g, { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, at)
        .to(draws[i], { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' }, at + 0.05)
        .to(q('.p-label')[i], { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, at + 0.4)
    })

    // Act 4: they move together and meet in the dot.
    tl.addLabel('meet', 7.4)
      .to(q('.p-label'), { autoAlpha: 0, y: -12, duration: 0.5, stagger: 0.05 }, 'meet')
      .to(shapes, { x: 0, y: 0, duration: 1.5, ease: 'power3.inOut' }, 'meet+=0.2')
      .to(draws, { attr: { 'fill-opacity': 0.04 }, duration: 0.8 }, 'meet+=1.1')
      .to(q('.p-halo'), { autoAlpha: 1, scale: 2.6, duration: 1, ease: 'expo.out' }, 'meet+=1.4')
      .to(q('.p-core'), { scale: 1.9, duration: 1, ease: 'expo.out' }, 'meet+=1.4')
      .to(q('.p-meet'), { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 'meet+=1.5')

    // Act 5: what that meeting point shapes, radiating out of it.
      .addLabel('shapes', 9.6)
      .to(q('.p-ray'), { strokeDashoffset: 0, duration: 0.9, stagger: 0.25, ease: 'power2.out' }, 'shapes')
      .to(q('.p-out'), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.25, ease: 'power2.out' }, 'shapes+=0.5')
      .to(q('.p-caption'), { autoAlpha: 1, y: 0, duration: 0.7 }, 'shapes+=1.3')
      .to(q('.p-halo'), { scale: 3.2, duration: 1.4, ease: 'sine.inOut' }, 'shapes')

    // Exit: a slow push into the meeting point, handing over to the work.
      .addLabel('fire', 'shapes+=2.6')
      .to(q('.p-out, .p-caption, .p-meet'), { autoAlpha: 0, duration: 0.3 }, 'fire')
      .to(q('.p-shape, .p-ray, .p-halo'), { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: 'power3.in' }, 'fire')
      .to(q('.p-beam'), { scaleX: 1, duration: 0.5, ease: 'expo.in' }, 'fire+=0.3')
      .to(q('.p-beam'), { rotate: (i: number) => (i - 3) * 9, duration: 0.6, ease: 'expo.out' }, 'fire+=0.85')
      .to(q('.p-beam'), { opacity: (i: number) => (i === 3 ? 1 : 0.35), duration: 0.3 }, 'fire+=0.85')
      .to(stage, { autoAlpha: 0, duration: 0.25, ease: 'none' }, 'fire+=1.5')

    // Ambient life: the halo breathes while the scene is held.
    gsap.to(q('.p-ambient'), { backgroundPosition: '60% 40%', duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  })

  const lead = LEAD.split(' ')

  if (still) {
    // Reduced motion: the finished composition, no pinning.
    return (
      <section data-chapter="Hello" className="container-site pt-[calc(var(--header-h)+var(--space-60))] pb-24 text-center">
        <h1 className="font-serif text-ink leading-none tracking-tightest font-light" style={{ fontSize: 'var(--fs-mega)' }}>Hello<span className="text-signal-ink">.</span></h1>
        <p className="text-body-lg text-ink-2 mt-6">I&rsquo;m Amit, a design leader at SAP Labs.</p>
        <p className="font-serif text-ink mt-16 mx-auto max-w-4xl" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.1 }}>{LEAD}</p>
        <p className="font-serif text-ink mt-2 mx-auto max-w-4xl" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.1 }}>{LEAD2}</p>
        <p className="text-body-lg text-ink-2 mt-5">{SUB}</p>
        <p className="text-body-lg text-ink-2 mt-16 mx-auto max-w-2xl">Advancing the convergence of human behaviour, business systems, and artificial intelligence to shape how people work, how products evolve, and how businesses create lasting value.</p>
      </section>
    )
  }

  return (
    <section ref={ref} data-chapter="Hello" className="relative" style={{ height: '820vh' }} aria-label="Introduction">
      <div className="p-stage sticky top-0 h-screen overflow-hidden">
        <div className="p-ambient h2-ambient absolute inset-0" aria-hidden="true" />

        {/* Act 1: the greeting */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ paddingTop: 'var(--header-h)' }}>
          <h1 className="font-serif text-ink leading-none font-light tracking-tightest whitespace-nowrap" style={{ fontSize: 'var(--fs-mega)' }} aria-label="Hello. I'm Amit.">
            <span aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em]">
              {HELLO.split('').map((c, i) => <span key={i} className="p-chw inline-block"><span className="p-ch inline-block">{c}</span></span>)}
            </span>
            {/* anchor (never moves, used for measuring) > mover (scroll) > dot (entrance pop) */}
            <span aria-hidden="true" className="p-anchor relative inline-block align-baseline ml-[0.03em] w-[0.16em] h-[0.16em]">
              <span className="p-mover absolute inset-0"><span className="p-dot absolute inset-0 rounded-full bg-signal" /></span>
            </span>
          </h1>
          <div className="p-hi-subw"><p className="p-hi-sub text-body-lg text-ink-2 mt-6 text-center">I&rsquo;m Amit, a design leader at SAP Labs.</p></div>
          <p className="p-cuew absolute bottom-10 left-1/2 -translate-x-1/2 text-label text-ink-3"><span className="p-cue opacity-0 flex flex-col items-center gap-3">
            Scroll
            <span className="h2-cue-line block w-px h-10 bg-ink-3" aria-hidden="true" />
          </span></p>
        </div>

        {/* Acts 2 to 5 share one centred field: the shapes, their labels and the outcomes */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 'var(--header-h)' }}>
          <div className="p-field relative w-[min(84vw,56vh)] aspect-square">
            <Shapes />
            {/* the beam the dot fires on the way out, which fans into rays */}
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} aria-hidden="true" className="p-beam absolute left-1/2 top-1/2 h-px w-[120vw] origin-left bg-signal pointer-events-none" style={{ transform: 'scaleX(0)' }} />
            ))}

            {/* Act 2 */}
            <div className="p-what absolute inset-0 pointer-events-none">
              <p className="p-lead absolute -inset-x-2 md:inset-x-[-18%] bottom-[56%] text-center font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.08, textWrap: 'balance' }}>
                {lead.map((w, i) => <span key={i} className="w inline-block">{w}{i < lead.length - 1 ? ' ' : ''}</span>)}
              </p>
              <p className="p-lead2 absolute -inset-x-2 md:inset-x-[-18%] top-[56%] text-center font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.08, textWrap: 'balance' }}>
                {LEAD2.split(' ').map((w, i, a) => <span key={i} className="w inline-block">{w}{i < a.length - 1 ? '\u00a0' : ''}</span>)}
              </p>
              <p className="p-sub absolute inset-x-0 md:inset-x-[-10%] top-[94%] text-center text-body text-ink-3">{SUB}</p>
            </div>

            {/* Act 3 labels */}
            {FORCES.map(f => (
              <div key={f.k} className={`p-label absolute max-w-[46%] ${f.pos} pointer-events-none`}>
                <p className="text-label" style={{ color: `rgb(var(${f.hue}))` }}>{f.n}</p>
                <p className={`font-serif text-ink mt-1 ${f.k === 't' ? 'whitespace-nowrap' : ''}`} style={{ fontSize: 'var(--fs-title)', lineHeight: 1.15 }}>{f.name}</p>
                <p className="text-body-sm text-ink-3 mt-1 hidden md:block">{f.gloss}</p>
              </div>
            ))}

            {/* Act 5 outcomes */}
            {OUTCOMES.map(o => (
              <p key={o.t} className={`p-out absolute max-w-[46%] ${o.pos} font-serif text-ink pointer-events-none`} style={{ fontSize: 'var(--fs-title)', lineHeight: 1.15, textWrap: 'balance' }}>{o.t}</p>
            ))}
          </div>
        </div>

        {/* Act 4 headline and the closing caption sit outside the field */}
        <p className="p-meet absolute inset-x-0 top-[calc(var(--header-h)+var(--space-20))] text-center font-serif text-ink px-6" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.15 }}>
          I design where they meet.
        </p>
        <p className="p-caption absolute inset-x-0 bottom-6 md:bottom-8 mx-auto max-w-2xl px-6 text-center text-body-sm text-ink-3">
          Advancing the convergence of human behaviour, business systems, and artificial intelligence to shape how people work, how products evolve, and how businesses create lasting value.
        </p>
      </div>
    </section>
  )
}
