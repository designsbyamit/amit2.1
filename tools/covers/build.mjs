// Renders the project covers in covers.html to public/images/covers/<id>-1600.webp and -640.webp.
// Run: node tools/covers/build.mjs   (needs playwright and python3 with Pillow)
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const here = dirname(fileURLToPath(import.meta.url))
const out = resolve(here, '../../public/images/covers'); mkdirSync(out, { recursive: true })
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1700, height: 1100 } })
await p.goto('file://' + resolve(here, 'covers.html')); await p.waitForLoadState('networkidle'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600)
for (const id of await p.$$eval('.c', els => els.map(e => e.id))) {
  const png = `/tmp/cover-${id}.png`; await p.locator('#' + id).screenshot({ path: png })
  execFileSync('python3', ['-c', `from PIL import Image;im=Image.open('${png}').convert('RGB');im.save('${out}/${id}-1600.webp','WEBP',quality=84,method=6);im.resize((640,400),Image.LANCZOS).save('${out}/${id}-640.webp','WEBP',quality=82,method=6)`])
  console.log('built', id)
}
await b.close()
