import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'paper' | 'dark'
  className?: string
}

/** Encabezado editorial compartido por las secciones de la landing. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'paper',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p
        className={cn(
          'flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]',
          align === 'center' && 'justify-center',
          dark ? 'text-[#e8c9a8]' : 'text-paper-accent',
        )}
      >
        <span
          aria-hidden
          className={cn('h-1.5 w-1.5 rounded-full', dark ? 'bg-[#e8c9a8]' : 'bg-paper-accent')}
        />
        {eyebrow}
      </p>

      <h2
        className={cn(
          'mt-3 text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-4xl',
          dark ? 'text-[#fbf7ee]' : 'text-paper-ink',
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-3 text-pretty text-sm leading-relaxed sm:text-[15px]',
            dark ? 'text-[#cfc6b8]' : 'text-paper-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
