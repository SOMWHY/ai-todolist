import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'features': [
            './src/features/TodoItem.jsx',
            './src/features/TodoList.jsx'
          ],
          'ui': [
            './src/ui/ContextMenu.jsx'
          ]
        }
      }
    }
  }
})
