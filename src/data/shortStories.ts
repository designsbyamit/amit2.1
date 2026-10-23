// Short stories: one-page projects, written from the one-pager designs.
// Rule: nothing here is stated that is not in those designs.

export interface ShortStory {
  slug: string
  title: string
  /** Where it happened, if the design says. */
  meta?: string[]
  /** A gradient behind the cover, taken from the design. */
  field: string
  sections: { label: string; items: { lead?: string; text: string }[] }[]
  link?: { label: string; href: string }
}

export const shortStories: ShortStory[] = [
  {
    slug: 'file18',
    title: 'Resolving adoption barriers of the File18 app for Network18 journalists',
    field: 'linear-gradient(135deg, #3A5C9E 0%, #6F8CC4 55%, #DCE3F2 100%)',
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
    title: 'A living design system with sustainability and greener UX as a foundational pillar',
    field: 'linear-gradient(135deg, #1F6B5A 0%, #3C8F7C 55%, #CFE5DE 100%)',
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
    title: 'Exploring possibilities for Gen AI and making business sense in design',
    meta: ['Feb 2023 - present', 'Design Lead', 'Design strategy · Data viz'],
    field: 'linear-gradient(135deg, #5B2C8F 0%, #AE83F4 55%, #E7CEF7 100%)',
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
]

export const storyBySlug = (s: string) => shortStories.find(x => x.slug === s)
