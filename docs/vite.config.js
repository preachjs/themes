import { join } from 'path'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  resolve: {
    alias: {
      '@preachjs/themes': join(__dirname, '../dist/themes.js'),
    },
  },
  plugins: [preact(), tailwindcss()],
})
