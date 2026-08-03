export interface Initiative {
  id: string
  name: string
  role: string
  year: string
  type: string
  description: string
  body: string
  image?: string
}

export const initiatives: Initiative[] = [
  {
    id: 'sap-design-hub',
    name: 'SAP Design Hub India',
    role: 'Founder & Curator',
    year: '2022–present',
    type: 'Community',
    description: '250+ member community of SAP designers across India.',
    body: 'Started with a simple goal: create a space where SAP designers across India could share work, critique each other, and build something beyond their immediate pod. Within a year it had 250+ members and monthly events that were oversubscribed. What the community revealed was something unexpected — the gap between what designers are capable of and what organisations allow them to do is enormous. Building this community didn\'t just give designers a place. It gave a diagnostic lens for organisational health.',
    image: '/images/Community/SAPDesignHub.jpg',
  },
  {
    id: 'ux2day',
    name: 'UX2DAY',
    role: 'Founding Initiative',
    year: '2018',
    type: 'Event Series',
    description: 'Practitioner-first design event series.',
    body: 'Built a practitioner-first design event series focused on real problems, honest conversations, and cross-company learning. The premise: most design events are either too academic or too promotional. UX2DAY was built to be neither — just practitioners sharing what actually worked, what failed, and what they were still figuring out.',
    image: '/images/Community/UX2Day.jpg',
  },
  {
    id: 'designup-workshop',
    name: 'DesignUp — Dual Fluency Workshop',
    role: 'Workshop Lead',
    year: '2023',
    type: 'Workshop',
    description: 'Full-day sold-out workshop on Dual Fluency.',
    body: 'A full-day workshop on Dual Fluency — the designer\'s ability to operate equally in design language and business language. Sold out. The workshop was built around a single provocation: if your design work never makes it into a business decision, it isn\'t design leadership — it\'s decoration. Participants left with a framework, a vocabulary, and a set of tools for translating design quality into business outcomes.',
    image: '/images/Community/DesignUp.jpg',
  },
  {
    id: 'impulse-festival',
    name: 'Impulse Festival',
    role: 'Organizer & Speaker',
    year: '2023',
    type: 'Festival',
    description: 'Design festival at the intersection of technology, creativity, and human experience.',
    body: 'Organised and spoke at a design festival exploring the intersection of technology, creativity, and human experience. The festival brought together designers, engineers, artists, and thinkers from across disciplines — creating the kind of cross-pollination that rarely happens inside a single organisation.',
    image: '/images/Community/Impulse.jpg',
  },
  {
    id: 'ux-india',
    name: 'UX India',
    role: 'Speaker',
    year: '2019–2024',
    type: 'Conference',
    description: 'Speaker and panelist across multiple editions.',
    body: 'Speaker and panelist across multiple editions of UX India — one of the country\'s longest-running design conferences. Topics spanned AI-native UX, enterprise design leadership, and the future of designer roles. The conversations that mattered most happened after the sessions, with practitioners trying to figure out the same things.',
    image: '/images/Community/UXIndia.jpg',
  },
  {
    id: 'design-thinking-summit',
    name: 'Design Thinking Summit',
    role: 'Mentor',
    year: '2023',
    type: 'Mentorship',
    description: 'Mentored early-career designers on portfolio strategy and leadership.',
    body: 'Mentored early-career designers on portfolio strategy, leadership positioning, and navigating enterprise design careers. The most common question wasn\'t about craft — it was about influence. How do you make design matter inside an organisation that doesn\'t yet understand what design can do?',
    image: '/images/Community/DTSUmmit.jpg',
  },
]
