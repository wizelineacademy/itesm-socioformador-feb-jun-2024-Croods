/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import path from "path"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "setupTests.ts",
    environment: "jsdom",
    coverage: {
      include: ["src/components/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
      exclude: [],
      reporter: ["html", "text-summary", "json"],
      thresholds: {
        functions: 50,
        lines: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
