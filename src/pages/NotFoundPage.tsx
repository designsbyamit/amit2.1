import Button from '../components/ds/Button'

export default function NotFoundPage() {
  return (
    <section style={{ paddingTop: 'var(--header-h)' }}>
      <div className="container-site pt-16 md:pt-24 pb-24 ">
        <div>
          <p className="text-overline text-ink-3 mb-6">Page not found</p>
          <h1 className="text-display-l text-ink">Nothing here, yet.</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-md">The page you are after may have moved. Start from the beginning.</p>
          <div className="mt-8"><Button to="/" arrow>Back to the home page</Button></div>
        </div>
      </div>
    </section>
  )
}
