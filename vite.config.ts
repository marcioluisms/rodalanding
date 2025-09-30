import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config para Vercel: saída em dist/ (index.html na raiz do dist)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  resolve: {
    // Se você usa import com "@/..." no código, deixe este alias.
    alias: { '@': '/src' },
  },
})
