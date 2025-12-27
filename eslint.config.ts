import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["node_modules", ".wrangler"] },
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  ...tseslint.configs.stylistic,
  react.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  {
    // disable `any` checks in tests
    files: ["src/**/*.test.ts?(x)"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },
  testingLibrary.configs["flat/react"],
  {
    rules: {
      "testing-library/consistent-data-testid": [
        "error",
        {
          testIdPattern: "^[a-z0-9]+(-[a-z0-9]+)*$",
          customMessage:
            "Test ID must be a kebab-case alphanumeric string starting with the filename",
        },
      ],
    },
  },
]);
