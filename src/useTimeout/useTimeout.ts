import { useCallback, useEffect, useRef } from 'react';

export type Cleanup = void | Function;
export type Callback = () => Cleanup;
export type Timeout = number;

export default (callback: Callback, timeout?: Timeout) => {
  const refCleanup = useRef<Cleanup>();
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetTimeout = useCallback(() => {
    clearTimeout(refTimeoutId.current);

    refCleanup.current && refCleanup.current();
  }, []);

  useEffect(() => {
    refTimeoutId.current = setTimeout(() => {
      refCleanup.current = callback();
    }, timeout);

    return resetTimeout;
  }, [timeout]);

  return { resetTimeout };
};
