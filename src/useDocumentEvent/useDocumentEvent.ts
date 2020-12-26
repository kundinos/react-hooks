import { useEffect } from 'react';

export type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Window, ev: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) => void;

const useDocumentEvent: UseDocumentEvent = (type, listener, options) => {
  useEffect(() => {
    document.addEventListener(type, listener, options);

    return () => {
      document.removeEventListener(type, listener);
    };
  }, [listener, options, type]);
};

export default useDocumentEvent;
