export type Cleanup = void | (() => void);
export type Callback = () => Cleanup;
export type Delay = null | number;
export interface UseIntervalResult {
  resetInterval: () => void;
}
export type UseInterval = (allback: Callback, delay?: Delay) => UseIntervalResult;
