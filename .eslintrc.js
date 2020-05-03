module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "@vue/typescript",
  ],

  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "prettier/prettier": "error",
  },
};
