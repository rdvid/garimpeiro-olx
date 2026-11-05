import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsup'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['esm'],
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  esbuildOptions(options) {
    options.alias = {
      ...options.alias,
      '@': path.join(root, 'src'),
    }
  },
})
