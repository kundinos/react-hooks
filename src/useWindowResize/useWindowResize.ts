import useWindowEvent from '../useWindowEvent';
import { UseWindowResize } from './typings';

/**
 * Simplifies the subscribing to resize of window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/project/react-hooks/use-resize
 */
const useWindowResize: UseWindowResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};

export default useWindowResize;
