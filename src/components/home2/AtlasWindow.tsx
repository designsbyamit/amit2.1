import { useRef } from 'react'
import CareerAtlasPreview from '../sections/CareerAtlasPreview'
import { gsap, useScene } from './scene'

/** The career atlas, opened like a window: the frame widens from a slit to full size as you scroll into it. */
export default function AtlasWindow() {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, root => {
    const frame = root.querySelector<HTMLElement>('.a-frame')!
    gsap.fromTo(frame,
      { clipPath: 'inset(18% 22% 18% 22% round 24px)', scale: 0.92 },
      { clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 85%', end: 'top 15%', scrub: 0.8 } })
  })

  return (
    <section ref={ref} data-chapter="Atlas" className="section-y" aria-label="Career atlas">
      <div className="container-site">
        <div className="a-frame will-change-transform">
          <CareerAtlasPreview />
        </div>
      </div>
    </section>
  )
}
