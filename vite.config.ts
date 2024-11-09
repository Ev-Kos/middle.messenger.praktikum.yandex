import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3000,
  },
});