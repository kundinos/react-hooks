import { useEffect, useRef, useCallback } from 'react';

export type Cleanup = () => void | null;
export type Callback = () => Cleanup | void;
export type Delay = null | number;
export interface UseIntervalResult {
  resetInterval: () => void;
}
export type UseInterval = (allback: Callback, delay?: Delay) => UseIntervalResult;

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
