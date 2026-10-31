import { useLocation } from 'react-router-dom'

const URL = 'https://creativecommons.org/licenses/by/4.0/'

/** The two standard marks for CC BY, drawn as paths so they need no font. Same drawing as tools/license/cc.mjs. */
function CcIcons({ height = 22 }: { height?: number }) {
  return (
    <svg viewBox="0 0 136 64" width={Math.round((height * 136) / 64)} height={height} fill="none" stroke="currentColor" aria-hidden="true" focusable="false" className="shrink-0 block">
      <g strokeWidth="3.4"><circle cx="32" cy="32" r="28.5" /><circle cx="104" cy="32" r="28.5" /></g>
      <g strokeWidth="4.6" strokeLinecap="round"><path d="M28.6 25.6A9.8 9.8 0 1 0 28.6 38.4" /><path d="M46.6 25.6A9.8 9.8 0 1 0 46.6 38.4" transform="translate(-4 0)" /></g>
      <g fill="currentColor" stroke="none"><circle cx="104" cy="17.5" r="4.4" /><path d="M95.5 24.5h17v15h-4.4v11.5h-8.2V39.5h-4.4z" /></g>
    </svg>
  )
}

/** Where the licence applies: the resources (templates, worksheets, frameworks, playbooks) and the practice toolkits. Not the case studies. */
const covered = (p: string) => p === '/resources' || p.startsWith('/resources/') || p === '/learn/practice' || p.startsWith('/learn/practice/') || p === '/learn/portfolio'

/** The CC BY 4.0 notice at the foot of those pages. */
export default function LicenseNote() {
  const { pathname } = useLocation()
  if (!covered(pathname)) return null
  const noun = pathname.startsWith('/resources/ai-native-patterns') ? 'framework' : 'page'
  return (
    <div className="container-site pb-8 md:pb-10">
      <div className="flex items-center gap-3 border-t pt-4 text-ink-3" style={{ borderColor: 'var(--line-1)' }}>
        <a href={URL} target="_blank" rel="license noopener noreferrer" aria-label="Creative Commons Attribution 4.0" className="text-ink-2 hover:text-ink transition-colors"><CcIcons /></a>
        <p className="text-body-sm">
          Content on this {noun} is licensed under a{' '}
          <a href={URL} target="_blank" rel="license noopener noreferrer" className="underline underline-offset-2 hover:text-ink transition-colors">Creative Commons Attribution 4.0 International license</a>.
        </p>
      </div>
    </div>
  )
}
