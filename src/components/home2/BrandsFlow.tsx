import { useRef } from 'react'
import { brands } from '../../data/brands'
import { gsap, ScrollTrigger, useScene } from './scene'

const half = Math.ceil(brands.length / 2)
const ROWS = [brands.slice(0, half), brands.slice(half)]

function Row({ names, dir }: { names: string[]; dir: 1 | -1 }) {
  const group = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined}>
      {names.map(b => (
        <li key={b} className="flex items-center">
          <span className="font-serif text-ink-2 hover:text-ink whitespace-nowrap px-6 md:px-10 transition-colors" style={{ fontSize: 'var(--fs-d-l)', lineHeight: 1.2 }}>{b}</span>
          <span className="block w-2 h-2 rounded-full bg-signal opacity-70" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
  return <div className="b-row flex w-max" data-dir={dir}>{group(0)}{group(1)}</div>
}

/** The brands, in two rows that drift in opposite directions and speed up with your scroll, turning when you turn. */
export default function BrandsFlow() {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, root => {
    const rows = gsap.utils.toArray<HTMLElement>('.b-row', root)
    const pos = rows.map(() => 0)
    let boost = 0, turn = 1
    ScrollTrigger.create({
      trigger: root, start: 'top bottom', end: 'bottom top',
      onUpdate: self => { boost = Math.min(Math.abs(self.getVelocity()) / 220, 14); turn = self.direction },
    })
    const tick = (_t: number, dt: number) => {
      boost *= 0.92
      rows.forEach((row, i) => {
        const dir = Number(row.dataset.dir) * turn
        pos[i] = gsap.utils.wrap(-50, 0, pos[i] - dir * (0.012 + boost * 0.004) * dt * 0.06)
        gsap.set(row, { xPercent: pos[i] })
      })
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  })

  return (
    <section ref={ref} data-chapter="Brands" className="section-y hairline-top overflow-hidden" aria-labelledby="b-h">
      <div className="container-site mb-10 md:mb-14">
        <p className="text-label text-ink-3">Brands and customers</p>
        <h2 id="b-h" className="font-serif text-ink mt-4 font-light" style={{ fontSize: 'var(--fs-heading)', lineHeight: 1.15 }}>Done alongside teams at</h2>
      </div>
      <p className="sr-only">{brands.join(', ')}</p>
      <div className="flex flex-col gap-2 md:gap-4" aria-hidden="true">
        <Row names={ROWS[0]} dir={1} />
        <Row names={ROWS[1]} dir={-1} />
      </div>
    </section>
  )
}
