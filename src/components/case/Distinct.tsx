/** One short card that says what is unusual about a case, in the case's own terms. */
export default function Distinct({ title, body }: { title: string; body: string }) {
  return (
    <div className="card max-w-3xl">
      <p className="text-overline text-ink-3">What makes this one different</p>
      <p className="text-title text-white mt-3">{title}</p>
      <p className="text-body text-ink-2 mt-3">{body}</p>
    </div>
  )
}
