import React from 'react';
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

  const callback = jest.fn();
  const cleanup = jest.fn();
  const { result } = renderHook(() => useTimeout(callback, 1000));
  const { resetTimeout } = result.current;

  resetTimeout(cleanup);
  jest.runAllTimers();

  expect(callback).not.toBeCalled();
  expect(cleanup).toBeCalled();
  expect(cleanup).toBeCalledTimes(1);
});
