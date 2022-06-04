import { useNativeEvent, UseNativeEventOptions } from '../useNativeEvent';

export type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;

/**
 * Simplifies the subscribing to events on document. Deletes the subscription after unmount component
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-document-event
 */
export const useDocumentEvent: UseDocumentEvent = (type, listener, options) => {
  return useNativeEvent(document, type, listener, options);
};
