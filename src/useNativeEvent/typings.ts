import { RefObject, MutableRefObject } from 'react';

export type Target<T extends EventTarget> = T | RefObject<T> | MutableRefObject<EventTarget>;

export interface UseNativeEventOptions extends AddEventListenerOptions {
  initial?: boolean;
}

/**
 * Simplifies the subscribing to events on any HTML element or React ref. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/react-hooks/useNativeEvent
 */
export type UseNativeEvent = (
  target: Target<EventTarget>,
  type: string,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
