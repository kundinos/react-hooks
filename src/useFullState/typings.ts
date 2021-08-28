import { Dispatch, SetStateAction } from 'react';

/**
 * Works as useState, but contains third parameter with previous value of state
 *
 * @see https://kundinos.ru/react-hooks/useFullState
 */
export type UseFullState = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>, S];
