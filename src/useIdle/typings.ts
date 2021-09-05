export interface UseIdleOptions {
  onIdle?: (e: Event) => void;
  onWakeup?: (e: Event) => void;
}

/**
 * Returns a stateful value about user idle or not
 *
 * @see https://kundinos.ru/react-hooks/useIdle
 */
export type UseIdle = (options?: UseIdleOptions) => boolean;
