import { brands } from '../../data/brands'

/** A quiet, slowly moving row of the brands I have worked with. Pauses on hover or focus; still and scrollable with reduced motion. */
export default function Brands() {
  const group = (copy: number) => (
    <ul className="flex gap-4 pr-4 shrink-0" aria-hidden={copy === 1 ? true : undefined}>
      {brands.map(b => (
        <li key={b} className="flex items-center justify-center rounded-3 bg-white px-8 h-16 md:h-20 min-w-[11rem]">
          <span className="font-semibold tracking-[-0.01em] whitespace-nowrap" style={{ color: '#14161a', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)' }}>{b}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <section className="section-y hairline-top overflow-hidden" aria-labelledby="brands-h">
      <div className="container-site mb-10 md:mb-12">
        <h2 id="brands-h" className="text-body-lg text-ink-3">Worked with the world&rsquo;s most innovative brands</h2>
      </div>
      <div className="marquee" tabIndex={0} aria-label="Brands" style={{ ['--dur' as string]: `${brands.length * 7}s` }}>
        <div className="marquee-track">{group(0)}{group(1)}</div>
      </div>
    </section>
  )
}
