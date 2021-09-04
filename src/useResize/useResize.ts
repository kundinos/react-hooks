import useWindowEvent from '../useWindowEvent';
import { UseResize } from './typings';

/**
 * Simplifies the subscribing to resize of window. Deletes the subscription after unmount component
 *
 * @see https://kundinos.ru/react-hooks/useResize
 */
const useResize: UseResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};

export default useResize;
