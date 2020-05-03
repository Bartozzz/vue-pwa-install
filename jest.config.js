module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  modulePathIgnorePatterns: [
    "<rootDir>/.codesandbox",
    "<rootDir>/.dependabot",
    "<rootDir>/.github",
    "<rootDir>/dist",
  ],
  testMatch: [
    "<rootDir>/tests/**/*.test.ts",
    "<rootDir>/tests/**/*.spec.ts",
    "<rootDir>/tests/**/*.test.js",
    "<rootDir>/tests/**/*.spec.js",
  ],
};
