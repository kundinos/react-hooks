import { useEffect } from 'react';

import { UseDocumentEvent } from './typings';

const useDocumentEvent: UseDocumentEvent = (type, listener, options) => {
  useEffect(() => {
    document.addEventListener(type, listener, options);

    return () => {
      document.removeEventListener(type, listener);
    };
  }, [listener, options, type]);
};

export default useDocumentEvent;
