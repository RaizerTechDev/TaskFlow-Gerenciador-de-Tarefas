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
    port: 5173, 
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "docker"
            ? "http://backend:5000"
            : "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
