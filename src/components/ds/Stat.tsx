/** Big number + caption. Value uses the display face; label uses ink-3. */
export default function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</p>
      <p className="text-label text-ink-3 mt-3">{label}</p>
    </div>
  )
}
