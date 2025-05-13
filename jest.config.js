const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customConfig = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
}

module.exports = createJestConfig(customConfig)