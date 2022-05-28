import { act, renderHook } from '@testing-library/react-hooks';

import { useToggle } from './useToggle';

describe('Main behavior', () => {
  test('Should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  test('Should be a function', () => {
    expect(useToggle).toBeInstanceOf(Function);
  });

  test('Should return array', () => {
    const { result } = renderHook(() => useToggle());

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBeInstanceOf(Function);
  });
});

describe('Specific behavior', () => {
  test('Should return false as initial state', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  test('Should return the specified initial state', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  test('Should update the state when use toggle function', () => {
    const { result } = renderHook(() => useToggle());
    const toggle = result.current[1];

    expect(result.current[0]).toBe(false);

    act(toggle);

    expect(result.current[0]).toBe(true);

    act(toggle);

    expect(result.current[0]).toBe(false);
  });
});
