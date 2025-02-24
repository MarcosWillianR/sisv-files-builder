import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  esbuild: {
    target: 'es2015',
    include: /\.(ts|jsx|tsx)$/,
  },
  build: {
    target: 'es2015',
  },
  plugins: [
    react(),
    legacy({
      // to be compatible with legacy browsers
      targets: ['ie >= 11'],
      // generate legacy browser's chunks
      renderLegacyChunks: true,
      /**
       * auto detect
       */
      modernPolyfills: true,
      /**
       * or add manually, for examples
       */
      // for legacy browsers only
      // polyfills: ['es/global-this', 'es/array/includes'],
      // for modern browsers only
      // modernPolyfills: ['es/global-this'],
    }),
  ],
});