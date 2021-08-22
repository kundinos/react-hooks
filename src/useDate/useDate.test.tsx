import { renderHook } from '@testing-library/react-hooks';

import useDate from './useDate';

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test('Must return now date', () => {
  const { result } = renderHook(() => useDate());

  expect(result.current).toBeInstanceOf(Date);
});
