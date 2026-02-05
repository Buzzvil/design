'use client';

import { Container, Stack, Grid, Viewport } from '@/lib/layouts';
import { Button, Card, CTA, Input } from '@/lib/components';
import { useTheme } from '@/lib/theme/ThemeProvider';
import { useState } from 'react';

/**
 * Theme playground page
 * Live theme editor with color picker, spacing/radius customization
 * Preview multiple components with theme
 */
export default function ThemePage() {
  const { theme, themeName, setTheme, generateCustomTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('');

  const handleThemeChange = (name: 'default' | 'light' | 'dark') => {
    setTheme(name);
  };

  const handleCustomTheme = () => {
    // Convert hex to HSL for theme generation
    // Simplified - in production, use a proper color conversion library
    generateCustomTheme(primaryColor, secondaryColor || undefined);
  };

  return (
    <div className="min-h-screen bg-[var(--lib-color-background)] text-[var(--lib-color-foreground)]">
      <Container padding="lg" maxWidth="2xl">
        <Stack direction="vertical" gap="xl" className="py-12">
          {/* Header */}
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--lib-color-foreground)' }}
            >
              Theme Playground
            </h1>
            <p
              className="text-lg"
              style={{ color: 'var(--lib-color-mutedForeground)' }}
            >
              Customize themes and see changes live across all components
            </p>
          </div>

          {/* Theme Selector */}
          <Card title="Default Themes" padding="md">
            <Stack direction="horizontal" gap="md" className="flex-wrap">
              <button
                onClick={() => handleThemeChange('default')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  themeName === 'default'
                    ? 'bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)]'
                    : 'bg-[var(--lib-color-muted)] text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-secondary)]'
                }`}
              >
                Default
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  themeName === 'light'
                    ? 'bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)]'
                    : 'bg-[var(--lib-color-muted)] text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-secondary)]'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  themeName === 'dark'
                    ? 'bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)]'
                    : 'bg-[var(--lib-color-muted)] text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-secondary)]'
                }`}
              >
                Dark
              </button>
            </Stack>
          </Card>

          {/* Custom Theme Generator */}
          <Card title="Custom Theme" padding="md">
            <Stack direction="vertical" gap="md">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--lib-color-foreground)' }}
                >
                  Primary Color
                </label>
                <Stack direction="horizontal" gap="md">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 h-10 rounded border cursor-pointer"
                    style={{
                      borderColor: 'var(--lib-color-border)',
                    }}
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#3b82f6"
                    className="flex-1 px-3 py-2 rounded-md border"
                    style={{
                      backgroundColor: 'var(--lib-input-background)',
                      borderColor: 'var(--lib-input-border)',
                      color: 'var(--lib-input-foreground)',
                      fontFamily: 'var(--lib-font-sans)',
                    }}
                  />
                </Stack>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--lib-color-foreground)' }}
                >
                  Secondary Color (Optional)
                </label>
                <Stack direction="horizontal" gap="md">
                  <input
                    type="color"
                    value={secondaryColor || '#e5e7eb'}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-16 h-10 rounded border cursor-pointer"
                    style={{
                      borderColor: 'var(--lib-color-border)',
                    }}
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    placeholder="#e5e7eb"
                    className="flex-1 px-3 py-2 rounded-md border"
                    style={{
                      backgroundColor: 'var(--lib-input-background)',
                      borderColor: 'var(--lib-input-border)',
                      color: 'var(--lib-input-foreground)',
                      fontFamily: 'var(--lib-font-sans)',
                    }}
                  />
                </Stack>
              </div>
              <button
                onClick={handleCustomTheme}
                className="px-4 py-2 rounded-md font-medium bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)] hover:bg-[var(--lib-color-primaryHover)] transition-colors"
              >
                Apply Custom Theme
              </button>
            </Stack>
          </Card>

          {/* Component Preview */}
          <Card title="Component Preview" padding="md">
            <Stack direction="vertical" gap="lg">
              <Viewport>
                <Container padding="md">
                  <Stack direction="vertical" gap="md">
                    <Stack direction="horizontal" gap="sm" className="flex-wrap">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                    </Stack>
                    <CTA variant="primary">Call to Action</CTA>
                    <Input placeholder="Enter text..." />
                    <Card padding="sm" title="Card Preview">
                      Card content with current theme
                    </Card>
                  </Stack>
                </Container>
              </Viewport>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
