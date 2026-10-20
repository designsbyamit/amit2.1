import { useRef, useState } from 'react'
import Button from '../ds/Button'
import { TextArea, TextField } from '../ds/Field'
import { DIRECT_EMAIL, TOPICS, sendEnquiry, type ContactOptions, type Topic } from '../../lib/contact'

interface Props { options?: ContactOptions; onDone?: () => void; autoFocus?: boolean }

/** The one contact form. Saves the enquiry and notifies Amit; if the server is unreachable it offers the direct email instead. */
export default function ContactForm({ options = {}, onDone, autoFocus }: Props) {
  const opened = useRef(Date.now())
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [organisation, setOrg] = useState('')
  const [topic, setTopic] = useState<Topic>(options.topic ?? 'work')
  const [message, setMessage] = useState(options.message ?? '')
  const [website, setWebsite] = useState('')
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fail, setFail] = useState<{ message: string; unavailable?: boolean } | null>(null)
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const local: Record<string, string> = {}
    if (!name.trim()) local.name = 'Please add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) local.email = 'Please check your email address.'
    if (message.replace(/^.*:\s*$/gm, '').trim().length < 5) local.message = 'Please fill in a few words under the prompts.'
    setErrors(local); setFail(null)
    if (Object.keys(local).length) return
    setBusy(true)
    const r = await sendEnquiry({ name, email, organisation, topic, subject: options.subject, message, website, elapsed: Date.now() - opened.current })
    setBusy(false)
    if (r.ok) setSent(true)
    else { if (r.fields) setErrors(r.fields); setFail({ message: r.message, unavailable: r.unavailable }) }
  }

  if (sent) {
    return (
      <div role="status" className="py-6">
        <p className="text-heading text-white">Thank you{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.</p>
        <p className="text-body text-ink-2 mt-3 max-w-md">Your message has reached me. I read every note and reply to the address you gave.</p>
        {onDone && <div className="mt-8"><Button variant="secondary" onClick={onDone}>Close</Button></div>}
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {options.subject && <p className="text-label text-ink-3">About: <span className="text-ink-2">{options.subject}</span></p>}
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Your name" name="name" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} error={errors.name} autoFocus={autoFocus} />
        <TextField label="Email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Organisation" name="organisation" autoComplete="organization" value={organisation} onChange={e => setOrg(e.target.value)} hint="Optional" />
        <div>
          <label htmlFor="cf-topic" className="field-label">What is this about?</label>
          <select id="cf-topic" className="field" value={topic} onChange={e => setTopic(e.target.value as Topic)}>
            {TOPICS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
      </div>
      <TextArea label="Message" name="message" required rows={6} value={message} onChange={e => setMessage(e.target.value)} error={errors.message} />
      {/* Honeypot: people never see or fill this. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
      </div>
      {fail && (
        <p role="alert" className="field-error">
          {fail.message}{fail.unavailable && <> You can write to <a className="underline" href={`mailto:${DIRECT_EMAIL}`} data-direct>{DIRECT_EMAIL}</a> instead.</>}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy} arrow>{busy ? 'Sending…' : 'Send message'}</Button>
        <p className="text-label text-ink-3">Your details are used only to reply.</p>
      </div>
    </form>
  )
}
