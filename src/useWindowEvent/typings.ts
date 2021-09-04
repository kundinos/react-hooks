import { UseNativeEventOptions } from '../useNativeEvent';

export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: EventListener,
  options?: boolean | UseNativeEventOptions,
) => void;
