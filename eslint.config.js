import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "/build",
      "/dist",
      "/node_modules",
      "eslint.config.js",
      "stylelint.config.js",
    ],
    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      "@typescript-eslint": tsEslint
    },
    rules: {
      "@typescript-eslint/no-unused-vars": 2,
      "max-len": [1, 100],
      "max-params": [2, 3],
      "@typescript-eslint/no-explicit-any": 2
    }
  }
]
