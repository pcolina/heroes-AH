module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  coveragePathIgnorePatterns: [
    "main.ts",
    "polyfills.ts",
    "public_api.ts",
    ".module.ts",
    ".interface.ts",
    ".utils.ts",
    ".story.ts",
    ".mock.ts",
    ".module.ts",
  ],
  reporters: ["default"],
};
