import { useRef } from 'react'
import { metrics } from '../../data/impact'
import { gsap, useScene } from './scene'

const SHOW = ['Years in design', 'Products and platforms designed end to end', 'Industries and domains', 'Brands and customers', 'Designers hired across organisations', 'Members in the Design Hub community I drive']
const rows = SHOW.map(l => metrics.find(m => m.label === l)!).filter(Boolean)

/** The scale of it, as type: each number counts up as its row crosses the screen, rows drifting in from alternate sides. */
export default function Numbers() {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, root => {
    gsap.utils.toArray<HTMLElement>('.n-row', root).forEach((row, i) => {
      const num = row.querySelector<HTMLElement>('.n-num')!
      const target = parseInt(num.dataset.v ?? '0', 10)
      const suffix = num.dataset.s ?? ''
      const st = { trigger: row, start: 'top 92%', end: 'top 45%', scrub: 0.6 }
      gsap.fromTo(row.querySelector('.n-big'), { xPercent: i % 2 ? 14 : -14, opacity: 0.15 }, { xPercent: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st })
      gsap.from(row.querySelector('.n-label'), { y: 24, opacity: 0, ease: 'power2.out', scrollTrigger: { ...st, start: 'top 80%' } })
      const o = { v: 0 }
      gsap.to(o, { v: target, ease: 'power1.out', scrollTrigger: st, onUpdate: () => { num.textContent = Math.round(o.v).toLocaleString('en-IN') + suffix } })
    })
  })

  return (
    <section ref={ref} data-chapter="Scale" className="section-y hairline-top overflow-hidden" aria-labelledby="n-h">
      <div className="container-site">
        <p className="text-label text-ink-3">In numbers</p>
        <h2 id="n-h" className="sr-only">The work in numbers</h2>
        <ul className="mt-8 md:mt-12">
          {rows.map((m, i) => {
            const v = parseInt(m.value, 10), s = m.value.replace(/[0-9,]/g, '')
            return (
              <li key={m.label} className={`n-row flex flex-col md:flex-row md:items-end gap-2 md:gap-10 py-6 md:py-8 border-b ${i % 2 ? 'md:flex-row-reverse md:text-right' : ''}`} style={{ borderColor: 'var(--line-1)' }}>
                <p className="n-big font-serif text-ink font-light leading-none tabular-nums" style={{ fontSize: 'var(--fs-numeral)' }} aria-label={m.value}>
                  <span className="n-num" data-v={v} data-s={s} aria-hidden="true">{m.value}</span>
                </p>
                <p className="n-label text-body-lg text-ink-2 md:max-w-xs md:pb-[0.6em]">{m.label}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
