import { motion } from 'framer-motion'

interface NavSection {
  id: string
  label: string
  number?: string
}

interface DotsNavProps {
  sections: NavSection[]
  active: string
}

export default function DotsNav({ sections, active }: DotsNavProps) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="flex items-center gap-3 group"
          title={s.label}
        >
          {/* Dot */}
          <motion.div
            className="rounded-full flex-shrink-0 transition-all duration-300"
            animate={{
              width: active === s.id ? 20 : 6,
              height: active === s.id ? 2 : 6,
              opacity: active === s.id ? 0.85 : 0.2,
              borderRadius: active === s.id ? 1 : 9999,
            }}
            style={{ background: 'rgba(245,242,237,1)' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Label — appears on hover */}
          <span
            className="text-white pointer-events-none select-none whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0"
            style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            {s.number ? `${s.number} ${s.label}` : s.label}
          </span>
        </a>
      ))}
    </div>
  )
}
