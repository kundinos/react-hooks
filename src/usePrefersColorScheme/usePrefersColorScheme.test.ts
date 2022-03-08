import { act, renderHook } from '@testing-library/react-hooks/server';
import * as MockMediaQueries from '@kundinos/mock-media-queries';

import usePrefersColorScheme from './usePrefersColorScheme';

beforeAll(() => {
  MockMediaQueries.startMock();
});

afterAll(() => {
  MockMediaQueries.cleanup();
});

describe('Main behavior', () => {
  test('Should be defined', () => {
    expect(usePrefersColorScheme).toBeDefined();
  });

  test('Should be a function', () => {
    expect(usePrefersColorScheme).toBeInstanceOf(Function);
  });
});

describe('Specific behavior', () => {
  test('Should return null values on first render (SSR)', () => {
    const { result } = renderHook(() => usePrefersColorScheme());
    const { theme, isDark, isLight } = result.current;

    expect(theme).toBeNull();
    expect(isDark).toBeNull();
    expect(isLight).toBeNull();
  });

  test('Should return prefers colors scheme when she is changing (dark)', () => {
    const { result, hydrate, rerender } = renderHook(() => usePrefersColorScheme());

    hydrate();
    rerender();

    act(() => {
      MockMediaQueries.fireEvent({ media: '(prefers-color-scheme: dark)', matches: true });
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBeTruthy();
    expect(result.current.isLight).toBeFalsy();

    act(() => {
      MockMediaQueries.fireEvent({ media: '(prefers-color-scheme: dark)', matches: false });
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBeFalsy();
    expect(result.current.isLight).toBeTruthy();
  });

  test('Should return prefers colors scheme when she is changing (light)', () => {
    const { result, hydrate, rerender } = renderHook(() => usePrefersColorScheme());

    hydrate();
    rerender();

    act(() => {
      MockMediaQueries.fireEvent({ media: '(prefers-color-scheme: light)', matches: true });
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.isLight).toBeTruthy();
    expect(result.current.isDark).toBeFalsy();

    act(() => {
      MockMediaQueries.fireEvent({ media: '(prefers-color-scheme: light)', matches: false });
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isLight).toBeFalsy();
    expect(result.current.isDark).toBeTruthy();
  });
});
