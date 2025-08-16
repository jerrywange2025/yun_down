import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  base: '/',
  build: {
    target: 'es2015',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:8324',
        changeOrigin: true
      }
    }
  }
})
