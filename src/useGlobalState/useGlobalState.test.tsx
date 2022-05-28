import { renderHook, act } from '@testing-library/react-hooks';

import { useGlobalState } from './useGlobalState';

beforeEach(() => {
  const { result } = renderHook(() => useGlobalState());
  act(() => {
    result.current[1](undefined);
  });
});

describe('Set up initial state', () => {
  test('Must be undefined', () => {
    const { result } = renderHook(() => useGlobalState());
    const [state] = result.current;

    expect(state).toBeUndefined();
  });

  test('Must be correct', () => {
    const initialState = { test: 1 };
    const { result } = renderHook(() => useGlobalState(initialState));
    const [state] = result.current;

    expect(state).toEqual(initialState);
  });
});

describe('Changing state from current component', () => {
  test('Must be changed correctly using the object', () => {
    const { result } = renderHook(() => useGlobalState({ test: 1 }));

    act(() => {
      result.current[1]({ test: 2 });
    });

    expect(result.current[0]).toEqual({ test: 2 });
  });

  test('Must be changed correctly using the function', () => {
    const { result } = renderHook(() => useGlobalState({ test: 1 }));

    act(() => {
      result.current[1](() => ({ test: 2 }));
    });

    expect(result.current[0]).toEqual({ test: 2 });
  });

  test('Must be changed correctly using previous state', () => {
    const { result } = renderHook(() => useGlobalState({ test: 1 }));

    act(() => {
      result.current[1]((prev) => ({ test: prev.test + 1 }));
    });

    expect(result.current[0]).toEqual({ test: 2 });
  });
});

describe('Changing state from different components', () => {
  test('Must have the same initial state', () => {
    const initialState = { test: 1 };
    const { result: result1 } = renderHook(() => useGlobalState(initialState));
    const { result: result2 } = renderHook(() => useGlobalState());

    expect(result1.current[0]).toEqual(initialState);
    expect(result2.current[0]).toEqual(initialState);
    expect(result1.current[0]).toEqual(result2.current[0]);
  });

  test('Must have the same state after change state from first component', () => {
    const initialState = { test: 1 };
    const { result: result1 } = renderHook(() => useGlobalState(initialState));
    const { result: result2 } = renderHook(() => useGlobalState());

    act(() => {
      result1.current[1]({ test: 2 });
    });

    expect(result1.current[0]).toEqual(result2.current[0]);
  });
});
