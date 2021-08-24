export interface UseWindowEventOptions extends AddEventListenerOptions {
  initial?: boolean;
}

export type UseWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | UseWindowEventOptions,
) => void;
