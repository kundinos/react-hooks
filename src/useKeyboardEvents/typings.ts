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
 * @see https://kundinos.ru/react-hooks/useKeyboardEvents
 */
export type UseKeyboardEvents = (eventsMap: EventsMap) => void;
