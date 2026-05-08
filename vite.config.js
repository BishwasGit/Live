import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "vite-plugin-sitemap"
import path from "node:path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://bishwasshrestha.com.np",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
})