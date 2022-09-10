import { usePrefersColorScheme, type ColorScheme } from '../usePrefersColorScheme';
import { usePrefersLanguages, type PrefersLanguages } from '../usePrefersLanguages';
import { usePrefersReducedMotion, type PrefersReducedMotion } from '../usePrefersReducedMotion';

export interface UsePrefersResult {
  colorScheme: ColorScheme;
  languages: PrefersLanguages;
  reducedMotion: PrefersReducedMotion;
}

export type UsePrefers = () => UsePrefersResult;

/**
 * Simplifies to detect the user preferences
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-prefers
 */
export const usePrefers: UsePrefers = () => {
  const { theme: colorScheme } = usePrefersColorScheme();
  const languages = usePrefersLanguages();
  const reducedMotion = usePrefersReducedMotion();

  return { colorScheme, languages, reducedMotion };
};
