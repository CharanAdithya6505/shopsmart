import { defineWorkspace } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineWorkspace([
  {
    plugins: [react()],
    test: {
      name: "unit",
      include: ["src/__tests__/unit/**/*.test.{js,jsx}"],
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.js",
    },
  },
  {
    plugins: [react()],
    test: {
      name: "integration",
      include: ["src/__tests__/integration/**/*.test.{js,jsx}"],
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.js",
    },
  },
]);
