import { useEffect } from 'react';

export interface UseWindowEventOptions extends AddEventListenerOptions {
  initial?: boolean;
}

export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | UseWindowEventOptions,
) => void;

const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  useEffect(() => {
    if (typeof options === 'object' && options.initial) listener.bind(this, null)();

    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener);
    };
  }, [listener, options, type]);
};

export default useWindowEvent;
