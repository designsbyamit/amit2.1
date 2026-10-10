import type { ReactNode } from 'react'

/** Disclosure list on native <details>, so it works with keyboard and without JavaScript. */
export default function Accordion({ items }: { items: { title: ReactNode; body: ReactNode; open?: boolean }[] }) {
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <details key={i} open={it.open}>
          <summary>{it.title}</summary>
          <div className="accordion-body">{it.body}</div>
        </details>
      ))}
    </div>
  )
}
