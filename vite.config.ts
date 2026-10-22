import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const siteUrl = process.env.VERCEL_GIT_COMMIT_REF === 'staging' ? 'https://neo.designsbyamit.com' : 'https://www.designsbyamit.com'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: { __SITE_URL__: JSON.stringify(siteUrl) },
  build: { outDir: 'dist' },
})
