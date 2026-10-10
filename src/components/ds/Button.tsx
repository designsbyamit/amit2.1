import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

interface Props {
  /** primary: one per view, the main action. secondary: alternatives. tertiary: "read more" text actions. */
  variant?: Variant
  small?: boolean
  to?: string          // internal route
  href?: string        // external / mailto
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  /** Adds a trailing arrow (→, or ↗ for external links). */
  arrow?: boolean
  'aria-label'?: string
  'aria-expanded'?: boolean
  'aria-controls'?: string
}

const Arrow = ({ external }: { external?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {external ? <path d="M5 11L11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
)

/** One button for the whole site. Sentence case, 44px min target. */
export default function Button({ variant = 'primary', small, to, href, onClick, children, className = '', type = 'button', disabled, arrow, ...rest }: Props) {
  const v = variant === 'tertiary' ? 'ghost' : variant
  const cls = `btn btn-${v} ${small ? 'btn-sm' : ''} ${className}`.trim()
  const external = !!href && /^https?:/.test(href)
  const content = <>{children}{arrow && <Arrow external={external} />}</>
  if (to && !disabled) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href && !disabled) {
    return <a href={href} className={cls} {...rest} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}{external && <span className="sr-only"> (opens in a new tab)</span>}</a>
  }
  return <button type={type} onClick={onClick} className={cls} disabled={disabled} {...rest}>{content}</button>
}
