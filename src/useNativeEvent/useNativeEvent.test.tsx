import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useNativeEvent } from './useNativeEvent';

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(useNativeEvent).toBeDefined();
  });

  test('Should be render w/o errors', () => {
    const { result } = renderHook(() => useNativeEvent(document, 'load', jest.fn));

    expect(result.error).toBeUndefined();
  });
});

describe('Use with window', () => {
  test('Must correctly call the listener', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    renderHook(() => useNativeEvent(window, 'load', listener));

    fireEvent.load(window);
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.load(window);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Must delete the listener when unmounting', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    const { unmount } = renderHook(() => useNativeEvent(window, 'load', listener));

    fireEvent.load(window);
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.load(window);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('Use with document', () => {
  test('Must correctly call the listener', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    renderHook(() => useNativeEvent(document, 'load', listener));

    fireEvent.load(document);
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.load(document);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Must delete the listener when unmounting', () => {
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    const { unmount } = renderHook(() => useNativeEvent(document, 'load', listener));

    fireEvent.load(document);
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.load(document);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('Use with react ref', () => {
  test('Must correctly call the listener', () => {
    const div = document.createElement('div');
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    renderHook(() => useNativeEvent({ current: div }, 'click', listener));

    fireEvent.click(div);
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.click(div);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Must delete the listener when unmounting', () => {
    const div = document.createElement('div');
    const listener = jest.fn();

    expect(listener).toHaveBeenCalledTimes(0);

    const { unmount } = renderHook(() => useNativeEvent({ current: div }, 'click', listener));

    fireEvent.click(div);
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.click(div);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
