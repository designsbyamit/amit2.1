export interface Reflection {
  id: string
  category: string
  title: string
  excerpt: string
  url: string
}

export const reflections: Reflection[] = [
  {
    id: 'ai-humanity',
    category: 'AI & Humanity',
    title: 'What AI Cannot Design',
    excerpt:
      'The qualities that make design meaningful — empathy, cultural sensitivity, moral judgment — are not reducible to patterns in data. As AI takes on more of the craft, the human in design becomes more valuable, not less.',
    url: 'https://medium.com/@amitkrt',
  },
  {
    id: 'dual-fluency',
    category: 'Leadership',
    title: 'The Designer Who Speaks Two Languages',
    excerpt:
      "Dual Fluency is not about code or Figma shortcuts. It is about understanding what a CFO worries about, what a product manager is accountable for, and why an engineer pushes back. Design influence requires translation.",
    url: 'https://medium.com/@amitkrt',
  },
  {
    id: 'systems-thinking',
    category: 'Systems Thinking',
    title: 'Design Is Always About the System',
    excerpt:
      'Every pixel is a vote for a certain kind of world. Every flow is a model of how things should connect. Designers who ignore systems design symptoms rather than problems.',
    url: 'https://medium.com/@amitkrt',
  },
]

export const categories = [
  'AI & Humanity',
  'Designer Struggles',
  'Ancient Wisdom',
  'Systems Thinking',
  'Leadership',
  'Future of Design',
]
