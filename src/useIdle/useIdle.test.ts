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

  test('Should return a boolean value', () => {
    const { result } = renderHook(() => useIdle());

    expect(typeof result.current).toBe('boolean');
  });

  test('Should return false as initial state', () => {
    const { result } = renderHook(() => useIdle());

    expect(result.current).toBe(false);
  });
});

describe('Behavior when change page visibility', () => {
  beforeEach(() => {
    changeVisibility('visible');
  });

  afterAll(() => {
    changeVisibility('visible');
  });

  test('Should return true when page hidden', () => {
    const { result } = renderHook(() => useIdle());

    act(() => {
      changeVisibility('hidden');
    });

    expect(result.current).toBe(true);
  });

  test('Should call onIdle callback when page hidden', () => {
    const onIdle = jest.fn();

    expect(onIdle).toBeCalledTimes(0);
    renderHook(() => useIdle({ onIdle }));
    expect(onIdle).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    expect(onIdle).toBeCalledTimes(1);
  });

  test('Should call onWakeup callback when page visible', () => {
    const onWakeup = jest.fn();

    expect(onWakeup).toBeCalledTimes(0);
    renderHook(() => useIdle({ onWakeup }));
    expect(onWakeup).toBeCalledTimes(0);

    act(() => changeVisibility('visible'));
    expect(onWakeup).toBeCalledTimes(1);
  });

  test('Should not call callbacks after unmount', () => {
    const onIdle = jest.fn();
    const onWakeup = jest.fn();
    const { unmount } = renderHook(() => useIdle({ onIdle, onWakeup }));

    expect(onIdle).toBeCalledTimes(0);
    expect(onWakeup).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    act(() => changeVisibility('visible'));
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeup).toBeCalledTimes(1);

    unmount();
    act(() => changeVisibility('hidden'));
    act(() => changeVisibility('visible'));
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeup).toBeCalledTimes(1);
  });
});
