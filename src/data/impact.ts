export interface Metric {
  value: string
  label: string
  /** Counts up from zero when it comes into view. Text and ranges are shown as they are. */
  count?: boolean
}

export const metrics: Metric[] = [
  { value: '30+',  label: 'Designers led at peak', count: true },
  { value: '6 → 30', label: 'Team growth' },
  { value: '200+', label: 'Designers hired across teams and organisations', count: true },
  { value: '16+',  label: 'Years dedicated to design', count: true },
  { value: '61+',  label: 'Products and platforms designed end-to-end', count: true },
  { value: '252+', label: 'Members in the SAP Design Hub India community', count: true },
  { value: '4+',   label: 'Startups supported as founding designer', count: true },
]
