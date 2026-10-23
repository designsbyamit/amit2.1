import { motion } from 'framer-motion'
import RevealText from './RevealText'
import Breadcrumb from '../ds/Breadcrumb'
import Mark, { type MarkName } from '../marks/Marks'

interface PageHeaderProps {
  label: string
  title: string
  subtitle?: string
  image?: string
  imageAlt?: string
  /** CSS object-position for the portrait, e.g. '50% 0%' */
  imagePosition?: string
  /** Pure black-and-white portrait, no cobalt tint */
  mono?: boolean
  /** Pages deeper than one level pass their trail, e.g. [{label:'Resources', to:'/resources'}, {label:'Dual Fluency'}] */
  breadcrumb?: { label: string; to?: string }[]
  /** A pictogram: small beside the label, and large at the right of headers that have no portrait. */
  mark?: MarkName
}

const ease = [0.16, 1, 0.3, 1] as const

/** Top of every page: optional breadcrumb, mono overline, thin display title, intro. */
export default function PageHeader({ label, title, subtitle, image, imageAlt, imagePosition, mono, breadcrumb, mark }: PageHeaderProps) {
  return (
    <section className={`relative overflow-hidden ${image ? 'md:min-h-[72vh] flex flex-col justify-end' : ''}`} style={{ paddingTop: 'var(--header-h)' }}>
      {image && (
        <div className="absolute right-0 top-0 w-full h-[42vh] md:h-full md:w-1/2">
          <div className={`hero-portrait${mono ? ' is-mono' : ''}`}><img src={image} alt={imageAlt || ''} style={imagePosition ? { objectPosition: imagePosition } : undefined} /></div>
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, var(--bg) 0%, rgb(var(--bg-rgb) / 0) 45%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, var(--bg) 0%, rgb(var(--bg-rgb) / 0) 40%)' }} />
        </div>
      )}
      {mark && !image && (
        <div className="hidden md:block absolute inset-x-0 bottom-14 pointer-events-none">
          <div className="container-site flex justify-end"><Mark name={mark} size={176} className="text-ink-3" /></div>
        </div>
      )}
      <div className={`relative container-site ${image ? 'pt-[34vh] md:pt-24' : 'pt-12 md:pt-20'} pb-14 md:pb-20`}>
        {breadcrumb && <div className="mb-10"><Breadcrumb items={breadcrumb} /></div>}
        <motion.p className="text-overline text-ink-3 mb-6 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {mark && <Mark name={mark} size={image ? 34 : 28} className={`text-ink-2 ${image ? '' : 'md:hidden'}`} />}
          {label}
        </motion.p>
        <div className={image ? 'md:max-w-[56%]' : 'max-w-5xl'}>
          <h1 className="text-display-l text-ink"><RevealText text={title} delay={0.1} /></h1>
          {subtitle && (
            <motion.p className="text-body-lg text-ink-2 mt-6 max-w-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
