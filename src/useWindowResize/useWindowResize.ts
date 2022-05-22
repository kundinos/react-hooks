import useWindowEvent from '../useWindowEvent';
import { UseWindowResize } from './typings';

/**
 * Simplifies the subscribing to resize of window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-window-resize
 */
const useWindowResize: UseWindowResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};

export default useWindowResize;
