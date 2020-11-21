import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  automock: false,
  setupFiles: ['./setupJest.ts'],
};

export default config;
