import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';

export type UseFullState = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>, S];

/**
 * Works as useState, but contains third parameter with previous value of state
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-full-state
 */
export const useFullState: UseFullState = (initialState) => {
  const prevState = useRef(undefined);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    prevState.current = state;
  }, [state]);

  return [state, setState, prevState.current];
};
