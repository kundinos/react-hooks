import { useCallback, useState } from 'react';

import useDocumentEvent from '../useDocumentEvent';
import { UseIdle } from './typings';

const useIdle: UseIdle = (options = {}) => {
  const { onChange } = options;
  const [idle, setIdle] = useState(false);

  const handleVisibilityChange = useCallback(
    (e) => {
      setIdle(document.visibilityState === 'hidden');

      if (onChange) onChange(e);
    },
    [onChange],
  );

  useDocumentEvent('visibilitychange', handleVisibilityChange);

  return idle;
};

export default useIdle;
