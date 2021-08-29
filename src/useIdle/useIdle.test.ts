import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import useIdle from './useIdle';

function changeVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', {
    get: () => state,
    configurable: true,
  });
  fireEvent(document, new Event('visibilitychange'));
}

describe('Main behavior', () => {
  test('Should be defined', () => {
    expect(useIdle).toBeDefined();
  });

  test('Should be a function', () => {
    expect(useIdle).toBeInstanceOf(Function);
  });
});

describe('Specific behavior', () => {
  beforeEach(() => {
    changeVisibility('visible');
  });

  afterAll(() => {
    changeVisibility('visible');
  });

  test('Should return a boolean value', () => {
    const { result } = renderHook(() => useIdle());

    expect(typeof result.current).toBe('boolean');
  });

  test('Should return false as initial state', () => {
    const { result } = renderHook(() => useIdle());

    expect(result.current).toBe(false);
  });

  test('Should return true when hidden visibility', () => {
    const { result } = renderHook(() => useIdle());

    act(() => {
      changeVisibility('hidden');
    });

    expect(result.current).toBe(true);
  });

  test('Should call onChange callback', () => {
    const onChange = jest.fn();

    expect(onChange).toBeCalledTimes(0);
    renderHook(() => useIdle({ onChange }));
    expect(onChange).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    expect(onChange).toBeCalledTimes(1);

    act(() => changeVisibility('visible'));
    expect(onChange).toBeCalledTimes(2);
  });

  test('Should not call onChange callback after unmount', () => {
    const onChange = jest.fn();
    const { unmount } = renderHook(() => useIdle({ onChange }));

    expect(onChange).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    expect(onChange).toBeCalledTimes(1);

    unmount();
    act(() => changeVisibility('visible'));
    expect(onChange).toBeCalledTimes(1);
  });
});
