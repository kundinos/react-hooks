import { useCallback, useEffect, useState } from 'react';

const store = { state: undefined, initialState: undefined, listeners: [] };

export default (initialState?: unknown) => {
  const [state, setState] = useState(store.state || initialState);

  //
  const isCurrentListener = useCallback((listener) => {
    return listener === setState;
  }, []);

  //
  useEffect(() => {
    store.initialState = store.initialState || initialState;
    store.state = state;

    store.listeners.forEach((listener) => !isCurrentListener(listener) && listener(state));
  }, [state]);

  //
  useEffect(() => {
    store.listeners.push(setState);

    return () => {
      store.listeners = store.listeners.filter((listener) => !isCurrentListener(listener));
    };
  });

  return [state, setState];
};
