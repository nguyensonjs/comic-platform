/** @type {import("prettier").Config} */
const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default prettierConfig;
