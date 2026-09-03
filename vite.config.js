import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Universal relative base path for 100% compatibility across custom domains & subpaths
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
