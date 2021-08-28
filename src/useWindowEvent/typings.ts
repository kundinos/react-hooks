import { UseNativeEventOptions } from '../useNativeEvent';

/**
 * Simplifies the subscribing to events on window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/react-hooks/useWindowEvent
 */
export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
