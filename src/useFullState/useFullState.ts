import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';

type UseFullState = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>, S];

const useFullState: UseFullState = (initialState) => {
  const ref = useRef(undefined);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return [state, setState, ref.current];
};

export default useFullState;
