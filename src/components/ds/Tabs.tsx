import { useId, useRef, type ReactNode, type KeyboardEvent } from 'react'

/** Accessible tabs (WAI-ARIA pattern): arrow keys move between tabs, Home/End jump. */
export default function Tabs({ tabs, value, onChange, children, label, variant = 'line' }: {
  tabs: { id: string; label: ReactNode }[]; value: string; onChange: (id: string) => void; children: ReactNode; label: string; variant?: 'line' | 'chip'
}) {
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = tabs.length
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1
    if (to < 0) return
    e.preventDefault()
    onChange(tabs[to].id)
    refs.current[to]?.focus()
  }
  return (
    <div>
      <div role="tablist" aria-label={label} className={variant === 'line' ? 'tabs' : 'flex flex-wrap gap-2'}>
        {tabs.map((t, i) => (
          <button key={t.id} ref={el => { refs.current[i] = el }} type="button" role="tab" id={`${base}-${t.id}`} aria-controls={`${base}-panel`}
            aria-selected={t.id === value} tabIndex={t.id === value ? 0 : -1} className={variant === 'line' ? 'tab' : 'chip'}
            onClick={() => onChange(t.id)} onKeyDown={e => onKey(e, i)}>{t.label}</button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-${value}`} className="pt-8">{children}</div>
    </div>
  )
}
