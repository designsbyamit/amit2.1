import type { ReactNode } from 'react'

/** Pull quote or testimonial. Always attributed. */
export default function Quote({ children, by, role }: { children: ReactNode; by: string; role?: string }) {
  return (
    <figure>
      <blockquote className="quote">{children}</blockquote>
      <figcaption className="quote-cite">{by}{role && <> · {role}</>}</figcaption>
    </figure>
  )
}
