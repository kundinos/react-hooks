export interface UseIdleOptions {
  timeout?: number;
  onIdle?: (e?: Event) => void;
  onWakeUp?: (e: Event) => void;
}

export type UseIdle = (options?: UseIdleOptions) => boolean;
