import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  proxy: {
    '/api': 'http://localhost:3000',
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600
},
optimizeDeps: {
  include: ['@mui/material', '@mui/system'],
},
})
