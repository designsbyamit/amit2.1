// The diagrams a short version borrows from its detailed case study. Loaded on demand, so the short page stays light.
import { Workstreams, PatternAnatomy } from '../case/search/SearchDiagrams'
import AISummary from '../case/search/AISummary'
import GlobalSearch from '../case/search/GlobalSearch'
import Pipeline from '../case/cds/Pipeline'
import { Strip } from '../case/Chapter'
import FlowThumb from '../ds/FlowThumb'

const collectionsSteps = [
  { step: 'Validate scope', kind: 'Deterministic' },
  { step: 'Predict arrears', kind: 'Model' },
  { step: 'Investigate context', kind: 'Agent and tool work' },
  { step: 'Recommend', kind: 'Grounded in evidence' },
  { step: 'Decide', kind: 'Approve, edit, reject or escalate', human: true },
  { step: 'Communicate', kind: 'Within policy' },
  { step: 'Monitor outcome', kind: 'Event driven' },
]

export type EmbedName = 'search-global' | 'search-workstreams' | 'search-anatomy' | 'search-summary' | 'cds-pipeline' | 'collections-steps' | 'agentic-gates'

export default function Embed({ name }: { name: EmbedName }) {
  switch (name) {
    case 'search-global': return <GlobalSearch />
    case 'search-workstreams': return <Workstreams />
    case 'search-anatomy': return <PatternAnatomy />
    case 'search-summary': return <AISummary />
    case 'cds-pipeline': return <div className="[&>figure]:mb-0"><Pipeline /></div>
    case 'collections-steps': return <Strip steps={collectionsSteps} />
    case 'agentic-gates': return <div className="relative rounded-3 overflow-hidden" style={{ aspectRatio: '1800 / 1000' }}><FlowThumb at={4 * 2.8 + 1.6} bare /></div>
  }
}
