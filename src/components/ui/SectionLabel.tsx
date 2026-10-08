interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={`text-overline text-ink-3 ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
