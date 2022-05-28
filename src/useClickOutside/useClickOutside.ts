import { useRef, useCallback, MutableRefObject } from 'react';

import useDocumentEvent from '../useDocumentEvent';

export type UseClickOutsideCallback = (e: MouseEvent) => void;

export interface UseClickOutsideParams {
  disabled?: boolean;
  handleEvent?: UseClickOutsideCallback;
}

/**
 * Helps to track click outside specified HTML Element
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-click-outside
 */
export function useClickOutside<T extends HTMLElement>(
  params: UseClickOutsideParams = {},
): MutableRefObject<T> {
  const { disabled, handleEvent } = params;
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (disabled) return;
      if (!ref.current || ref.current.contains(target)) return;
      if (handleEvent) handleEvent(e);
    },
    [disabled, handleEvent],
  );

  useDocumentEvent('click', handleClick);

  return ref;
}
