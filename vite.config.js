import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/my-todo-app",
  resolve: {
    alias: {
      '@': '/src', // Example alias for your source directory
    },
  },
})
