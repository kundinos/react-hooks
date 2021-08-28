import { useRef, useState, useEffect } from 'react';

import { UseFullState } from './typings';

const useFullState: UseFullState = (initialState) => {
  const prevState = useRef(undefined);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    prevState.current = state;
  }, [state]);

  return [state, setState, prevState.current];
};

export default useFullState;
