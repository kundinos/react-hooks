import { useEffect, useState } from 'react';

export type UsePrefersLanguages = () => readonly string[];

/**
 * Return the array of preferred languages
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-prefers-languages
 */
export const usePrefersLanguages: UsePrefersLanguages = () => {
  const [languages, setLanguages] = useState<readonly string[]>([]);

  useEffect(() => {
    setLanguages(window.navigator.languages);
  }, []);

  return languages;
};
