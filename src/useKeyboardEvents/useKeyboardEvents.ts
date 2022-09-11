import { useCallback } from 'react';

import { useWindowEvent } from '../useWindowEvent';

export type Handler = (e: KeyboardEvent) => void;

export type EventsList =
  | 'onUp'
  | 'onRight'
  | 'onDown'
  | 'onLeft'
  | 'onArrowLeft'
  | 'onArrowRight'
  | 'onArrowUp'
  | 'onArrowDown'
  | 'onEscape'
  | 'onTab'
  | 'onKeyDown'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onSpace';

export type EventsMap = Partial<Record<EventsList, Handler>>;

export type UseKeyboardEvents = (eventsMap: EventsMap) => void;

const config = [
  { event: 'onKeyDown' },
  { event: 'onKeyUp' },
  { event: 'onKeyPress' },
  { codes: ['Escape'], event: 'onEscape' },
  { codes: ['Tab'], event: 'onTab' },
  { codes: ['ArrowLeft'], event: 'onArrowLeft' },
  { codes: ['ArrowRight'], event: 'onArrowRight' },
  { codes: ['ArrowUp'], event: 'onArrowUp' },
  { codes: ['ArrowDown'], event: 'onArrowDown' },
  { codes: ['ArrowLeft', 'KeyA'], event: 'onLeft' },
  { codes: ['ArrowRight', 'KeyD'], event: 'onRight' },
  { codes: ['ArrowUp', 'KeyW'], event: 'onUp' },
  { codes: ['ArrowDown', 'KeyS'], event: 'onDown' },
  { codes: ['Space'], event: 'onSpace' },
];

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
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-keyboard-events
 */
export const useKeyboardEvents: UseKeyboardEvents = (eventsMap) => {
  const handleEvent = useCallback(
    (e: KeyboardEvent) => {
      config.forEach((item) => {
        if (!eventsMap[item.event]) return;
        if (item.codes && !item.codes.includes(e.code)) return;

        eventsMap[item.event](e);
      });
    },
    [eventsMap],
  );

  useWindowEvent('keydown', handleEvent);
  useWindowEvent('keypress', handleEvent);
  useWindowEvent('keyup', handleEvent);
};
