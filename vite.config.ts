import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const siteUrl = 'https://www.designsbyamit.com'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: { __SITE_URL__: JSON.stringify(siteUrl) },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
          if (id.includes('react-router')) return 'router'
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react'
        },
      },
    },
  },
})
