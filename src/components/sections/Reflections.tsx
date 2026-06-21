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
        <div className="flex flex-wrap gap-3 mb-16">          <button
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
              className="bg-black p-8 md:p-10 flex flex-col group hover:bg-white hover:bg-opacity-5 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="text-overline text-white opacity-30 mb-4">{r.category}</p>
              <h3 className="text-heading text-white mb-4 group-hover:opacity-80 transition-opacity">{r.title}</h3>
              <p className="text-body text-white opacity-50 flex-1">{r.excerpt}</p>
              <div className="mt-8 pt-6 border-t border-white border-opacity-10 flex items-center justify-between">
                <span className="text-label text-white opacity-30">Read on Medium</span>
                <span className="text-white opacity-30 group-hover:opacity-80 transition-opacity">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
