import { useCallback, useEffect, useRef } from 'react';

import { UseTimeout, Cleanup } from './typings';

const useTimeout: UseTimeout = (callback, timeout) => {
  const refCleanup = useRef<Cleanup>(null);
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const reset = useCallback(() => {
    clearTimeout(refTimeoutId.current);

    if (typeof refCleanup.current === 'function') refCleanup.current();
  }, []);

  const start = useCallback(() => {
    refTimeoutId.current = setTimeout(() => {
      refCleanup.current = callback();
    }, timeout);
  }, [callback, timeout]);

  useEffect(() => {
    start();

    return reset;
  }, [reset, start]);

  return { reset, repeat: start };
};

export default useTimeout;
