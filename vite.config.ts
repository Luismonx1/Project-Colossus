import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'Assets/colossus-hero',
    lib: { entry: 'src/colossus-hero.tsx', name: 'ColossusHero', formats: ['iife'], fileName: () => 'colossus-hero.js', cssFileName: 'colossus-hero' },
  },
});
