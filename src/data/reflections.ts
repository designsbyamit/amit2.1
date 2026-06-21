export interface Reflection {
  id: string
  category: string
  title: string
  excerpt: string
  url: string
}

export const reflections: Reflection[] = [
  {
    id: 'design-trends-2025',
    category: 'Future of Design',
    title: '2025 Design Trends Every UX Designer Needs to Know',
    excerpt:
      'Game-changing, fresh, and inevitable shifts that will define the design landscape in 2025 and beyond — from agentic interfaces to the collapse of the screen as primary canvas.',
    url: 'https://medium.com/@amitkrt/2025-design-trends-every-ux-designer-needs-to-know-2cdb3d2cf292',
  },
  {
    id: 'ai-genai-framework',
    category: 'AI & Humanity',
    title: 'Is There Any Framework for Designing AI and Gen-AI Experiences?',
    excerpt:
      'AI is dominating design conversations everywhere — but the tools, principles, and mental models for designing it responsibly are still catching up. A working framework for practitioners.',
    url: 'https://medium.com/@amitkrt/is-there-any-framework-for-designing-ai-and-gen-ai-experiences-4f9924319b0d',
  },
  {
    id: 'conversational-ux',
    category: 'AI & Humanity',
    title: 'The Future of UX is Conversational',
    excerpt:
      'Conversational experiences are becoming the go-to for information access and complex tasks. But measuring their success requires entirely different thinking than traditional UX metrics.',
    url: 'https://medium.com/@amitkrt/the-future-of-ux-is-conversational-heres-how-to-measure-its-success-e67d0651638f',
  },
  {
    id: 'vedic-design-series',
    category: 'Ancient Wisdom',
    title: 'How Vedic Secrets Can Disrupt Your Design Game',
    excerpt:
      'A five-part series exploring what ancient Indian philosophy — Nyaya Darshan, the Vedas, and Vedic epistemology — has to teach modern designers about process, knowledge, and intention.',
    url: 'https://medium.com/@amitkrt/how-vedic-secrets-can-disrupt-your-design-game-1-286b6cee79d6',
  },
  {
    id: 'ever-evolving-design',
    category: 'Future of Design',
    title: 'Ever-Evolving Design',
    excerpt:
      '"What is design?" — a question that surfaces constantly, and whose answer keeps shifting. A reflection on how the definition of design expands with every decade of practice.',
    url: 'https://medium.com/@amitkrt/ever-evolving-design-9ea1faffe5c3',
  },
  {
    id: 'design-leader-skills',
    category: 'Leadership',
    title: 'Do You Have It as a Design Leader?',
    excerpt:
      'Technical skills get you to the table. The rare skills — the ones that rarely get named — are what let you stay there and shape what gets built. A candid look at what separates good designers from influential ones.',
    url: 'https://medium.com/@amitkrt/do-you-have-it-as-a-design-leader-6aa154c7191',
  },
]

export const categories = [
  'AI & Humanity',
  'Ancient Wisdom',
  'Future of Design',
  'Leadership',
]
