import { UseNativeEventOptions } from '../useNativeEvent';
/**
 * Simplifies the subscribing to events on document. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/react-hooks/useDocumentEvent
 */
export type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
