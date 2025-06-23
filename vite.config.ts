import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración ULTRA-optimizada para velocidad máxima
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones críticas de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          router: ['react-router-dom'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Compresión máxima
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2015',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'],
  },
  // Configuraciones de rendimiento críticas
  server: {
    hmr: {
      overlay: false,
    },
  },
  esbuild: {
    // Optimizaciones adicionales
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});