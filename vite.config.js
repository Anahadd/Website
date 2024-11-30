import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  assetsInclude: ['**/*.glb'], 
  plugins: [react()],
  optimizeDeps: {
    include: ['phaser']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          
          phaser: ['phaser']
        }
      }
    }
  }
});