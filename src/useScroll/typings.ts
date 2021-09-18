import { UseNativeEventOptions } from '../useNativeEvent';

export interface Position {
  x: number;
  y: number;
}

export interface Positions {
  previous?: Position;
  current?: Position;
}

export type Callback = (positions?: Positions) => void;

export type UseScroll = (listener: Callback, options?: boolean | UseNativeEventOptions) => void;
