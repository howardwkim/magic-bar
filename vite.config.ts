import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
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
  },
});
