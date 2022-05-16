import { useEffect, useRef, useCallback } from 'react';

import { UseInterval, Cleanup } from './typings';

const useInterval: UseInterval = (callback, delay) => {
  const refCleanup = useRef<Cleanup>(null);
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetInterval = useCallback(() => {
    clearInterval(refTimeoutId.current);

    if (typeof refCleanup.current === 'function') refCleanup.current();
  }, []);

  useEffect(() => {
    if (delay === null) return resetInterval;

    refTimeoutId.current = setInterval(() => {
      refCleanup.current = callback();
    }, delay);

    return resetInterval;
  }, [callback, delay, resetInterval]);

  return { resetInterval };
};

export default useInterval;
