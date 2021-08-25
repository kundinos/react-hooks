import useNativeEvent from '../useNativeEvent';
import { UseWindowEvent } from './typings';

const useWindowEvent: UseWindowEvent = (type, listener, options) => {
  return useNativeEvent(window, type, listener, options);
};

export default useWindowEvent;
