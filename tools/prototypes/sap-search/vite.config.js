import { defineConfig } from 'vite';
export default defineConfig({ base: './', build: { outDir: '../../../public/prototypes/sap-search', emptyOutDir: true, chunkSizeWarningLimit: 4000 } });
