export interface LeadershipStory {
  id: string
  year: string
  context: string
  title: string
  cues: string[]
  narrative: string[]
  lesson: string
  image?: string
}

export interface LeadershipArticle {
  id: string
  category: string
  title: string
  excerpt: string
  date: string
  url: string
}

export const stories: LeadershipStory[] = [
  {
    id: 'story-business-seat',
    year: '',
    context: '',
    title: 'The moment design almost lost its seat at the table',
    cues: [
      'What was the moment you realised design was about to be removed or sidelined — and what was at stake?',
      'How did you make the case? What did you say, and to whom?',
      'What changed in the room — and what changed in you after that moment?',
    ],
    narrative: [],
    lesson: '',
  },
  {
    id: 'story-first-team',
    year: '',
    context: '',
    title: 'What building my first design team actually taught me',
    cues: [
      'What did you get wrong early — about hiring, onboarding, or what a team actually needs to do good work?',
      'Was there a specific moment or conversation that made you realise the gap between leading output and leading people?',
      'What would you tell a first-time design manager today that no one told you?',
    ],
    narrative: [],
    lesson: '',
  },
  {
    id: 'story-influence',
    year: '',
    context: '',
    title: 'How I learned to influence without authority',
    cues: [
      'Describe a situation where you had to change how an organisation thought about design — without having the title or the mandate.',
      'What did you try that didn\'t work? What finally did?',
      'What does "earning trust" actually look like in practice inside a large enterprise?',
    ],
    narrative: [],
    lesson: '',
  },
  {
    id: 'story-sap-community',
    year: '2022 — present',
    context: 'SAP Design Hub India',
    title: '250+ designers and the thing I didn\'t expect',
    cues: [
      'What gap were you trying to close when you founded SAP Design Hub India?',
      'What surprised you most about what the community revealed — about designers, or about organisations?',
      'What does it mean to build design culture from inside a large enterprise rather than starting fresh?',
    ],
    narrative: [
      'I started SAP Design Hub India with a simple goal: create a space where SAP designers across India could share work, critique each other, and build something beyond their immediate pod.',
      'Within a year we had 250+ members and monthly events that were oversubscribed. But the unexpected thing wasn\'t the scale — it was what the community taught me about organizational health.',
      'The gap between what people are capable of and what organisations allow them to do is enormous. Building this community didn\'t just give designers a place — it gave me a diagnostic lens.',
    ],
    lesson: 'Communities reveal what organizations suppress. Build both.',
  },
]

export const articles: LeadershipArticle[] = [
  {
    id: 'design-leader-traits',
    category: 'Leadership',
    title: 'Essential Traits of a Design Leader — Do You Have It?',
    excerpt:
      'Some of the rare skills are like secret weapons for a design leader to thrive in an organisation. Technical skills are vital, but these critical traits take things to a whole new level.',
    date: 'Jun 2023',
    url: 'https://medium.com/@amitkrt/do-you-have-it-as-a-design-leader-6aa154c7191',
  },
  {
    id: 'dual-fluency',
    category: 'Leadership',
    title: 'The Designer Who Speaks Two Languages',
    excerpt:
      'Dual Fluency is not about code or Figma shortcuts. It is about understanding what a CFO worries about, what a PM is accountable for, and why an engineer pushes back.',
    date: 'Ongoing',
    url: 'https://medium.com/@amitkrt',
  },
  {
    id: 'vedic-design',
    category: 'Ancient Wisdom × Leadership',
    title: 'How Vedic Secrets Can Disrupt Your Design Game',
    excerpt:
      'A deliberate dive into the past, distilling ancient wisdom for disruptive breakthroughs in our ever-evolving world of experience design.',
    date: 'Nov 2023',
    url: 'https://medium.com/@amitkrt/how-vedic-secrets-can-disrupt-your-design-game-1-286b6cee79d6',
  },
  {
    id: 'conversational-ux',
    category: 'AI & Design',
    title: 'The Future of UX is Conversational: Measure Its Success',
    excerpt:
      'Conversational experiences are becoming the new go-to for information access. Here is how to evaluate them rigorously and build for the long term.',
    date: 'May 2024',
    url: 'https://medium.com/@amitkrt/the-future-of-ux-is-conversational-heres-how-to-measure-its-success-e67d0651638f',
  },
]
