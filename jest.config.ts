import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  automock: false,
  setupFiles: ['../setupJest.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: '../coverage',
  rootDir: 'src',
};

export default config;
