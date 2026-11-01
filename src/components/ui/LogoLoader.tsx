import raw from '../../assets/logo-loader.svg?raw'

/** The animated mark, used as the busy state while a page chunk loads.
 *  Fades in after a short delay so quick loads never flash it. */
export default function LogoLoader({ fullPage = true }: { fullPage?: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`logo-loader ${fullPage ? 'min-h-screen' : ''} flex items-center justify-center`}
    >
      <span className="sr-only">Loading</span>
      <div
        aria-hidden="true"
        className="logo-loader-mark text-ink"
        style={{ width: '5rem', height: '5rem' }}
        dangerouslySetInnerHTML={{ __html: raw.replace(/<title>.*?<\/title>/, '').replace(/ width="96" height="96"/, ' width="100%" height="100%"') }}
      />
    </div>
  )
}
