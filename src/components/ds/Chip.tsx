import type { ReactNode } from 'react'
import Tag from './Tag'

/** Clickable filter or toggle. Without onClick it renders a non-clickable Tag instead. */
export default function Chip({ children, pressed, onClick }: { children: ReactNode; pressed?: boolean; onClick?: () => void }) {
  if (onClick) {
    return <button type="button" className="chip" aria-pressed={!!pressed} onClick={onClick}>{children}</button>
  }
  return <Tag>{children}</Tag>
}
