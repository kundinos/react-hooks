import { usePrefersColorScheme } from '../usePrefersColorScheme';
import { usePrefersLanguages } from '../usePrefersLanguages';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';
import { ColorScheme, PrefersLanguages, PrefersReducedMotion } from '../shared-kernel';

export interface UsePrefersResult {
  colorScheme: ColorScheme;
  languages: PrefersLanguages;
  reducedMotion: PrefersReducedMotion;
}

export type UsePrefers = () => UsePrefersResult;

/**
 * Simplifies to detect the user preferences
 * Return the prefers color scheme, languages and need to reduce motion
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-prefers
 */
export const usePrefers: UsePrefers = () => {
  const { theme: colorScheme } = usePrefersColorScheme();
  const languages = usePrefersLanguages();
  const reducedMotion = usePrefersReducedMotion();

  return { colorScheme, languages, reducedMotion };
};
