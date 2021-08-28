import { useCallback, useState } from 'react';

import { UseSwitch } from './typings';

const useSwitch: UseSwitch = (initialState = false) => {
  const [on, setOn] = useState(initialState);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return [on, toggle];
};

export default useSwitch;
