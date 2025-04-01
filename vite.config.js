import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Movies-Lists/",
  build: {
    outDir: "docs", 
    assetsDir: "./",
  },
  rollupOptions: {
    output: {
      assetFileNames: "assets/[name][extname]"
    }
  }
})
