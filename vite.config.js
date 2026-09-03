import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dynamic base path: '/' for Vercel & custom domain, './' for relative environments
export default defineConfig({
  base: process.env.VERCEL ? '/' : './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
