import { useReducedMotion } from 'framer-motion'

const lines = [
  { top: '35%', duration: 18, delay: 0 },
  { top: '62%', duration: 18, delay: -3 },
  { top: '80%', duration: 18, delay: -5.5 },
]

export default function SweepLines() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute left-0 w-[200%] h-px"
          style={{
            top: line.top,
            background: 'linear-gradient(90deg, transparent 0%, rgba(245,242,237,0.06) 30%, rgba(245,242,237,0.12) 50%, rgba(245,242,237,0.06) 70%, transparent 100%)',
            animation: `sweep ${line.duration}s linear infinite`,
            animationDelay: `${line.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
