import { UseNativeEventOptions } from '../useNativeEvent';
import useWindowEvent from '../useWindowEvent';

export type UseResize = (
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;

const useResize: UseResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};

export default useResize;
