import React, { useEffect, useRef, useState } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

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

  const Component = () => {
    useTimeout(callback, 1000);

    return <div />;
  };

  const { unmount } = render(<Component />);

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

  jest.runAllTimers();

  expect(callback).toBeCalled();
  expect(callback).toBeCalledTimes(1);
});

test('Must be reset correctly manually', async () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useTimeout(callback, 1000));
  const { resetTimeout } = result.current;

  resetTimeout();
  jest.runAllTimers();

  expect(callback).not.toBeCalled();
});

test('Must call the cleanup callback', async () => {
  const cleanup = jest.fn();
  const { result } = renderHook(() => useTimeout(() => cleanup, 1000));
  const { resetTimeout } = result.current;

  jest.runAllTimers();
  resetTimeout();

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
