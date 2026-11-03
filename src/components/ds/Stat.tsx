/** Big number + caption. Value is thin display; label is mono. */
export default function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-ink" style={{ fontSize: 'var(--fs-stat)', fontWeight: 200, letterSpacing: 'var(--track-tighter)', lineHeight: 1 }}>{value}</p>
      <p className="text-label text-ink-3 mt-3">{label}</p>
    </div>
  )
}
