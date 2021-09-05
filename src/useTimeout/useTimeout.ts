import { useCallback, useEffect, useRef } from 'react';

export type Cleanup = void | (() => void);
export type Callback = () => Cleanup;
export type Timeout = number;
export interface UseTimeoutResult {
  resetTimeout: () => void;
}
export type UseTimeout = (callback: Callback, timeout?: Timeout) => UseTimeoutResult;

const useTimeout: UseTimeout = (callback, timeout) => {
  const refCleanup = useRef<Cleanup>(null);
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetTimeout = useCallback(() => {
    clearTimeout(refTimeoutId.current);

    if (typeof refCleanup.current === 'function') refCleanup.current();
  }, []);

  useEffect(() => {
    refTimeoutId.current = setTimeout(() => {
      refCleanup.current = callback();
    }, timeout);

    return resetTimeout;
  }, [callback, resetTimeout, timeout]);

  return { resetTimeout };
};

export default useTimeout;
