import { MutableRefObject, useEffect } from 'react';

import { UseNativeEvent } from './typings';

const useNativeEvent: UseNativeEvent = (target, type, listener, options) => {
  const isRef = !!(target as MutableRefObject<HTMLElement>).current;
  const initTarget = isRef
    ? (target as MutableRefObject<HTMLElement>).current
    : (target as HTMLElement);

  useEffect(() => {
    if (typeof options === 'object' && options.initial) listener.bind(initTarget, null)();

    initTarget.addEventListener(type, listener, options);

    return () => {
      initTarget.removeEventListener(type, listener);
    };
  }, [initTarget, listener, options, type]);
};

export default useNativeEvent;
