import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

/** Raised content surface. Becomes a link when `to` is set. */
export default function Card({ children, to, className = '' }: { children: ReactNode; to?: string; className?: string }) {
  const cls = `card block ${className}`.trim()
  return to ? <Link to={to} className={cls}>{children}</Link> : <div className={cls}>{children}</div>
}
