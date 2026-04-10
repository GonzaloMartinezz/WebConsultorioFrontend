import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // Obliga a usar siempre este puerto
    strictPort: true,  // Si está ocupado, tira error en vez de saltar al 5174
  },
  build: {
    // 1. Aumentamos el límite de advertencia para que Vercel no se queje
    chunkSizeWarningLimit: 1600, 
    
    // 2. Le decimos a Vite cómo "picar" el código pesado en partes pequeñas
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separa cada librería pesada (como React o los íconos) en su propio archivo
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})