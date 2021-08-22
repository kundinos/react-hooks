import { useCallback } from 'react';

import { useWindowEvent } from '../index';
import { UseKeyboardEvents } from './typings';

const useKeyboardEvents: UseKeyboardEvents = (eventsMap) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (eventsMap.onKeyDown) eventsMap.onKeyDown(e);

      if (eventsMap.onEscape && e.key === 'Escape') {
        eventsMap.onEscape(e);
      }

      if (eventsMap.onArrowLeft && e.key === 'ArrowLeft') {
        eventsMap.onArrowLeft(e);
      }

      if (eventsMap.onArrowRight && e.key === 'ArrowRight') {
        eventsMap.onArrowRight(e);
      }

      if (eventsMap.onArrowUp && e.key === 'ArrowUp') {
        eventsMap.onArrowUp(e);
      }

      if (eventsMap.onArrowDown && e.key === 'ArrowDown') {
        eventsMap.onArrowDown(e);
      }

      if (eventsMap.onSpace && e.code === 'Space') {
        eventsMap.onSpace(e);
      }
    },
    [eventsMap],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (eventsMap.onKeyUp) eventsMap.onKeyUp(e);
    },
    [eventsMap],
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (eventsMap.onKeyPress) eventsMap.onKeyPress(e);
    },
    [eventsMap],
  );

  useWindowEvent('keydown', handleKeyDown);
  useWindowEvent('keypress', handleKeyPress);
  useWindowEvent('keyup', handleKeyUp);
};

export default useKeyboardEvents;
