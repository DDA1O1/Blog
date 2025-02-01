import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@store': resolve(__dirname, './src/store'),
      '@pages': resolve(__dirname, './src/pages'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@services': resolve(__dirname, './src/services'),
      '@config': resolve(__dirname, './src/services/config'),
      '@lib': resolve(__dirname, './src/services/lib'),
      '@api': resolve(__dirname, './src/services/api'),
    }
  }
})
