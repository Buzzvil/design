import type { ThemeTokens, ColorTokens } from './tokens';
import { generateTheme, themeToCSSVars } from './config';

/**
 * Generate a custom theme from brand colors
 */
export function generateCustomTheme(
  primaryColor: string,
  secondaryColor?: string
): ThemeTokens {
  // Parse HSL color and generate variations
  const parseHSL = (hsl: string): [number, number, number] => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    // Default to blue if parsing fails
    return [217, 91, 60];
  };

  const [h1, s1, l1] = parseHSL(primaryColor);
  const [h2, s2, l2] = secondaryColor ? parseHSL(secondaryColor) : [h1, s1, l1];

  const colors: ColorTokens = {
    primary: primaryColor,
    primaryHover: `hsl(${h1}, ${s1}%, ${Math.max(0, l1 - 5)}%)`,
    primaryActive: `hsl(${h1}, ${s1}%, ${Math.max(0, l1 - 10)}%)`,
    primaryForeground: l1 > 50 ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',

    secondary: secondaryColor || `hsl(${h2}, ${Math.max(0, s2 - 50)}%, ${Math.min(100, l2 + 60)}%)`,
    secondaryHover: `hsl(${h2}, ${Math.max(0, s2 - 50)}%, ${Math.min(100, l2 + 55)}%)`,
    secondaryActive: `hsl(${h2}, ${Math.max(0, s2 - 50)}%, ${Math.min(100, l2 + 50)}%)`,
    secondaryForeground: l2 > 50 ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)',

    accent: primaryColor,
    accentHover: `hsl(${h1}, ${s1}%, ${Math.max(0, l1 - 5)}%)`,
    accentActive: `hsl(${h1}, ${s1}%, ${Math.max(0, l1 - 10)}%)`,
    accentForeground: l1 > 50 ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',

    background: l1 > 50 ? 'hsl(0, 0%, 100%)' : 'hsl(222, 47%, 11%)',
    foreground: l1 > 50 ? 'hsl(222, 47%, 11%)' : 'hsl(210, 40%, 98%)',
    card: l1 > 50 ? 'hsl(0, 0%, 100%)' : 'hsl(222, 47%, 11%)',
    cardForeground: l1 > 50 ? 'hsl(222, 47%, 11%)' : 'hsl(210, 40%, 98%)',
    muted: l1 > 50 ? 'hsl(210, 40%, 96%)' : 'hsl(217, 33%, 17%)',
    mutedForeground: l1 > 50 ? 'hsl(215, 16%, 47%)' : 'hsl(215, 20%, 65%)',
    border: l1 > 50 ? 'hsl(214, 32%, 91%)' : 'hsl(217, 33%, 17%)',
    input: l1 > 50 ? 'hsl(0, 0%, 100%)' : 'hsl(217, 33%, 17%)',
    ring: primaryColor,

    success: 'hsl(142, 76%, 36%)',
    successForeground: 'hsl(0, 0%, 100%)',
    warning: 'hsl(38, 92%, 50%)',
    warningForeground: 'hsl(0, 0%, 100%)',
    error: 'hsl(0, 84%, 60%)',
    errorForeground: 'hsl(0, 0%, 100%)',
    info: primaryColor,
    infoForeground: l1 > 50 ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',
  };

  return generateTheme(colors);
}

/**
 * Apply theme CSS variables to the document
 */
export function applyThemeToDocument(theme: ThemeTokens): void {
  const root = document.documentElement;
  const vars = themeToCSSVars(theme);

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Get computed CSS variable value
 */
export function getCSSVar(varName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Theme persistence helpers
 */
const THEME_STORAGE_KEY = 'lib-theme';

export function saveThemeToStorage(themeName: string, customTheme?: ThemeTokens): void {
  try {
    const data = {
      name: themeName,
      custom: customTheme ? themeToCSSVars(customTheme) : null,
    };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

export function loadThemeFromStorage(): { name: string; custom?: Record<string, string> } | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error);
    return null;
  }
}
