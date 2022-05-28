import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useDocumentEvent } from './useDocumentEvent';

test('Should be defined', () => {
  expect(useDocumentEvent).toBeDefined();
});

test('Should be render w/o errors', () => {
  const { result } = renderHook(() => useDocumentEvent('load', jest.fn));

  expect(result.error).toBeUndefined();
});

test('Must correctly call the listener', () => {
  const listener = jest.fn();

  expect(listener).toHaveBeenCalledTimes(0);

  renderHook(() => useDocumentEvent('load', listener));

  fireEvent.load(document);
  expect(listener).toHaveBeenCalledTimes(1);

  fireEvent.load(document);
  expect(listener).toHaveBeenCalledTimes(2);
});

test('Must delete the listener when unmounting', () => {
  const listener = jest.fn();
  const { unmount } = renderHook(() => useDocumentEvent('load', listener));

  fireEvent.load(document);
  expect(listener.mock.calls.length).toBe(1);

  unmount();
  fireEvent.load(document);
  expect(listener.mock.calls.length).toBe(1);
});
