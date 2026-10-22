import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'
import path from 'node:path'
const out = path.resolve('node_modules/.cache/seo-build.mjs')
await build({ entryPoints: ['tools/seo/build.ts'], bundle: true, platform: 'node', format: 'esm', outfile: out, logLevel: 'error', define: { __SITE_URL__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_REF === 'staging' ? 'https://neo.designsbyamit.com' : 'https://www.designsbyamit.com'), 'import.meta.env.BASE_URL': '"/"' } })
await import(pathToFileURL(out).href)
