export interface Testimonial {
  quote: string
  name: string
  role: string
  source: 'ADPList' | 'Colleague'
  url?: string
}

const ADPLIST = 'https://adplist.org/mentors/amit-kumar-tiwari'

/** Mentee reviews, copied verbatim from Amit's public ADPList profile. */
export const menteeTestimonials: Testimonial[] = [
  {
    quote: 'Incredibly friendly from the get-go, he gave really clear and actionable feedback about the UX of my UX portfolio and guided me with the next steps. I really respect the fact that he took the time to go through my work before joining the call. Thanks a lot for being an awesome mentor, Amit',
    name: 'Mahesh Tripathi',
    role: 'Student, Indian Institute of Technology Guwahati',
    source: 'ADPList',
    url: ADPLIST,
  },
  {
    quote: 'My session with Amit was one of the most outcome oriented and meaningful 1:1 conversations I have had in terms of my career outlook and my portfolio, Amit helped me introspect and lay down my goals and methodically took me through a process where he helped me understand how I can improve my work and my presentation skills. Thank you Amit The time you took out means a lot!',
    name: 'Eshwar Venkatesan',
    role: 'Student, Srishti Manipal Institute of Art, Design and Technology',
    source: 'ADPList',
    url: ADPLIST,
  },
  {
    quote: 'He helped me gain a lot of clarity as an early career designer and how to have a growth mindset.',
    name: 'Siddhesh Shinde',
    role: 'UX/UI Designer, Vinsys',
    source: 'ADPList',
    url: ADPLIST,
  },
]

/** Colleague testimonials, copied verbatim from www.designsbyamit.com. */
export const colleagueTestimonials: Testimonial[] = [
  {
    quote: 'Amit’s fundamentals in user experience design are very strong, complemented by a very methodical and structured approach to problem solving, project planning and execution. He is a great mentor who invests time in coaching and nurturing young talent. In summary, Amit is a very valuable asset to have on any design team and is someone with immense potential to shine in a design leadership role in the years ahead.',
    name: 'Tej Kumar',
    role: 'Associate Director, Experience Design & Innovation, Accenture Song in India',
    source: 'Colleague',
  },
  {
    quote: 'Amit, you have great leadership skills and govern your teams well. As you organise the overall goals and provide clear visions for your team members with planned reviews, it is amazing how well they manage their own deliverables. You often adjust to their needs and provide them with support and guidance. You have been successful in creating a team that works together to reach its goals.',
    name: 'Manjusha Singh',
    role: 'Studio Lead',
    source: 'Colleague',
  },
]
