/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@utils-types$': '<rootDir>/src/utils/types.ts'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
