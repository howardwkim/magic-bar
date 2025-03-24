import { defineConfig } from 'vite';
// import { dirname, resolve } from 'node:path';
// import { fileURLToPath } from 'node:url';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), preact()],
  build: {
    // Output directory
    outDir: 'dist',

    // Library build settings
    lib: {
      entry: 'src/index.tsx',
      name: 'MagicBar',
      fileName: () => 'magic-bar.js',
      formats: ['umd'],
    },

    // Simple CSS output - this generates a predictable CSS filename
    cssCodeSplit: false,

    // Ensure sourcemaps for debugging
    sourcemap: true,

    // Minify for production
    minify: 'terser',
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //   },
    // },
  },
});
