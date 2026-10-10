import { useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Common = { label: string; hint?: string; error?: string }

/** Text input with a visible label, optional hint and error. Errors are announced and linked. */
export function TextField({ label, hint, error, id, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId(); const fid = id ?? auto
  const describedBy = [hint && `${fid}-hint`, error && `${fid}-err`].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={fid} className="field-label">{label}{rest.required && <span aria-hidden="true" className="text-ink-3"> *</span>}</label>
      <input id={fid} className="field" aria-invalid={!!error} aria-describedby={describedBy} {...rest} />
      {hint && <p id={`${fid}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`${fid}-err`} className="field-error" role="alert">{error}</p>}
    </div>
  )
}

export function TextArea({ label, hint, error, id, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId(); const fid = id ?? auto
  const describedBy = [hint && `${fid}-hint`, error && `${fid}-err`].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={fid} className="field-label">{label}{rest.required && <span aria-hidden="true" className="text-ink-3"> *</span>}</label>
      <textarea id={fid} className="field" aria-invalid={!!error} aria-describedby={describedBy} {...rest} />
      {hint && <p id={`${fid}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`${fid}-err`} className="field-error" role="alert">{error}</p>}
    </div>
  )
}
