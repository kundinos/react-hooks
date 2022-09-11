import { renderHook, act } from '@testing-library/react-hooks';
import * as MockMediaQueries from '@kundinos/mock-media-queries';

import { useMediaQuery } from './useMediaQuery';

beforeAll(() => {
  MockMediaQueries.startMock();
});

afterAll(() => {
  MockMediaQueries.cleanup();
});

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(useMediaQuery).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)', jest.fn));

    expect(result.error).toBeUndefined();
  });
});

describe('Returned value', () => {
  test('Should return false when no events', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)', onChange));

    expect(result.current).toBeFalsy();
  });

  test('Should return correct value when media query matches/unmatches', () => {
    const onChange = jest.fn();
    const media = '(prefers-color-scheme: dark)';
    const { result } = renderHook(() => useMediaQuery(media, onChange));

    act(() => {
      MockMediaQueries.fireEvent({ media, matches: true });
    });

    expect(result.current).toBeTruthy();

    act(() => {
      MockMediaQueries.fireEvent({ media, matches: false });
    });

    expect(result.current).toBeFalsy();
  });
});

describe('onChange', () => {
  test('Should not call onChange without event', () => {
    const onChange = jest.fn();
    renderHook(() => useMediaQuery('(prefers-color-scheme: dark)', onChange));

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('Should call callback when media query matches', () => {
    const onChange = jest.fn();
    const media = '(prefers-color-scheme: dark)';

    renderHook(() => useMediaQuery(media, onChange));

    MockMediaQueries.fireEvent({ media, matches: true });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ matches: true, media });

    MockMediaQueries.fireEvent({ media, matches: false });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith({ matches: false, media });
  });

  test('Should not call callback when matches different media query', () => {
    const onChange = jest.fn();

    renderHook(() => useMediaQuery('(prefers-color-scheme: dark)', onChange));

    MockMediaQueries.fireEvent({ media: '(prefers-color-scheme: light)', matches: true });
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});

describe('Cleanup', () => {
  test('Should correct remove listener', () => {
    const onChange = jest.fn();
    const { unmount } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)', onChange));

    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(1);

    unmount();
    expect(Object.keys(MockMediaQueries.getListeners()).length).toBe(0);
  });
});
