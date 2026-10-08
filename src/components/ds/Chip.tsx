import type { ReactNode } from 'react'

/** Tag / filter chip. Pass `pressed` for a toggle. */
export default function Chip({ children, pressed, onClick }: { children: ReactNode; pressed?: boolean; onClick?: () => void }) {
  if (onClick) {
    return <button type="button" className="chip" aria-pressed={!!pressed} onClick={onClick}>{children}</button>
  }
  return <span className="chip">{children}</span>
}
