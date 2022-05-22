import { useCallback, useRef, useState } from 'react';

import useDocumentEvent from '../useDocumentEvent';
import useTimeout, { UseTimeoutResult } from '../useTimeout';
import { UseIdle } from './typings';

/**
 * Returns a stateful value about user idle or not
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-idle
 */
const useIdle: UseIdle = (options = {}) => {
  const { onIdle, onWakeUp } = options;
  const [idle, setIdle] = useState(false);
  const timeout = useRef(options.timeout || 3000);
  const timer = useRef<UseTimeoutResult>();

  const emitOnIdle = useCallback(
    (e?) => {
      timer.current.reset();

      if (!idle) {
        setIdle(true);
        if (onIdle) onIdle(e);
      }
    },
    [idle, onIdle],
  );

  const emitOnWakeUp = useCallback(
    (e) => {
      timer.current.repeat();

      if (idle) {
        setIdle(false);
        if (onWakeUp) onWakeUp(e);
      }
    },
    [idle, onWakeUp],
  );

  const handleVisibilityChange = useCallback(
    (e) => {
      const isHidden = document.visibilityState === 'hidden';

      if (isHidden) {
        emitOnIdle(e);
      } else {
        emitOnWakeUp(e);
      }
    },
    [emitOnIdle, emitOnWakeUp],
  );

  timer.current = useTimeout(emitOnIdle, timeout.current);

  useDocumentEvent('visibilitychange', handleVisibilityChange);
  useDocumentEvent('click', emitOnWakeUp);
  useDocumentEvent('keydown', emitOnWakeUp);
  useDocumentEvent('mousemove', emitOnWakeUp);
  useDocumentEvent('scroll', emitOnWakeUp);

  return idle;
};

export default useIdle;
