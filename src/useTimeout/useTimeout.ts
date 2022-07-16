import { useCallback, useEffect, useRef } from 'react';

export type UseTimeoutCleanup = void | (() => void);

export type UseTimeoutCallback = () => UseTimeoutCleanup;

export type UseTimeoutDelay = number;

export interface UseTimeoutResult {
  reset: () => void;
  repeat: () => void;
}

export type UseTimeout = (
  callback: UseTimeoutCallback,
  delay?: UseTimeoutDelay,
) => UseTimeoutResult;

/**
 * Declarative version of setTimeout
 * @param callback - Callback function, that will be called after specified delay time
 * @param delay — Time in milliseconds for timeout
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-timeout
 */
export const useTimeout: UseTimeout = (callback, delay) => {
  const refCleanup = useRef<UseTimeoutCleanup>(null);
  const refTimeoutId = useRef<NodeJS.Timeout>();
  const refIsCalled = useRef(false);

  const reset = useCallback(() => {
    clearTimeout(refTimeoutId.current);

    if (typeof refCleanup.current === 'function') {
      refCleanup.current();
      refCleanup.current = null;
    }
  }, []);

  const start = useCallback(() => {
    refTimeoutId.current = setTimeout(() => {
      refCleanup.current = callback();
      refIsCalled.current = true;
    }, delay);
  }, [callback, delay]);

  const repeat = useCallback(() => {
    refIsCalled.current = false;
    reset();
    start();
  }, [reset, start]);

  useEffect(() => {
    if (delay === null) return reset();

    if (!refIsCalled.current) start();

    return reset;
  }, [delay, reset, start]);

  return { reset, repeat };
};
