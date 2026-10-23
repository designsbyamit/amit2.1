export interface Testimonial {
  quote: string
  name: string
  role: string
  source: 'ADPList' | 'Colleague' | 'Client'
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

/** Colleague testimonials, verbatim as supplied by Amit. */
export const colleagueTestimonials: Testimonial[] = [
  {
    quote: 'Amit’s fundamentals in user experience design are very strong, complemented by a very methodical and structured approach to problem solving, project planning and execution. He is a great mentor who invests time in coaching and nurturing young talent. In summary, Amit is a very valuable asset to have on any design team and is someone with immense potential to shine in a design leadership role in the years ahead.',
    name: 'Tej Kumar',
    role: 'Senior Director, Experience Design & Innovation, Frog, India',
    source: 'Colleague',
  },
  {
    quote: 'Amit, you have great leadership skills and govern your teams well. As you organise the overall goals and provide clear visions for your team members with planned reviews, it is amazing how well they manage their own deliverables. You often adjust to their needs and provide them with support and guidance. You have been successful in creating a team that works together to reach its goals.',
    name: 'Manjusha Singh',
    role: 'Studio Lead',
    source: 'Colleague',
  },
  {
    quote: 'It’s rare that you come across someone with a standout talent like Amit. He is calm, composed and with an air of natural confidence. Amit is creative, energetic, solutions oriented and highly motivated. I was trained and worked alongside Amit during our stint at Infosys. I was very impressed by Amit\'s ability to handle situations and problems effortlessly. It comes naturally to him. He approaches problems in holistic way and always has the bigger picture in mind. He is both a leader and a serious team player.',
    name: 'Naveen Rawat',
    role: 'Product Designer, Salesforce',
    source: 'Colleague',
  },
  {
    quote: 'Amit’s knowledge base has immensely helped teams understand, gauge and come to speed with the never ending demands of the client. There were times where we had to push hard for the right design solution, timelines, approach, technical nuances, realistic deadlines and ethical ways of working. His problem-solving capabilities are very systematic, he is very process oriented. He’s never afraid to try new waters and is a very solid team player. He’s very articulate and his rationalising is backed with evidences, market research and his valuable experience.',
    name: 'Mayura Tungare',
    role: 'Design Studio Lead, British Petroleum',
    source: 'Colleague',
  },
  {
    quote: 'Behind the smile and positive attitude of Amit, there was always a rational approach. As a leader, he focused on developing skills and expanding the competencies of his team, as well as optimising the processes. Amit brings a wealth of knowledge, an infectious ‘get things done’ attitude and positive vibes, meaning even tackling problems with complex requirements happen in a true customer first way.',
    name: 'Stepan Glukhovetsky',
    role: 'Design Director, Experience Strategy, Accenture Song, UAE',
    source: 'Colleague',
  },
]

/** Client and programme-leadership voices, verbatim from the case studies (see data/work.ts). */
export const clientTestimonials: Testimonial[] = [
  {
    quote: 'Greatly impressed by the quality of designs, the attention to detail and delightful experience. Happy to see that the standards are set quite high and it proudly stands beside any other leading studios\' work globally.',
    name: 'Saran S.',
    role: 'Managing Director, Accenture Operations',
    source: 'Client',
  },
  {
    quote: 'Amit spent a couple of weeks to understand how Collibra is used across the DG practice before proposing a design direction. That level of investment before recommendations is rare and it showed in the quality of the output.',
    name: 'Liz Rivas',
    role: 'Associate Director, Data Governance, Accenture US',
    source: 'Client',
  },
  {
    quote: 'Right from day one, Amit established himself as an expert who understood the Customer Experience journey. This application is external client-facing, 70k+ customers, and customer experience is critical to the company brand, customer retention, and pivot to digital experience.',
    name: 'Mitesh Shah',
    role: 'Associate Director, Accenture CMT, US',
    source: 'Client',
  },
]

/** One-sentence excerpts (verbatim) for compact placements. */
export const quoteExcerpts = {
  mayura: { quote: 'His problem-solving capabilities are very systematic, he is very process oriented.', name: 'Mayura Tungare', role: 'Design Studio Lead, British Petroleum', source: 'Colleague' } as Testimonial,
  stepan: { quote: 'Behind the smile and positive attitude of Amit, there was always a rational approach.', name: 'Stepan Glukhovetsky', role: 'Design Director, Experience Strategy, Accenture Song, UAE', source: 'Colleague' } as Testimonial,
  mahesh: { quote: 'He gave really clear and actionable feedback about the UX of my UX portfolio and guided me with the next steps.', name: 'Mahesh Tripathi', role: 'Student, Indian Institute of Technology Guwahati', source: 'ADPList', url: ADPLIST } as Testimonial,
}
