import { renderHook } from '@testing-library/react-hooks';

import { useInterval } from './useInterval';

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test('Must call callback correctly', () => {
  const callback = jest.fn();
  renderHook(() => useInterval(callback, 1000));

  expect(callback).not.toBeCalled();

  jest.runOnlyPendingTimers();

  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);

  jest.runOnlyPendingTimers();

  expect(callback).toHaveBeenCalledTimes(2);
});

test('Must stop interval when delay=null', () => {
  const callback = jest.fn();
  renderHook(() => useInterval(callback, null));

  expect(callback).not.toBeCalled();

  jest.runOnlyPendingTimers();

  expect(callback).not.toBeCalled();
});

test('Must be correctly reset interval manually', async () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useInterval(callback, 1000));
  const { resetInterval } = result.current;

  resetInterval();
  jest.runOnlyPendingTimers();

  expect(callback).not.toBeCalled();
});

test('Must call the cleanup callback', async () => {
  const cleanup = jest.fn();
  const { result } = renderHook(() => useInterval(() => cleanup, 1000));
  const { resetInterval } = result.current;

  jest.runOnlyPendingTimers();
  resetInterval();

  expect(cleanup).toBeCalled();
  expect(cleanup).toBeCalledTimes(1);
});
