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
      entry: 'src/index.js',
      name: 'MagicBar',
      fileName: (format) => `magic-bar.${format}.js`,
      formats: ['es', 'umd'],
    },

    // Bundle optimization
    rollupOptions: {
      // External dependencies (if any)
      external: [],
      output: {
        // Global variable name when loaded via <script> tag
        globals: {},
        // Ensure clean CSS output
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'magic-bar.css';
          }
          return assetInfo.name;
        },
      },
    },

    // Ensure sourcemaps for debugging
    sourcemap: true,

    // Minify for production
    minify: 'terser',
  },
});
