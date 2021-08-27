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
 * Эффект для подписки на события клавиатуры
 * @param eventsMap  перечисление обработчиков событий
 * @example
 * useKeyboardEvents({
 *  onEscape: () => console.log('Escape was pressed!')
 * })
 */
export type UseKeyboardEvents = (eventsMap: EventsMap) => void;
