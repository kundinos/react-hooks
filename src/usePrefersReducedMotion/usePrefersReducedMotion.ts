import { useCallback, useState } from 'react';

import { useMediaQuery, type UseMediaQueryCallback } from '../useMediaQuery';

export type PrefersReducedMotion = 'no-preference' | 'reduce';

export type UsePrefersReducedMotion = () => PrefersReducedMotion;

/**
 * Simplifies to detect if the user has requested a light or dark color theme
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-prefers-reduced-motion
 */
export const usePrefersReducedMotion: UsePrefersReducedMotion = () => {
  const [value, setValue] = useState<PrefersReducedMotion>('no-preference');

  const handleChange: UseMediaQueryCallback = useCallback(({ media, matches }) => {
    console.log(matches, media);
    if (media === '(prefers-reduced-motion: reduce)') {
      setValue(matches ? 'reduce' : 'no-preference');
    }

    if (media === '(prefers-reduced-motion: no-preference)') {
      setValue(matches ? 'no-preference' : 'reduce');
    }
  }, []);

  useMediaQuery('(prefers-reduced-motion: reduce)', handleChange);
  useMediaQuery('(prefers-reduced-motion: no-preference)', handleChange);

  return value;
};
