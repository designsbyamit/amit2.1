import type { CSSProperties } from 'react'

const B = import.meta.env.BASE_URL

/** Projects with their own mesh gradient. The same gradient sits behind the cover, the short story header and the detailed case study header.
 *  Made by tools/covers/mesh.mjs, so a colour change is one edit there. Dark theme only: the light theme keeps its paper ground. */
const MESH = new Set(['sap-search', 'sap-signin', 'sap-collections', 'sap-agentic', 'sap-compositional'])

export const heroClass = (id: string) => (MESH.has(id) ? 'case-hero' : '')
export const heroStyle = (id: string): CSSProperties => (MESH.has(id) ? ({ '--mesh': `url(${B}images/mesh/${id}.webp)` } as CSSProperties) : {})
