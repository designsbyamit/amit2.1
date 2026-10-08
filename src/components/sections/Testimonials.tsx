import { motion } from 'framer-motion'
import type { Testimonial } from '../../data/testimonials'

/** A set of quotes. First quote is set large; the rest sit in a grid. */
export default function Testimonials({ label, title, items }: { label: string; title: string; items: Testimonial[] }) {
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
