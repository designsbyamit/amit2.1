export interface Initiative {
  id: string
  name: string
  role: string
  year: string
  type: string
  description: string
  body: string
  image?: string
  imageFocus?: string
}

export const initiatives: Initiative[] = [
  {
    id: 'designup-workshop',
    name: 'DesignUp — Dual Fluency Workshop',
    role: 'Workshop Lead',
    year: '2023',
    type: 'Workshop',
    description: 'Full-day workshop on Dual Fluency.',
    body: 'A full-day workshop on Dual Fluency — the designer\'s ability to operate equally in design language and business language. The workshop was built around a single provocation: if your design work never makes it into a business decision, it isn\'t design leadership — it\'s decoration. Participants left with a framework, a vocabulary, and a set of tools for translating design quality into business outcomes.',
    image: '/images/Community/DesignUp.webp',
    imageFocus: 'center top',
  },
  {
    id: 'sap-design-hub',
    name: 'SAP Design Hub India',
    role: 'Lead',
    year: 'Feb 2025–present',
    type: 'Community',
    description: '250+ member community of SAP designers across India.',
    body: 'A community where SAP designers across India share work, critique each other, and build something beyond their immediate pod. 250+ members. Led by Amit since February 2025.',
    image: '/images/Community/SAPDesignHub.webp',
    imageFocus: 'center center',
  },
  {
    id: 'impulse-festival',
    name: 'Impulse India',
    role: 'Lead Curator',
    year: '',
    type: 'Festival',
    description: 'Design festival at the intersection of technology, creativity, and human experience.',
    body: 'Lead Curator of Impulse India, a design event exploring the intersection of technology, creativity, and human experience. It brings together designers, engineers, artists, and thinkers from across disciplines, creating the kind of cross-pollination that rarely happens inside a single organisation.',
    image: '/images/Community/Impulse.webp',
    imageFocus: '50% 15%',
  },
  {
    id: 'design-thinking-summit',
    name: 'Design Thinking Summit',
    role: 'Mentor',
    year: '2023',
    type: 'Mentorship',
    description: 'Mentored early-career designers on portfolio strategy and leadership.',
    body: 'Mentored early-career designers on portfolio strategy, leadership positioning, and navigating enterprise design careers. The most common question wasn\'t about craft — it was about influence. How do you make design matter inside an organisation that doesn\'t yet understand what design can do?',
    image: '/images/Community/DTSUmmit.webp',
    imageFocus: '12% center',
  },
  {
    id: 'ux-india',
    name: 'UX India',
    role: 'Speaker',
    year: '2019–2024',
    type: 'Conference',
    description: 'Speaker and panelist across multiple editions.',
    body: 'Speaker and panelist across multiple editions of UX India — one of the country\'s longest-running design conferences. Topics spanned AI-native UX, enterprise design leadership, and the future of designer roles. The conversations that mattered most happened after the sessions, with practitioners trying to figure out the same things.',
    image: '/images/Community/UXIndia.webp',
    imageFocus: 'center 30%',
  },
  {
    id: 'ux2day',
    name: 'UX2DAY',
    role: 'Founding Initiative',
    year: '2018',
    type: 'Event Series',
    description: 'Practitioner-first design event series.',
    body: 'Built a practitioner-first design event series focused on real problems, honest conversations, and cross-company learning. The premise: most design events are either too academic or too promotional. UX2DAY was built to be neither — just practitioners sharing what actually worked, what failed, and what they were still figuring out.',
    image: '/images/Community/UX2Day.webp',
    imageFocus: 'center center',
  },
]
