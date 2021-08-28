import useWindowEvent from '../useWindowEvent';
import { UseResize } from './typings';

const useResize: UseResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};

export default useResize;
