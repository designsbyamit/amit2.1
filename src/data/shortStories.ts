// Short stories: one-page projects, written from the one-pager designs.
// Rule: nothing here is stated that is not in those designs.

import type { FieldTone } from '../components/ds/MediaFrame'

export interface ShortStory {
  slug: string
  title: string
  /** Short name for menus and lists. */
  nav: string
  /** Where it happened, if the design says. */
  meta?: string[]
  /** Flat field colour behind the cover pictogram. */
  tone: FieldTone
  sections: { label: string; items: { lead?: string; text: string }[] }[]
  link?: { label: string; href: string }
}

export const shortStories: ShortStory[] = [
  {
    slug: 'file18',
    nav: 'File18 for Network18 journalists',
    title: 'Resolving adoption barriers of the File18 app for Network18 journalists',
    tone: 'cobalt',
    sections: [
      {
        label: 'Quick snapshot',
        items: [
          { text: 'Conducted secondary research and helped the team understand the behavioural challenges faced by reporters and their adoption barriers.' },
          { text: 'Guided the team to evaluate the existing experience and report in an actionable and consumable way.' },
          { text: 'Ideated for some of the key feature requirements for the app redesign based on the insights gathered from user research.' },
          { text: 'Developed a concept design as a baseline for the wireframes, focused on intuitiveness, super quick reporting and efficient editing flows for reporters.' },
          { text: 'Guided the team on the visual design and branding direction that aligned with the app’s purpose and the target audience.' },
          { text: 'Compiled the presentation, prototype and design guidelines, and presented the RFP prototype to the stakeholders.' },
        ],
      },
    ],
    link: { label: 'Play the prototype', href: 'https://www.figma.com/proto/UnffWymdDik0WpsfTWl0qo/File18-Experience-Audit-%26-Proto?type=design&node-id=760-24330&t=nU8oQbaUICl0tUhx-1&scaling=scale-down&page-id=760%3A22106&starting-point-node-id=760%3A24314&show-proto-sidebar=1&mode=design' },
  },
  {
    slug: 'greenux',
    nav: 'GreenUX design system',
    title: 'A living design system with sustainability and greener UX as a foundational pillar',
    tone: 'teal',
    sections: [
      {
        label: 'Additional activities',
        items: [
          { lead: 'Mentoring', text: 'I educated the team on the basics of structuring the design system, packaging and its naming convention, to ensure consistency and coherence across components and layouts.' },
          { lead: 'Defining and documenting design guidelines', text: 'Helped the team create design guidelines, usage instructions and design principles, and shared resources to frame them. These covered structuring components, typography, colour palettes, iconography, spacing and interaction patterns.' },
          { lead: 'Governance', text: 'Defining a process for managing and evolving the design system over time, including roles and responsibilities for monitoring its usage, collecting feedback and iterating as needs and design trends change.' },
        ],
      },
    ],
    link: { label: 'Glance through the design system file', href: 'https://www.figma.com/file/NrKHSu2vJe5bFyGAeEyuWI/Green-UX-Design-System-Framework-V-2.0?type=design&node-id=0%3A1&mode=design&t=V38FuKXNJiPULIC6-1' },
  },
  {
    slug: 'generative-experience-design',
    nav: 'Generative Experience Design',
    title: 'Exploring possibilities for Gen AI and making business sense in design',
    meta: ['Feb 2023 - present', 'Design Lead', 'Design strategy · Data viz'],
    tone: 'plum',
    sections: [
      {
        label: 'Quick snapshot',
        items: [
          { lead: 'Scope definition', text: 'I collaborated with the team to define the scope of the project: the objectives, deliverables and target audience for the AI toolkit and portal. This initial planning set the foundation and kept the work focused.' },
          { lead: 'Research and analysis', text: 'Led the team through extensive research on generative AI in the context of user experience design: industry trends, use cases, emerging technologies and best practices, and encouraged the team to analyse what they found critically.' },
        ],
      },
      {
        label: 'Outcomes',
        items: [
          { lead: 'Point of view', text: 'Together with the team, we crafted a clear and compelling point of view on how generative AI can enhance the user experience design process. It guided the project and gave the work a cohesive narrative.' },
          { lead: 'Designing the Gen AI designer’s site', text: 'After the playbook launched, I anchored the team towards an engaging and informative portal with insights, case studies and success stories to inspire, educate and equip designers with the power of Gen AI.' },
        ],
      },
    ],
    link: { label: 'Generative Experience Design portal', href: 'https://genaixd.notion.site/08fdff678efb4b4bb51859bead3be867?v=bf5ca3386c3b41cd81e5e0b35ed89b06&pvs=4' },
  },
  {
    slug: 'conversational-ai-design-toolkit',
    nav: 'Conversational AI Design Toolkit',
    title: 'Conversational AI Design Toolkit',
    tone: 'graphite',
    sections: [
      {
        label: 'What it is',
        items: [
          { text: 'Discovering SMART goals, determining AI chatbot design direction, defining scope, prioritizing features, and establishing benchmarking maps for comparison.' },
        ],
      },
      {
        label: 'Discovery templates',
        items: [
          { lead: 'Design direction', text: 'Seeking the perfect path for crafting an AI chatbot.' },
          { lead: 'SMART goals', text: 'Strategically mapping achievements for AI chatbot success.' },
          { lead: 'Priority matrix', text: 'Aligning tasks with Must, Should, Would and Could categories.' },
          { lead: 'Benchmarking', text: 'Examining AI chatbot rivals’ strengths, weaknesses and target audiences.' },
          { lead: 'Wheel of scope', text: 'Navigating industry, market, functionality, target audience, technology stack, ethical considerations and timeframe.' },
        ],
      },
    ],
  },
  {
    slug: 'ai-assistant-persona-builder',
    nav: 'AI Assistant Persona Builder',
    title: 'AI Assistant Persona Builder',
    tone: 'plum',
    sections: [
      {
        label: 'What it is',
        items: [
          { text: 'Craft an AI Assistant persona: choose relevant brand archetypes, adopt traits, and create a mood board inspired by famous personalities.' },
        ],
      },
      {
        label: 'Approach',
        items: [
          { lead: 'Humanizing', text: 'Artificial intelligence with personality traits and characteristics.' },
          { lead: 'Brand archetypes', text: 'Translated from Jungian archetypes, enhancing brand presence.' },
          { lead: 'Personality traits', text: 'Ensure relevance, enhancing resonance with consumers and engagement.' },
          { lead: 'Mood boards', text: 'Match with famous personalities to enhance persona development.' },
          { lead: 'Tone of voice', text: 'A clear definition ensures message delivery aligns with the desired perception.' },
        ],
      },
      {
        label: 'Interactive template',
        items: [
          { text: 'Each brand archetype comes with its traits. Once you have finalised two brand archetypes, go through the traits provided for each, and adopt the ones for your chatbot that align with your brand’s identity and the user experience you aim to provide.' },
        ],
      },
    ],
  },
  {
    slug: 'generative-experience-design-portal',
    nav: 'Gen-AI design portal',
    title: 'A home for Gen-AI design tools, toolkits and resources',
    tone: 'cobalt',
    sections: [
      {
        label: 'Purpose',
        items: [
          { text: 'Curating Gen-AI tools, toolkits and all the resources to help designers soar through this AI age.' },
          { lead: 'Learn', text: 'Gen-AI design towards an SME track.' },
          { lead: 'Create', text: 'Gen-AI PoVs and PoCs that create client value.' },
          { lead: 'Evangelise', text: 'Equip designers with Gen-AI tools.' },
        ],
      },
      {
        label: 'Toolkits',
        items: [
          { lead: 'Gen AI Playbook', text: 'A playful beginner’s guide to Gen AI design.' },
          { lead: 'Conv. AI Design Toolkit', text: 'A recipe to build delightful conversational experiences.' },
          { lead: 'Gen-AI Design Systems', text: 'A Figma plugin concept to generate a design system using prompts.' },
          { lead: 'Persona Builder', text: 'An AI Assistant persona builder.' },
          { lead: 'Blazefast RFPs', text: 'Build high-quality winning RFPs at speed.' },
          { lead: 'Industry Research Repo', text: 'Levers to ideate on Gen AI possibilities across industries.' },
        ],
      },
      {
        label: 'Success stories',
        items: [
          { lead: 'Travel companion', text: 'A conversational companion for a delightful, guided travel experience.' },
          { lead: 'Logistics control tower', text: 'A Gen-AI powered logistics control system for seamless shipping.' },
          { lead: 'Workplace bestie', text: 'A conversational companion for employees, helping with everything they need at work.' },
          { lead: 'Grocery shopping', text: 'Conversational commerce through the grocery shopping experience.' },
          { lead: 'Assistant for support agents', text: 'Making customer support resolution seamless and efficient.' },
        ],
      },
      {
        label: 'Gen-AI design services',
        items: [
          { lead: 'UX diagnosis and lean product design', text: 'Analyse current applications to find where Generative AI can streamline workflows, improve personalization and uncover new opportunities.' },
          { lead: 'Innovation strategy with Gen AI', text: '' },
          { lead: 'Conversational experiences', text: '' },
          { lead: 'Generative content strategy', text: '' },
        ],
      },
    ],
    link: { label: 'Walk through the portal concepts', href: 'https://www.figma.com/proto/bY0ZxBe8wHHBSggRWqfSjh/GXD-Portal-Concepts?page-id=946%3A5615&node-id=953-6567&viewport=8118%2C2078%2C0.53&t=pT33zOZSE3uAnbkr-8&scaling=contain&starting-point-node-id=953%3A6567&hide-ui=1' },
  },
]

export const storyBySlug = (s: string) => shortStories.find(x => x.slug === s)
