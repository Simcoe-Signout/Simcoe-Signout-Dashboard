// vite.config.ts

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@cpnts": path.resolve(__dirname, "src/components"),
      "@pgs": path.resolve(__dirname, "./src/pages"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
});
