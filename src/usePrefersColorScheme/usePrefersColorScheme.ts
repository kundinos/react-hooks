import { useCallback, useEffect, useState } from 'react';

import { UsePrefersColorScheme, ColorScheme } from './typings';

const medias = ['dark', 'light'].map((theme) => `(prefers-color-scheme: ${theme})`);

/**
 * Simplifies to detect if the user has requested a light or dark color theme
 *
 * @see https://kundinos.ru/project/react-hooks/use-prefers-color-scheme
 */
const usePrefersColorScheme: UsePrefersColorScheme = () => {
  const [theme, setTheme] = useState<ColorScheme>(null);

  const handleChange = useCallback((arg: MediaQueryList | MediaQueryListEvent) => {
    const index = medias.findIndex((media) => arg.media === media);
    let newTheme: ColorScheme = index === 0 ? 'dark' : 'light';

    if (!arg.matches) {
      newTheme = newTheme === 'dark' ? 'light' : 'dark';
    }

    setTheme(newTheme);
  }, []);

  useEffect(() => {
    const mqls = medias
      .map((media) => window.matchMedia(media))
      .map((mql) => {
        handleChange(mql);
        mql.addEventListener('change', handleChange);

        return mql;
      });

    return () => {
      mqls.forEach((mql) => {
        mql.removeEventListener('change', handleChange);
      });
    };
  }, [handleChange]);

  return { theme, isDark: theme && theme === 'dark', isLight: theme && theme === 'light' };
};

export default usePrefersColorScheme;