import path from "path";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  base: "/image-to-ascii-transformer/",
  plugins: [solidPlugin(), eslintPlugin()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
