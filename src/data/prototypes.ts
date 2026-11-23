/** Working prototypes, served as static pages from public/prototypes. Linked from the short story and the full case. */
export const prototypes: Record<string, string> = {
  'sap-agentic': 'prototypes/order-confirmations/',
  engaze: 'prototypes/engaze/',
}
export const prototypeUrl = (id: string) => (prototypes[id] ? `${import.meta.env.BASE_URL}${prototypes[id]}` : null)
