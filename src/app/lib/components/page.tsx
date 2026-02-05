'use client';

import { Container, Grid, Stack } from '@/lib/layouts';
import { Card } from '@/lib/components';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Component library index page
 * Grid/list view of all components with search and filtering
 */

interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: 'components' | 'layouts' | 'patterns';
  figmaFileKey?: string;
  figmaNodeId?: string;
}

const components: ComponentMetadata[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'Primary interactive button component with multiple variants',
    category: 'components',
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Form input field with labels, helper text, and error states',
    category: 'components',
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Container component for grouping related content',
    category: 'components',
  },
  {
    id: 'cta',
    name: 'CTA',
    description: 'Call-to-action button with custom tokens for brand customization',
    category: 'components',
  },
  {
    id: 'container',
    name: 'Container',
    description: 'Mobile-first responsive container with configurable max-width',
    category: 'layouts',
  },
  {
    id: 'section',
    name: 'Section',
    description: 'Section component with consistent vertical rhythm',
    category: 'layouts',
  },
  {
    id: 'grid',
    name: 'Grid',
    description: 'Responsive grid system with mobile-first breakpoints',
    category: 'layouts',
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Vertical/horizontal stacking with consistent gaps',
    category: 'layouts',
  },
  {
    id: 'branded-loader',
    name: 'Branded Loader',
    description: 'Customer-branded loading screen with animated SVG icons',
    category: 'patterns',
  },
  {
    id: 'skeleton-loader',
    name: 'Skeleton Loader',
    description: 'Skeleton loading states for text, card, and list variants',
    category: 'patterns',
  },
  {
    id: 'intro-outro',
    name: 'Intro/Outro',
    description: 'Animation patterns for large (modals) and small (toasts) elements',
    category: 'patterns',
  },
  {
    id: 'page-transition',
    name: 'Page Transition',
    description: 'Forward and back navigation transitions',
    category: 'patterns',
  },
  {
    id: 'overlay',
    name: 'Overlay',
    description: 'Fade in/out overlay with optional backdrop blur',
    category: 'patterns',
  },
  {
    id: 'stagger',
    name: 'Stagger',
    description: 'Sequential element appearance for rewards and gamified feedback',
    category: 'patterns',
  },
];

const categories = ['all', 'components', 'layouts', 'patterns'] as const;

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'components' | 'layouts' | 'patterns'>('all');

  const filteredComponents = components.filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-[var(--lib-color-background)] text-[var(--lib-color-foreground)]">
      <Container padding="lg" maxWidth="2xl">
        <Stack direction="vertical" gap="lg" className="py-12">
          {/* Header */}
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--lib-color-foreground)' }}
            >
              Component Library
            </h1>
            <p
              className="text-lg"
              style={{ color: 'var(--lib-color-mutedForeground)' }}
            >
              Browse and test all available components, layouts, and interaction patterns
            </p>
          </div>

          {/* Search and Filters */}
          <Stack direction="vertical" gap="md">
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-md border"
              style={{
                backgroundColor: 'var(--lib-input-background)',
                borderColor: 'var(--lib-input-border)',
                color: 'var(--lib-input-foreground)',
                fontFamily: 'var(--lib-font-sans)',
              }}
            />
            <Stack direction="horizontal" gap="sm" className="flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)]'
                      : 'bg-[var(--lib-color-muted)] text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-secondary)]'
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </Stack>
          </Stack>

          {/* Component Grid */}
          <Grid cols={2} gap="md">
            {filteredComponents.map((component) => (
              <Link
                key={component.id}
                href={`/lib/components/${component.id}`}
                className="block"
              >
                <Card hover className="h-full">
                  <Stack direction="vertical" gap="sm">
                    <div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: 'var(--lib-color-foreground)' }}
                      >
                        {component.name}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--lib-color-muted)',
                          color: 'var(--lib-color-mutedForeground)',
                        }}
                      >
                        {getCategoryLabel(component.category)}
                      </span>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--lib-color-mutedForeground)' }}
                    >
                      {component.description}
                    </p>
                  </Stack>
                </Card>
              </Link>
            ))}
          </Grid>

          {filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--lib-color-mutedForeground)' }}>
                No components found matching your search.
              </p>
            </div>
          )}
        </Stack>
      </Container>
    </div>
  );
}
