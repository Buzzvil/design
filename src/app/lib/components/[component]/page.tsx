'use client';

import { Container, Stack } from '@/lib/layouts';
import { Button, Input, Card, CTA } from '@/lib/components';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';

/**
 * Individual component showcase page
 * Live preview with all variants, interactive controls, code preview
 */

// Component renderers to avoid storing React components in objects
const renderComponent = (componentId: string, variant: any) => {
  try {
    switch (componentId) {
      case 'button':
        return <Button {...variant} />;
      case 'input':
        return <Input {...variant} />;
      case 'card':
        return <Card {...variant}>{variant.children}</Card>;
      case 'cta':
        return <CTA {...variant} />;
      default:
        return <div className="p-4 text-sm text-[var(--lib-color-mutedForeground)]">Component not available</div>;
    }
  } catch (error) {
    return <div className="p-4 text-sm text-red-500">Error: {error instanceof Error ? error.message : 'Unknown'}</div>;
  }
};

const componentData: Record<string, any> = {
  button: {
    name: 'Button',
    description: 'Primary interactive button component with multiple variants',
    variants: [
      { variant: 'primary', size: 'md', children: 'Primary Button' },
      { variant: 'secondary', size: 'md', children: 'Secondary Button' },
      { variant: 'outline', size: 'md', children: 'Outline Button' },
      { variant: 'ghost', size: 'md', children: 'Ghost Button' },
    ],
  },
  input: {
    name: 'Input',
    description: 'Form input field with labels, helper text, and error states',
    variants: [
      { placeholder: 'Enter text...', size: 'md' },
      { label: 'Email', type: 'email', placeholder: 'email@example.com', size: 'md' },
      { label: 'Password', type: 'password', placeholder: 'Enter password', size: 'md' },
      { label: 'Error Input', error: true, helperText: 'This field is required', size: 'md' },
    ],
  },
  card: {
    name: 'Card',
    description: 'Container component for grouping related content',
    variants: [
      { title: 'Card Title', description: 'Card description', children: 'Card content goes here', padding: 'md' },
      { title: 'Card with Footer', children: 'Card content', footer: 'Card footer', padding: 'md' },
      { hover: true, title: 'Hoverable Card', children: 'Hover to see effect', padding: 'md' },
    ],
  },
  cta: {
    name: 'CTA',
    description: 'Call-to-action button with custom tokens',
    variants: [
      { variant: 'primary', size: 'md', children: 'Call to Action' },
      { variant: 'secondary', size: 'md', children: 'Learn More' },
      { variant: 'outline', size: 'md', children: 'Get Started' },
    ],
  },
};

export default function ComponentPage() {
  const params = useParams();
  // Handle both trailing slash and non-trailing slash routes
  const componentIdRaw = params?.component as string;
  const componentId = componentIdRaw?.replace(/\/$/, '') || '';
  
  const data = useMemo(() => {
    if (!componentId) return null;
    return componentData[componentId] || null;
  }, [componentId]);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const variant = useMemo(() => {
    if (!data || !data.variants || data.variants.length === 0) return null;
    return data.variants[selectedVariant] || data.variants[0];
  }, [data, selectedVariant]);

  const codeString = useMemo(() => {
    if (!data || !variant) return '';
    const props = Object.entries(variant)
      .filter(([key]) => key !== 'children')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        if (typeof value === 'string') {
          return `${key}="${String(value)}"`;
        }
        return '';
      })
      .filter(Boolean)
      .join(' ');
    const componentName = data.name;
    const children = typeof variant.children === 'string' ? variant.children : '';
    return `<${componentName} ${props}${children ? `>${children}</${componentName}>` : ' />'}`;
  }, [data, variant]);

  if (!data) {
    return (
      <Container padding="lg" maxWidth="2xl">
        <div className="py-12 text-center">
          <p style={{ color: 'var(--lib-color-mutedForeground)' }}>
            Component not found: {componentId || '(empty)'}
          </p>
        </div>
      </Container>
    );
  }

  if (!variant) {
    return (
      <Container padding="lg" maxWidth="2xl">
        <div className="py-12 text-center">
          <p style={{ color: 'var(--lib-color-mutedForeground)' }}>
            No variants available
          </p>
        </div>
      </Container>
    );
  }

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
              {data.name}
            </h1>
            <p
              className="text-lg"
              style={{ color: 'var(--lib-color-mutedForeground)' }}
            >
              {data.description}
            </p>
          </div>

          {/* Variant Selector */}
          {data.variants.length > 1 && (
            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--lib-color-foreground)' }}
              >
                Variants
              </h3>
              <Stack direction="horizontal" gap="sm" className="flex-wrap">
                {data.variants.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedVariant === index
                        ? 'bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)]'
                        : 'bg-[var(--lib-color-muted)] text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-secondary)]'
                    }`}
                  >
                    Variant {index + 1}
                  </button>
                ))}
              </Stack>
            </div>
          )}

          {/* Preview */}
          <div>
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--lib-color-foreground)' }}
            >
              Preview
            </h3>
            <div
              className="mx-auto rounded-lg border p-4 bg-[var(--lib-color-background)] max-w-md"
              style={{
                borderColor: 'var(--lib-color-border)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderComponent(componentId, variant)}
            </div>
          </div>

          {/* Code Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-lg font-semibold"
                style={{ color: 'var(--lib-color-foreground)' }}
              >
                Code
              </h3>
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 rounded-md text-sm bg-[var(--lib-color-muted)] hover:bg-[var(--lib-color-secondary)] transition-colors"
                style={{ color: 'var(--lib-color-foreground)' }}
              >
                {showCode ? 'Hide' : 'Show'} Code
              </button>
            </div>
            {showCode && (
              <Card padding="md">
                <pre
                  className="text-sm overflow-x-auto"
                  style={{
                    color: 'var(--lib-color-foreground)',
                    fontFamily: 'var(--lib-font-mono)',
                  }}
                >
                  <code>{codeString}</code>
                </pre>
              </Card>
            )}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
