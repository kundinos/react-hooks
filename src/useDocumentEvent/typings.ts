import { UseNativeEventOptions } from '../useNativeEvent';

export type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | UseNativeEventOptions,
) => void;
