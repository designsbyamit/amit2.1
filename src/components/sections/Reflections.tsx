import { useState } from 'react'
import { motion } from 'framer-motion'
import { reflections, categories } from '../../data/reflections'
import GrainOverlay from '../ui/GrainOverlay'

export default function Reflections() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? reflections.filter((r) => r.category === activeCategory)
    : reflections

  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden" id="reflections">
      <GrainOverlay opacity={0.04} />
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-16">
          <button
            className={`text-label px-4 py-2 border transition-all duration-200 ${
              activeCategory === null
                ? 'border-white text-white'
                : 'border-white border-opacity-20 text-white opacity-40 hover:opacity-70'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-label px-4 py-2 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-white text-white'
                  : 'border-white border-opacity-20 text-white opacity-40 hover:opacity-70'
              }`}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white bg-opacity-10">
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ filter: 'grayscale(0.15) contrast(1.05) brightness(0.85)' }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-end p-6"
                    style={{ background: 'rgba(245,242,237,0.04)' }}
                  >
                    <p
                      className="text-white select-none"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 200,
                        letterSpacing: '-0.05em',
                        color: 'rgba(245,242,237,0.12)',
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
                <p className="text-overline text-white opacity-30 mb-4">{r.category}</p>
                <h3 className="text-white mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.35 }}>
                  {r.title}
                </h3>
                <p className="text-body text-white opacity-45 flex-1">{r.excerpt}</p>
                <div className="mt-8 pt-6 border-t border-white border-opacity-10 flex items-center justify-between">
                  <span className="text-label text-white opacity-30">Read on Medium</span>
                  <span className="text-white opacity-30 group-hover:opacity-80 transition-opacity">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
