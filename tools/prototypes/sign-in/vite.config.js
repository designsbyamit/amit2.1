import { defineConfig } from 'vite';
export default defineConfig({ base: './', build: { outDir: '../../../public/prototypes/sign-in', emptyOutDir: true, chunkSizeWarningLimit: 6000, rollupOptions: { input: Object.fromEntries(['index','s4hana','sac','concur','sbn','emarsys','forgot','reset-password','reset-password-success','signout','home'].map(n => [n, n + '.html'])) } } });
