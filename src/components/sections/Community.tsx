import { motion } from 'framer-motion'
import { initiatives } from '../../data/community'
import { Tag } from '../ds/Tag'

/** Community initiatives. The full story is shown on the page: no hidden text, no extra click. */
function Initiative({ item, index }: { item: typeof initiatives[0]; index: number }) {
  const flip = index % 2 === 1
  return (
    <motion.article className="hairline-top py-12 md:py-16 grid-site gap-y-8 items-center" aria-labelledby={`ci-${item.id}`}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      <div className={`col-span-4 md:col-span-6 ${flip ? 'md:order-2' : ''}`}>
        <div className="relative overflow-hidden rounded-2 bg-surface-2" style={{ aspectRatio: '4 / 3' }}>
          {item.image && <img src={item.image} alt={`${item.name}`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: item.imageFocus ?? 'center' }} />}
        </div>
      </div>
      <div className={`col-span-4 md:col-span-5 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-8'} flex flex-col gap-4`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2"><span className="text-label text-signal-ink">{String(index + 1).padStart(2, '0')}</span><Tag>{item.type.toLowerCase()}</Tag></div>
        <h2 id={`ci-${item.id}`} className="text-heading text-ink">{item.name}</h2>
        <p className="text-label text-ink-3">{item.role}{item.year && <> · {item.year}</>}</p>
        <p className="text-body text-ink-2">{item.body}</p>
      </div>
    </motion.article>
  )
}

export default function Community() {
  return (
    <section className="relative pb-24 md:pb-32" id="community">
      <div className="container-site">
        {initiatives.map((item, i) => <Initiative key={item.id} item={item} index={i} />)}
        <div className="hairline-top" />
      </div>
    </section>
  )
}
