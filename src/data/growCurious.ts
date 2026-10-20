// Grow · Curious Minds. Questions designers ask, answered from experience and point of view.

export const themes = ['Careers', 'Craft', 'Leadership', 'Intuition', 'Business', 'AI'] as const
export type Theme = (typeof themes)[number]
export interface QA { id: string; theme: Theme; q: string; a: string[] }

export const qas: QA[] = [
  // Careers
  { id: 'start-where', theme: 'Careers', q: 'I am early in my career. Where should I put my energy first?',
    a: ['Put it into craft you can show and into people who will tell you the truth about it. Titles and tools change quickly. Judgement, taste and the habit of finishing things do not.', 'Pick one kind of problem you enjoy and get good at it in public: a case study, a talk, a small project. Breadth will come on its own once someone trusts you with depth.'] },
  { id: 'specialist-or-generalist', theme: 'Careers', q: 'Should I specialise or stay a generalist?',
    a: ['I would not treat it as a choice. Be deep in one thing, and curious enough about the neighbouring things that you can work with the people who own them.', 'I started in computer science and development, and it still helps me talk with engineers. That kind of second language is what makes a specialist useful on a team.'] },
  { id: 'next-step', theme: 'Careers', q: 'How do I know when to move on from a job?',
    a: ['Ask what you are learning and who you are learning from. If both have flattened for a long time, and you have said so to the people who could change it, it may be time.', 'Leave towards something, not only away from something. A move that you can explain in one honest sentence is usually a good one.'] },

  // Craft
  { id: 'what-is-craft', theme: 'Craft', q: 'What do you mean when you say “craft”?',
    a: ['Care that you can see in the details, and that makes the next decision easier for the person using the thing. Alignment, wording, states nobody reviews, the empty screen, the error message.', 'It is not decoration, and it is not slow. It is the habit of asking “is this the best I can do within the time I have?” and being honest about the answer.'] },
  { id: 'improve-taste', theme: 'Craft', q: 'How do I improve my taste?',
    a: ['Look at a lot of good work and ask why it is good, then try to copy a piece of it closely to find out. Reproducing something teaches you what you were not seeing.', 'Then show your work to someone with better taste than yours, and listen for what they notice first. Your taste is usually ahead of your hands. Keep making until your hands catch up.'] },
  { id: 'speed-vs-quality', theme: 'Craft', q: 'How do I keep quality when the deadline is short?',
    a: ['Decide in advance what must be excellent and what can be good enough. Spend the care on the moment the user is most likely to feel it.', 'Say the trade-off out loud to the team. A visible compromise can be fixed later. A hidden one becomes the product.'] },

  // Leadership
  { id: 'first-lead', theme: 'Leadership', q: 'What changes when you start leading designers?',
    a: ['Your output becomes other people’s growth. The satisfaction moves from the work you made to the work the team makes, and that takes time to feel.', 'Keep your craft alive, but stop being the best designer in the room. Your job is to make the room better.'] },
  { id: 'feedback', theme: 'Leadership', q: 'How do you give feedback that is useful?',
    a: ['Start from the goal the work is meant to serve, describe what you see and what it does to the user, and leave the fix to them. A fix you hand over is your design. A question you ask is their learning.', 'Be specific about what is working. People need to know what to keep as much as what to change.'] },
  { id: 'influence', theme: 'Leadership', q: 'How do I influence people I do not manage?',
    a: ['Understand what they are measured on and show how your work helps them get there. Influence is mostly translation.', 'Make decisions visible and easy to join. People support what they have seen being made.'] },

  // Intuition
  { id: 'trust-intuition', theme: 'Intuition', q: 'Can I trust my intuition as a designer?',
    a: ['Trust it as a hypothesis, not as an answer. Intuition is experience compressed, so it is only as good as the experience behind it, and it carries your blind spots too.', 'Use it to decide where to look, then check it with people and evidence. When intuition and evidence disagree, learn why before you decide.'] },
  { id: 'build-intuition', theme: 'Intuition', q: 'How do I build intuition faster?',
    a: ['Shorten the loop between making something and seeing how people use it. Watch real people, often, and notice what surprises you.', 'Write down your guess before you test it. The gap between the guess and the result is where intuition grows.'] },
  { id: 'ancient-wisdom', theme: 'Intuition', q: 'Why do you write about ancient Indian philosophy in a design context?',
    a: ['Because it asks careful questions about how we come to know something, which is the heart of design research. How do we know what a user needs? What counts as a good reason?', 'I find those frameworks useful for thinking about process, knowledge and intention. They give me a different vocabulary for questions designers ask every day.'] },

  // Business
  { id: 'speak-business', theme: 'Business', q: 'Why should designers learn the language of business?',
    a: ['Because decisions are made in that language, and design that cannot be translated into it is easy to cut. Speaking it does not mean giving up design values. It means making them heard.', 'This is what I mean by dual fluency: being at home in design language and in business language, and moving between them without losing either.'] },
  { id: 'show-impact', theme: 'Business', q: 'How do I show the business value of my work?',
    a: ['Connect each design decision to something the business already tracks, and say how you would know it moved. Then tell the story with the evidence you honestly have.', 'If you cannot measure it, describe the change in behaviour or the decision it enabled. Do not invent a number.'] },
  { id: 'stakeholders', theme: 'Business', q: 'How do I deal with stakeholders who think design is only visuals?',
    a: ['Do not argue about the definition. Show them a decision that your design thinking made better, in terms of the thing they care about.', 'Bring them into the work early. People who have seen the problem being framed rarely ask for only visuals afterwards.'] },

  // AI
  { id: 'ai-job', theme: 'AI', q: 'Will AI take my design job?',
    a: ['It will change what the job is made of. Execution is getting cheaper, so judgement, framing and taste matter more, and so does the ability to decide what should and should not be automated.', 'The designers I would bet on are the ones who learn the material, use it every day and stay clear about what a person needs. I would rather learn it early than fear it late.'] },
  { id: 'ai-where-start', theme: 'AI', q: 'Where do I start designing AI experiences?',
    a: ['Start with the human questions: when should the system act, when should it ask, how does the person see why it did something, and how do they undo it?', 'Then try it for real. Build something small and use it. The patterns become clear once you have felt what it is like to trust, or not trust, a system.'] },
  { id: 'human-loop', theme: 'AI', q: 'What does “human in the loop” mean in practice?',
    a: ['It means choosing the points where a person decides, and making those moments fast and well informed. The agent can read and prepare. A person decides at the gates that matter.', 'In the agentic work on this site, the agent never accepts or rejects a deviation on its own. People decide, and every step is logged so the work can be trusted and learned from.'] },
]
