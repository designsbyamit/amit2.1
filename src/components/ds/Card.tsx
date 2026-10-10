import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

/** Raised content surface. Only becomes interactive (hover, pointer) when `to` or `href` is set. */
export default function Card({ children, to, href, className = '', flat }: { children: ReactNode; to?: string; href?: string; className?: string; flat?: boolean }) {
  const cls = `card ${flat ? 'card-flat' : ''} ${className}`.trim()
  if (to) return <Link to={to} className={`${cls} card-link`}>{children}</Link>
  if (href) return <a href={href} className={`${cls} card-link`} target="_blank" rel="noopener noreferrer">{children}</a>
  return <div className={cls}>{children}</div>
}
