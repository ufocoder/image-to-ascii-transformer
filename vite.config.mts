import path from "path";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  base: "/image-to-ascii-transformer/",
  plugins: [solidPlugin(), eslintPlugin()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
