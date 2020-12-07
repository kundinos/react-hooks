import { useEffect, useRef, useCallback } from 'react';

export type Cleanup = void | Function;
export type Callback = () => Cleanup;
export type Delay = null | number;

export default (callback: Callback, delay?: Delay) => {
  const refCleanup = useRef<Cleanup>();
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetInterval = useCallback(() => {
    clearInterval(refTimeoutId.current);

    refCleanup.current && refCleanup.current();
  }, []);

  useEffect(() => {
    refTimeoutId.current = setInterval(() => {
      refCleanup.current = callback();
    }, delay);

    return resetInterval;
  }, [callback, delay]);

  return { resetInterval };
};
