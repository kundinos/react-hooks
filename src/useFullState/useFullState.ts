import { useRef, useState, useEffect } from 'react';

import { UseFullState } from './typings';

/**
 * Works as useState, but contains third parameter with previous value of state
 *
 * @see https://kundinos.ru/project/react-hooks/use-full-state
 */
const useFullState: UseFullState = (initialState) => {
  const prevState = useRef(undefined);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    prevState.current = state;
  }, [state]);

  return [state, setState, prevState.current];
};

export default useFullState;
