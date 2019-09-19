const { defaults } = require('jest-config');

module.exports = {
  displayName: 'Companion',
  verbose: true,
  preset: 'jest-expo',
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js'
  ],
  setupFiles: ['<rootDir>/enzyme.config.js', '<rootDir>/jest-setup.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
    'node'
  ]
};
