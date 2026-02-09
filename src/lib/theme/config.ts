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
  primary: 'hsl(0, 84%, 60%)',       // Red 50
  primaryHover: 'hsl(0, 84%, 55%)',
  primaryActive: 'hsl(0, 84%, 50%)',
  primaryForeground: 'hsl(0, 0%, 100%)',

  secondary: 'hsl(0, 0%, 96%)',
  secondaryHover: 'hsl(0, 0%, 92%)',
  secondaryActive: 'hsl(0, 0%, 88%)',
  secondaryForeground: 'hsl(0, 0%, 9%)',

  accent: 'hsl(0, 0%, 92%)',          // light gray for hover
  accentHover: 'hsl(0, 0%, 88%)',
  accentActive: 'hsl(0, 0%, 84%)',
  accentForeground: 'hsl(0, 0%, 9%)',

  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(0, 0%, 9%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(0, 0%, 9%)',
  muted: 'hsl(0, 0%, 96%)',
  mutedForeground: 'hsl(0, 0%, 45%)',
  border: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 100%)',
  ring: 'hsl(0, 84%, 60%)',          // Red 50

  success: 'hsl(142, 76%, 36%)',
  successForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(24, 95%, 53%)',      // Orange 60
  warningForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 84%, 60%)',         // Red 50
  errorForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(24, 95%, 53%)',         // Orange 60
  infoForeground: 'hsl(0, 0%, 100%)',
};

/**
 * Theme 2: Light (Bright, Clean)
 */
export const lightThemeColors: ColorTokens = {
  primary: 'hsl(0, 84%, 60%)',       // Red 50
  primaryHover: 'hsl(0, 84%, 55%)',
  primaryActive: 'hsl(0, 84%, 50%)',
  primaryForeground: 'hsl(0, 0%, 100%)',

  secondary: 'hsl(0, 0%, 98%)',
  secondaryHover: 'hsl(0, 0%, 94%)',
  secondaryActive: 'hsl(0, 0%, 90%)',
  secondaryForeground: 'hsl(0, 0%, 9%)',

  accent: 'hsl(0, 0%, 94%)',          // light gray for hover
  accentHover: 'hsl(0, 0%, 90%)',
  accentActive: 'hsl(0, 0%, 86%)',
  accentForeground: 'hsl(0, 0%, 9%)',

  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(0, 0%, 9%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(0, 0%, 9%)',
  muted: 'hsl(0, 0%, 98%)',
  mutedForeground: 'hsl(0, 0%, 45%)',
  border: 'hsl(0, 0%, 93%)',
  input: 'hsl(0, 0%, 100%)',
  ring: 'hsl(0, 84%, 60%)',          // Red 50

  success: 'hsl(142, 76%, 36%)',
  successForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(24, 95%, 53%)',      // Orange 60
  warningForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 84%, 60%)',         // Red 50
  errorForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(24, 95%, 53%)',         // Orange 60
  infoForeground: 'hsl(0, 0%, 100%)',
};

/**
 * Theme 3: Dark (Dark Background, High Contrast)
 */
export const darkThemeColors: ColorTokens = {
  primary: 'hsl(0, 84%, 60%)',       // Red 50
  primaryHover: 'hsl(0, 84%, 65%)',
  primaryActive: 'hsl(0, 84%, 70%)',
  primaryForeground: 'hsl(0, 0%, 100%)',

  secondary: 'hsl(0, 0%, 15%)',
  secondaryHover: 'hsl(0, 0%, 20%)',
  secondaryActive: 'hsl(0, 0%, 25%)',
  secondaryForeground: 'hsl(0, 0%, 98%)',

  accent: 'hsl(0, 0%, 15%)',          // subtle white shade for dark hover
  accentHover: 'hsl(0, 0%, 20%)',
  accentActive: 'hsl(0, 0%, 25%)',
  accentForeground: 'hsl(0, 0%, 98%)',

  background: 'hsl(0, 0%, 3%)',
  foreground: 'hsl(0, 0%, 98%)',
  card: 'hsl(0, 0%, 3%)',
  cardForeground: 'hsl(0, 0%, 98%)',
  muted: 'hsl(0, 0%, 15%)',
  mutedForeground: 'hsl(0, 0%, 65%)',
  border: 'hsl(0, 0%, 15%)',
  input: 'hsl(0, 0%, 15%)',
  ring: 'hsl(0, 84%, 60%)',          // Red 50

  success: 'hsl(142, 71%, 45%)',
  successForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(24, 95%, 53%)',      // Orange 60
  warningForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 72%, 51%)',         // Red 60
  errorForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(24, 95%, 53%)',         // Orange 60
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
