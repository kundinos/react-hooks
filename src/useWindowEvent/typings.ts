import { UseNativeEventOptions } from '../useNativeEvent';

export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | UseNativeEventOptions,
) => void;
