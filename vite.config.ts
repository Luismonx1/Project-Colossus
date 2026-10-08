import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'Assets/argus-hero',
    lib: { entry: 'src/argus-hero.tsx', name: 'ArgusHero', formats: ['iife'], fileName: () => 'argus-hero.js', cssFileName: 'argus-hero' },
  },
});
