import { useCallback, useState } from 'react';

export type UseToggle = (initialState?: boolean | (() => boolean)) => [boolean, () => void];

/**
 * Returns a state with true/false value and function for his toggle
 *
 * @param initialState The initial state for the toggle switch
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-toggle
 */
export const useToggle: UseToggle = (initialState = false) => {
  const [on, setOn] = useState(initialState);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return [on, toggle];
};
