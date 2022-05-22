import { useEffect, useRef, useCallback } from 'react';

import { UseInterval, Cleanup } from './typings';

/**
 * Declarative version of `setInterval`
 * @param callback — Callback function, that will be called every interval time
 * @param interval — Time in milliseconds for interval, specify `null` to pause
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-interval
 */
const useInterval: UseInterval = (callback, interval) => {
  const refCleanup = useRef<Cleanup>(null);
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetInterval = useCallback(() => {
    clearInterval(refTimeoutId.current);

    if (typeof refCleanup.current === 'function') refCleanup.current();
  }, []);

  useEffect(() => {
    if (interval === null) return resetInterval;

    refTimeoutId.current = setInterval(() => {
      refCleanup.current = callback();
    }, interval);

    return resetInterval;
  }, [callback, interval, resetInterval]);

  return { resetInterval };
};

export default useInterval;
