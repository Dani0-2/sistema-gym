/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Integra Prettier con ESLint
  ],
  rules: {
    // Puedes ajustar reglas a tu gusto, por ahora dejamos algo razonable:
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": "warn",
  },
  ignorePatterns: ["dist/", "node_modules/"],
};