import useNativeEvent from '../useNativeEvent';
import { UseDocumentEvent } from './typings';

/**
 * Simplifies the subscribing to events on document. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/react-hooks/useDocumentEvent
 */
const useDocumentEvent: UseDocumentEvent = (type, listener, options) => {
  return useNativeEvent(document, type, listener, options);
};

export default useDocumentEvent;
