export interface Phase {
  years: string
  title: string
  company: string
  narrative: string
}

export const phases: Phase[] = [
  {
    years: 'College',
    title: 'Foundations',
    company: 'Computer science & early development',
    narrative:
      'A computer science background and hands-on development work. Took on leadership opportunities early, well before the title existed.',
  },
  {
    years: '2011–2014',
    title: 'Early Practice',
    company: 'Infosys · Senior UX Designer',
    narrative:
      '20+ client engagements: simple UIs, research artefacts, and everything it takes to run the UX cycle end to end.',
  },
  {
    years: '2014–2015',
    title: 'Founding Lead',
    company: 'Photon Interactive · Creative UX Lead',
    narrative:
      'Founding UX lead for e-commerce clients: research, analytics, and the start of a design culture.',
  },
  {
    years: '2015–2018',
    title: 'Enterprise Scale',
    company: 'Hewlett Packard Enterprise · Staff Product Designer',
    narrative:
      'Led UX for the Greenlake cloud suite. Built the GreenUX design system from the ground up. Established global Communities of Practice: design operations at scale.',
  },
  {
    years: '2018–2024',
    title: 'Strategic Leadership',
    company: 'Accenture Song · User Experience Manager',
    narrative:
      'UX practice leadership across cross-industry B2B and B2C. Founding member of the studio\'s Generative AI and Conversational AI design capabilities. Bridging design and business strategy.',
  },
  {
    years: '2024–present',
    title: 'AI-Native Era',
    company: 'SAP Labs · Design Leader (User Experience Manager)',
    narrative:
      'Design leadership at enterprise scale. Shaping AI-native experiences, agentic workflows, and conversational HCM, and unifying product experiences across SAP.',
  },
]
