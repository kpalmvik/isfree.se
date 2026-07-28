import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["./src/index.test.ts"],
    include: ["./src/pages/*.test.tsx", "./src/components/*.test.tsx"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
  },
});
