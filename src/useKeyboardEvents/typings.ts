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
