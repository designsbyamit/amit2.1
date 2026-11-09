import { useState } from 'react'
import { motion } from 'framer-motion'
import { reflections, categories } from '../../data/reflections'
import Chip from '../ds/Chip'
import { Tag } from '../ds/Tag'

export default function Reflections() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? reflections.filter((r) => r.category === activeCategory)
    : reflections

  return (
    <section className="section-y hairline-top" id="reflections">
      <div className="container-site">

        {/* Category filter: same chips as Practice */}
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter reflections">
          <Chip pressed={activeCategory === null} onClick={() => setActiveCategory(null)}>All <span className="opacity-60">{reflections.length}</span></Chip>
          {categories.map((cat) => (
            <Chip key={cat} pressed={activeCategory === cat} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}>{cat} <span className="opacity-60">{reflections.filter(r => r.category === cat).length}</span></Chip>
          ))}
        </div>
        <p className="text-label text-ink-3 mb-8 md:mb-10" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}{activeCategory ? ` in ${activeCategory}` : ''}</p>

        {/* The same card as the other hubs: a cover on top, then tag, title, text and a quiet link */}
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((r, i) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="group card !p-0 flex flex-col h-full overflow-hidden hover:bg-surface-1 transition-colors">
                <div className="relative aspect-[16/9] overflow-hidden" style={{ background: 'var(--field-graphite)' }}>
                  {r.image ? (
                    <img src={r.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  ) : (
                    <span className="absolute left-5 top-4 font-mono text-t-tiny tracking-overline uppercase" style={{ color: 'var(--on-field-accent)' }}>{String(i + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span>
                  )}
                </div>
                <div className="p-7 md:p-8 flex flex-col gap-3 flex-1">
                  <div><Tag>{r.category}</Tag></div>
                  <h2 className="text-title text-ink">{r.title}</h2>
                  <p className="text-body text-ink-2 max-w-measure-m">{r.excerpt}</p>
                  <p className="text-label text-ink-3 group-hover:text-ink mt-auto pt-4">Read on Medium<span className="sr-only"> (opens in a new tab)</span> &rarr;</p>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
