import { RefObject, MutableRefObject } from 'react';

export type Target<T extends EventTarget> = T | RefObject<T> | MutableRefObject<EventTarget>;

export interface UseNativeEventOptions extends AddEventListenerOptions {
  initial?: boolean;
}

export type UseNativeEvent = (
  target: Target<EventTarget>,
  type: string,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
