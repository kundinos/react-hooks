/**
 * Returns a state with true/false value and function for his toggle
 *
 * @param initialState The initial state for the switch
 *
 * @see https://kundinos.ru/react-hooks/useToggle
 */
export type UseToggle = (initialState?: boolean | (() => boolean)) => [boolean, () => void];
