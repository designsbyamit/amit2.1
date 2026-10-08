import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props {
  variant?: Variant
  small?: boolean
  to?: string          // internal route
  href?: string        // external / mailto
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
}

/** One button for the whole site. Min 44px tap height on touch devices. */
export default function Button({ variant = 'primary', small, to, href, onClick, children, className = '', type = 'button' }: Props) {
  const variants: Record<Variant, string> = { primary: 'btn-primary', secondary: 'btn-secondary', ghost: 'btn-ghost' }
  const cls = `btn ${variants[variant]} ${small ? 'btn-sm' : ''} ${className}`.trim()
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) {
    const external = /^https?:/.test(href)
    return <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
  }
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
