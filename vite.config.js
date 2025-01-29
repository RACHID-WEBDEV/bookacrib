import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://bookacrib.com/",
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      components: "/src/components",
      src: "/src",
      pages: "/src/pages",
      utils: "/src/utils",
      functions: "/src/functions",
    },
  },
  server: {
    // port: 8080,
    proxy: {
      "/maps": {
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/maps/, "/maps"),
      },
      "/v1_1": {
        target: "https://api.cloudinary.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1_1/, "/v1_1"),
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
