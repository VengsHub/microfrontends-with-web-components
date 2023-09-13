module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
    roots: [
        "<rootDir>"
    ],
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/generated/",
        "<rootDir>/app/shared/models/",
    ],
    coverageDirectory: 'target/coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,ts}",
        "!generated/**",
        "!src/app/shared/models/**",
        // you can add more folders or files to exclude here
    ],
    coverageReporters: ['lcov', 'clover', 'text-summary']
};
