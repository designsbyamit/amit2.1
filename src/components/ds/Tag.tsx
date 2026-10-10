import type { ReactNode } from 'react'

/** Non-clickable label for a category or topic. Never give it a hover or a link. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>
}

/** A row of tags. Keep to 3 or fewer per item. */
export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="tag-list" aria-label={label}>
      {items.map(t => <li key={t} className="tag">{t}</li>)}
    </ul>
  )
}

/** Live or state marker. `live` uses the signal colour. */
export function Status({ children, live = true }: { children: ReactNode; live?: boolean }) {
  return <span className={`status ${live ? '' : 'status-neutral'}`.trim()}>{children}</span>
}

export default Tag
