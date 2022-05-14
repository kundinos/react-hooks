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

  test('Should return true when page hidden and false when page visible', () => {
    const { result } = renderHook(() => useIdle());

    act(() => changeVisibility('hidden'));
    expect(result.current).toBe(true);

    act(() => changeVisibility('visible'));
    expect(result.current).toBe(false);
  });

  test('Should call onIdle callback when page hidden', () => {
    const onIdle = jest.fn();

    expect(onIdle).toBeCalledTimes(0);
    renderHook(() => useIdle({ onIdle }));
    expect(onIdle).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    expect(onIdle).toBeCalledTimes(1);
  });

  test('Should call onWakeUp callback when page visible', () => {
    const onWakeUp = jest.fn();

    expect(onWakeUp).toBeCalledTimes(0);
    renderHook(() => useIdle({ onWakeUp }));
    expect(onWakeUp).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    act(() => changeVisibility('visible'));
    expect(onWakeUp).toBeCalledTimes(1);
  });

  test('Should not call callbacks after unmount', () => {
    const onIdle = jest.fn();
    const onWakeUp = jest.fn();
    const { unmount } = renderHook(() => useIdle({ onIdle, onWakeUp }));

    expect(onIdle).toBeCalledTimes(0);
    expect(onWakeUp).toBeCalledTimes(0);

    act(() => changeVisibility('hidden'));
    act(() => changeVisibility('visible'));
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);

    unmount();
    act(() => changeVisibility('hidden'));
    act(() => changeVisibility('visible'));
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);
  });
});

describe('Behavior when page visible', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Should be idle, when user inactive default timeout', () => {
    const onIdle = jest.fn();
    const { result } = renderHook(() => useIdle({ onIdle }));

    act(() => jest.advanceTimersByTime(1000));
    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(0);

    act(() => jest.advanceTimersByTime(2000));
    expect(result.current).toBe(true);
    expect(onIdle).toBeCalledTimes(1);
  });

  test('Should be idle, when user inactive custom timeout', () => {
    const onIdle = jest.fn();
    const { result } = renderHook(() => useIdle({ timeout: 10000, onIdle }));

    act(() => jest.advanceTimersByTime(6000));
    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(0);

    act(() => jest.advanceTimersByTime(4000));
    expect(result.current).toBe(true);
    expect(onIdle).toBeCalledTimes(1);
  });

  test('Should be wakeup after onClick', () => {
    const onIdle = jest.fn();
    const onWakeUp = jest.fn();
    const { result } = renderHook(() => useIdle({ onIdle, onWakeUp }));

    act(() => jest.advanceTimersByTime(3000));
    act(() => {
      fireEvent.click(document);
    });

    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);
  });

  test('Should be wakeup after onKeyDown', () => {
    const onIdle = jest.fn();
    const onWakeUp = jest.fn();
    const { result } = renderHook(() => useIdle({ onIdle, onWakeUp }));

    act(() => jest.advanceTimersByTime(3000));
    act(() => {
      fireEvent.keyDown(document);
    });

    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);
  });

  test('Should be wakeup after mouse move', () => {
    const onIdle = jest.fn();
    const onWakeUp = jest.fn();
    const { result } = renderHook(() => useIdle({ onIdle, onWakeUp }));

    act(() => jest.advanceTimersByTime(3000));
    act(() => {
      fireEvent.mouseMove(document);
    });

    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);
  });

  test('Should be wakeup after scroll', () => {
    const onIdle = jest.fn();
    const onWakeUp = jest.fn();
    const { result } = renderHook(() => useIdle({ onIdle, onWakeUp }));

    act(() => jest.advanceTimersByTime(3000));

    expect(result.current).toBe(true);
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(0);

    act(() => {
      fireEvent.scroll(document, { target: { scrollY: 100 } });
    });

    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);
  });

  test('Should be idle again after wake up and repeated inactivity', () => {
    const onIdle = jest.fn();
    const onWakeUp = jest.fn();
    const { result } = renderHook(() => useIdle({ onIdle, onWakeUp }));

    act(() => jest.advanceTimersByTime(3000));
    act(() => {
      fireEvent.click(document);
    });

    expect(result.current).toBe(false);
    expect(onIdle).toBeCalledTimes(1);
    expect(onWakeUp).toBeCalledTimes(1);

    act(() => jest.advanceTimersByTime(3000));
    expect(onIdle).toBeCalledTimes(2);
    expect(onWakeUp).toBeCalledTimes(1);
  });
});

describe('Behavior when page hidden', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Should be not call onIdle again', () => {
    const onIdle = jest.fn();

    renderHook(() => useIdle({ onIdle }));

    act(() => changeVisibility('hidden'));
    act(() => jest.advanceTimersByTime(3000));

    expect(onIdle).toBeCalledTimes(1);

    act(() => changeVisibility('visible'));
    act(() => jest.advanceTimersByTime(3000));

    expect(onIdle).toBeCalledTimes(2);
  });

  test('Should be not call onWakeUp again', () => {
    const onWakeUp = jest.fn();

    renderHook(() => useIdle({ onWakeUp }));

    act(() => changeVisibility('hidden'));
    act(() => changeVisibility('visible'));

    expect(onWakeUp).toBeCalledTimes(1);

    act(() => changeVisibility('visible'));
    act(() => {
      fireEvent.click(document);
    });
    act(() => {
      fireEvent.keyDown(document);
    });
    act(() => {
      fireEvent.mouseMove(document);
    });

    expect(onWakeUp).toBeCalledTimes(1);
  });
});
