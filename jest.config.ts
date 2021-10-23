import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  automock: false,
  setupFiles: ['../setupJest.ts'],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: '../coverage',
  rootDir: 'src',
  testEnvironment: 'jsdom',
};

export default config;
