import { useRef, useCallback } from 'react';

import { useWindowEvent } from '../useWindowEvent';
import { UseNativeEventOptions } from '../useNativeEvent';

export interface UseScrollPosition {
  x: number;
  y: number;
}

export interface UseScrollPositions {
  previous?: UseScrollPosition;
  current?: UseScrollPosition;
}

export type UseScrollCallback = (positions?: UseScrollPositions) => void;

export type UseScroll = (
  listener: UseScrollCallback,
  options?: boolean | UseNativeEventOptions,
) => void;

/**
 * Simplifies the subscribing to scroll of window and has previous/current scroll positions.
 * Deletes the subscription after unmount component
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-scroll
 */
export const useScroll: UseScroll = (listener, options) => {
  const previous = useRef({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    const current = { x: window.scrollX, y: window.scrollY };

    listener({ previous: previous.current, current });

    previous.current = current;
  }, [listener]);

  return useWindowEvent('scroll', handleScroll, options);
};
