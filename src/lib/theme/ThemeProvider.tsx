'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ThemeTokens } from './tokens';
import { themes, type ThemeName, defaultTheme } from './config';
import { applyThemeToDocument, saveThemeToStorage, loadThemeFromStorage, generateCustomTheme } from './utils';

interface ThemeContextValue {
  theme: ThemeTokens;
  themeName: ThemeName | 'custom';
  setTheme: (name: ThemeName | 'custom', customTheme?: ThemeTokens) => void;
  customTheme: ThemeTokens | null;
  generateCustomTheme: (primaryColor: string, secondaryColor?: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultThemeName?: ThemeName;
}

export function ThemeProvider({ children, defaultThemeName = 'default' }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName | 'custom'>(defaultThemeName);
  const [theme, setThemeState] = useState<ThemeTokens>(themes[defaultThemeName]);
  const [customTheme, setCustomTheme] = useState<ThemeTokens | null>(null);

  // Load theme from storage on mount and apply initial theme
  useEffect(() => {
    const stored = loadThemeFromStorage();
    if (stored) {
      if (stored.name === 'custom' && stored.custom) {
        // Apply custom theme CSS vars
        Object.entries(stored.custom).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        // Note: We can't fully reconstruct ThemeTokens from CSS vars alone,
        // so we use defaultTheme as fallback. In a real implementation,
        // you'd want to store the full theme object.
        const initialTheme = defaultTheme;
        setThemeState(initialTheme);
        setCustomTheme(initialTheme);
        setThemeName('custom');
        // Don't call applyThemeToDocument here since we already set CSS vars above
      } else if (stored.name in themes) {
        const storedTheme = themes[stored.name as ThemeName];
        setThemeState(storedTheme);
        setThemeName(stored.name as ThemeName);
        applyThemeToDocument(storedTheme);
      }
    } else {
      const initialTheme = themes[defaultThemeName];
      setThemeState(initialTheme);
      applyThemeToDocument(initialTheme);
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme to document when it changes (but not on initial mount)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = useCallback((name: ThemeName | 'custom', customThemeOverride?: ThemeTokens) => {
    if (name === 'custom' && customThemeOverride) {
      setCustomTheme(customThemeOverride);
      setThemeState(customThemeOverride);
      setThemeName('custom');
      applyThemeToDocument(customThemeOverride);
      saveThemeToStorage('custom', customThemeOverride);
    } else if (name in themes) {
      const selectedTheme = themes[name as ThemeName];
      setThemeState(selectedTheme);
      setThemeName(name as ThemeName);
      setCustomTheme(null);
      applyThemeToDocument(selectedTheme);
      saveThemeToStorage(name);
    }
  }, []);

  const handleGenerateCustomTheme = useCallback((primaryColor: string, secondaryColor?: string) => {
    const newCustomTheme = generateCustomTheme(primaryColor, secondaryColor);
    setTheme('custom', newCustomTheme);
  }, [setTheme]);

  const value: ThemeContextValue = {
    theme,
    themeName,
    setTheme,
    customTheme,
    generateCustomTheme: handleGenerateCustomTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to use theme context
 * Must be used within ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
