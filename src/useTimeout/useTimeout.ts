import { useCallback, useEffect, useRef } from 'react';

import { UseTimeout, Cleanup } from './typings';

const useTimeout: UseTimeout = (callback, delay) => {
  const refCleanup = useRef<Cleanup>(null);
  const refTimeoutId = useRef<NodeJS.Timeout>();
  const refIsCalled = useRef(false);

  const reset = useCallback(() => {
    clearTimeout(refTimeoutId.current);

    if (typeof refCleanup.current === 'function') refCleanup.current();
  }, []);

  const start = useCallback(() => {
    if (delay === null) return reset();

    refTimeoutId.current = setTimeout(() => {
      refCleanup.current = callback();
      refIsCalled.current = true;
    }, delay);
  }, [callback, delay, reset]);

  const repeat = useCallback(() => {
    refIsCalled.current = false;
    reset();
    start();
  }, [reset, start]);

  useEffect(() => {
    if (!refIsCalled.current) {
      start();
    }

    return reset;
  }, [reset, start]);

  return { reset, repeat };
};

export default useTimeout;
