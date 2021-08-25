import useNativeEvent from '../useNativeEvent';
import { UseDocumentEvent } from './typings';

const useDocumentEvent: UseDocumentEvent = (type, listener, options) => {
  return useNativeEvent(document, type, listener, options);
};

export default useDocumentEvent;
