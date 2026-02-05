import { ButtonVariant, ButtonSize } from './Button.types';

export function getButtonClasses(variant: ButtonVariant, size: ButtonSize): string {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[var(--lib-color-primary)] text-[var(--lib-color-primaryForeground)] hover:bg-[var(--lib-color-primaryHover)] active:bg-[var(--lib-color-primaryActive)] focus:ring-[var(--lib-color-primary)]',
    secondary: 'bg-[var(--lib-color-secondary)] text-[var(--lib-color-secondaryForeground)] hover:bg-[var(--lib-color-secondaryHover)] active:bg-[var(--lib-color-secondaryActive)] focus:ring-[var(--lib-color-secondary)]',
    outline: 'border-2 border-[var(--lib-color-border)] bg-transparent text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-muted)] focus:ring-[var(--lib-color-ring)]',
    ghost: 'bg-transparent text-[var(--lib-color-foreground)] hover:bg-[var(--lib-color-muted)] focus:ring-[var(--lib-color-ring)]',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
}
