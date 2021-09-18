import { useCallback } from 'react';

import useWindowEvent from '../useWindowEvent';
import { UseKeyboardEvents } from './typings';

/**
 * Simplifies the subscribing to events on keyboard. Deletes the subscriptions after unmount component
 *
 * @param eventsMap Listing event handlers
 *
 * @example
 * useKeyboardEvents({
 *  onEscape: () => console.log('Escape was pressed!'),
 *  onArrowUp: () => console.log('Arrow up was pressed!'),
 * })
 *
 * @see https://kundinos.ru/project/react-hooks/use-keyboard-events
 */
const useKeyboardEvents: UseKeyboardEvents = (eventsMap) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (eventsMap.onKeyDown) eventsMap.onKeyDown(e);

      if (eventsMap.onEscape && e.code === 'Escape') {
        eventsMap.onEscape(e);
      }

      if (eventsMap.onTab && e.code === 'Tab') {
        eventsMap.onTab(e);
      }

      if (eventsMap.onArrowLeft && e.code === 'ArrowLeft') {
        eventsMap.onArrowLeft(e);
      }

      if (eventsMap.onArrowRight && e.code === 'ArrowRight') {
        eventsMap.onArrowRight(e);
      }

      if (eventsMap.onArrowUp && e.code === 'ArrowUp') {
        eventsMap.onArrowUp(e);
      }

      if (eventsMap.onArrowDown && e.code === 'ArrowDown') {
        eventsMap.onArrowDown(e);
      }

      if (eventsMap.onLeft && ['ArrowLeft', 'KeyA'].includes(e.code)) {
        eventsMap.onLeft(e);
      }

      if (eventsMap.onRight && ['ArrowRight', 'KeyD'].includes(e.code)) {
        eventsMap.onRight(e);
      }

      if (eventsMap.onUp && ['ArrowUp', 'KeyW'].includes(e.code)) {
        eventsMap.onUp(e);
      }

      if (eventsMap.onDown && ['ArrowDown', 'KeyS'].includes(e.code)) {
        eventsMap.onDown(e);
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
