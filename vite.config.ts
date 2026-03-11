import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        bentogastronomia: resolve(process.cwd(), 'bentogastronomia/index.html')
      }
    }
  },
  resolve: {
    alias: { '@': '/src' },
  },
})
