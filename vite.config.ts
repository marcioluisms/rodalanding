import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Config para Vercel: saída em dist/ (index.html na raiz do dist)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bentogastronomia: resolve(__dirname, 'bentogastronomia/index.html')
      }
    }
  },
  resolve: {
    // Se você usa import com "@/..." no código, deixe este alias.
    alias: { '@': '/src' },
  },
})
