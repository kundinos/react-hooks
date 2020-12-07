import { renderHook } from '@testing-library/react-hooks';

import useInterval from '../useInterval';

test('Must call callback correctly', () => {
  jest.useFakeTimers();

  const callback = jest.fn();
  renderHook(() => useInterval(callback, 1000));

  expect(callback).not.toBeCalled();

  jest.runOnlyPendingTimers();

  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);

  jest.runOnlyPendingTimers();

  expect(callback).toHaveBeenCalledTimes(2);
});

test('Must be correctly reset interval manually', async () => {
  jest.useFakeTimers();

  const callback = jest.fn();
  const { result } = renderHook(() => useInterval(callback, 1000));
  const { resetInterval } = result.current;

  resetInterval();
  jest.runOnlyPendingTimers();

  expect(callback).not.toBeCalled();
});

test('Must call the cleanup callback', async () => {
  jest.useFakeTimers();

  const cleanup = jest.fn();
  const { result } = renderHook(() => useInterval(() => cleanup, 1000));
  const { resetInterval } = result.current;

  jest.runOnlyPendingTimers();
  resetInterval();

  expect(cleanup).toBeCalled();
  expect(cleanup).toBeCalledTimes(1);
});
