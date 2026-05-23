interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={`text-overline text-white opacity-40 ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
