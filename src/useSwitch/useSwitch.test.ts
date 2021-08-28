import { act, renderHook } from '@testing-library/react-hooks';

import useSwitch from './useSwitch';

describe('Main behavior', () => {
  test('Should be defined', () => {
    expect(useSwitch).toBeDefined();
  });

  test('Should be a function', () => {
    expect(useSwitch).toBeInstanceOf(Function);
  });

  test('Should return array', () => {
    const { result } = renderHook(() => useSwitch());

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBeInstanceOf(Function);
  });
});

describe('Specific behavior', () => {
  test('Should return false as initial state', () => {
    const { result } = renderHook(() => useSwitch());

    expect(result.current[0]).toBe(false);
  });

  test('Should return the specified initial state', () => {
    const { result } = renderHook(() => useSwitch(true));

    expect(result.current[0]).toBe(true);
  });

  test('Should update the state when use toggle function', () => {
    const { result } = renderHook(() => useSwitch());
    const toggle = result.current[1];

    expect(result.current[0]).toBe(false);

    act(toggle);

    expect(result.current[0]).toBe(true);

    act(toggle);

    expect(result.current[0]).toBe(false);
  });
});
