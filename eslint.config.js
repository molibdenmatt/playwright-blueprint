import playwright from "eslint-plugin-playwright";

export default [
  playwright.configs["flat/recommended"],
  {
    rules: {
      "playwright/missing-playwright-await": "error",
      "playwright/no-focused-test": "warn",
    },
  },
];
