import { useCallback, useState } from 'react';

import useDocumentEvent from '../useDocumentEvent';
import { UseIdle } from './typings';

const useIdle: UseIdle = (options = {}) => {
  const { onIdle, onWakeup } = options;
  const [idle, setIdle] = useState(false);

  const handleVisibilityChange = useCallback(
    (e) => {
      const isHidden = document.visibilityState === 'hidden';

      setIdle(isHidden);

      if (onIdle && isHidden) onIdle(e);
      if (onWakeup && !isHidden) onWakeup(e);
    },
    [onIdle, onWakeup],
  );

  useDocumentEvent('visibilitychange', handleVisibilityChange);

  return idle;
};

export default useIdle;
