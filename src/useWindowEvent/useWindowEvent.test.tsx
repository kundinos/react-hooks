import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useWindowEvent } from './useWindowEvent';

test('Should be defined', () => {
  expect(useWindowEvent).toBeDefined();
});

test('Should be render w/o errors', () => {
  const { result } = renderHook(() => useWindowEvent('load', jest.fn));

  expect(result.error).toBeUndefined();
});

test('Must correctly call the listener', () => {
  const listener = jest.fn();

  renderHook(() => useWindowEvent('load', listener));

  expect(listener.mock.calls.length).toBe(0);

  fireEvent.load(window);
  expect(listener.mock.calls.length).toBe(1);

  fireEvent.load(window);
  expect(listener.mock.calls.length).toBe(2);
});

test('Must delete the listener when unmounting', () => {
  const listener = jest.fn();
  const { unmount } = renderHook(() => useWindowEvent('load', listener));

  expect(listener.mock.calls.length).toBe(0);

  fireEvent.load(window);
  unmount();
  fireEvent.load(window);

  expect(listener.mock.calls.length).toBe(1);
});

test('Should be call listener when use options.initial', () => {
  const listener = jest.fn();

  expect(listener.mock.calls.length).toBe(0);

  renderHook(() => useWindowEvent('load', listener, { initial: true }));

  expect(listener.mock.calls.length).toBe(1);

  fireEvent.load(window);
  expect(listener.mock.calls.length).toBe(2);
});
