import { Dispatch, SetStateAction } from 'react';

export type UseFullState = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>, S];
