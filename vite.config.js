import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Ensure history mode works
  plugins: [react()],
  server: {
    historyApiFallback: true, // Redirect all 404s to index.html
  },
  build: {
    outDir: 'dist', // Ensure your build output is directed to the dist folder
  },
});