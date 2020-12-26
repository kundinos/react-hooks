import { useCallback, useEffect, useState, Dispatch, SetStateAction } from 'react';

const store = { state: undefined, initialState: undefined, listeners: [] };

const useGlobalState = <T>(initialState?: T): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(store.state || initialState);

  //
  const isCurrentListener = useCallback((listener) => {
    return listener === setState;
  }, []);

  //
  useEffect(() => {
    store.initialState = store.initialState || initialState;
    store.state = state;

    store.listeners.forEach((listener) => !isCurrentListener(listener) && listener(state));
  }, [initialState, isCurrentListener, state]);

  //
  useEffect(() => {
    store.listeners.push(setState);

    return () => {
      store.listeners = store.listeners.filter((listener) => !isCurrentListener(listener));
    };
  }, [isCurrentListener]);

  return [state, setState];
};

export default useGlobalState;
