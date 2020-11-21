import { useEffect } from 'react';

type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => void;

const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener);
    };
  }, []);
};

export default useWindowEvent;
