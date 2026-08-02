export interface Metric {
  value: string
  label: string
}

export const metrics: Metric[] = [
  { value: '300M+', label: 'Users reached through shipped products' },
  { value: '$5M',   label: 'Documented operational savings' },
  { value: '90%',   label: 'CSAT vs <60% industry baseline' },
  { value: '16',    label: 'Years of enterprise design' },
  { value: '250+',  label: 'Designers in SAP Design Hub India' },
  { value: '50×',   label: 'Revenue multiplier — national airline' },
  { value: '6',     label: 'Systems-level case studies' },
]
