// Runs after `vite build`. Writes one HTML file per public route with its own title, description,
// canonical, share-preview tags, JSON-LD and a readable text snapshot, plus sitemap, robots and llms files.
// Gated (NDA) content must never be added to routes in src/seo/site.ts.
import fs from 'node:fs'
import path from 'node:path'
import { SITE, routes, abs } from '../../src/seo/site'
import { playbacks } from '../../src/data/playbacks'
import { caseStudies } from '../../src/data/work'
import { timeline } from '../../src/data/career'

const dist = path.resolve('dist')
const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const today = new Date().toISOString().slice(0, 10)

const person = {
  '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.name, jobTitle: SITE.role, url: SITE.url,
  worksFor: { '@type': 'Organization', name: SITE.employer },
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: SITE.country },
  image: abs('/og/home.jpg'), sameAs: SITE.sameAs,
  knowsAbout: ['Design leadership', 'Agentic AI', 'Conversational design', 'Enterprise UX', 'Design systems', 'AI search'],
}
const website = { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': `${SITE.url}/#person` } }

function ld(r: (typeof routes)[number]) {
  const g: unknown[] = [person, website]
  const crumbs = [{ name: 'Home', url: abs('/') }]
  if (r.path.startsWith('/craft/')) crumbs.push({ name: 'Work', url: abs('/craft') })
  if (r.path.startsWith('/leadership/stories/')) crumbs.push({ name: 'Leadership stories', url: abs('/leadership/stories') })
  if (r.path !== '/') crumbs.push({ name: r.title.split(' · ')[0], url: abs(r.path) })
  g.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) })
  if (r.type === 'article') g.push({ '@type': 'CreativeWork', name: r.title.split(' · ')[0], description: r.description, url: abs(r.path), image: abs(r.image ?? SITE.ogDefault), author: { '@id': `${SITE.url}/#person` }, creator: { '@id': `${SITE.url}/#person` } })
  if (r.path === '/about') g.push({ '@type': 'ProfilePage', mainEntity: { '@id': `${SITE.url}/#person` } })
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': g })
}

function snapshot(r: (typeof routes)[number]) {
  const parts = [`<h1>${esc(r.title.split(' · ')[0])}</h1>`, `<p>${esc(r.description)}</p>`]
  const pb = playbacks.find(p => r.path === `/craft/${p.id}`)
  const cs = caseStudies.find(c => r.path === `/craft/${c.id}/details`)
  if (pb) for (const [k, v] of Object.entries(pb.beats)) parts.push(`<h2>${esc(k)}</h2><p>${esc(String(v))}</p>`)
  if (cs) parts.push(`<h2>Challenge</h2><p>${esc(cs.challenge)}</p><h2>Approach</h2><p>${esc(String(cs.approach))}</p><h2>Outcome</h2><p>${esc(cs.outcome)}</p>`)
  if (r.path === '/' || r.path === '/about') parts.push('<h2>Career</h2><ul>' + timeline.map((t: any) => `<li>${esc(t.role)} — ${esc(t.org)} (${esc(t.year)})</li>`).join('') + '</ul>')
  if (r.path === '/' || r.path === '/craft') parts.push('<h2>Selected work</h2><ul>' + playbacks.map(p => `<li><a href="/craft/${p.id}">${esc(p.headline)}</a></li>`).join('') + '</ul>')
  return `<main>${parts.join('')}</main>`
}

function render(r: (typeof routes)[number]) {
  const url = abs(r.path), img = abs(r.image ?? SITE.ogDefault)
  const head = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${r.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    `<meta property="og:type" content="${r.type === 'article' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(r.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    r.noindex ? '' : `<script type="application/ld+json">${ld(r)}</script>`,
  ].filter(Boolean).join('\n    ')
  let html = tpl.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${head}\n    <!--seo:end-->`)
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${r.noindex ? '' : snapshot(r)}</div>`)
  return html
}

for (const r of routes) {
  const out = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, render(r))
}

const indexable = routes.filter(r => !r.noindex)
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(r => `  <url><loc>${abs(r.path)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`)

const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']
const block = ['/admin', '/api/', '/labs/', '/design-system', '/templates/', '/craft/engaze/film', '/craft/sap-search/film', '/craft/sap-agentic/film']
fs.writeFileSync(path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n${block.map(b => `Disallow: ${b}`).join('\n')}\n\n${bots.map(b => `User-agent: ${b}\nAllow: /\n${block.map(b2 => `Disallow: ${b2}`).join('\n')}\n`).join('\n')}\nSitemap: ${SITE.url}/sitemap.xml\n`)

const projLines = playbacks.map(p => `- [${p.headline}](${abs('/craft/' + p.id)}): ${p.dek}`)
fs.writeFileSync(path.join(dist, 'llms.txt'),
  `# ${SITE.name}\n\n> ${routes[0].description}\n\n## Work\n${projLines.join('\n')}\n\n## More\n${indexable.filter(r => !r.path.startsWith('/craft/')).map(r => `- [${r.title.split(' · ')[0]}](${abs(r.path)}): ${r.description}`).join('\n')}\n`)
fs.writeFileSync(path.join(dist, 'llms-full.txt'),
  `# ${SITE.name}\n\n${routes[0].description}\n\n` + playbacks.map(p => `## ${p.headline}\n${p.dek}\n\n` + Object.entries(p.beats).map(([k, v]) => `**${k}**: ${v}`).join('\n\n')).join('\n\n') + '\n')
console.log(`seo: ${routes.length} pages, ${indexable.length} in sitemap`)
