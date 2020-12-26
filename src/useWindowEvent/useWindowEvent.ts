import { useEffect } from 'react';

export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) => void;

const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener);
    };
  }, [listener, options, type]);
};

export default useWindowEvent;
