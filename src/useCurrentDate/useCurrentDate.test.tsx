import { renderHook } from '@testing-library/react-hooks';

import { useCurrentDate } from './useCurrentDate';

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test('Must return now date', () => {
  const { result } = renderHook(() => useCurrentDate());

  expect(result.current).toBeInstanceOf(Date);
});
