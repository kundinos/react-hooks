import React, { useEffect, useRef, useState } from 'react';
import { render, act as reactAct } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import useTimeout from './useTimeout';

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test('Must call callback correctly', () => {
  const callback = jest.fn();
  renderHook(() => useTimeout(callback, 1000));

  expect(callback).not.toBeCalled();

  jest.runAllTimers();

  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

test('Must correct cleanup timer when unmounting', () => {
  const callback = jest.fn();
  const { unmount } = renderHook(() => useTimeout(callback, 1000));

  unmount();
  expect(callback).not.toBeCalled();

  jest.runAllTimers();

  expect(callback).not.toBeCalled();
});

test('Must callback correctly when changing timeout', () => {
  const callback = jest.fn();

  const Component = () => {
    const [delay, setDelay] = useState(1000);

    useTimeout(callback, delay);

    useEffect(() => {
      setDelay(100);
      setDelay(2000);
    }, []);

    return <div />;
  };

  render(<Component />);

  expect(callback).not.toBeCalled();

  jest.advanceTimersByTime(100);
  expect(callback).not.toBeCalled();

  jest.advanceTimersByTime(1000);
  expect(callback).not.toBeCalled();

  jest.advanceTimersByTime(400);
  expect(callback).not.toBeCalled();

  jest.advanceTimersByTime(500);
  expect(callback).toBeCalled();
  expect(callback).toBeCalledTimes(1);
});

test('Must be reset correctly manually', async () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useTimeout(callback, 1000));

  result.current.reset();
  jest.runAllTimers();

  expect(callback).not.toBeCalled();
});

test('Must no restart when change state', async () => {
  const callback = jest.fn();

  const Component = () => {
    const [count, setCount] = useState(1);

    useTimeout(callback, 1000);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setCount(2);
      }, 500);

      return () => clearTimeout(timeoutId);
    }, []);

    return <div>{count}</div>;
  };

  const { container } = render(<Component />);
  expect(callback).not.toBeCalled();
  expect(container.textContent).toBe('1');

  reactAct(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(callback).toBeCalledTimes(1);

  reactAct(() => {
    jest.advanceTimersByTime(2000);
  });
  expect(callback).toBeCalledTimes(1);

  expect(container.textContent).toBe('2');
});

test('Must call the cleanup callback', async () => {
  const cleanup = jest.fn();
  const { result } = renderHook(() => useTimeout(() => cleanup, 1000));

  jest.runAllTimers();
  result.current.reset();

  expect(cleanup).toBeCalled();
  expect(cleanup).toBeCalledTimes(1);
});

test('Must correctly callback when changing callback function', () => {
  const callback1 = jest.fn();
  const callback2 = jest.fn();

  const Component = () => {
    const [, setUpdate] = useState(0);
    const refCallback = useRef(callback1);

    useTimeout(refCallback.current, 5000);

    useEffect(() => {
      refCallback.current = callback2;
      setUpdate(1);
    }, []);

    return <div />;
  };

  render(<Component />);

  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();

  jest.runAllTimers();

  expect(callback1).not.toBeCalled();
  expect(callback2).toBeCalled();
  expect(callback2).toBeCalledTimes(1);
});

test('Should be call callback again when use repeat', () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useTimeout(callback, 3000));

  act(() => jest.advanceTimersByTime(3000));
  expect(callback).toBeCalledTimes(1);

  result.current.repeat();
  act(() => jest.advanceTimersByTime(3000));
  expect(callback).toBeCalledTimes(2);
});

test('Must call cleanup again when use repeat', () => {
  const cleanup = jest.fn();
  const { result } = renderHook(() => useTimeout(() => cleanup, 3000));

  act(() => jest.advanceTimersByTime(3000));
  expect(cleanup).toBeCalledTimes(0);

  result.current.repeat();
  expect(cleanup).toBeCalledTimes(1);
});
