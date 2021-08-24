import { useEffect } from 'react';

import { UseWindowEvent } from './typings';

const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  useEffect(() => {
    if (typeof options === 'object' && options.initial) listener.bind(window, null)();

    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener);
    };
  }, [listener, options, type]);
};

export default useWindowEvent;
