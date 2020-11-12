import { Dispatch, useCallback, useEffect, useState } from 'react';

export interface Store {
  state: unknown;
  listeners: Dispatch<unknown>[];
}

const store = { state: null, listeners: [] };

export default (initialState: unknown) => {
  store.state = store.state || initialState;

  //
  const addListener = useCallback(() => {
    const listener = useState()[1];

    store.listeners.push(listener);

    return listener;
  }, []);

  //
  const removeListener = useCallback((targetListener) => {
    store.listeners = store.listeners.filter((listener) => listener !== targetListener);
  }, []);

  //
  const setState = useCallback((input) => {
    const isFnc = typeof input === 'function';
    const newState = isFnc ? input(store.state) : input;
    const nextState = { ...store.state, ...newState };

    return nextState;
  }, []);

  //
  useEffect(() => {
    const listener = addListener();

    return () => removeListener(listener);
  }, []);

  return [store.state, setState];
};
