import Illustration, { SCENES, type IllustrationName } from '../components/illustrations/Illustration'

/** Review sheet for every illustration. Not linked anywhere. */
export default function IllustrationGallery() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16">
      <h1 className="text-display-l">Illustrations</h1>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(SCENES) as IllustrationName[]).map(n => (
          <figure key={n} className="card p-4">
            <Illustration name={n} className="w-full" />
            <figcaption className="text-label text-ink-3 mt-2">{n}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  )
}
