import Breadcrumb from '../components/ds/Breadcrumb'
import { caseStudies } from '../data/work'
import { Section, Head, Fig, ScreenTabs, Numbered, Defs, Grid } from '../components/case/Chapter'

const cs = caseStudies.find(c => c.id === 'sap-signin')!
const B = import.meta.env.BASE_URL
const img = (n: string) => `${B}images/case-studies/sap-signin/${n}.webp`

const facts: [string, string][] = [
  ['Status', 'Ready for implementation'],
  ['Kind', 'Product standard'],
  ['Covers', '8 cloud products'],
  ['Delivered', 'Guidelines and 5 prototypes'],
]

const interviews = [
  'Product owners and designers across the portfolio, and the identity platform team, which serves 12,000+ customers.',
  'Needs that came up: customisation of the login page, automatic detection of the account name, and managing single sign on across very different customer set ups.',
  'Multi tenant products often cannot tell which identity provider applies until the user says something, so the first step has to ask the right question.',
  'Error messages are deliberately generic for security. They cannot reveal whether the username or the password was wrong.',
]

const asis = [
  'Login screens differ across the products, with modal in some and full page in others.',
  'One product needs a company ID before anything else, which breaks parity with the rest.',
  'Technical fields such as system, client and language are shown up front in some products.',
  'Password visibility toggles, "Forgot password", "Stay signed in" and help links are missing in most.',
  'Privacy and terms links are missing from most login pages.',
]

const insights = [
  { t: 'Inconsistency breaks mental models', d: 'People who move between products meet a different login each time, which raises errors and lowers trust in the suite.' },
  { t: 'Redundant steps make it feel technical', d: 'Repeated prompts, unclear session timeouts and mixed multi step flows leave people logged out with no explanation.' },
  { t: 'Basic hygiene is missing', d: 'Labels inside fields, no password toggle, no recovery link and inconsistent button placement make the product feel unfinished.' },
  { t: 'Expected utilities are absent', d: 'Stay signed in, need help and forgot username exist in only one product, so people raise tickets for things self service could solve.' },
  { t: 'Compliance gaps are widespread', d: 'Privacy and terms links are absent from most pages, which matters for any externally hosted service.' },
  { t: 'The bar is consumer apps', d: 'People want uniformity, fewer steps, single sign on done right and clear, friendly errors.' },
]

const decisions = [
  { t: 'Card layout, with an optional split page', d: 'A single centred card is simple, consistent and responsive by default, but gives products no identity. So the card is the default, and products with a strong brand can add a media panel beside the form. On small screens the panel hides.' },
  { t: 'Header: SAP branding and the product identifier', d: 'Recommended over SAP branding alone or branding with an application name. It gives product context without tying the experience to one application.' },
  { t: 'Progressive when routing is needed', d: 'If the system must resolve the identity before it knows how to authenticate, ask for the identity first, then route to password, passkey or single sign on.' },
  { t: 'Two kinds of error, two places', d: 'A field error appears inline under the field and disables Continue. An account or credential error is a banner at the top, and the fields stay filled so nobody retypes.' },
  { t: 'One entry point for help', d: '"Need sign in assistance?" opens a dropdown in the same card: forgot password, forgot username, locked out, other. The card updates in place.' },
  { t: 'Non blaming language', d: '"We couldn’t authenticate you", not "Wrong password". Recovery copy is reassuring and says what to do next.' },
]

const screens = [
  { id: 'types', label: 'Flow types', src: img('types'), alt: 'Context first and direct authentication', ratio: '1200 / 1047', note: 'Three flow types cover every product: direct (everything at once), progressive (identify, then authenticate) and context first (tenant, then credentials).' },
  { id: 'variants', label: 'Header and fields', src: img('variants'), alt: 'Header variants and form field combinations', ratio: '1200 / 1150', note: 'Only the fields that matter for the current step are shown, drawn from one set: identity, authentication, verification, session controls and help.' },
  { id: 'anatomy', label: 'Anatomy', src: img('anatomy'), alt: 'Anatomy of the sign in card', ratio: '1200 / 1160', note: 'Page background, card, header, form, action bar, footer and an optional media panel. The same zones apply to the card and the split page.' },
  { id: 'errors', label: 'Errors', src: img('errors'), alt: 'Field and account error states', ratio: '1200 / 448', note: 'Validation errors, invalid credentials, a locked account and a blocked device, each with plain language and a way forward.' },
  { id: 'responsive', label: 'Responsive', src: img('responsive'), alt: 'Responsive layouts', ratio: '1200 / 761', note: 'The centred card degrades to a phone. The split page reverts to the card when the media panel no longer fits.' },
  { id: 'signout', label: 'Sign out', src: img('signout'), alt: 'The sign out flow', ratio: '1200 / 448', note: 'Sign out lives in the user menu of the shell bar, and ends on a clear "Signed Out" screen with a way back in.' },
]

const recovery = [
  { id: 'r-forgot', label: 'Need help', src: img('r-forgot'), alt: 'Need help with sign in', note: 'One dropdown chooses the kind of help. The card changes in place.' },
  { id: 'r-inbox', label: 'Check your email', src: img('r-inbox'), alt: 'Check your email', note: 'A confirmation with the address used, and a reminder to check spam.' },
  { id: 'r-reset', label: 'Reset password', src: img('r-reset'), alt: 'Reset password with live criteria', note: 'Password criteria update live as the person types, and "passwords match" is announced to screen readers.' },
  { id: 'r-success', label: 'Password updated', src: img('r-success'), alt: 'Password updated', note: 'A short, reassuring end, with one button back to sign in.' },
  { id: 'r-locked', label: 'Locked out', src: img('r-locked'), alt: 'Account locked', note: 'Forgot username and locked account route to a message that says who to contact. No form fields.' },
]

export default function SAPSignInStoryPage() {
  return (
    <div className="bg-surface-0 min-h-screen">
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Unified sign in' }]} />
          <p className="text-label text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">One sign in and sign out experience for every cloud product</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">A product standard for the moment of entry. Three flow types, one anatomy, one way to recover, and a sign out that tells you what happened.</p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-5xl">
            {facts.map(([k, v]) => <div key={k}><dt className="text-label text-ink-3">{k}</dt><dd className="v2-item text-white mt-2">{v}</dd></div>)}
          </dl>
        </div>
      </header>

      <Section id="problem" raised>
        <p className="text-label text-ink-3">The problem</p>
        <h2 className="text-display-l text-white mt-4 max-w-4xl">The first screen of every product looked different.</h2>
        <p className="text-body-lg text-ink-2 mt-8 max-w-measure-xl">Products lacked a consistent, user centred sign in and sign out. People met fragmented flows, mismatched patterns and missing basics depending on the product, at the most important moment: the moment of entry.</p>
      </Section>

      <Section id="discovery">
        <Head n={1} title="What we heard, and what we found." intro="Interviews with product owners, designers and the identity platform team, then an audit of the sign in of eight products." />
        <h3 className="text-heading text-white mb-4">From the interviews</h3>
        <ul className="max-w-measure-xl space-y-3">{interviews.map(x => <li key={x} className="text-body-lg text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{x}</li>)}</ul>
        <h3 className="text-heading text-white mt-16 mb-4">From the audit</h3>
        <ul className="max-w-measure-xl space-y-3">{asis.map(x => <li key={x} className="text-body-lg text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{x}</li>)}</ul>
        <h3 className="text-heading text-white mt-16 mb-2">Six insights</h3>
        <Numbered items={insights} />
      </Section>

      <Section id="scope" raised>
        <Head n={2} title="Scope: the experience, not the identity plumbing." />
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
          <div>
            <p className="text-label text-signal-ink">In scope</p>
            <ul className="mt-4 space-y-3">{['Sign in and sign out guidelines for cloud products', 'Direct, progressive and context first flows', 'Errors and recovery', 'Centred card and split page layouts', 'Accessibility: keyboard, screen reader, themes', 'Content: labels, errors, loading states'].map(x => <li key={x} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{x}</li>)}</ul>
          </div>
          <div>
            <p className="text-label text-ink-3">Out of scope</p>
            <ul className="mt-4 space-y-3">{['Identity provider implementation', 'Desktop and native clients', 'Multi factor provider configuration', 'Home screens and onboarding after sign in'].map(x => <li key={x} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{x}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section id="direction">
        <Head n={3} title="Three flows, one anatomy, six decisions." intro="The standard is small on purpose. Every product picks a flow, not a design." />
        <ScreenTabs label="Sign in guidelines" screens={screens} />
        <h3 className="text-heading text-white mt-20 mb-2">The decisions behind it</h3>
        <Numbered items={decisions} cols={2} />
      </Section>

      <Section id="recovery" raised>
        <Head n={4} title="Recovery that does not need a ticket." intro="Every recovery path starts from one link and stays inside the same card." />
        <ScreenTabs label="Recovery flow" screens={recovery} />
      </Section>

      <Section id="quality">
        <Head n={5} title="Accessible, readable and specified to the pixel." intro="Written so a product team can build from it without asking." />
        <Defs rows={[
          ['Keyboard', 'Tab order runs from the logo to the title, the error banner, the fields, the action and the footer. On an error, focus moves to the first invalid field.'],
          ['Screen readers', 'The card is a dialog labelled by its title. Error banners are announced at once. Reading order always matches visual order.'],
          ['Themes', 'Tested in four Fiori themes: light, dark, and both high contrast themes. Contrast meets WCAG 2.1 AA in all four.'],
          ['Content', 'Top aligned labels in sentence case. "Continue" for multi step, "Sign In" for single step, "Sign Out" never "Logout". Never "Submit" as the main action.'],
          ['Visual', 'Annotated specs for spacing, type and colour, with Fiori tokens, in compact and cozy sizes.'],
        ]} />
        <Fig className="mt-16 max-w-3xl" src={img('visual')} alt="Annotated visual specification of the sign in card" ratio="1200 / 1160" caption="The annotated visual specification: spacing, type and colour tied to tokens." />
      </Section>

      <Section id="status" raised>
        <Head n={6} title="Where it stands." />
        <Grid head={['Item', 'State']} rows={[
          ['Guidelines for the sign in and sign out experience', 'Ready for implementation'],
          ['Interactive prototypes', '5 built: identity first, password first, tenant first, split view and recovery'],
          ['Adoption across products', 'Not reported here'],
        ]} />
      </Section>
    </div>
  )
}
