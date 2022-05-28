import { useWindowEvent } from '../useWindowEvent';
import { UseNativeEventOptions } from '../useNativeEvent';

export type UseWindowResize = (
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;

/**
 * Simplifies the subscribing to resize of window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-window-resize
 */
export const useWindowResize: UseWindowResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};
