export type ColorScheme = 'dark' | 'light';

export interface UsePrefersColorSchemeResult {
  theme: ColorScheme;
  isDark: boolean;
  isLight: boolean;
}

export type UsePrefersColorScheme = () => Partial<UsePrefersColorSchemeResult>;
