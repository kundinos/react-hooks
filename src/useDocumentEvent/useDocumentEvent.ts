import { useEffect } from 'react';

type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Window, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => void;

const useDocumentEvent: UseDocumentEvent = (type, listener, options) => {
  useEffect(() => {
    document.addEventListener(type, listener, options);

    return () => {
      document.removeEventListener(type, listener);
    };
  }, []);
};

export default useDocumentEvent;
