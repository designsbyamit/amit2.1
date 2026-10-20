export const TOPICS = [
  { id: 'work', label: 'Work together' },
  { id: 'collaboration', label: 'Collaboration' },
  { id: 'speaking', label: 'Talk, workshop or review' },
  { id: 'mentoring', label: 'Mentoring' },
  { id: 'resource', label: 'Resource request' },
  { id: 'other', label: 'Something else' },
] as const
export type Topic = (typeof TOPICS)[number]['id']
export const topicLabel = (id: string) => TOPICS.find(t => t.id === id)?.label ?? 'Something else'

export interface ContactOptions {
  topic?: Topic
  /** Shown as "About" in the form and saved with the enquiry, for example the resource being requested. */
  subject?: string
  /** Starting text for the message. */
  message?: string
}

export const DIRECT_EMAIL = 'uxbyamit@gmail.com'

const guessTopic = (subject: string): Topic => {
  const s = subject.toLowerCase()
  if (/workshop|speak|talk|review/.test(s)) return 'speaking'
  if (/request|template|access|playbook|canvas|download/.test(s)) return 'resource'
  if (/collab|research/.test(s)) return 'collaboration'
  if (/mentor/.test(s)) return 'mentoring'
  if (/work|problem/.test(s)) return 'work'
  return 'other'
}

/** Turns an old mailto: link into form options, so every email link on the site opens the form with its context. */
export function fromMailto(href: string): ContactOptions {
  let subject = '', body = ''
  try {
    const q = href.split('?')[1] || ''
    const p = new URLSearchParams(q.replace(/\+/g, '%2B'))
    subject = p.get('subject') || ''; body = p.get('body') || ''
  } catch { /* an unreadable link opens an empty form */ }
  const keep = body.split(/\r?\n/).filter(l => !/^\s*(hi|hello) amit,?\s*$/i.test(l) && !/^\s*(name|role|organi[sz]ation):\s*$/i.test(l) && !/^\s*(thank you\.?|regards)\s*$/i.test(l))
  let message = keep.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  const ask = subject.match(/^(?:requesting access|template request|request)\s*[-–:]\s*(.+)$/i)
  if (!message && ask) message = `I would like to request ${ask[1].trim()}.`
  return { topic: subject ? guessTopic(subject) : undefined, subject: subject || undefined, message: message || undefined }
}

export interface EnquiryInput { name: string; email: string; organisation: string; topic: Topic; subject?: string; message: string; website: string; elapsed: number }
export type SendResult = { ok: true } | { ok: false; message: string; fields?: Record<string, string>; unavailable?: boolean }

export async function sendEnquiry(input: EnquiryInput): Promise<SendResult> {
  try {
    const r = await fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...input, source: window.location.pathname }) })
    const ct = r.headers.get('content-type') || ''
    if (!ct.includes('json')) return { ok: false, unavailable: true, message: 'The form is not available on this site right now.' }
    const data = await r.json()
    if (r.ok) return { ok: true }
    return { ok: false, message: data.error || 'Something went wrong.', fields: data.errors, unavailable: r.status === 503 }
  } catch {
    return { ok: false, unavailable: true, message: 'Could not reach the server. Check your connection and try again.' }
  }
}
