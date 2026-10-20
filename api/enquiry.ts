import { db, dbReady } from './_lib/db.js'
import { esc, ipHash, json } from './_lib/http.js'

const TOPICS = ['work', 'collaboration', 'speaking', 'mentoring', 'resource', 'other'] as const
const LABEL: Record<string, string> = { work: 'Work together', collaboration: 'Collaboration', speaking: 'Talk, workshop or review', mentoring: 'Mentoring', resource: 'Resource request', other: 'Something else' }
const clip = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : '')

export async function POST(req: Request) {
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return json({ error: 'Invalid request.' }, 400) }

  // Quiet rejection for bots: a hidden field that people never fill, and a form submitted faster than anyone can write.
  if (clip(b.website, 200) || Number(b.elapsed) < 1500) return json({ ok: true })

  const name = clip(b.name, 120), email = clip(b.email, 200).toLowerCase(), message = clip(b.message, 5000)
  const organisation = clip(b.organisation, 160), role = clip(b.role, 160), subject = clip(b.subject, 200), source = clip(b.source, 200)
  const topic = TOPICS.includes(b.topic as never) ? (b.topic as string) : 'other'
  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please check your email address.'
  // Template prompts such as "The problem:" do not count as writing.
  if (message.replace(/^.*:\s*$/gm, '').trim().length < 5) errors.message = 'Please write a few words.'
  if (Object.keys(errors).length) return json({ error: 'Please check the form.', errors }, 422)
  if (!dbReady()) return json({ error: 'The form is not connected yet. Please try again shortly.' }, 503)

  try {
    const { sql, ready } = db(); await ready
    const hash = ipHash(req)
    const [{ n }] = await sql`select count(*)::int as n from enquiries where ip_hash = ${hash} and created_at > now() - interval '1 hour'`
    if (n >= 5) return json({ error: 'That is a lot of messages in a short time. Please try again in an hour.' }, 429)

    const ua = clip(req.headers.get('user-agent'), 300)
    const [row] = await sql`insert into enquiries (name, email, organisation, role, topic, subject, message, source_path, ip_hash, user_agent)
      values (${name}, ${email}, ${organisation || null}, ${role || null}, ${topic}, ${subject || null}, ${message}, ${source || null}, ${hash}, ${ua || null}) returning id`

    // The enquiry is saved before the email goes out, so a failed email never loses a message.
    const key = process.env.RESEND_API_KEY
    if (key) {
      const to = process.env.NOTIFY_EMAIL || 'uxbyamit@gmail.com'
      const from = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>'
      const origin = new URL(req.url).origin
      const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.55;color:#111"><p style="margin:0 0 4px;color:#666;font-size:13px">${esc(LABEL[topic])}${source ? ' · from ' + esc(source) : ''}</p><h2 style="margin:0 0 16px;font-size:20px">${esc(name)}</h2><p style="margin:0 0 16px;white-space:pre-wrap">${esc(message)}</p><p style="margin:0;color:#444"><b>Email</b> ${esc(email)}${organisation ? '<br><b>Organisation</b> ' + esc(organisation) : ''}${role ? '<br><b>Role</b> ' + esc(role) : ''}</p><p style="margin:20px 0 0"><a href="${origin}/admin">Open the portal</a></p></div>`
      const text = `${LABEL[topic]}${source ? ' (from ' + source + ')' : ''}\n\n${name} <${email}>${organisation ? '\n' + organisation : ''}${role ? ' · ' + role : ''}\n\n${message}\n\n${origin}/admin`
      try {
        const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `New enquiry · ${LABEL[topic]} · ${name}`, html, text }) })
        if (r.ok) await sql`update enquiries set notified = true where id = ${row.id}`
        else await sql`update enquiries set notify_error = ${(await r.text()).slice(0, 300)} where id = ${row.id}`
      } catch (e) { await sql`update enquiries set notify_error = ${String(e).slice(0, 300)} where id = ${row.id}` }
    }
    return json({ ok: true })
  } catch (e) {
    console.error('enquiry failed', e)
    return json({ error: 'Something went wrong on our side. Please try again, or write to uxbyamit@gmail.com.' }, 500)
  }
}
