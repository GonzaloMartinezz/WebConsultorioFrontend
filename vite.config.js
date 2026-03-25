import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // Obliga a usar siempre este puerto
    strictPort: true,  // Si está ocupado, tira error en vez de saltar al 5174
  }
})