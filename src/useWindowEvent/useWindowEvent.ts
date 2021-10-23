import useNativeEvent from '../useNativeEvent';
import { UseWindowEvent } from './typings';

/**
 * Simplifies the subscribing to events on window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/project/react-hooks/use-window-event
 */
const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  return useNativeEvent(window, type, listener, options);
};

export default useWindowEvent;
