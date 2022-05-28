import { MutableRefObject, RefObject, useEffect } from 'react';

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

/**
 * Simplifies the subscribing to events on any HTML element or React ref. Deletes the subscription after unmount component
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-native-event
 */
export const useNativeEvent: UseNativeEvent = (target, type, listener, options) => {
  const isRef = !!(target as MutableRefObject<HTMLElement>).current;
  const initTarget = isRef
    ? (target as MutableRefObject<HTMLElement>).current
    : (target as HTMLElement);

  useEffect(() => {
    if (typeof options === 'object' && options.initial) listener.bind(initTarget, null)();

    initTarget.addEventListener(type, listener, options);

    return () => {
      initTarget.removeEventListener(type, listener);
    };
  }, [initTarget, listener, options, type]);
};
