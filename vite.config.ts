import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': '/src',
      'components': '/src/components'
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: '/src/main.tsx'
      }
    }
  }
}) 