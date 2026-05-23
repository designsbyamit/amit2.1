export interface Initiative {
  name: string
  role: string
  year: string
  description: string
}

export const initiatives: Initiative[] = [
  {
    name: 'SAP Design Hub India',
    role: 'Founder & Curator',
    year: '2022–present',
    description:
      '250+ member community of SAP designers across India. Monthly events, peer learning, and a growing culture of design excellence inside the enterprise.',
  },
  {
    name: 'UX2DAY',
    role: 'Founding Initiative',
    year: '2018',
    description:
      'Built a practitioner-first design event series focused on real problems, honest conversations, and cross-company learning.',
  },
  {
    name: 'Impulse Festival',
    role: 'Organizer & Speaker',
    year: '2023',
    description:
      'Design festival exploring the intersection of technology, creativity, and human experience.',
  },
  {
    name: 'DesignUp — Dual Fluency Workshop',
    role: 'Workshop Lead',
    year: '2023',
    description:
      "Full-day workshop on Dual Fluency — the designer's ability to operate equally in design language and business language. Sold out.",
  },
  {
    name: 'UX India',
    role: 'Speaker',
    year: '2022',
    description:
      'Keynote on AI-native design thinking and what it means for the next generation of UX practitioners.',
  },
  {
    name: 'Design Thinking Summit',
    role: 'Mentor',
    year: '2023',
    description:
      'Mentored early-career designers on portfolio strategy, leadership positioning, and navigating enterprise design careers.',
  },
]
