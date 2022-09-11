import { useEffect, useState } from 'react';

import { PrefersLanguages } from '../shared-kernel';

export type UsePrefersLanguages = () => PrefersLanguages;

/**
 * Return the array of preferred languages
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-prefers-languages
 */
export const usePrefersLanguages: UsePrefersLanguages = () => {
  const [languages, setLanguages] = useState<PrefersLanguages>([]);

  useEffect(() => {
    setLanguages(window.navigator.languages);
  }, []);

  return languages;
};
