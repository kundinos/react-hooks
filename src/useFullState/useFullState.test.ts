import { renderHook, act } from '@testing-library/react-hooks';

import { useFullState } from './useFullState';

test('Must be correct previous state', () => {
  const { result } = renderHook(() => useFullState(1));

  act(() => {
    const [, setState] = result.current;

    setState(2);
  });

  {
    const [state, , previousState] = result.current;

    expect(state).toBe(2);
    expect(previousState).toBe(1);
  }

  act(() => {
    const [, setState] = result.current;

    setState(3);
  });

  {
    const [state, , previousState] = result.current;

    expect(state).toBe(3);
    expect(previousState).toBe(2);
  }
});
