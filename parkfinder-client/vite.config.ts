import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
    proxy: {
      "/mapbox": {
        target: "https://api.mapbox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mapbox/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
