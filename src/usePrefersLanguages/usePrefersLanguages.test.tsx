import { renderHook } from '@testing-library/react-hooks';

import { usePrefersLanguages } from './usePrefersLanguages';

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(usePrefersLanguages).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() => usePrefersLanguages());

    expect(result.error).toBeUndefined();
  });
});

describe('Specific behavior', () => {
  let languagesGetter;

  beforeEach(() => {
    languagesGetter = jest.spyOn(window.navigator, 'languages', 'get');
  });

  test('Should return the array of languages', () => {
    languagesGetter.mockReturnValue(['ru', 'en', 'la']);

    const { result } = renderHook(() => {
      return usePrefersLanguages();
    });

    expect(result.current).toMatchInlineSnapshot(`
      Array [
        "ru",
        "en",
        "la",
      ]
    `);
  });
});
