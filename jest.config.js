/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testMatch: ['<rootDir>/src/__tests__/*.(ts|tsx)', '<rootDir>/src/**/?(*.)(spec|test).{ts|tsx}'],
};
