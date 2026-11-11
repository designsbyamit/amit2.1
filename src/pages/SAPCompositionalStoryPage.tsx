import Breadcrumb from '../components/ds/Breadcrumb'
import CaseThumb from '../components/ds/CaseThumb'
import Pipeline from '../components/case/cds/Pipeline'
import { heroClass, heroStyle } from '../data/caseTheme'
import { caseStudies } from '../data/work'
import { Section, Head, Fig, ScreenTabs, Numbered, Defs, Grid } from '../components/case/Chapter'

const cs = caseStudies.find(c => c.id === 'sap-compositional')!
const B = import.meta.env.BASE_URL
const img = (n: string) => `${B}images/case-studies/sap-compositional/${n}.webp`

const facts: [string, string][] = [
  ['Kind', 'Research and point of view'],
  ['Form', 'A 17 page research site'],
  ['Working models', 'EOM and a vertical slice lab'],
  ['Status', 'Working hypothesis'],
]

const theses = [
  { t: 'A CDS is not a component library AI can use', d: 'It is a structured representation of design knowledge: semantics, relationships, patterns, constraints and composition logic. It lets AI build coherent experiences inside a design space the organisation defines.' },
  { t: 'AI should not go from prompt to arbitrary UI', d: 'The path is intent, understanding, experience reasoning, composition, validation, then UI. Each step can be inspected.' },
  { t: 'Designers move from screens to the space around them', d: 'The work becomes defining the language, rules, relationships and boundaries inside which AI can create experiences.' },
]

const parts = [
  ['LLM', 'The reasoning engine. It interprets what the person asks and plans. It does not decide how the experience looks.'],
  ['CDS', 'The organisation’s design language and composition space: what components and patterns mean, what they can do, how they relate, and which combinations are valid.'],
  ['Composition', 'The decision about which experience to assemble, given intent, context, the business situation and what the CDS allows.'],
  ['EOM', 'A reasoning layer that turns a business situation into experience direction: what matters, what the system knows, what the agent may do and what stays human.'],
  ['Guardrails', 'The boundaries: patterns, accessibility, brand, policy, permissions, trust, safety and compliance.'],
]

const pipeline = [
  { t: 'Human intent', d: 'Not "give me a card and a table", but "help me understand why attrition is rising".' },
  { t: 'Context and understanding', d: 'Role, permissions, history, device and business state, read by the LLM into intent and a plan.' },
  { t: 'CDS and composition', d: 'The design language is queried, and a composition is chosen from what is valid.' },
  { t: 'Specification', d: 'The composition is written down as a specification, not as pixels.' },
  { t: 'Guardrails and validation', d: 'The specification is checked against the boundaries before anything renders.' },
  { t: 'Rendering and runtime', d: 'A renderer maps the validated specification to real components, connected to live state.' },
  { t: 'Outcome, evaluation, learning', d: 'The result is judged on the outcome, not only on how it looks, and the learning goes back in.' },
]

const shifts: [string, string][] = [
  ['Design screens', 'Design experience spaces'],
  ['Create components', 'Define what components can do'],
  ['Write guidelines', 'Encode design logic'],
  ['Create flows', 'Define intent and experience models'],
  ['Review screens', 'Evaluate generated experiences'],
  ['Maintain libraries', 'Maintain design intelligence'],
]

const deliverables = [
  ['Discover', 'Experience dissection and baseline'],
  ['Frame', 'Intent and outcome contract'],
  ['Ground', 'Domain and evidence contract'],
  ['Diagnose', 'EOM opportunity map'],
  ['Enable', 'Semantic capability registry'],
  ['Govern', 'Authority, risk and policy matrix'],
  ['Orchestrate', 'Decision and composition specification'],
  ['Prove', 'Assurance and learning contract'],
]

const screens = [
  { id: 'home', label: 'The site', src: img('home'), alt: 'The CDS research site home', ratio: '1440 / 900', note: 'A research publication and technical handbook in one, read from first principles to implementation.' },
  { id: 'anatomy', label: 'Anatomy', src: img('anatomy'), alt: 'Anatomy of a CDS', ratio: '1440 / 900', note: 'Where a CDS sits between what the AI understands and what the person finally sees.' },
  { id: 'composition', label: 'Composition', src: img('composition'), alt: 'How composition works', ratio: '1440 / 900', note: 'How intent and context become an experience, step by step.' },
  { id: 'eom', label: 'EOM and IXO', src: img('eom'), alt: 'EOM and IXO', ratio: '1440 / 900', note: 'Diagnose first, then orchestrate. Marked on the site itself as a working hypothesis.' },
  { id: 'guardrails', label: 'Guardrails', src: img('guardrails'), alt: 'The guardrails layer', ratio: '1440 / 900', note: 'The boundaries around AI generated experiences, kept separate from the design language.' },
  { id: 'slice', label: 'Vertical slice lab', src: img('vertical-slice'), alt: 'The vertical slice lab', ratio: '1440 / 900', note: 'Eight deliverables assembled into one inspectable flow from prompt to outcome, where every runtime decision traces to evidence, guidance, policy and an owner.' },
]

export default function SAPCompositionalStoryPage() {
  return (
    <div className="bg-surface-0 min-h-screen">
      <header className={heroClass(cs.id)} style={{ paddingTop: 'var(--header-h)', ...heroStyle(cs.id) }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Compositional design system' }]} />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-10">
            <div className="lg:col-span-5">
              <p className="text-label text-ink-3 ">{cs.category}</p>
              <h1 className="text-display-l text-white mt-5">{cs.title}</h1>
              <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">A compositional design system gives AI a governed design language for creating experiences. This is the thinking, the model and the working explorations behind it.</p>
            </div>
            <figure className="lg:col-span-7 m-0">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-3)' }}><CaseThumb id={cs.id} live flush /></div>
              <figcaption className="text-caption text-ink-3 mt-3">From a plain-language intent to a governed composition. The model in motion.</figcaption>
            </figure>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-5xl">
            {facts.map(([k, v]) => <div key={k}><dt className="text-label text-ink-3">{k}</dt><dd className="v2-item text-white mt-2">{v}</dd></div>)}
          </dl>
        </div>
      </header>

      <Section id="thesis" raised>
        <Head n={1} title="Three beliefs that shape everything else." intro="The work starts from a position, and the position is meant to be tested." />
        <Numbered items={theses} />
      </Section>

      <Section id="parts">
        <Head n={2} title="Five things that are easy to blur together." intro="Most confusion about generative interfaces comes from collapsing these into one AI layer. Keeping them apart is the first design decision." />
        <Defs rows={parts as [string, string][]} />
      </Section>

      <Section id="pipeline" raised>
        <Head n={3} title="From intent to interface, with a check at every step." intro="The LLM understands and plans. The CDS provides the language. Composition decides the experience. Guardrails decide what may be shown." />
        <Pipeline />
        <Numbered items={pipeline} cols={3} />
        <Fig className="mt-16 max-w-3xl" src={img('anatomy')} alt="Anatomy of a CDS" ratio="1440 / 900" caption="Where the CDS fits between intent and UI." />
      </Section>

      <Section id="designer">
        <Head n={4} title="What designers do differently." intro="The open question is the one worth keeping: what should designers encode, what should AI infer, and what should never be delegated?" />
        <Grid head={['Today', 'With a CDS']} rows={shifts.map(([a, b]) => [a, b])} />
      </Section>

      <Section id="eom" raised>
        <Head n={5} title="EOM: diagnose first, then orchestrate." intro="Experience optimisation mapping helps a designer turn a business situation into a composition direction. It is a working hypothesis, not a finished method." />
        <Defs rows={[
          ['The problem', 'Designers receive business requirements, agent output, data, evidence, permissions and design system options as separate inputs. The hard part is deciding what they should change in the experience.'],
          ['The questions', 'What outcome matters? What does the system understand? What evidence supports it? What may the agent do, and what stays human? What should lead, and what should be revealed?'],
          ['The flow', 'Structured intake, semantic scenario, evidence and authority, product judgment, composition contract, exploration, then evaluation and learning.'],
        ]} />
      </Section>

      <Section id="practice">
        <Head n={6} title="Eight deliverables that make it practical." intro="A toolkit of templates, one per stage, assembled in a vertical slice lab into a single flow from prompt to outcome." />
        <Grid head={['Stage', 'Deliverable']} rows={deliverables.map(([a, b]) => [a, b])} />
      </Section>

      <Section id="site" raised>
        <Head n={7} title="The research site." intro="The thinking lives in a 17 page site designed like a publication. These are real pages from it." />
        <ScreenTabs label="Pages of the research site" screens={screens} />
      </Section>

      <Section id="status">
        <Head n={8} title="Where it stands." />
        <Grid head={['Part', 'State']} rows={[
          ['Thesis and conceptual model', 'Written and published on an internal research site'],
          ['EOM and IXO', 'Working hypothesis'],
          ['Toolkit and vertical slice lab', 'Built as templates and a lab'],
          ['Use in product teams', 'Not reported here'],
        ]} />
      </Section>
    </div>
  )
}
