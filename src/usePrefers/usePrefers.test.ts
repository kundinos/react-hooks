import { renderHook } from '@testing-library/react-hooks';
import * as MockMediaQueries from '@kundinos/mock-media-queries';

import { usePrefers } from './usePrefers';

beforeAll(() => {
  MockMediaQueries.startMock();
});

afterAll(() => {
  MockMediaQueries.cleanup();
});

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(usePrefers).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() => usePrefers());

    expect(result.error).toBeUndefined();
  });
});

describe('Specific behavior', () => {
  test('Should return the correct result by default', () => {
    const { result } = renderHook(() => usePrefers());

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "colorScheme": null,
        "languages": Array [
          "en-US",
          "en",
        ],
        "reducedMotion": "no-preference",
      }
    `);
  });
});
