import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useScroll } from './useScroll';

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(useScroll).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() => useScroll(() => {}));

    expect(result.error).toBeUndefined();
  });
});

describe('Specific behavior', () => {
  test('Should call the callback when vertical scroll', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    renderHook(() => useScroll(listener));

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('Should call the callback when horizontal scroll', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    renderHook(() => useScroll(listener));

    fireEvent.scroll(window, { target: { scrollX: 100 } });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('Should return current position scroll', () => {
    const listener = jest.fn();

    renderHook(() => useScroll(listener));

    fireEvent.scroll(window, { target: { scrollY: 22, scrollX: 53 } });

    const { current } = listener.mock.calls[0][0];
    expect(current).toStrictEqual({ x: 53, y: 22 });
  });

  test('Should return previous position scroll', () => {
    const listener = jest.fn();

    renderHook(() => useScroll(listener));

    fireEvent.scroll(window, { target: { scrollY: 19, scrollX: 34 } });
    expect(listener.mock.calls[0][0].previous).toStrictEqual({ x: 0, y: 0 });

    fireEvent.scroll(window, { target: { scrollY: 123, scrollX: 47 } });
    expect(listener.mock.calls[1][0].previous).toStrictEqual({ x: 34, y: 19 });
  });

  test('Must delete the listener when unmounting', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    const { unmount } = renderHook(() => useScroll(listener));

    fireEvent.scroll(window, { target: { scrollX: 100 } });
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.scroll(window, { target: { scrollX: 100 } });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
