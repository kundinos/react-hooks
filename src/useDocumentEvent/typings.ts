import { UseNativeEventOptions } from '../useNativeEvent';

export type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
