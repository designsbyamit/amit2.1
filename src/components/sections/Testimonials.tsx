import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Testimonial } from '../../data/testimonials'

/** A set of quotes. First quote is set large; the rest sit in a grid. */
const Caption = ({ t }: { t: Testimonial }) => (
  <figcaption className="mt-6">
    <p className="text-body-sm text-white">{t.name}</p>
    <p className="text-caption text-ink-3">{t.role}{t.source === 'ADPList' && t.url ? <> · <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">via ADPList</a></> : null}</p>
  </figcaption>
)

/** A continuous, looping row of tall quote cards. Pauses on hover, focus or the pause button. */
function Rotator({ label, title, items }: { label: string; title: string; items: Testimonial[] }) {
  const [paused, setPaused] = useState(false)
  const group = (copy: number) => (
    <ul className="flex gap-6 pr-6 shrink-0" aria-hidden={copy === 1 ? true : undefined}>
      {items.map(t => (
        <li key={t.name} className="card !p-7 md:!p-8 flex flex-col justify-between w-[300px] sm:w-[360px] lg:w-[400px] min-h-[380px] md:min-h-[420px]">
          <blockquote className="text-body-lg text-ink-2" style={{ lineHeight: 1.5 }}>“{t.quote}”</blockquote>
          <Caption t={t} />
        </li>
      ))}
    </ul>
  )
  return (
    <section className="section-y hairline-top overflow-hidden" aria-label={title}>
      <div className="container-site">
        <header className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-overline text-ink-3">{label}</p>
          <h2 className="text-display-l text-white mt-4">{title}</h2>
        </header>
      </div>
      <div className="marquee" data-paused={paused} style={{ ['--dur' as string]: `${items.length * 11}s` }} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="marquee-track">{group(0)}{group(1)}</div>
      </div>
      <div className="container-site mt-8 flex justify-end">
        <button type="button" onClick={() => setPaused(v => !v)} aria-pressed={paused} className="text-label text-ink-3 hover:text-white">{paused ? 'Play' : 'Pause'}</button>
      </div>
    </section>
  )
}

export default function Testimonials({ label, title, items, rotate }: { label: string; title: string; items: Testimonial[]; rotate?: boolean }) {
  if (rotate && items.length > 1) return <Rotator label={label} title={title} items={items} />
  // A quote is only set large if it is short enough to read as a statement.
  const shortest = [...items].sort((a, b) => a.quote.length - b.quote.length)[0]
  const lead = shortest.quote.length <= 160 ? shortest : null
  const rest = items.filter(t => t !== lead)
  return (
    <section className="section-y hairline-top">
      <div className="container-site">
        <header className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-overline text-ink-3">{label}</p>
          <h2 className="text-display-l text-white mt-4">{title}</h2>
        </header>

        {lead && (
          <motion.figure
            className="max-w-4xl mb-14 md:mb-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="text-heading text-white" style={{ fontWeight: 300, lineHeight: 1.35 }}>“{lead.quote}”</blockquote>
            <figcaption className="mt-6">
              <p className="text-body-sm text-white">{lead.name}</p>
              <p className="text-caption text-ink-3">{lead.role}{lead.source === 'ADPList' && lead.url ? <> · <a href={lead.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">via ADPList</a></> : null}</p>
            </figcaption>
          </motion.figure>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((t, i) => (
            <motion.figure
              key={t.name}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="text-body text-ink-2">“{t.quote}”</blockquote>
              <figcaption className="mt-5">
                <p className="text-body-sm text-white">{t.name}</p>
                <p className="text-caption text-ink-3">{t.role}{t.source === 'ADPList' && t.url ? <> · <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">via ADPList</a></> : null}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
