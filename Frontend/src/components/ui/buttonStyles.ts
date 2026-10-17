import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_14px_34px_-16px_var(--color-accent)] hover:bg-accent-hover hover:-translate-y-0.5',
  secondary: 'border border-line bg-surface text-ink hover:border-accent hover:text-accent',
  ghost: 'text-muted hover:text-ink',
}

/** Clases del estilo de botón, para usar en `<Link>` u otro elemento. */
export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cn(base, variants[variant], className)
}
