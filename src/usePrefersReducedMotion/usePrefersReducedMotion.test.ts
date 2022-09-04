import { act, renderHook } from '@testing-library/react-hooks';
import * as MockMediaQueries from '@kundinos/mock-media-queries';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

beforeAll(() => {
  MockMediaQueries.startMock();
});

afterAll(() => {
  MockMediaQueries.cleanup();
});

describe('Main behavior', () => {
  test('Should be defined', () => {
    expect(usePrefersReducedMotion).toBeDefined();
  });

  test('Should be a function', () => {
    expect(usePrefersReducedMotion).toBeInstanceOf(Function);
  });
});

describe('Specific behavior', () => {
  test('Should return no-preference value by default', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe('no-preference');
  });

  test('Should return prefers reduced motion it`s changing', () => {
    const reduceMedia = '(prefers-reduced-motion: reduce)';
    const noPreferenceMedia = '(prefers-reduced-motion: no-preference)';
    const { result } = renderHook(() => usePrefersReducedMotion());

    act(() => {
      MockMediaQueries.fireEvent({ media: reduceMedia, matches: true });
    });
    expect(result.current).toBe('reduce');

    act(() => {
      MockMediaQueries.fireEvent({ media: reduceMedia, matches: false });
    });
    expect(result.current).toBe('no-preference');

    act(() => {
      MockMediaQueries.fireEvent({ media: reduceMedia, matches: true });
      MockMediaQueries.fireEvent({ media: noPreferenceMedia, matches: false });
    });
    expect(result.current).toBe('reduce');

    act(() => {
      MockMediaQueries.fireEvent({ media: noPreferenceMedia, matches: true });
    });
    expect(result.current).toBe('no-preference');
  });
});

describe('Cleanup', () => {
  test('Should correct remove listeners', () => {
    const { unmount } = renderHook(() => usePrefersReducedMotion());

    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(2);

    unmount();
    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(0);
  });
});
