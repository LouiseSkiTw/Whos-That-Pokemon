export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom', // Explicitly set the test environment',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    transform: {
      '^.+\\.tsx?$': ['ts-jest', { // Configure `ts-jest` here
        tsconfig: 'tsconfig.app.json', // Use your tsconfig file
        isolatedModules: true, // Example option for `ts-jest`
      }],
    },
    moduleNameMapper: {
      '\\.(scss|css|less)$': 'identity-obj-proxy', // Make sure this regex is correct
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
    },
  };
  