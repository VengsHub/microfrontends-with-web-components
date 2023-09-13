module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
    moduleDirectories: [
    "node_modules",
    "src"
    ],
    coverageDirectory: 'target/coverage',
    transformIgnorePatterns: [
        'node_modules/(?!rxjs|(?!jest-preset-angular))'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/app/**/*.ts',
        '!<rootDir>/src/app/**/index.ts',
        '!<rootDir>/src/app/**/*.module.ts'
    ],
    coverageReporters: [
        'lcov',
        'text-summary'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/coverage/',
        '<rootDir>/dist/',
        '<rootDir>/e2e/',
        '<rootDir>/node_modules/',
        '<rootDir>/src/app/*.(js|scss)'
    ],
};
