import { UseNativeEventOptions } from '../useNativeEvent';

export type UseResize = (
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
