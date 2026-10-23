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
    <section className="relative bg-black section-y px-6 md:px-12 overflow-hidden" id="reflections">
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Category filter: same chips as Practice */}
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter reflections">
          <Chip pressed={activeCategory === null} onClick={() => setActiveCategory(null)}>All <span className="opacity-60">{reflections.length}</span></Chip>
          {categories.map((cat) => (
            <Chip key={cat} pressed={activeCategory === cat} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}>{cat} <span className="opacity-60">{reflections.filter(r => r.category === cat).length}</span></Chip>
          ))}
        </div>
        <p className="text-label text-ink-3 mb-8" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}{activeCategory ? ` in ${activeCategory}` : ''}</p>

        <div className="grid md:grid-cols-3 gap-px grid-hairline">
          {filtered.map((r, i) => (
            <motion.a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black flex flex-col group hover:bg-white hover:bg-opacity-[0.03] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {r.image ? (
                  <img
                    src={r.image}
                    alt={r.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ filter: 'grayscale(0.15) contrast(1.05) brightness(0.85)' }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-end p-6"
                    style={{ background: 'rgb(var(--ink-rgb) / 0.04)' }}
                  >
                    <p
                      className="text-white select-none"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 200,
                        letterSpacing: '-0.05em',
                        color: 'var(--color-ink-3)',
                        lineHeight: 1,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="mb-4"><Tag>{r.category}</Tag></div>
                <h3 className="text-white mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.35 }}>
                  {r.title}
                </h3>
                <p className="text-body text-ink-3 flex-1">{r.excerpt}</p>
                <div className="mt-8 pt-6 border-t border-white border-opacity-10 flex items-center justify-between">
                  <span className="text-label text-ink-3">Read on Medium</span>
                  <span className="text-ink-3 group-hover:text-white transition-colors">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
