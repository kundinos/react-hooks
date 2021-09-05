import { useCallback, useEffect, useRef } from 'react';

export type Cleanup = void | (() => void);
export type Callback = () => Cleanup;
export type Timeout = number;
export interface UseTimeoutResult {
  reset: () => void;
  repeat: () => void;
}
export type UseTimeout = (callback: Callback, timeout?: Timeout) => UseTimeoutResult;

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
