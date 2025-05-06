import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, 
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: ['shubh-clinic.onrender.com'],  
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
