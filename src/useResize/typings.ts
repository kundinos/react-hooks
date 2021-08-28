import { UseNativeEventOptions } from '../useNativeEvent';

/**
 * Simplifies the subscribing to resize of window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/react-hooks/useResize
 */
export type UseResize = (
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
