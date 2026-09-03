import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Absolute root base path for multi-level custom domain routes
export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 1600,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
