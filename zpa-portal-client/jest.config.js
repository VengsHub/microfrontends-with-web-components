module.exports = {

    globals: {
        crypto: require("crypto")
    },
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
    coverageDirectory: 'target/coverage',

    transformIgnorePatterns: [
        'node_modules/(?!rxjs|(?!jest-preset-angular))'
    ],

    transform: {
        '^.+\\.(js)$': 'babel-jest'
    },

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

    reporters: [
        'default',
        'jest-junit'
    ]
};
