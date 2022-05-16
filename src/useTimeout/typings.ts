export type Cleanup = void | (() => void);
export type Callback = () => Cleanup;
export type Delay = number;
export interface UseTimeoutResult {
  reset: () => void;
  repeat: () => void;
}
export type UseTimeout = (callback: Callback, delay?: Delay) => UseTimeoutResult;
