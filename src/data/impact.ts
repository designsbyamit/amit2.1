export interface Metric {
  value: string
  label: string
  /** Counts up from zero when it comes into view. Text and ranges are shown as they are. */
  count?: boolean
}

export const metrics: Metric[] = [
  { value: '16+',  label: 'Years in design', count: true },
  { value: '61+',  label: 'Products and platforms designed end to end', count: true },
  { value: '17+',  label: 'Industries and domains', count: true },
  { value: '52+',  label: 'Brands and customers', count: true },
  { value: '200+', label: 'Designers hired across organisations', count: true },
  { value: '4+',   label: 'Startups supported as founding designer', count: true },
  { value: '252+', label: 'Members in the Design Hub community I drive', count: true },
]
