import type { ReactNode } from 'react'

/** Overline + display heading + optional intro. Use at the top of every section. */
export default function SectionHeader({ label, title, intro, as: Tag = 'h2', action }: { label: string; title: ReactNode; intro?: ReactNode; as?: 'h1' | 'h2'; action?: ReactNode }) {
  return (
    <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="max-w-3xl">
        <p className="text-overline text-ink-3">{label}</p>
        <Tag className="text-display-l text-ink mt-4">{title}</Tag>
        {intro && <p className="text-body-lg text-ink-2 mt-6 max-w-[65ch]">{intro}</p>}
      </div>
      {action && <div className="flex-none">{action}</div>}
    </header>
  )
}
