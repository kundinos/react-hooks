import { useEffect, useState } from 'react';

export type UsePreferredLanguages = () => void;

/**
 * Return the array of preferred languages
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-preferred-languages
 */
export const usePreferredLanguages: UsePreferredLanguages = () => {
  const [languages, setLanguages] = useState<readonly string[]>([]);

  useEffect(() => {
    setLanguages(window.navigator.languages);
  }, []);

  return languages;
};
