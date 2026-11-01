import { useState, type ReactNode, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { checkCode, isUnlocked, unlock } from '../../data/nda'
import { useContact } from '../contact/ContactProvider'

/** Asks for an access code before showing a detailed case study that is under NDA. */
export default function NdaGate({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(isUnlocked())
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { open: openContact } = useContact()
  if (open) return <>{children}</>
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true); setError('')
    const ok = await checkCode(code).catch(() => false)
    setBusy(false)
    if (ok) { unlock(); setOpen(true) } else setError('That code is not right. Check it and try again.')
  }
  return (
    <section style={{ paddingTop: 'var(--header-h)' }}>
      <div className="container-site py-20 md:py-28 max-w-xl">
        <p className="text-overline text-ink-3 mb-5">Under NDA</p>
        <h1 className="text-ink font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</h1>
        <p className="text-body-lg text-ink-2 mt-5">The detailed case study is shared by access code. Enter the code you were given to read it.</p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-3" noValidate>
          <label htmlFor="nda-code" className="field-label">Access code</label>
          <input id="nda-code" className="field" type="text" inputMode="text" autoComplete="off" autoCapitalize="characters" spellCheck={false} value={code} onChange={e => { setCode(e.target.value); setError('') }} aria-invalid={!!error} aria-describedby={error ? 'nda-err' : undefined} autoFocus />
          {error && <p id="nda-err" role="alert" className="field-error">{error}</p>}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button type="submit" className="btn btn-primary" disabled={busy || !code.trim()}>Open the case study</button>
            <button type="button" className="btn btn-ghost" onClick={() => openContact({ topic: 'other', subject: `Access code request - ${title}`, message: `Hello, could I have the access code for the detailed "${title}" case study?` })}>Ask for the code</button>
          </div>
        </form>
        <p className="mt-10"><Link to={`/craft/${id}`} className="link text-body-sm">← Read the short version</Link></p>
      </div>
    </section>
  )
}
