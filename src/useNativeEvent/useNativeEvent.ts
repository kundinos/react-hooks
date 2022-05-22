import { MutableRefObject, useEffect } from 'react';

import { UseNativeEvent } from './typings';

/**
 * Simplifies the subscribing to events on any HTML element or React ref. Deletes the subscription after unmount component
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-native-event
 */
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
