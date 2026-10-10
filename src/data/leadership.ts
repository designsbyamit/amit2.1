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
    context: 'Design maturity and trust in large organisations',
    title: 'How I learned to influence without authority',
    cues: [
      'Describe a situation where you had to change how an organisation thought about design — without having the title or the mandate.',
      'What did you try that didn\'t work? What finally did?',
      'What does "earning trust" actually look like in practice inside a large enterprise?',
    ],
    narrative: [
      'I find this question a little tricky. I\'ve always been seen as someone from design, with a formal role in the design organisation, so in a way people already associate me with design.',
      'The more interesting question, I think, is how an organisation\'s thinking about design changes, whether or not the person driving that change sits in a design team or has any formal authority over it.',
      'For me, it comes down to mindset. Understanding what design does is different from developing a designer\'s mindset. You don\'t have to be a designer to look at a problem from the user\'s perspective, challenge assumptions, explore alternatives, or bring different people together to find a better solution. When that starts happening beyond the design team, you begin to see a real shift in design maturity.',
      'At SAP, we have an initiative called Beyond Pixels, which recognises colleagues outside the design organisation who champion design in their own roles. I really like the idea behind it, because it shows that design advocacy doesn\'t need a design title. Sometimes the person who makes the biggest difference is a product manager, an engineer or a business stakeholder who starts asking the right questions and helps others see things differently.',
      'That\'s close to how I\'ve tried to lead. I lean towards a democratic style of leadership. There are situations where you need to make the call, set direction and use your authority, but leadership shouldn\'t depend on how often you use it. I\'d much rather create the conditions for people to take ownership, contribute their perspectives and do their best work. When people feel free to contribute rather than simply follow instructions, they start influencing others, challenging established ways of working, and carrying ideas into spaces where design might not otherwise have a voice.',
      'Of course, not everything works through collaboration alone. Sometimes you need to be more direct, especially when there\'s a lack of clarity or a decision is needed. And what hasn\'t worked as well, in my experience, is assuming people will change their thinking simply because we explain the value of design. You can make a very compelling presentation about design maturity, and it still won\'t change how someone makes decisions on Monday morning.',
      'What works better is making design relevant to the problems people are already trying to solve, involving them in the process, and giving them the chance to experience the difference for themselves.',
      'None of this works without trust. And I don\'t think earning trust is fundamentally different in a large enterprise. The scale and complexity change, but you\'re still working with people, and people trust you when they feel understood, respected and confident that they can rely on you.',
      'For me, it starts with relationships. Not networking, but genuinely trying to understand the person on the other side. What are they dealing with? What pressures are they under? What information might they have that I don\'t? We\'re sometimes too quick to judge someone\'s behaviour without understanding the circumstances behind it. I catch myself doing this too, so I try to step back. I probably give people the benefit of the doubt more than I should! But approaching people with curiosity rather than assumptions changes the nature of a conversation.',
      'Then it\'s about creating an environment where people feel safe to speak openly. In a large organisation there are so many dependencies and perspectives that people may hold back concerns, or disagree without saying so. If people feel they have to agree with you because of your position, you might get compliance, but I\'m not sure you\'ll get trust. I want people to challenge my thinking, tell me when something isn\'t working, and raise concerns without it being held against them, whether they report to me, are my peers or are senior stakeholders. Creating that space is one thing. Responding constructively when someone actually disagrees is where it gets tested.',
      'Fairness and consistency matter just as much. People pay attention to what you actually do. Do you listen to everyone, or only those who agree with you? Do you give people credit? Do you stand by your commitments? And when something goes wrong, do you try to understand the problem, or look for someone to blame? These everyday moments shape trust far more than any leadership statement.',
      'Then there\'s competence and reliability. Trust also comes from knowing someone can deliver, make sound decisions and follow through. Reliability doesn\'t mean promising everything will go perfectly. It means being honest about what you can do, communicating when things change, and taking responsibility for the outcome.',
      'And trust has to flow both ways. I try to give people autonomy rather than be involved in every decision. Sometimes they\'ll approach a problem differently from how I would, and that doesn\'t automatically make them wrong. If we want people to grow, we have to give them room to think, decide and learn.',
      'So influencing without authority isn\'t about convincing people to believe in design. It\'s about helping them discover its value through their own work. When that happens, you no longer have just a design team advocating for design. You have people across the organisation who believe in it, practise it and help others do the same. To me, that\'s a much more meaningful sign of influence.',
    ],
    learnings: [
      'Change mindsets, not opinions: help people outside design practise design thinking in their own roles.',
      'Make design relevant to problems people already have, involve them, and let them experience the difference themselves.',
      'Lead democratically, and be direct when clarity is missing or a decision is due.',
      'Build trust on five foundations: relationships, psychological safety, fairness, consistency and reliability.',
      'Trust is reciprocal. Give people autonomy if you want them to trust you.',
    ],
    nuggets: [
      'Design advocacy doesn\'t need a design title.',
      'A compelling deck won\'t change Monday-morning decisions.',
      'Curiosity before judgement.',
      'Position earns compliance. Behaviour earns trust.',
    ],
    lesson: 'Your position might give you authority, but trust has to be earned through your behaviour, consistently over time.',
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
    narrative: [
      'SAP Design Hub India wasn\'t something I started from scratch. The concept itself was already strong.',
      'Around 2022 or 2023, design communities and activities were happening in pockets across different locations. Senior leadership recognised the energy in these communities and gave them a more formal identity as Design Hubs. Some fantastic leaders shaped the early initiatives, brought people together and established the foundation we have today.',
      'When I took on the role in early 2025, I inherited a community with a lot of energy, a strong sense of belonging, and people who genuinely care about design. That mattered to me. The design community has, in many ways, been my alma mater. I\'ve learned from it, built relationships through it, had some wonderful experiences, and hopefully given something back along the way. So I didn\'t look at it as something that needed fixing. I looked at it as something with a lot of potential to grow.',
      'The first thing I revisited was its purpose and reach. We had a strong grassroots community, but much of the energy sat with people who were already passionate about design and community initiatives. I wanted to bring design leaders from different lines of business across SAP India into the conversation as well. So we involved them more deliberately, kept them informed, and created opportunities for them to participate. This was about expanding the circle rather than replacing what was already working: complementing the bottom-up energy with stronger leadership awareness and engagement.',
      'The second was scale and ambition. We wanted to take Impulse India to another level, not just in the size of the event, but in the quality of the conversations, the diversity of speakers and the overall experience. I think we made meaningful progress on that front, both qualitatively and quantitatively.',
      'But one thing I\'ve realised is that a community cannot be sustained by one big event. Events create excitement, but what happens between them is equally important. That\'s one of the reasons we introduced Unwind this year. The idea is deliberately simple: bring people together from design, development, product and other teams to have informal conversations, connect, and enjoy each other\'s company. We launched it at a time when the industry is going through considerable change and people are dealing with uncertainty and pressure. Sometimes people don\'t need another learning session or a structured agenda. They just need a space to connect.',
      'I also want to be honest that making the community more inclusive is still a work in progress. We haven\'t reached where we want to be yet, and there are several things we continue to explore.',
      'Leading a community reveals a lot, about the people in it and the organisations they work in. You see what designers care about, what they\'re curious about, where they feel connected, and sometimes where they feel disconnected. You also get a sense of an organisation\'s design maturity: whether people are comfortable sharing unfinished work, whether they talk about failures, whether they seek perspectives beyond their own teams, and whether design is seen as belonging to a few specialists or as something that can contribute across the organisation.',
      'But I\'m careful not to make that the primary purpose. A community shouldn\'t exist just to measure design maturity or find gaps. Its first purpose is much more human: celebrating that we\'re part of something together, meeting people who share our interests, discovering perspectives we might not meet in everyday work, building friendships, and having a good time.',
      'The learning comes naturally from that. You might attend a session and take away a new method. Or a casual conversation with someone from another team might show you a completely different way to approach a problem. Sometimes the most valuable learning happens when you aren\'t looking for it, and you don\'t need to measure every interaction by its immediate outcome.',
      'As Lead Curator of Impulse India, I think a lot about what designers should take away. We\'re at a really interesting point in the evolution of design. The industry is moving towards what I\'d call a builder economy, where the ability to make things, experiment with ideas and bring solutions to life is becoming increasingly accessible.',
      'That changes what\'s expected of designers. Earlier, you could specialise in research, interaction design, visual design or prototyping, and rely on other disciplines to take things forward. Today those boundaries are much more fluid. Designers can build working prototypes, experiment with AI, explore technical possibilities and test ideas much earlier. With that opportunity comes a responsibility to understand more than the design itself.',
      'Designers need to be comfortable speaking multiple languages: the language of business, of technology, of product and, of course, of people. You don\'t have to become an expert in every discipline, but you need enough fluency to understand the constraints, ask better questions and make informed decisions. This is where a designer\'s mindset becomes so valuable: connecting perspectives, seeing relationships between problems, thinking in systems, and balancing human needs with business realities.',
      'I want designers to leave Impulse curious about what else they can do. To discover a discipline they haven\'t explored, challenge an assumption they\'ve held for years, or realise they can take an idea much further than they thought possible.',
      'At the same time, I don\'t want us to confuse building more things with creating more value. Just because we can generate a prototype in minutes doesn\'t mean we\'re solving the right problem. When the cost of making things comes down, judgement matters even more: recognising what matters, and telling apart what is possible from what is actually worthwhile.',
      'So if there\'s one thing I\'d want designers to take away, it\'s this: care less about the boundaries of your deliverables and more about the problems you can help solve. The future belongs to designers who combine a human-centred perspective with the ability to think, build and exercise sound judgement.',
      'Looking back at this first stretch, my role has been has been to build on a strong foundation, broaden participation, raise our ambition, and find ways to make the community meaningful to more people.',
    ],
    learnings: [
      'Build on what you inherit. Look for potential before you look for problems.',
      'Expand the circle: pair grassroots energy with leadership engagement.',
      'Raise ambition on quality and diversity, not just size.',
      'Sustain the community between events with simple, informal spaces.',
      'Be honest about what is still a work in progress, like inclusion.',
      'Care less about the boundaries of your deliverables and more about the problems you can help solve.',
    ],
    nuggets: [
      'One big event doesn\'t make a community. What happens between events does.',
      'Building more things is not the same as creating more value.',
      'Belonging first. Learning follows.',
      'A community reveals design maturity, but that shouldn\'t be why it exists.',
    ],
    lesson: 'Community leadership isn\'t about owning something and making it your own. It\'s about being a custodian of something that belongs to many people, and leaving it stronger than you found it.',
  },
  {
    id: 'story-design-culture',
    year: '',
    context: 'Inside a large enterprise',
    title: 'Building design culture from the inside',
    cues: [
      'What does it mean to build design culture from inside a large enterprise rather than starting fresh?',
    ],
    narrative: [
      'Building design culture inside a large organisation is a fascinating challenge, because culture isn\'t something you can announce and expect people to follow. You can have a design strategy, a set of principles and all the right presentations. What really shapes culture is what people experience every day, what gets rewarded, what gets tolerated, and what people feel safe enough to do.',
      'There are a few levers I find particularly interesting.',
      'The first is what I\'d call the status economy. Every organisation has an invisible hierarchy of what gets valued. In some places it\'s the person who ships fastest. In others it\'s technical brilliance, visibility with leadership, or ownership of a high-profile project.',
      'Now imagine a designer who spends weeks navigating difficult stakeholder conversations, aligning teams, resolving conflicting priorities and getting everyone to agree on the right problem. That\'s a tremendous amount of work, and much of it never shows up in the final deliverable. Meanwhile, the polished screens are visible to everyone. If we celebrate only the final output, people naturally optimise for what gets celebrated.',
      'So we\'ve tried to create opportunities to acknowledge the less visible milestones in design work. Getting through a difficult stakeholder negotiation, or helping a team reach alignment, can deserve recognition just as much as a great deliverable. The point isn\'t to celebrate effort for its own sake. It\'s to recognise the behaviours and contributions that actually create better outcomes, even when they aren\'t immediately tangible.',
      'The second lever is making disagreement a healthy part of the culture. I think the ability to disagree openly is an underrated sign of organisational maturity. I\'ve always valued environments where people can say, "I don\'t think this is the right approach," without feeling they\'ve damaged a relationship or challenged someone\'s authority. Disagreement still needs to be constructive, and you still need to make decisions. But if everyone is constantly trying to agree with everyone else, you\'re probably missing important perspectives. The goal isn\'t to eliminate conflict. It\'s to work through it without making it personal.',
      'The third lever is room for experimentation, and here I think SAP has some really positive things going for it. In my experience, there\'s a genuine willingness to let people explore ideas, try different approaches, and learn from what works and what doesn\'t. With technology and the nature of our work changing so quickly, that freedom matters even more. You can\'t ask people to innovate and then make them afraid of getting something wrong.',
      'The fourth is what I\'d call collective memory. Large organisations hold an enormous amount of knowledge, but a surprising amount of it stays inside individual teams or people\'s heads. Teams revisit problems someone else has already solved, repeat experiments, or lose the reasoning behind decisions when people move on. I see an opportunity to build a living archive of design decisions, discoveries, experiments and lessons learned: not just final deliverables, but why we made certain choices and what others can build on. That could change how design knowledge compounds over time.',
      'And underneath all of this is a shared purpose. People need to understand why the work matters and how their contribution fits into something bigger. Without it, recognition becomes performative, disagreement becomes friction, and experimentation becomes activity without direction.',
      'I\'m still learning how to bring all of this together. I don\'t think there\'s a formula for building design culture, especially inside a large enterprise with so many teams, priorities and constraints. But it starts with being deliberate about the environment we create. What do we celebrate? What can people challenge? What are they allowed to experiment with? What knowledge do we preserve? And do people understand the purpose behind it all?',
    ],
    learnings: [
      'Rethink the status economy: recognise the invisible work that creates better outcomes, not just the polished output.',
      'Make disagreement healthy: open, constructive, and never personal.',
      'Create room for experimentation, while staying thoughtful about risk and responsibility.',
      'Build collective memory: keep the reasoning behind decisions, not just the deliverables.',
      'Anchor everything in a shared purpose, so recognition, disagreement and experiments have direction.',
    ],
    nuggets: [
      'People optimise for what gets celebrated.',
      'Disagreeing openly is an underrated sign of maturity.',
      'You can\'t ask people to innovate and then make them afraid of getting it wrong.',
      'Archive the why, not just the what.',
    ],
    lesson: 'Over time, what we celebrate, what people can challenge, what they can experiment with, what knowledge we keep, and whether they understand the purpose shape a culture far more than any statement about the culture we want.',
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
