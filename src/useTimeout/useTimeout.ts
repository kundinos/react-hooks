import { useCallback, useEffect, useRef } from 'react';

export default (callback: () => void, timeout: number) => {
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const resetTimeout = useCallback((fn?: () => void) => {
    clearTimeout(refTimeoutId.current);

    fn && fn();
  }, []);

  useEffect(() => {
    refTimeoutId.current = setTimeout(callback, timeout);

    return resetTimeout;
  }, [timeout]);

  return { resetTimeout };
};
