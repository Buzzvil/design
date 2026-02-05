'use client';

import { ThemeProvider } from '@/lib/theme/ThemeProvider';

/**
 * Library-specific layout
 * Completely isolated from platform layout
 * Provides ThemeProvider for library components
 */
export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultThemeName="default">
      <div className="lib-root">
        {children}
      </div>
    </ThemeProvider>
  );
}
