// Adds the CC BY 4.0 notice to the published HTML templates and kits. Safe to re-run: a page that already has it is skipped.
// Run from the repo root:  node tools/license/apply-html.mjs
import fs from 'node:fs'
import { licenseBlock } from './cc.mjs'

const targets = [
  ['public/templates/ai-native-frameworks.html', 'framework'],
  ['public/templates/conversation-experience-kit.html', 'kit'],
  ['public/templates/dual-fluency-kit.html', 'kit'],
  ['public/templates/leading-design-chapter-1.html', 'template'],
  ['public/templates/leading-design-chapter-2.html', 'template'],
  ['public/templates/leading-design-chapter-4.html', 'template'],
  ['public/templates/leading-design-chapter-5.html', 'template'],
  ['public/aai-toolkit/index.html', 'toolkit'],
]
for (const [file, noun] of targets) {
  if (!fs.existsSync(file)) { console.log('missing', file); continue }
  let s = fs.readFileSync(file, 'utf8')
  if (s.includes('data-cc-license')) { console.log('already', file); continue }
  const block = licenseBlock(noun)
  // The AAI toolkit is a single-page app with its own footer element: the notice goes right under it.
  // The kits end with one plain <script>: the notice goes just above it, after the page content.
  const foot = '<footer class="foot-nav" id="footNav"></footer>'
  let at = s.indexOf(foot)
  if (at >= 0) at += foot.length
  else at = s.lastIndexOf('<script>')
  if (at < 0) at = s.lastIndexOf('</body>')
  if (at < 0) { s += '\n' + block + '\n'; console.log('appended', file) }
  else { s = s.slice(0, at) + '\n' + block + '\n' + s.slice(at); console.log('patched', file) }
  fs.writeFileSync(file, s)
}
