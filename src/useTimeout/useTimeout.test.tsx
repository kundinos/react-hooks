import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useTimeout from '../useTimeout';

test('Must call callback correctly', () => {
  jest.useFakeTimers();

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
    const [timeout, setTimeout] = useState(1000);

    useTimeout(callback, timeout);

    useEffect(() => {
      setTimeout(100);
      setTimeout(2000);
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
  jest.useFakeTimers();

  const callback = jest.fn();
  const { result } = renderHook(() => useTimeout(callback, 1000));
  const { resetTimeout } = result.current;

  resetTimeout();
  jest.runAllTimers();

  expect(callback).not.toBeCalled();
});

test('Must call the cleanup callback', async () => {
  jest.useFakeTimers();

  const cleanup = jest.fn();
  const { result } = renderHook(() => useTimeout(() => cleanup, 1000));
  const { resetTimeout } = result.current;

  jest.runAllTimers();
  resetTimeout();

  expect(cleanup).toBeCalled();
  expect(cleanup).toBeCalledTimes(1);
});
