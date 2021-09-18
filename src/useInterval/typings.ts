export type Cleanup = () => void | null;
export type Callback = () => Cleanup | void;
export type Delay = null | number;
export interface UseIntervalResult {
  resetInterval: () => void;
}
export type UseInterval = (allback: Callback, delay?: Delay) => UseIntervalResult;
