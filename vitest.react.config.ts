import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // The components use hono/jsx (tsconfig jsxImportSource), but these tests
  // render them with React Testing Library, so compile all JSX with React's
  // runtime here. Without this, components produce Hono nodes React can't render.
  plugins: [react({ jsxImportSource: "react" })],
  test: {
    exclude: ["./src/index.test.ts"],
    include: ["./src/pages/*.test.tsx", "./src/components/*.test.tsx"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
  },
});
