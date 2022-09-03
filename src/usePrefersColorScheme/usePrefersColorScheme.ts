import { useCallback, useState } from 'react';

import { useMediaQuery, type UseMediaQueryCallback } from '../useMediaQuery';

export type ColorScheme = 'dark' | 'light';

export interface UsePrefersColorSchemeResult {
  theme: ColorScheme;
  isDark: boolean;
  isLight: boolean;
}

export type UsePrefersColorScheme = () => Partial<UsePrefersColorSchemeResult>;

/**
 * Simplifies to detect if the user has requested a light or dark color theme
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-prefers-color-scheme
 */
export const usePrefersColorScheme: UsePrefersColorScheme = () => {
  const [theme, setTheme] = useState<ColorScheme>(null);

  const handleChange: UseMediaQueryCallback = useCallback((params) => {
    let newTheme: ColorScheme = params.media.includes('dark') ? 'dark' : 'light';

    if (!params.matches) {
      newTheme = newTheme === 'dark' ? 'light' : 'dark';
    }

    setTheme(newTheme);
  }, []);

  useMediaQuery('(prefers-color-scheme: dark)', handleChange);
  useMediaQuery('(prefers-color-scheme: light)', handleChange);

  return { theme, isDark: theme && theme === 'dark', isLight: theme && theme === 'light' };
};
