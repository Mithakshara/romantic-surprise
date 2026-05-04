import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/romantic-surprise/',
  assetsInclude: ['**/*.mp3', '**/*.ogg', '**/*.wav', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp']
})