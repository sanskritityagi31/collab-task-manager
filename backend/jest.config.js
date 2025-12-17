/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // 🔴 THIS IS THE KEY FIX
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.json",
    },
  },

  testMatch: ["**/src/tests/**/*.test.ts"],

  modulePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
};
