import type { CaseStudy } from '../../data/work'

/**
 * Typographic cover for case studies that have no hero image yet.
 * Uses only data already on the case study (number + lead stat), so nothing is invented.
 */
export default function CaseCover({ cs, className = '', minHeight = 280 }: { cs: CaseStudy; className?: string; minHeight?: number }) {
  const stat = cs.stats?.find(s => /\d/.test(s.value)) ?? cs.stats?.[0]
  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-end ${className}`}
      style={{ minHeight, background: 'rgb(var(--ink-rgb) / 0.02)' }}
      aria-hidden="true"
    >
      <span
        className="absolute right-6 top-2 select-none leading-none text-white"
        style={{ fontSize: 'clamp(7rem, 16vw, 13rem)', fontWeight: 200, letterSpacing: '-0.06em', opacity: 0.07 }}
      >
        {cs.number}
      </span>
      {stat && (
        <div className="relative p-8 md:p-10">
          <p className="text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {stat.value}
          </p>
          <p className="text-overline text-ink-3 mt-3">{stat.label}</p>
        </div>
      )}
    </div>
  )
}
