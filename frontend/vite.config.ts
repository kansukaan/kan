import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensure relative paths for GitHub Pages
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          framer: ['framer-motion'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge'],
        }
      }
    }
  }
})
