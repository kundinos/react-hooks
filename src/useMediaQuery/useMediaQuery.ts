import { useEffect, useCallback, useState } from 'react';

import { type MediaQuery } from '../shared-kernel';

interface OnChangeParams {
  matches: boolean;
  media: string;
}

export type UseMediaQueryCallback = (params: OnChangeParams) => void;

/**
 * Simplifies to detect when specified media query matches
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-media-query
 */
export function useMediaQuery(media: MediaQuery, onChange: UseMediaQueryCallback) {
  const [matches, setMatches] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: MediaQueryList | MediaQueryListEvent) => {
      setMatches(e.matches);
      if (onChange) onChange({ matches: e.matches, media: e.media });
    },
    [onChange],
  );

  useEffect(() => {
    const mql = window.matchMedia(media);

    setMatches(mql.matches);
    mql.addEventListener('change', handleChange);

    return () => mql.removeEventListener('change', handleChange);
  }, [handleChange, media]);

  return matches;
}
