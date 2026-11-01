import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import FlowThumb from '../../../src/components/ds/FlowThumb'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('r')!).render(<FlowThumb at={Number(q.get('t') ?? 10.8)} bare zoom={Number(q.get('z') ?? 0.8)} oy={Number(q.get('oy') ?? 100)} />)
