// Renders the five SAP project covers (public/images/covers) and their page-header meshes (public/images/mesh) from mesh.html.
// Run: node tools/covers/mesh.mjs   (needs playwright and python3 with Pillow)
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const covers = resolve(root, 'public/images/covers'), mesh = resolve(root, 'public/images/mesh')
mkdirSync(covers, { recursive: true }); mkdirSync(mesh, { recursive: true })
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2000, height: 1200 } })
await p.goto('file://' + resolve(here, 'mesh.html')); await p.waitForLoadState('networkidle'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800)
const ids = ['sap-search', 'sap-signin', 'sap-collections', 'sap-agentic', 'sap-compositional']
const save = (png, out, w, h, q) => execFileSync('python3', ['-c', `from PIL import Image;im=Image.open('${png}').convert('RGB');im.resize((${w},${h}),Image.LANCZOS).save('${out}','WEBP',quality=${q},method=6)`])
for (const id of process.env.CV ? [] : ids) {
  if (process.env.ONLY && process.env.ONLY !== id) continue
  const png = `/tmp/mesh-${id}.png`
  await p.locator('#' + id).screenshot({ path: png })
  save(png, `${covers}/${id}-1600.webp`, 1600, 1000, 84); save(png, `${covers}/${id}-640.webp`, 640, 400, 82)
  const hp = `/tmp/mesh-hero-${id}.png`
  await p.locator('#hero-' + id).screenshot({ path: hp })
  save(hp, `${mesh}/${id}.webp`, 1920, 1080, 78); save(hp, `${mesh}/${id}-960.webp`, 960, 540, 76)
  console.log('built', id)
}
for (const id of [...ids, 'engaze', 'airline-app', 'data-ai', 'dnetworx']) {
  if (process.env.ONLY && process.env.ONLY !== id) continue
  const png = `/tmp/mesh-cv-${id}.png`
  await p.locator('#cv-' + id).screenshot({ path: png })
  save(png, `${mesh}/${id}-cover.webp`, 1800, 1000, 80)
}
await b.close()
