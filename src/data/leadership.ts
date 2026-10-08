export interface LeadershipStory {
  id: string
  year: string
  context: string
  title: string
  cues: string[]
  narrative: string[]
  learnings?: string[]
  nuggets?: string[]
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
    context: 'DevOps plugin marketplace · design, engineering and product',
    title: 'The moment design almost lost its seat at the table',
    cues: [
      'What was the moment you realised design was about to be removed or sidelined — and what was at stake?',
      'How did you make the case? What did you say, and to whom?',
      'What changed in the room — and what changed in you after that moment?',
    ],
    narrative: [
      'A few years ago, I was asked to design a marketplace for DevOps professionals: a place where they could discover plugins and extensions and use them to deploy applications to the cloud.',
      'On the surface, it looked like a fairly straightforward design problem. Underneath, it carried a lot of history.',
      'A couple of months earlier, engineering had explored a solution of their own. Our senior design director had explored one too. The two sides saw it very differently. Engineering felt the design wasn\'t scalable. Design leadership felt the engineering-led solution made for a poor experience.',
      'We were at a turning point. If we couldn\'t find common ground, the engineering solution would move forward, and design would effectively lose its seat at the table.',
      'For me, this was never only a design challenge. It was a collaboration and change-management challenge.',
      'So before designing anything, I did my homework. I sat down with each stakeholder and tried to understand not just what they wanted, but why. What were engineering\'s scalability concerns? What constraints was product working within? What did design believe was missing from the experience?',
      'Those conversations changed how I saw the problem. If we wanted to build something together, everyone first needed to understand everyone else\'s constraints.',
      'So I brought design, engineering and product into one workshop. Everyone started with the same context and the same problem. We explored different approaches, looked at what worked across them, and prioritised the ideas by value, effort, time and complexity.',
      'And something interesting happened. Nobody had to be convinced that the final solution was "the design solution". We arrived at it together.',
      'Once we had agreed on the principles and the trade-offs, I designed the interface around them. The result was a marketplace for DevOps plugins and extensions that the teams found genuinely useful.',
      'But the bigger outcome wasn\'t the interface. It was what happened to the conversation around design. People became far more willing to involve design early, because they saw we weren\'t just advocating for a better UI. We were trying to solve the larger product problem, while understanding the realities of engineering, product and business.',
    ],
    learnings: [
      'Understand constraints before proposing solutions. Ask every function not just what they want, but why they want it.',
      'Co-create the answer. A solution people arrive at together doesn\'t need to be sold.',
      'Speak the language of the ecosystem around you: engineering\'s constraints, product\'s priorities and the business problem.',
      'Be the initiator. Take accountability not just for the experience, but for the product outcomes and business KPIs connected to it.',
    ],
    nuggets: [
      'A design conflict is often a collaboration problem in disguise.',
      'Shared context comes before shared solutions.',
      'Prioritise in the open: value, effort, time and complexity.',
      'If I don\'t understand their constraints, I can\'t expect them to understand my perspective.',
    ],
    lesson: 'You don\'t earn a seat at the table by asking for one. You earn it by becoming someone the table cannot make the decision without.',
  },
  {
    id: 'story-first-team',
    year: '2014 · 2023',
    context: 'From first hire to leading designers',
    title: 'What building my first design team actually taught me',
    cues: [
      'What did you get wrong early — about hiring, onboarding, or what a team actually needs to do good work?',
      'Was there a specific moment or conversation that made you realise the gap between leading output and leading people?',
      'What would you tell a first-time design manager today that no one told you?',
    ],
    narrative: [
      'My first real experience of hiring, onboarding and setting up a design team was back in 2014. I had very little experience, and honestly, I got a few things wrong.',
      'The biggest one was not thinking enough about the team I was trying to build.',
      'I was focused on the immediate requirement: hiring people, running interviews, shortlisting candidates and getting them onboarded. I wasn\'t asking enough questions about the bigger picture. Were we building complementary skill sets, or deep expertise? A team designed around a particular client\'s needs? What would this team need to become six months or a year from now?',
      'Looking back, I should have spent more time with senior leadership understanding the vision and the capability we were trying to create, rather than simply fulfilling the requirement in front of me.',
      'One thing we did get right was culture. We built a strong team culture on purpose, and it became surprisingly contagious across the organisation.',
      'That experience taught me that building a team isn\'t just about filling roles. It\'s about having a point of view on what the team needs to become.',
      'I carried that lesson into my next organisation. There, we treated hiring as an experience in itself. We mapped the entire journey from both sides, the candidate\'s and the hiring team\'s, and redesigned it together. It was extremely well received.',
      'The next lesson came around 2023, when generative AI was just exploding. I was asked to lead a group of young designers and help them create something meaningful around Gen AI. That\'s when I really felt the difference between doing the work yourself and enabling others to do it.',
      'If the problem had been mine alone, I would have figured out what needed to be done and built it. But when you lead people, your job changes. We had to take a fairly ambiguous space, break the vision into tangible pieces, give people enough structure to move forward, and create an environment where they could explore and learn.',
      'What we created was a learning experience. It took designers through the basics of Gen AI and LLMs, introduced useful resources, and showed them how AI-powered tools could support each stage of the design process, from ideation all the way to building interfaces.',
      'What stayed with me was this: leadership isn\'t about producing the best output yourself. It\'s about creating the conditions for other people to produce something they couldn\'t have produced alone. That\'s a very different muscle.',
      'So what would I tell a first-time design leader today? Take it easy. The role is very different from when I first became a manager. Today a design leader wears multiple hats: the spokesperson for the team, the driver of the team, and sometimes the mechanic fixing things behind the scenes. That\'s why I prefer the word leader over manager. Management should almost become a byproduct of leadership.',
      'And learn to zoom in and zoom out. Zoomed out, you understand the bigger picture: the business objective, the product strategy, the technology constraints, the reason behind the work, and where the experience is ultimately trying to go. Zoomed in, you can explain why a particular interaction pattern makes sense in a specific journey, and reason through the craft behind that decision. You need both.',
    ],
    learnings: [
      'Don\'t just hire for today\'s requirement. Design the team for the future you are trying to create.',
      'Understand the vision and the capability leadership wants to build before you start hiring.',
      'Build culture on purpose. A strong team culture spreads well beyond the team.',
      'Treat hiring as an experience, designed for both the candidate and the hiring team.',
      'When you lead, your work becomes structure and environment: break ambiguity into tangible pieces, then give people room to explore and learn.',
    ],
    nuggets: [
      'Building a team isn\'t filling roles. It\'s having a point of view on what the team needs to become.',
      'Doing the work and enabling the work are different muscles.',
      'Leader over manager. Management should be a byproduct of leadership.',
      'Zoom out for the business. Zoom in for the craft.',
    ],
    lesson: 'Understand the business without losing the craft, and understand the craft without losing the business. That\'s where leadership starts.',
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
    year: 'Feb 2025 — present',
    context: 'SAP Design Hub India',
    title: 'Leading a 250+ designer community',
    cues: [
      'What did you inherit when you became Lead of SAP Design Hub India in February 2025, and what did you decide to change first?',
      'What surprised you most about what the community revealed — about designers, or about organisations?',
      'What does it mean to build design culture from inside a large enterprise rather than starting fresh?',
      'As Lead Curator of Impulse India, what do you want a designer to walk away with?',
    ],
    narrative: [],
    lesson: '',
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
