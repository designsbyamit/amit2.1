export interface LeadershipStory {
  id: string
  year: string
  context: string
  title: string
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
    id: 'design-seat',
    year: '2019',
    context: 'Accenture Song',
    title: 'The Room Where Design Almost Lost Its Seat',
    narrative: [
      'Three months into a major banking transformation engagement, the program director called a meeting. The project was behind schedule, costs were climbing, and design was about to be de-scoped — reduced to a "delivery support" function.',
      'I had one slide to make the case. Not a design process slide. A business impact slide. I mapped every design decision we had made to a specific risk reduction or conversion outcome. The room shifted. The CPO stayed after everyone else left.',
      'What I learned that day has shaped everything since: influence isn\'t earned through craft. It\'s earned through translation. Designers who can hold both languages — the language of experience and the language of business — are rare, and that rarity is power.',
    ],
    lesson: 'Design influence is earned through translation, not craft.',
    image: 'https://framerusercontent.com/images/MpbusuIVxAmr1wH5qWEK7mWUvY.png',
  },
  {
    id: 'first-team',
    year: '2016',
    context: 'Hewlett Packard Enterprise',
    title: 'What Building My First Team Actually Taught Me',
    narrative: [
      'At HPE, I was handed a blank slate: build the design team for GreenLake — a new cloud platform the company was betting its future on. I hired fast, onboarded faster, and pushed for output immediately. Within six months, we had shipped a design system.',
      'But I also had a resignation letter on my desk. One of my best designers told me, "I don\'t know what you value in me beyond velocity." That sentence lived in my head for years.',
      'The team I built was talented but not psychologically safe. I was so focused on building the thing that I forgot to build the people. Rebuilding trust takes three times longer than breaking it. GreenUX — the design system — outlived that phase, but the lesson about what culture actually needs has outlasted everything we ever shipped.',
    ],
    lesson: 'You can ship a great product and still fail at leadership if the people don\'t feel seen.',
  },
  {
    id: 'mentorship',
    year: '2022',
    context: 'SAP Labs',
    title: 'The Mentee Who Became the Mirror',
    narrative: [
      'I had been mentoring a young designer at SAP for about eight months. She was sharp, fast, and deeply uncomfortable with ambiguity — which is exactly what she came to me to fix.',
      'One afternoon, she pushed back on my feedback. Not defensively — she had data, a clear framework, and a better answer than mine. I sat with that for a moment and then said: "You\'re right. Go with your instinct."',
      'The goal of mentorship isn\'t to make someone think like you. It\'s to help them think rigorously enough that they can disagree with you confidently. The designers who\'ve grown the most under my mentorship are the ones who stopped asking for permission and started making claims. When a mentee surpasses you in a domain, that isn\'t a threat — it\'s the whole point.',
    ],
    lesson: 'Mentorship succeeds when the mentee no longer needs you in that role.',
    image: 'https://framerusercontent.com/images/HckfStwSHyARIzjTF82rWioFiQ.png',
  },
  {
    id: 'community',
    year: '2022 — present',
    context: 'SAP Design Hub India',
    title: '250+ Designers and the Thing I Didn\'t Expect',
    narrative: [
      'I started SAP Design Hub India with a simple goal: create a space where SAP designers across India could share work, critique each other, and build something beyond their immediate pod.',
      'Within a year we had 250+ members and monthly events that were oversubscribed. But the unexpected thing wasn\'t the scale — it was what the community taught me about organizational health. Designers who felt unseen inside their teams were articulate, generous, and visionary in the community. The same people.',
      'The gap between what people are capable of and what organizations allow them to do is enormous. Building the community didn\'t just give designers a place — it gave me a diagnostic lens. What makes people perform at their ceiling? Psychological safety, peer recognition, and the sense that their work is seen beyond their immediate manager.',
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
