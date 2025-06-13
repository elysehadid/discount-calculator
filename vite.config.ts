/// <reference types="vitest" />
// TypeScript: Triple-slash references instruct the compiler to include additional files in the compilation process: https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
