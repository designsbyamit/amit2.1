/** The ground the Signal scene is lit against: a near-black field, a soft vignette and fine film grain. Always dark, in both site modes. */
export default function SignalBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden="true" style={{ background: '#0C0D0E' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 62% 48%, rgba(20,24,32,0.9) 0%, rgba(12,13,14,0) 55%), radial-gradient(140% 110% at 50% 50%, transparent 55%, rgba(0,0,0,0.7) 100%)' }} />
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.09, mixBlendMode: 'overlay' }}>
        <filter id="signal-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1 0" /></filter>
        <rect width="100%" height="100%" filter="url(#signal-grain)" />
      </svg>
    </div>
  )
}
