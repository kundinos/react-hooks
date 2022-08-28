import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { usePreferredLanguages } from './usePreferredLanguages';

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(usePreferredLanguages).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() => usePreferredLanguages());

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
      return usePreferredLanguages();
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
