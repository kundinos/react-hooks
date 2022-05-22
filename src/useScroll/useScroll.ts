import { useRef, useCallback } from 'react';

import useWindowEvent from '../useWindowEvent';
import { UseScroll } from './typings';

/**
 * Simplifies the subscribing to scroll of window and has previous/current scroll positions.
 * Deletes the subscription after unmount component
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-scroll
 */
const useScroll: UseScroll = (listener, options) => {
  const previous = useRef({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    const current = { x: window.scrollX, y: window.scrollY };

    listener({ previous: previous.current, current });

    previous.current = current;
  }, [listener]);

  return useWindowEvent('scroll', handleScroll, options);
};

export default useScroll;
