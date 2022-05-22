import { useCallback, useState } from 'react';

import { UseSwitch } from './typings';

/**
 * Returns a state with true/false value and function for his toggle
 *
 * @param initialState The initial state for the switch
 *
 * @see https://kundinos.github.io/docs/docs/react-hooks/hooks/use-switch
 */
const useSwitch: UseSwitch = (initialState = false) => {
  const [on, setOn] = useState(initialState);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return [on, toggle];
};

export default useSwitch;
