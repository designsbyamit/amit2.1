// One source for the Creative Commons BY 4.0 notice used by every generator (PDF worksheets, HTML kits, the AAI toolkit).
// The React pages use src/components/ui/LicenseNote.tsx, which draws the same two icons.
export const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/'
export const LICENSE_NAME = 'Creative Commons Attribution 4.0 International license'

/** The two standard marks for CC BY: the CC circle and the BY (attribution) circle. Drawn as paths, so they need no font. */
export const ccIcons = (size = 22) => `<svg class="cc-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 64" width="${Math.round(size * 136 / 64)}" height="${size}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor"><g stroke-width="3.4"><circle cx="32" cy="32" r="28.5"/><circle cx="104" cy="32" r="28.5"/></g><g stroke-width="4.6" stroke-linecap="round"><path d="M28.6 25.6A9.8 9.8 0 1 0 28.6 38.4"/><path d="M46.6 25.6A9.8 9.8 0 1 0 46.6 38.4" transform="translate(-4 0)"/></g><g fill="currentColor" stroke="none"><circle cx="104" cy="17.5" r="4.4"/><path d="M95.5 24.5h17v15h-4.4v11.5h-8.2V39.5h-4.4z"/></g></svg>`

/** noun: "document", "template", "kit", "page"... */
export const licenseSentence = (noun = 'document') => `Content in this ${noun} is licensed under a <a href="${LICENSE_URL}" rel="license noopener" target="_blank">${LICENSE_NAME}</a>.`

export const licenseCss = `
.cc-license{display:flex;align-items:center;gap:12px;margin:28px auto 0;padding:14px 0 0;max-width:1100px;font:400 12.5px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:inherit;border-top:1px solid rgba(128,128,128,.28);opacity:.82}
.cc-license p{margin:0}
.cc-license a{color:inherit;text-decoration:underline;text-underline-offset:2px}
.cc-license .cc-icons{flex:none;display:block}
@media print{.cc-license{opacity:1}}
`

/** A block for the end of an HTML page. data-cc-license marks it so the patcher never adds it twice. */
export const licenseBlock = (noun = 'document') => `<style data-cc-license>${licenseCss}</style><div class="cc-license" data-cc-license><a href="${LICENSE_URL}" rel="license noopener" target="_blank" aria-label="Creative Commons Attribution 4.0">${ccIcons(22)}</a><p>${licenseSentence(noun)}</p></div>`
