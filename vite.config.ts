import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: './',
  publicDir: './static/',
  base: './',
  build:
  {
      outDir: './dist', // Output in the dist/ folder
      emptyOutDir: true, // Empty the folder first
      sourcemap: false // Add sourcemap
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    }
  },
  resolve: {
    alias: {
      '@features': '/src/features',
    },
  },
})
