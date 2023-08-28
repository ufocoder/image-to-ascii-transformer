import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(), 
    eslintPlugin()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
