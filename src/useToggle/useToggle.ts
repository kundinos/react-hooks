import { useCallback, useState } from 'react';

import { UseToggle } from './typings';

const useToggle: UseToggle = (initialState = false) => {
  const [on, setOn] = useState(initialState);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return [on, toggle];
};

export default useToggle;
