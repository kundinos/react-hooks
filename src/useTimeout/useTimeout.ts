import { useCallback, useEffect, useRef } from 'react';

import { UseTimeout, Cleanup } from './typings';

/**
 * Declarative version of setTimeout
 * @param callback - Callback function, that will be called after specified delay time
 * @param delay — Time in milliseconds for timeout
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-timeout
 */
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
