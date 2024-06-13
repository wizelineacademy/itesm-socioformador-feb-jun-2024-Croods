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
        functions: 10,
        lines: 10,
        branches: 10,
        statements: 10,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
