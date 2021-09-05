import { useCallback, useRef, useState } from 'react';

import useDocumentEvent from '../useDocumentEvent';
import useTimeout, { UseTimeoutResult } from '../useTimeout';
import { UseIdle } from './typings';

const useIdle: UseIdle = (options = {}) => {
  const { onIdle, onWakeup } = options;
  const [idle, setIdle] = useState(false);
  const timeout = useRef(options.timeout || 3000);
  const timer = useRef<UseTimeoutResult>();

  const emitOnIdle = useCallback(
    (e?) => {
      if (idle) return;

      timer.current.reset();
      setIdle(true);
      if (onIdle) onIdle(e);
    },
    [idle, onIdle],
  );

  const emitOnWakeup = useCallback(
    (e) => {
      if (!idle) return;

      timer.current.reset();
      setIdle(false);
      if (onWakeup) onWakeup(e);
    },
    [idle, onWakeup],
  );

  const handleVisibilityChange = useCallback(
    (e) => {
      const isHidden = document.visibilityState === 'hidden';

      if (isHidden) {
        emitOnIdle(e);
      } else {
        emitOnWakeup(e);
      }
    },
    [emitOnIdle, emitOnWakeup],
  );

  useDocumentEvent('visibilitychange', handleVisibilityChange);
  useDocumentEvent('click', emitOnWakeup);
  useDocumentEvent('keydown', emitOnWakeup);
  useDocumentEvent('mousemove', emitOnWakeup);

  timer.current = useTimeout(emitOnIdle, timeout.current);

  return idle;
};

export default useIdle;
