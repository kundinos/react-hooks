import { useEffect, useState } from 'react';

export type PrefersLanguages = readonly string[];

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
