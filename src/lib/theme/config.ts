import type { ThemeTokens, ColorTokens } from './tokens';
import {
  baseSpacing,
  baseRadius,
  baseShadows,
  baseTypography,
} from './tokens';

/**
 * Generate a full theme from base tokens and color palette
 */
export function generateTheme(colors: ColorTokens): ThemeTokens {
  return {
    colors,
    spacing: baseSpacing,
    typography: baseTypography,
    radius: baseRadius,
    shadows: baseShadows,
    components: {
      cta: {
        primary: colors.primary,
        primaryHover: colors.primaryHover,
        primaryActive: colors.primaryActive,
        primaryForeground: colors.primaryForeground,
        radius: baseRadius.lg,
        shadow: baseShadows.md,
      },
      card: {
        background: colors.card,
        foreground: colors.cardForeground,
        border: colors.border,
        radius: baseRadius.lg,
        shadow: baseShadows.sm,
      },
      input: {
        background: colors.input || colors.background,
        foreground: colors.foreground,
        border: colors.border,
        focusBorder: colors.ring || colors.primary,
        radius: baseRadius.md,
      },
    },
  };
}

/**
 * Theme 1: Default (Neutral, Professional)
 */
export const defaultThemeColors: ColorTokens = {
  primary: 'hsl(217, 91%, 60%)',
  primaryHover: 'hsl(217, 91%, 55%)',
  primaryActive: 'hsl(217, 91%, 50%)',
  primaryForeground: 'hsl(0, 0%, 100%)',

  secondary: 'hsl(210, 40%, 96%)',
  secondaryHover: 'hsl(210, 40%, 92%)',
  secondaryActive: 'hsl(210, 40%, 88%)',
  secondaryForeground: 'hsl(222, 47%, 11%)',

  accent: 'hsl(217, 91%, 60%)',
  accentHover: 'hsl(217, 91%, 55%)',
  accentActive: 'hsl(217, 91%, 50%)',
  accentForeground: 'hsl(0, 0%, 100%)',

  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(222, 47%, 11%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(222, 47%, 11%)',
  muted: 'hsl(210, 40%, 96%)',
  mutedForeground: 'hsl(215, 16%, 47%)',
  border: 'hsl(214, 32%, 91%)',
  input: 'hsl(0, 0%, 100%)',
  ring: 'hsl(217, 91%, 60%)',

  success: 'hsl(142, 76%, 36%)',
  successForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(38, 92%, 50%)',
  warningForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 84%, 60%)',
  errorForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(217, 91%, 60%)',
  infoForeground: 'hsl(0, 0%, 100%)',
};

/**
 * Theme 2: Light (Bright, Clean)
 */
export const lightThemeColors: ColorTokens = {
  primary: 'hsl(221, 83%, 53%)',
  primaryHover: 'hsl(221, 83%, 48%)',
  primaryActive: 'hsl(221, 83%, 43%)',
  primaryForeground: 'hsl(0, 0%, 100%)',

  secondary: 'hsl(210, 40%, 98%)',
  secondaryHover: 'hsl(210, 40%, 94%)',
  secondaryActive: 'hsl(210, 40%, 90%)',
  secondaryForeground: 'hsl(222, 47%, 11%)',

  accent: 'hsl(221, 83%, 53%)',
  accentHover: 'hsl(221, 83%, 48%)',
  accentActive: 'hsl(221, 83%, 43%)',
  accentForeground: 'hsl(0, 0%, 100%)',

  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(222, 47%, 11%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(222, 47%, 11%)',
  muted: 'hsl(210, 40%, 98%)',
  mutedForeground: 'hsl(215, 16%, 47%)',
  border: 'hsl(214, 32%, 95%)',
  input: 'hsl(0, 0%, 100%)',
  ring: 'hsl(221, 83%, 53%)',

  success: 'hsl(142, 76%, 36%)',
  successForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(38, 92%, 50%)',
  warningForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 84%, 60%)',
  errorForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(221, 83%, 53%)',
  infoForeground: 'hsl(0, 0%, 100%)',
};

/**
 * Theme 3: Dark (Dark Background, High Contrast)
 */
export const darkThemeColors: ColorTokens = {
  primary: 'hsl(217, 91%, 60%)',
  primaryHover: 'hsl(217, 91%, 65%)',
  primaryActive: 'hsl(217, 91%, 70%)',
  primaryForeground: 'hsl(0, 0%, 100%)',

  secondary: 'hsl(217, 33%, 17%)',
  secondaryHover: 'hsl(217, 33%, 22%)',
  secondaryActive: 'hsl(217, 33%, 27%)',
  secondaryForeground: 'hsl(210, 40%, 98%)',

  accent: 'hsl(217, 91%, 60%)',
  accentHover: 'hsl(217, 91%, 65%)',
  accentActive: 'hsl(217, 91%, 70%)',
  accentForeground: 'hsl(0, 0%, 100%)',

  background: 'hsl(222, 47%, 11%)',
  foreground: 'hsl(210, 40%, 98%)',
  card: 'hsl(222, 47%, 11%)',
  cardForeground: 'hsl(210, 40%, 98%)',
  muted: 'hsl(217, 33%, 17%)',
  mutedForeground: 'hsl(215, 20%, 65%)',
  border: 'hsl(217, 33%, 17%)',
  input: 'hsl(217, 33%, 17%)',
  ring: 'hsl(217, 91%, 60%)',

  success: 'hsl(142, 71%, 45%)',
  successForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(38, 92%, 50%)',
  warningForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 72%, 51%)',
  errorForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(217, 91%, 60%)',
  infoForeground: 'hsl(0, 0%, 100%)',
};

/**
 * Predefined themes
 */
export const defaultTheme = generateTheme(defaultThemeColors);
export const lightTheme = generateTheme(lightThemeColors);
export const darkTheme = generateTheme(darkThemeColors);

export type ThemeName = 'default' | 'light' | 'dark';

export const themes: Record<ThemeName, ThemeTokens> = {
  default: defaultTheme,
  light: lightTheme,
  dark: darkTheme,
};

/**
 * Convert theme tokens to CSS variables
 */
export function themeToCSSVars(theme: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars[`--lib-color-${key}`] = value;
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    vars[`--lib-spacing-${key}`] = value;
  });

  // Radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    vars[`--lib-radius-${key}`] = value;
  });

  // Typography
  vars['--lib-font-sans'] = theme.typography.fontFamily.sans.join(', ');
  vars['--lib-font-mono'] = theme.typography.fontFamily.mono.join(', ');
  
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    const [size, { lineHeight }] = Array.isArray(value) ? value : [value, { lineHeight: '1.5' }];
    vars[`--lib-font-size-${key}`] = size;
    vars[`--lib-line-height-${key}`] = lineHeight;
  });

  // Component tokens
  Object.entries(theme.components.cta).forEach(([key, value]) => {
    vars[`--lib-cta-${key}`] = value;
  });

  Object.entries(theme.components.card).forEach(([key, value]) => {
    vars[`--lib-card-${key}`] = value;
  });

  Object.entries(theme.components.input).forEach(([key, value]) => {
    vars[`--lib-input-${key}`] = value;
  });

  return vars;
}

/**
 * Validate theme structure
 */
export function validateTheme(theme: Partial<ThemeTokens>): theme is ThemeTokens {
  return !!(
    theme.colors &&
    theme.spacing &&
    theme.typography &&
    theme.radius &&
    theme.shadows &&
    theme.components
  );
}
