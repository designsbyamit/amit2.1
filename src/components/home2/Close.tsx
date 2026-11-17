import { useRef } from 'react'
import Button from '../ds/Button'
import { gsap, useScene } from './scene'

/** The last beat: the dot comes back as the full stop of the question. */
export default function Close() {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, root => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 70%' } })
    tl.from(root.querySelectorAll('.c-w'), { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.06 })
      .from(root.querySelector('.c-dot'), { scale: 0, duration: 0.9, ease: 'back.out(3)' }, '-=0.6')
      .from(root.querySelectorAll('.c-after > *'), { y: 20, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, '-=0.5')
  })

  const words = ['What', 'should', 'we', 'build', 'next']
  return (
    <section ref={ref} data-chapter="Next" className="section-y hairline-top" aria-labelledby="c-h">
      <div className="container-site py-12 md:py-24">
        <h2 id="c-h" className="font-serif text-ink font-light" style={{ fontSize: 'var(--fs-d-2xl)', lineHeight: 1.02, letterSpacing: 'var(--track-tighter)' }} aria-label="What should we build next?">
          {words.map((w, i) => (
            <span key={w} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.06em]">
              <span className="c-w inline-block">{w}{i < words.length - 1 ? ' ' : ''}</span>
            </span>
          ))}
          <span aria-hidden="true" className="c-dot inline-block rounded-full bg-signal ml-[0.04em] w-[0.15em] h-[0.15em]" />
        </h2>
        <div className="c-after mt-10 md:mt-14 flex flex-col gap-8">
          <p className="text-body-lg text-ink-2 max-w-xl">If you are building with AI and want design to lead, not follow, I would like to hear about it.</p>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" arrow>Start a conversation</Button>
            <Button to="/about" variant="secondary">More about me</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
