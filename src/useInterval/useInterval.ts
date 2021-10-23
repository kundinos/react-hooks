import { useEffect, useRef, useCallback } from 'react';

import { UseInterval, Cleanup } from './typings';

const useInterval: UseInterval = (callback, delay) => {
  const refCleanup = useRef<Cleanup>();
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetInterval = useCallback(() => {
    clearInterval(refTimeoutId.current);

    if (refCleanup.current) refCleanup.current();
  }, []);

  useEffect(() => {
    if (delay === null) return resetInterval;

    refTimeoutId.current = setInterval(() => {
      const cleanup = callback();

      if (typeof cleanup === 'function') {
        refCleanup.current = cleanup;
      }
    }, delay);

    return resetInterval;
  }, [callback, delay, resetInterval]);

  return { resetInterval };
};

export default useInterval;
