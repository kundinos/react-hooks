import { UseNativeEventOptions } from '../useNativeEvent';

export type UseWindowResize = (
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
