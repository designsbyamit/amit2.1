import { motion } from 'framer-motion'
import { articles } from '../../data/leadership'
import SectionLabel from '../ui/SectionLabel'
import GrainOverlay from '../ui/GrainOverlay'

export default function LeadershipArticles() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white border-opacity-[0.06]">
      <GrainOverlay opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-16">
          <div>
            <SectionLabel>Writing</SectionLabel>
            <motion.h2
              className="text-display-l text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              On Leadership
            </motion.h2>
          </div>
          <motion.a
            href="https://medium.com/@amitkrt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-white opacity-30 hover:opacity-70 transition-opacity hidden md:block mb-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            All articles on Medium →
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white bg-opacity-[0.07]">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              className="bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 md:p-10 h-full hover:bg-white hover:bg-opacity-[0.025] transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-overline text-white opacity-35">{article.category}</span>
                  <span className="text-label text-white opacity-25">{article.date}</span>
                </div>

                <h3
                  className="text-white mb-4 group-hover:opacity-75 transition-opacity duration-300"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                    fontWeight: 400,
                    lineHeight: 1.35,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {article.title}
                </h3>

                <p className="text-body text-white opacity-45 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>

                <p className="text-label text-white opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                  Read on Medium →
                </p>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://medium.com/@amitkrt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-white opacity-40 hover:opacity-80 transition-opacity"
          >
            All articles on Medium →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
