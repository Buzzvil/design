/**
 * Component Library - Main Export
 * Complete UI component library system for mobile-first products
 */

// Theme
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export { themes, defaultTheme, lightTheme, darkTheme } from './theme/config';
export type { ThemeTokens, ColorTokens } from './theme/tokens';
export type { ThemeName } from './theme/config';

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Input } from './components/Input';
export type { InputProps, InputSize, InputVariant } from './components/Input';

export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { CTA } from './components/CTA';
export type { CTAProps, CTASize, CTAVariant } from './components/CTA';

// Layouts
export { Container } from './layouts/Container';
export { Section } from './layouts/Section';
export { Grid } from './layouts/Grid';
export { Stack } from './layouts/Stack';
export { Spacer } from './layouts/Spacer';
export { Viewport } from './layouts/Viewport';

// Patterns - Loading
export { BrandedLoader } from './patterns/loading/BrandedLoader';
export { SkeletonLoader } from './patterns/loading/SkeletonLoader';

// Patterns - Animations
export { IntroOutro } from './patterns/animations/IntroOutro';
export { PageTransition, PageTransitionWrapper } from './patterns/animations/PageTransition';
export { Overlay } from './patterns/animations/Overlay';
export { Stagger } from './patterns/animations/Stagger';

// Patterns - Micro-interactions
export { ButtonPress } from './patterns/micro-interactions/ButtonPress';
export { HoverEffects } from './patterns/micro-interactions/HoverEffects';
export { FocusStates } from './patterns/micro-interactions/FocusStates';
export { FeedbackAnimations } from './patterns/micro-interactions/FeedbackAnimations';
export { TapRipple } from './patterns/micro-interactions/TapRipple';
