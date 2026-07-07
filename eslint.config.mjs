import convexPlugin from "@convex-dev/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
export default defineConfig([
  globalIgnores(["convex/_generated"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },

  ...convexPlugin.configs.recommended,
]); 