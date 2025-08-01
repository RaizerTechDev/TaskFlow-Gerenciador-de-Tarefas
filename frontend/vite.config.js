import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    host: '0.0.0.0',
    port:  5173,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
