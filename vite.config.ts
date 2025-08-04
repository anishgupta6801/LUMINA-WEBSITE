import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 5176,
    proxy: {
      '/api': {
        target: 'http://localhost:5175',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        booking: path.resolve(__dirname, 'booking.html'),
        thankyou: path.resolve(__dirname, 'thank-you.html'),
        admin: path.resolve(__dirname, 'admin.html'),
      }
    }
  }
})
