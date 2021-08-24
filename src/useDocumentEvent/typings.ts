export type UseDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Window, ev: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) => void;
