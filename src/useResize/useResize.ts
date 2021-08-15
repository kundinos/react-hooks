import useWindowEvent, { UseWindowEventOptions } from '../useWindowEvent';

export type UseResize = (
  listener: (this: Window, ev: WindowEventMap['resize']) => void,
  options?: UseWindowEventOptions,
) => void;

const useResize: UseResize = (listener, options) => {
  return useWindowEvent('resize', listener, options);
};

export default useResize;
