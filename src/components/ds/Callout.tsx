import type { ReactNode } from 'react'

/** Information panel for notes and context. Not for errors (use field errors) or marketing. */
export default function Callout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <aside className="callout">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-none mt-0.5 text-ink-3" aria-hidden="true"><circle cx="10" cy="10" r="8" /><path d="M10 9v5M10 6.2v.1" strokeLinecap="round" /></svg>
      <div>{title && <p className="text-ink font-medium mb-1">{title}</p>}{children}</div>
    </aside>
  )
}
