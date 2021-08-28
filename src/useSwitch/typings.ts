/**
 * Returns a state with true/false value and function for his toggle
 *
 * @param initialState The initial state for the switch
 *
 * @see https://kundinos.ru/react-hooks/useSwitch
 */
export type UseSwitch = (initialState?: boolean | (() => boolean)) => [boolean, () => void];