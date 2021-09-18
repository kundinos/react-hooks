export type Cleanup = void | (() => void);
export type Callback = () => Cleanup;
export type Timeout = number;
export interface UseTimeoutResult {
  reset: () => void;
  repeat: () => void;
}
export type UseTimeout = (callback: Callback, timeout?: Timeout) => UseTimeoutResult;
