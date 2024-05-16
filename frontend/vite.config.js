import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    //Getting rid of the cors error
    proxy:{
      "/api":{
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
