import { useNativeEvent, UseNativeEventOptions } from '../useNativeEvent';

export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;

/**
 * Simplifies the subscribing to events on window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-window-event
 */
export const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  return useNativeEvent(window, type, listener, options);
};
